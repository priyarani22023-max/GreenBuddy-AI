import React, { useState } from 'react';
import { Setting, Difficulty, Quest } from '../types/quest';
import { findBuiltInQuest } from '../data/builtInQuests';
import { Clock, Trees, Home, Flower2, Footprints, Sparkles, Loader2, AlertCircle } from 'lucide-react';

interface QuestGeneratorProps {
  onQuestGenerated: (quest: Quest, source: string, isFallback: boolean) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}

export const QuestGenerator: React.FC<QuestGeneratorProps> = ({
  onQuestGenerated,
  isLoading,
  setIsLoading,
}) => {
  const [duration, setDuration] = useState<number>(15);
  const [setting, setSetting] = useState<Setting>('garden');
  const [difficulty, setDifficulty] = useState<Difficulty>('Easy');
  const [providerPref, setProviderPref] = useState<'auto' | 'ollama' | 'hosted' | 'builtin'>('auto');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const durationOptions = [5, 10, 15, 20, 30, 60];

  const settingOptions: Array<{
    id: Setting;
    name: string;
    description: string;
    icon: React.ElementType;
  }> = [
    {
      id: 'garden',
      name: 'Garden',
      description: 'Flowerbeds, patches, soil, backyard flora',
      icon: Flower2,
    },
    {
      id: 'park',
      name: 'Park',
      description: 'Meadows, mature trees, nature trails',
      icon: Trees,
    },
    {
      id: 'balcony',
      name: 'Balcony',
      description: 'Potted plants, sky viewing, outdoor perches',
      icon: Home,
    },
    {
      id: 'neighborhood',
      name: 'Neighborhood',
      description: 'Tree-lined sidewalks, street botany, quiet streets',
      icon: Footprints,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      // If user chose strictly built-in, skip network
      if (providerPref === 'builtin') {
        const localQuest = findBuiltInQuest(setting, duration, difficulty);
        onQuestGenerated(
          {
            ...localQuest,
            id: `builtin-${Date.now()}`,
          },
          'Built-in Curated Quest (Offline)',
          true
        );
        setIsLoading(false);
        return;
      }

      // Send to backend endpoint POST /api/quest
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 26000);

      const res = await fetch('/api/quest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          duration,
          setting,
          difficulty,
          preferredProvider: providerPref,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();
      if (!data.quest) {
        throw new Error('Invalid quest response payload');
      }

      onQuestGenerated(data.quest, data.source || 'Gemma AI', Boolean(data.isFallback));
    } catch (err: any) {
      console.warn('Backend quest generation unavailable, falling back to client-side library:', err);
      // Offline fallback: Serve built-in quest safely
      const localQuest = findBuiltInQuest(setting, duration, difficulty);
      onQuestGenerated(
        {
          ...localQuest,
          id: `offline-fallback-${Date.now()}`,
        },
        'Built-in Curated Quest (Offline Fallback)',
        true
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="quest-generator-section" className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-stone-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-['Fraunces',serif]">
            Generate Your Nature Quest
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Personalized by open-weight Gemma AI or our offline-certified nature library.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-stone-500 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200/60 self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-[#2D5A27]" />
          <span>Screen-Free Guarantee</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* 1. Available Time */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5">
            1. Available Time (Minutes)
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {durationOptions.map((mins) => {
              const active = duration === mins;
              return (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setDuration(mins)}
                  className={`py-3 px-2 rounded-xl text-center text-xs font-semibold transition-all border ${
                    active
                      ? 'bg-[#2D5A27] text-white border-[#2D5A27] shadow-xs'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100/80 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3 opacity-75" />
                    <span>{mins}m</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Environment / Setting */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5">
            2. Choose Your Nature Setting
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {settingOptions.map((opt) => {
              const active = setting === opt.id;
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSetting(opt.id)}
                  className={`text-left p-4 rounded-2xl border transition-all ${
                    active
                      ? 'bg-[#F2F7F0] border-[#2D5A27] ring-1 ring-[#2D5A27] shadow-xs'
                      : 'bg-stone-50/60 border-stone-200 hover:bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        active ? 'bg-[#2D5A27] text-white' : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-stone-900">{opt.name}</div>
                      <div className="text-[11px] text-stone-500 line-clamp-1">{opt.description}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Difficulty & AI Provider preference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              3. Difficulty Level
            </label>
            <div className="flex items-center gap-2">
              {(['Easy', 'Medium'] as Difficulty[]).map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setDifficulty(diff)}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold border transition ${
                    difficulty === diff
                      ? 'bg-[#2D5A27] text-white border-[#2D5A27]'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              4. AI Provider Preference
            </label>
            <select
              value={providerPref}
              onChange={(e) => setProviderPref(e.target.value as any)}
              className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold bg-stone-50 border border-stone-200 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]/20 focus:border-[#2D5A27]"
            >
              <option value="auto">Auto (Gemma AI with verified fallback)</option>
              <option value="ollama">Force Local Gemma (Ollama at 127.0.0.1:11434)</option>
              <option value="hosted">Force Hosted Gemma Inference Endpoint</option>
              <option value="builtin">Built-in Nature Quests (Strictly Offline)</option>
            </select>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-xl bg-[#2D5A27] text-white text-sm font-bold shadow-md shadow-[#2D5A27]/20 hover:bg-[#23471f] hover:shadow-lg transition active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Crafting Your Nature Adventure with Gemma...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Nature Quest</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
