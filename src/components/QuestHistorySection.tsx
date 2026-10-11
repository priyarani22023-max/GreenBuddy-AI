import React, { useState } from 'react';
import { UserProgress, Setting } from '../types/quest';
import {
  Calendar,
  Clock,
  Trash2,
  BookOpen,
  Flower2,
  Trees,
  Home,
  Footprints,
  Shield,
  Sparkles,
} from 'lucide-react';

interface QuestHistorySectionProps {
  progress: UserProgress;
  onOpenResetDialog: () => void;
}

export const QuestHistorySection: React.FC<QuestHistorySectionProps> = ({
  progress,
  onOpenResetDialog,
}) => {
  const [selectedSetting, setSelectedSetting] = useState<Setting | 'all'>('all');

  const filtered = progress.completedQuests.filter((item) => {
    if (selectedSetting === 'all') return true;
    return item.setting === selectedSetting;
  });

  const getSettingIcon = (setting: Setting) => {
    switch (setting) {
      case 'garden':
        return Flower2;
      case 'park':
        return Trees;
      case 'balcony':
        return Home;
      case 'neighborhood':
        return Footprints;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-100">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold font-['Fraunces',serif] text-stone-900">
            Completed Quest Log
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Your personal outdoor journey journal saved locally in your browser.
          </p>
        </div>

        {progress.completedQuests.length > 0 && (
          <button
            onClick={onOpenResetDialog}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 text-xs font-semibold text-red-700 hover:bg-red-50 transition self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Progress</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
        <button
          onClick={() => setSelectedSetting('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            selectedSetting === 'all'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          All ({progress.completedQuests.length})
        </button>
        <button
          onClick={() => setSelectedSetting('garden')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            selectedSetting === 'garden'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Garden
        </button>
        <button
          onClick={() => setSelectedSetting('park')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            selectedSetting === 'park'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Park
        </button>
        <button
          onClick={() => setSelectedSetting('balcony')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            selectedSetting === 'balcony'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Balcony
        </button>
        <button
          onClick={() => setSelectedSetting('neighborhood')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            selectedSetting === 'neighborhood'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Neighborhood
        </button>
      </div>

      {/* Quest List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-2xl bg-stone-50 border border-stone-200/60">
          <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-stone-700">No quests recorded yet</h4>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Choose an activity above, step outside for a few minutes, and come back to log your outdoor time!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => {
            const Icon = getSettingIcon(item.setting);
            const dateStr = new Date(item.completedAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-stone-50/60 border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF2E8] text-[#2D5A27] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">{item.questTitle}</h4>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mt-0.5">
                      <span className="capitalize">{item.setting}</span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.actualMinutesLogged} mins outside
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {dateStr}
                      </span>
                    </div>

                    {item.notes && (
                      <p className="mt-2 text-xs text-stone-700 bg-white p-2.5 rounded-xl border border-stone-200/60 italic">
                        "{item.notes}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="self-end sm:self-center text-right shrink-0">
                  <span className="text-[11px] font-medium text-stone-400 bg-white px-2 py-1 rounded-md border border-stone-200">
                    {item.source}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Privacy Notice */}
      <div className="p-4 rounded-2xl bg-[#F2F7F0]/60 border border-[#2D5A27]/20 flex items-start gap-3">
        <Shield className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
        <p className="text-xs text-stone-600 leading-relaxed">
          <strong>Privacy Note:</strong> All outdoor minutes and reflections are self-reported and saved directly in your browser's local storage. GreenBuddy AI never requests GPS location, background tracking, or user logins.
        </p>
      </div>
    </div>
  );
};
