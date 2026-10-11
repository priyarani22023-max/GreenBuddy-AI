export type Difficulty = 'Easy' | 'Medium';

export type Setting = 'garden' | 'park' | 'balcony' | 'neighborhood';

export interface Quest {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  setting: Setting;
  difficulty: Difficulty;
  steps: string[];
  tip: string;
  source: string;
  generatedAt?: string;
}

export interface QuestRequest {
  duration: number;
  setting: Setting;
  difficulty: Difficulty;
  preferredProvider?: 'auto' | 'ollama' | 'hosted' | 'builtin';
}

export interface QuestResponse {
  quest: Quest;
  source: string;
  isFallback?: boolean;
  providerDetails?: string;
}

export interface HealthResponse {
  status: 'healthy' | 'degraded' | 'offline';
  backend: boolean;
  activeProvider: 'ollama' | 'hosted' | 'builtin';
  ollama: {
    configuredUrl: string;
    model: string;
    reachable: boolean;
    availableModels?: string[];
    error?: string;
  };
  hosted: {
    configuredUrl?: string;
    model?: string;
    reachable: boolean;
    error?: string;
  };
  builtinCount: number;
  version: string;
  timestamp: string;
}

export interface CompletedQuestRecord {
  id: string;
  questTitle: string;
  setting: Setting;
  durationMinutes: number;
  actualMinutesLogged: number;
  completedAt: string; // ISO string
  notes?: string;
  source: string;
}

export interface UserProgress {
  completedQuests: CompletedQuestRecord[];
  totalOutdoorMinutes: number;
  currentStreak: number;
  lastActiveDate: string | null; // YYYY-MM-DD
  earnedBadgeIds: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  category: 'quests' | 'time' | 'streak' | 'exploration';
}
