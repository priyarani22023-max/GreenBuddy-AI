import React, { useState } from 'react';
import { Quest } from '../types/quest';
import {
  Clock,
  ShieldCheck,
  Check,
  Play,
  CheckCircle2,
  Cpu,
  Share2,
  Bookmark,
  Sparkles,
  Info,
} from 'lucide-react';

interface ActiveQuestCardProps {
  quest: Quest;
  isCompletedToday: boolean;
  onStartTimer: (quest: Quest) => void;
  onOpenCompleteModal: (quest: Quest) => void;
}

export const ActiveQuestCard: React.FC<ActiveQuestCardProps> = ({
  quest,
  isCompletedToday,
  onStartTimer,
  onOpenCompleteModal,
}) => {
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  const toggleStep = (idx: number) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleShare = async () => {
    const text = `🌿 Nature Quest: ${quest.title}\n${quest.description}\nTime: ${quest.duration} mins\nSafety: ${quest.tip}\nPowered by GreenBuddy AI (Hacktoberfest 2026 Touch Grass)`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `GreenBuddy Quest: ${quest.title}`,
          text,
        });
      } catch (err) {
        // User cancelled or unsupported
      }
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Determine provider pill style
  const isOllama = quest.source.toLowerCase().includes('ollama');
  const isHosted = quest.source.toLowerCase().includes('hosted');
  const isBuiltIn = quest.source.toLowerCase().includes('built-in') || quest.source.toLowerCase().includes('fallback');

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#2D5A27]/20 shadow-md">
      {/* Top Banner: Unboxed Metadata & Provider Source */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-stone-100">
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 font-medium">
          <span className="capitalize text-stone-700 font-bold">{quest.setting}</span>
          <span aria-hidden="true">·</span>
          <span>{quest.duration} min duration</span>
          <span aria-hidden="true">·</span>
          <span>{quest.difficulty}</span>
        </div>

        {/* Source Badge */}
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
            isOllama
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : isHosted
              ? 'bg-teal-50 text-teal-800 border border-teal-200'
              : 'bg-amber-50 text-amber-800 border border-amber-200'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Source: {quest.source}</span>
        </div>
      </div>

      {/* Main Quest Content */}
      <div className="mt-5 space-y-4">
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-['Fraunces',serif] tracking-tight">
            {quest.title}
          </h3>
          <p className="mt-2 text-sm sm:text-base text-stone-600 leading-relaxed font-['Plus_Jakarta_Sans',sans-serif]">
            {quest.description}
          </p>
        </div>

        {/* Actionable Steps */}
        <div className="pt-2">
          <div className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">
            Actionable Outdoor Steps
          </div>
          <div className="space-y-2.5">
            {quest.steps.map((step, idx) => {
              const isChecked = Boolean(checkedSteps[idx]);
              return (
                <div
                  key={idx}
                  onClick={() => toggleStep(idx)}
                  className={`flex items-start gap-3 p-3.5 rounded-2xl border transition cursor-pointer select-none ${
                    isChecked
                      ? 'bg-[#F2F7F0] border-[#2D5A27]/30 text-stone-500'
                      : 'bg-stone-50/70 border-stone-200/80 hover:bg-stone-100/70 text-stone-800'
                  }`}
                >
                  <div
                    className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isChecked
                        ? 'bg-[#2D5A27] text-white'
                        : 'border border-stone-300 bg-white text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div className={`text-xs sm:text-sm font-medium leading-snug ${isChecked ? 'line-through opacity-80' : ''}`}>
                    {step}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Safety & Care Tip */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-stone-800 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <span className="font-bold text-amber-900">Safety & Environmental Tip: </span>
            <span className="text-stone-700">{quest.tip}</span>
          </div>
        </div>

        {/* Model Transparency Note */}
        {isBuiltIn && (
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-500 flex items-center gap-2">
            <Info className="w-4 h-4 text-stone-400 shrink-0" />
            <span>
              This activity was drawn directly from our verified offline nature library. No internet or active local AI server was required.
            </span>
          </div>
        )}

        {/* Actions Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
          {/* Start Quest Outdoor Timer */}
          <button
            onClick={() => onStartTimer(quest)}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#2D5A27] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#2D5A27]/20 hover:bg-[#23471f] transition flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Outdoor Quest</span>
          </button>

          {/* Complete Quest Button */}
          <button
            onClick={() => onOpenCompleteModal(quest)}
            disabled={isCompletedToday}
            className={`w-full sm:flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border transition flex items-center justify-center gap-2 ${
              isCompletedToday
                ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed'
                : 'bg-white text-[#2D5A27] border-[#2D5A27] hover:bg-[#F2F7F0]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompletedToday ? 'Completed Today' : 'Mark as Completed'}</span>
          </button>

          {/* Share button */}
          <button
            onClick={handleShare}
            className="w-full sm:w-auto p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition flex items-center justify-center gap-1.5 text-xs font-semibold"
            title="Share or copy quest text"
          >
            <Share2 className="w-4 h-4" />
            <span className="sm:hidden">{copied ? 'Copied!' : 'Share Quest'}</span>
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
