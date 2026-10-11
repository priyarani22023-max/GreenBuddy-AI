import { useState, useEffect, useCallback } from 'react';
import { UserProgress, Quest, Badge, CompletedQuestRecord } from '../types/quest';
import { BADGES, evaluateEarnedBadges } from '../data/badges';

const STORAGE_KEY = 'greenbuddy_progress_v1';

function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getYesterdayDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return getLocalDateString(d);
}

const DEFAULT_PROGRESS: UserProgress = {
  completedQuests: [],
  totalOutdoorMinutes: 0,
  currentStreak: 0,
  lastActiveDate: null,
  earnedBadgeIds: [],
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading progress from localStorage:', e);
    }
    return DEFAULT_PROGRESS;
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Error writing progress to localStorage:', e);
    }
  }, [progress]);

  const completeQuest = useCallback(
    (quest: Quest, actualMinutes: number, notes?: string): Badge[] => {
      const today = getLocalDateString();
      const yesterday = getYesterdayDateString();

      let newStreak = progress.currentStreak;
      if (!progress.lastActiveDate) {
        newStreak = 1;
      } else if (progress.lastActiveDate === today) {
        // Already active today; streak remains current
        newStreak = Math.max(1, progress.currentStreak);
      } else if (progress.lastActiveDate === yesterday) {
        // Consecutive day
        newStreak = progress.currentStreak + 1;
      } else {
        // Streak broken
        newStreak = 1;
      }

      const newRecord: CompletedQuestRecord = {
        id: `rec-${Date.now()}`,
        questTitle: quest.title,
        setting: quest.setting,
        durationMinutes: quest.duration,
        actualMinutesLogged: Math.max(1, actualMinutes),
        completedAt: new Date().toISOString(),
        notes: notes?.trim() || undefined,
        source: quest.source,
      };

      const updatedQuests = [newRecord, ...progress.completedQuests];
      const updatedMinutes = progress.totalOutdoorMinutes + Math.max(1, actualMinutes);

      const candidateProgress: UserProgress = {
        completedQuests: updatedQuests,
        totalOutdoorMinutes: updatedMinutes,
        currentStreak: newStreak,
        lastActiveDate: today,
        earnedBadgeIds: progress.earnedBadgeIds,
      };

      const newBadgeIds = evaluateEarnedBadges(candidateProgress);
      const newlyUnlockedIds = newBadgeIds.filter((id) => !progress.earnedBadgeIds.includes(id));
      const newlyUnlockedBadges = BADGES.filter((b) => newlyUnlockedIds.includes(b.id));

      candidateProgress.earnedBadgeIds = newBadgeIds;
      setProgress(candidateProgress);

      return newlyUnlockedBadges;
    },
    [progress]
  );

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Error clearing localStorage:', e);
    }
  }, []);

  return {
    progress,
    completeQuest,
    resetProgress,
  };
}
