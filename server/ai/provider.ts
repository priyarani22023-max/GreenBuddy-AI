import { Quest, Setting, Difficulty } from '../../src/types/quest';
import { findBuiltInQuest } from '../../src/data/builtInQuests';
import { createGemmaQuestPrompt } from './prompts';

const DANGEROUS_TERMS = [
  'eat ', 'taste ', 'ingest', 'consume', 'poisonous', 'hallucinogen',
  'pick mushroom', 'eat mushroom', 'eat plant', 'taste berry', 'feed wild',
];

export interface ProviderResult {
  quest: Quest;
  source: string;
  isFallback: boolean;
  providerDetails?: string;
}

export function extractAndValidateJson(rawText: string, duration: number, setting: Setting, difficulty: Difficulty): Omit<Quest, 'id' | 'setting' | 'source'> | null {
  try {
    let clean = rawText.trim();
    // Strip markdown code fences if model enclosed in ```json ... ```
    if (clean.startsWith('```')) {
      clean = clean.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
    }
    // Extract first {...} if surrounded by other prose
    const firstBrace = clean.indexOf('{');
    const lastBrace = clean.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      clean = clean.substring(firstBrace, lastBrace + 1);
    }

    const parsed = JSON.parse(clean);

    if (
      typeof parsed.title !== 'string' || !parsed.title.trim() ||
      typeof parsed.description !== 'string' || !parsed.description.trim() ||
      !Array.isArray(parsed.steps) || parsed.steps.length < 2 ||
      typeof parsed.tip !== 'string' || !parsed.tip.trim()
    ) {
      return null;
    }

    const fullContent = `${parsed.title} ${parsed.description} ${parsed.steps.join(' ')} ${parsed.tip}`.toLowerCase();
    for (const term of DANGEROUS_TERMS) {
      if (fullContent.includes(term)) {
        console.warn(`Safety violation detected in model response containing '${term}'. Rejecting.`);
        return null;
      }
    }

    return {
      title: parsed.title.trim(),
      description: parsed.description.trim(),
      duration: typeof parsed.duration === 'number' ? parsed.duration : duration,
      difficulty: parsed.difficulty === 'Medium' ? 'Medium' : difficulty,
      steps: parsed.steps.map((s: unknown) => String(s).trim()).filter(Boolean),
      tip: parsed.tip.trim(),
    };
  } catch (err) {
    console.error('Failed to parse quest JSON from model:', err);
    return null;
  }
}

export class OllamaGemmaProvider {
  private baseUrl: string;
  private model: string;

  constructor() {
    this.baseUrl = (process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434').replace(/\/$/, '');
    this.model = process.env.GEMMA_MODEL || 'gemma3:1b';
  }

  async checkAvailability(): Promise<{ available: boolean; error?: string; model?: string; models?: string[] }> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${this.baseUrl}/api/tags`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        return { available: false, error: `Ollama returned HTTP ${res.status}` };
      }

      const data = (await res.json()) as { models?: Array<{ name: string }> };
      const modelNames = (data.models || []).map((m) => m.name);
      const hasGemma = modelNames.some((n) => n.toLowerCase().includes('gemma'));

      return {
        available: true,
        model: this.model,
        models: modelNames,
        error: hasGemma ? undefined : `Ollama connected, but model '${this.model}' not found in installed tags (${modelNames.join(', ') || 'none'}). Run: ollama pull ${this.model}`,
      };
    } catch (err: any) {
      return {
        available: false,
        error: err.name === 'AbortError' ? 'Connection timed out (2s)' : 'Ollama not running locally or unreachable at ' + this.baseUrl,
      };
    }
  }

  async generate(duration: number, setting: Setting, difficulty: Difficulty): Promise<ProviderResult | null> {
    const prompt = createGemmaQuestPrompt(duration, setting, difficulty);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000); // 25s timeout for local inference

    try {
      const res = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          model: this.model,
          prompt,
          stream: false,
          format: 'json',
          options: {
            temperature: 0.6,
          },
        }),
      });
      clearTimeout(timeout);

      if (!res.ok) {
        const text = await res.text();
        console.warn(`Ollama request failed with HTTP ${res.status}:`, text);
        return null;
      }

      const data = (await res.json()) as { response?: string };
      if (!data.response) {
        console.warn('Ollama returned empty response payload');
        return null;
      }

      const validated = extractAndValidateJson(data.response, duration, setting, difficulty);
      if (!validated) {
        console.warn('Model output could not be validated:', data.response);
        return null;
      }

      return {
        quest: {
          id: `gemma-ollama-${Date.now()}`,
          ...validated,
          setting,
          source: 'Gemma + Ollama',
          generatedAt: new Date().toISOString(),
        },
        source: 'Gemma + Ollama',
        isFallback: false,
        providerDetails: `Model: ${this.model} via local Ollama (${this.baseUrl})`,
      };
    } catch (err: any) {
      clearTimeout(timeout);
      console.warn('Ollama generation error:', err.message || err);
      return null;
    }
  }
}

export class HostedGemmaProvider {
  private url: string;
  private apiKey: string;
  private model: string;

  constructor() {
    this.url = (process.env.HOSTED_GEMMA_URL || '').trim();
    this.apiKey = (process.env.HOSTED_GEMMA_API_KEY || '').trim();
    this.model = process.env.HOSTED_GEMMA_MODEL || 'gemma-3-1b-it';
  }

  isConfigured(): boolean {
    return Boolean(this.url);
  }

  async checkAvailability(): Promise<{ available: boolean; error?: string; model?: string }> {
    if (!this.isConfigured()) {
      return { available: false, error: 'No HOSTED_GEMMA_URL configured in server environment' };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const endpoint = this.url.endsWith('/models') ? this.url : `${this.url.replace(/\/chat\/completions$/, '')}/models`;

      const headers: Record<string, string> = {};
      if (this.apiKey) {
        headers['Authorization'] = `Bearer ${this.apiKey}`;
      }

      const res = await fetch(endpoint, {
        signal: controller.signal,
        headers,
      });
      clearTimeout(timeoutId);

      return {
        available: res.ok,
        model: this.model,
        error: res.ok ? undefined : `Hosted endpoint returned status ${res.status}`,
      };
    } catch (err: any) {
      return {
        available: false,
        model: this.model,
        error: err.name === 'AbortError' ? 'Hosted endpoint ping timed out' : 'Hosted endpoint unreachable',
      };
    }
  }

  async generate(duration: number, setting: Setting, difficulty: Difficulty): Promise<ProviderResult | null> {
    if (!this.isConfigured()) return null;

    const prompt = createGemmaQuestPrompt(duration, setting, difficulty);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 18000);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    const endpoint = this.url.endsWith('/chat/completions') ? this.url : `${this.url.replace(/\/$/, '')}/chat/completions`;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers,
        signal: controller.signal,
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are GreenBuddy AI. Output valid JSON only according to the specified schema.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.6,
          response_format: { type: 'json_object' },
        }),
      });
      clearTimeout(timeout);

      if (!res.ok) {
        console.warn(`Hosted Gemma request failed with HTTP ${res.status}`);
        return null;
      }

      const data = (await res.json()) as any;
      const rawContent = data.choices?.[0]?.message?.content || data.response || '';
      const validated = extractAndValidateJson(rawContent, duration, setting, difficulty);

      if (!validated) return null;

      return {
        quest: {
          id: `gemma-hosted-${Date.now()}`,
          ...validated,
          setting,
          source: `Gemma Hosted (${this.model})`,
          generatedAt: new Date().toISOString(),
        },
        source: `Gemma Hosted (${this.model})`,
        isFallback: false,
        providerDetails: `Hosted model: ${this.model}`,
      };
    } catch (err: any) {
      clearTimeout(timeout);
      console.warn('Hosted Gemma generation error:', err.message || err);
      return null;
    }
  }
}

export class QuestManager {
  private ollama: OllamaGemmaProvider;
  private hosted: HostedGemmaProvider;

  constructor() {
    this.ollama = new OllamaGemmaProvider();
    this.hosted = new HostedGemmaProvider();
  }

  async getHealth() {
    const ollamaStatus = await this.ollama.checkAvailability();
    const hostedStatus = await this.hosted.checkAvailability();

    let activeProvider: 'ollama' | 'hosted' | 'builtin' = 'builtin';
    if (ollamaStatus.available && !ollamaStatus.error) {
      activeProvider = 'ollama';
    } else if (hostedStatus.available && !hostedStatus.error) {
      activeProvider = 'hosted';
    }

    return {
      status: activeProvider !== 'builtin' ? 'healthy' : 'degraded',
      backend: true,
      activeProvider,
      ollama: {
        configuredUrl: process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434',
        model: process.env.GEMMA_MODEL || 'gemma3:1b',
        reachable: ollamaStatus.available,
        availableModels: ollamaStatus.models,
        error: ollamaStatus.error,
      },
      hosted: {
        configuredUrl: process.env.HOSTED_GEMMA_URL ? 'Configured (hidden for privacy)' : undefined,
        model: process.env.HOSTED_GEMMA_MODEL || 'gemma-3-1b-it',
        reachable: hostedStatus.available,
        error: hostedStatus.error,
      },
      builtinCount: 24,
      version: '1.0.0-hacktoberfest2026',
      timestamp: new Date().toISOString(),
    };
  }

  async generateQuest(duration: number, setting: Setting, difficulty: Difficulty, preferredProvider: 'auto' | 'ollama' | 'hosted' | 'builtin' = 'auto'): Promise<ProviderResult> {
    // 1. If user explicitly requested strictly built-in offline
    if (preferredProvider === 'builtin') {
      const fallback = findBuiltInQuest(setting, duration, difficulty);
      return {
        quest: { ...fallback, id: `builtin-${Date.now()}` },
        source: 'Built-in Curated Quest (Offline)',
        isFallback: true,
        providerDetails: 'Direct curated library (no model request)',
      };
    }

    // 2. If user preferred local Ollama or auto
    if (preferredProvider === 'ollama' || preferredProvider === 'auto') {
      const ollamaRes = await this.ollama.generate(duration, setting, difficulty);
      if (ollamaRes) {
        return ollamaRes;
      }
      if (preferredProvider === 'ollama') {
        // If explicitly forced Ollama but failed, fall back with explicit notation
        const fallback = findBuiltInQuest(setting, duration, difficulty);
        return {
          quest: { ...fallback, id: `fallback-${Date.now()}` },
          source: 'Built-in Curated Quest (Ollama Unreachable)',
          isFallback: true,
          providerDetails: `Local Ollama at ${process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434'} was not reachable. Served verified offline fallback quest.`,
        };
      }
    }

    // 3. If user preferred hosted or auto after Ollama failed
    if (preferredProvider === 'hosted' || preferredProvider === 'auto') {
      if (this.hosted.isConfigured()) {
        const hostedRes = await this.hosted.generate(duration, setting, difficulty);
        if (hostedRes) {
          return hostedRes;
        }
      }
    }

    // 4. Default graceful fallback
    const fallback = findBuiltInQuest(setting, duration, difficulty);
    return {
      quest: { ...fallback, id: `fallback-${Date.now()}` },
      source: 'Built-in Curated Quest (Offline Fallback)',
      isFallback: true,
      providerDetails: 'No active Gemma inference server detected. Served verified offline nature quest from built-in library.',
    };
  }
}
