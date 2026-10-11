import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { QuestManager } from './server/ai/provider';
import { Difficulty, Setting } from './src/types/quest';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const questManager = new QuestManager();

// Middleware
app.use(cors());
app.use(express.json({ limit: '512kb' }));

// Health Check Endpoint
app.get('/api/health', async (_req: Request, res: Response) => {
  try {
    const health = await questManager.getHealth();
    res.json(health);
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      backend: true,
      error: error.message || 'Health check failed',
      timestamp: new Date().toISOString(),
    });
  }
});

// Quest Generation Endpoint
app.post('/api/quest', async (req: Request, res: Response) => {
  try {
    const { duration, setting, difficulty, preferredProvider } = req.body;

    // Input Validation
    const validDurations = [5, 10, 15, 20, 30, 60];
    const validSettings: Setting[] = ['garden', 'park', 'balcony', 'neighborhood'];
    const validDifficulties: Difficulty[] = ['Easy', 'Medium'];

    const dur = Number(duration);
    if (!validDurations.includes(dur)) {
      res.status(400).json({
        error: `Invalid duration. Must be one of: ${validDurations.join(', ')} minutes.`,
      });
      return;
    }

    if (!validSettings.includes(setting)) {
      res.status(400).json({
        error: `Invalid setting. Must be one of: ${validSettings.join(', ')}.`,
      });
      return;
    }

    if (!validDifficulties.includes(difficulty)) {
      res.status(400).json({
        error: `Invalid difficulty. Must be one of: ${validDifficulties.join(', ')}.`,
      });
      return;
    }

    const providerPref = preferredProvider === 'ollama' || preferredProvider === 'hosted' || preferredProvider === 'builtin'
      ? preferredProvider
      : 'auto';

    // Generate Quest via real configured Gemma provider or verified fallback
    const result = await questManager.generateQuest(dur, setting, difficulty, providerPref);

    res.json({
      quest: result.quest,
      source: result.source,
      isFallback: result.isFallback,
      providerDetails: result.providerDetails,
    });
  } catch (error: any) {
    console.error('Error generating quest:', error);
    res.status(500).json({
      error: 'Failed to process quest request',
      message: error.message,
    });
  }
});

// Full-stack Vite handling
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌿 GreenBuddy AI server running at http://0.0.0.0:${PORT}`);
    console.log(`🌱 Mode: ${isProd ? 'Production (static dist)' : 'Development (Vite middlewares)'}`);
    console.log(`🤖 Gemma local target: ${process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434'} [${process.env.GEMMA_MODEL || 'gemma3:1b'}]`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
