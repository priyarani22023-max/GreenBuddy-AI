import React from 'react';
import { UserProgress } from '../types/quest';
import { CheckCircle2, Clock, Flame, Award } from 'lucide-react';
import { BADGES } from '../data/badges';

interface DashboardStatsProps {
  progress: UserProgress;
  onViewBadges: () => void;
  onViewHistory: () => void;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  progress,
  onViewBadges,
  onViewHistory,
}) => {
  const completedCount = progress.completedQuests.length;
  const totalMinutes = progress.totalOutdoorMinutes;
  const streak = progress.currentStreak;
  const earnedBadgesCount = progress.earnedBadgeIds.length;
  const totalBadgesCount = BADGES.length;

  const hours = Math.floor(totalMinutes / 60);
  const remainingMins = totalMinutes % 60;
  const timeFormatted = hours > 0 ? `${hours}h ${remainingMins}m` : `${totalMinutes}m`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Quests Completed */}
        <div
          onClick={onViewHistory}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onViewHistory()}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs hover:border-[#2D5A27]/40 hover:shadow-sm transition cursor-pointer group focus-visible:outline-2 focus-visible:outline-[#2D5A27]"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Completed
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#EAF2E8] flex items-center justify-center text-[#2D5A27] group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-['Fraunces',serif]">
              {completedCount}
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              {completedCount === 1 ? 'Nature quest finished' : 'Nature quests finished'}
            </p>
          </div>
        </div>

        {/* Outdoor Minutes */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Fresh Air Time
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-['Fraunces',serif]">
              {timeFormatted}
            </div>
            <p className="text-xs text-stone-500 mt-0.5">Self-reported outdoor time</p>
          </div>
        </div>

        {/* Current Streak */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Day Streak
            </span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-['Fraunces',serif]">
              {streak} {streak === 1 ? 'Day' : 'Days'}
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              {streak > 0 ? 'Consecutive days outdoors' : 'Step out today to start'}
            </p>
          </div>
        </div>

        {/* Badges Earned */}
        <div
          onClick={onViewBadges}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onViewBadges()}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs hover:border-[#2D5A27]/40 hover:shadow-sm transition cursor-pointer group focus-visible:outline-2 focus-visible:outline-[#2D5A27]"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Achievements
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#EAF2E8] flex items-center justify-center text-[#2D5A27] group-hover:scale-105 transition-transform">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-['Fraunces',serif]">
              {earnedBadgesCount} / {totalBadgesCount}
            </div>
            <p className="text-xs text-stone-500 mt-0.5">Badges unlocked so far</p>
          </div>
        </div>
      </div>
    </div>
  );
};
