import React, { useState } from 'react';
import { Badge, UserProgress } from '../types/quest';
import { BADGES } from '../data/badges';
import {
  Award,
  Lock,
  CheckCircle2,
  Sprout,
  Compass,
  HeartHandshake,
  Sun,
  Trees,
  Flame,
  Flower2,
  MountainSnow,
  Wind,
  Footprints,
} from 'lucide-react';

interface BadgesSectionProps {
  progress: UserProgress;
}

const ICON_MAP: Record<string, React.ElementType> = {
  sprout: Sprout,
  compass: Compass,
  'heart-handshake': HeartHandshake,
  sun: Sun,
  trees: Trees,
  flame: Flame,
  'flower-2': Flower2,
  'mountain-snow': MountainSnow,
  wind: Wind,
  footprints: Footprints,
};

export const BadgesSection: React.FC<BadgesSectionProps> = ({ progress }) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const earnedSet = new Set(progress.earnedBadgeIds);

  const filteredBadges = BADGES.filter((badge) => {
    const isEarned = earnedSet.has(badge.id);
    if (filter === 'unlocked') return isEarned;
    if (filter === 'locked') return !isEarned;
    return true;
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-100">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold font-['Fraunces',serif] text-stone-900">
            Nature Achievements & Badges
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Earned through genuine, self-reported time spent outdoors.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All ({BADGES.length})
          </button>
          <button
            onClick={() => setFilter('unlocked')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filter === 'unlocked'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Unlocked ({progress.earnedBadgeIds.length})
          </button>
          <button
            onClick={() => setFilter('locked')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filter === 'locked'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Locked ({BADGES.length - progress.earnedBadgeIds.length})
          </button>
        </div>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBadges.map((badge) => {
          const isEarned = earnedSet.has(badge.id);
          const Icon = ICON_MAP[badge.icon] || Award;

          return (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border transition-all ${
                isEarned
                  ? 'bg-[#F2F7F0]/60 border-[#2D5A27]/30 shadow-xs'
                  : 'bg-stone-50/50 border-stone-200/70 opacity-65'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                    isEarned
                      ? 'bg-[#2D5A27] text-white shadow-xs'
                      : 'bg-stone-200 text-stone-400'
                  }`}
                >
                  {isEarned ? <Icon className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-sm font-bold text-stone-900 truncate">{badge.name}</h4>
                    {isEarned && (
                      <span className="text-[10px] font-bold text-[#2D5A27] bg-[#EAF2E8] px-2 py-0.5 rounded-full shrink-0">
                        Earned
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                  <div className="text-[11px] text-stone-400 font-medium mt-2 pt-2 border-t border-stone-200/50">
                    Target: {badge.criteria}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
