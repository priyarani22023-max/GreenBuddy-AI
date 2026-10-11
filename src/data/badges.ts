import { Badge, UserProgress } from '../types/quest';

export const BADGES: Badge[] = [
  {
    id: 'badge-first-steps',
    name: 'First Steps',
    description: 'Stepped outside and completed your very first nature quest.',
    icon: 'sprout',
    criteria: 'Complete 1 quest',
    category: 'quests',
  },
  {
    id: 'badge-nature-explorer',
    name: 'Nature Explorer',
    description: 'Deepened your connection to the outdoor world with 5 completed quests.',
    icon: 'compass',
    criteria: 'Complete 5 quests',
    category: 'quests',
  },
  {
    id: 'badge-earth-friend',
    name: 'Earth Friend',
    description: 'A true advocate for living ecosystems with 10 quests finished.',
    icon: 'heart-handshake',
    criteria: 'Complete 10 quests',
    category: 'quests',
  },
  {
    id: 'badge-outside-champion',
    name: 'Outside Champion',
    description: 'Invested over an hour in genuine, screen-free fresh air.',
    icon: 'sun',
    criteria: 'Record 60 outdoor minutes',
    category: 'time',
  },
  {
    id: 'badge-century-naturalist',
    name: 'Century Naturalist',
    description: 'Accumulated over 100 minutes of mindful outdoor observation.',
    icon: 'trees',
    criteria: 'Record 100 outdoor minutes',
    category: 'time',
  },
  {
    id: 'badge-daily-streak',
    name: 'Daily Sprout',
    description: 'Maintained a daily nature habit for 3 consecutive days.',
    icon: 'flame',
    criteria: 'Achieve a 3-day outdoor streak',
    category: 'streak',
  },
  {
    id: 'badge-garden-guru',
    name: 'Garden Guru',
    description: 'Observed the quiet biodiversity of gardens and flowerbeds.',
    icon: 'flower-2',
    criteria: 'Complete 3 garden quests',
    category: 'exploration',
  },
  {
    id: 'badge-park-ranger',
    name: 'Park Ranger',
    description: 'Explored groves, trails, and open park spaces.',
    icon: 'mountain-snow',
    criteria: 'Complete 3 park quests',
    category: 'exploration',
  },
  {
    id: 'badge-balcony-botanist',
    name: 'Balcony Botanist',
    description: 'Discovered the beauty of skies, containers, and breezes from home.',
    icon: 'wind',
    criteria: 'Complete 2 balcony quests',
    category: 'exploration',
  },
  {
    id: 'badge-neighborhood-scout',
    name: 'Neighborhood Scout',
    description: 'Spotted urban nature flourishing on suburban blocks and sidewalk seams.',
    icon: 'footprints',
    criteria: 'Complete 2 neighborhood quests',
    category: 'exploration',
  },
];

export function evaluateEarnedBadges(progress: UserProgress): string[] {
  const earned = new Set<string>(progress.earnedBadgeIds);

  const completedCount = progress.completedQuests.length;
  const totalMinutes = progress.totalOutdoorMinutes;
  const streak = progress.currentStreak;

  // Quests count
  if (completedCount >= 1) earned.add('badge-first-steps');
  if (completedCount >= 5) earned.add('badge-nature-explorer');
  if (completedCount >= 10) earned.add('badge-earth-friend');

  // Minutes
  if (totalMinutes >= 60) earned.add('badge-outside-champion');
  if (totalMinutes >= 100) earned.add('badge-century-naturalist');

  // Streak
  if (streak >= 3) earned.add('badge-daily-streak');

  // Setting specific counts
  const gardenCount = progress.completedQuests.filter((q) => q.setting === 'garden').length;
  const parkCount = progress.completedQuests.filter((q) => q.setting === 'park').length;
  const balconyCount = progress.completedQuests.filter((q) => q.setting === 'balcony').length;
  const neighborCount = progress.completedQuests.filter((q) => q.setting === 'neighborhood').length;

  if (gardenCount >= 3) earned.add('badge-garden-guru');
  if (parkCount >= 3) earned.add('badge-park-ranger');
  if (balconyCount >= 2) earned.add('badge-balcony-botanist');
  if (neighborCount >= 2) earned.add('badge-neighborhood-scout');

  return Array.from(earned);
}
