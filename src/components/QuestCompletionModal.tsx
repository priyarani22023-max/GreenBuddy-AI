import React, { useState } from 'react';
import { Quest, Badge } from '../types/quest';
import { CheckCircle2, Sparkles, X, Award, Clock, HeartHandshake } from 'lucide-react';

interface QuestCompletionModalProps {
  quest: Quest;
  initialMinutes?: number;
  onClose: () => void;
  onSubmit: (actualMinutes: number, notes?: string) => Badge[];
}

export const QuestCompletionModal: React.FC<QuestCompletionModalProps> = ({
  quest,
  initialMinutes,
  onClose,
  onSubmit,
}) => {
  const [minutes, setMinutes] = useState<number>(initialMinutes || quest.duration);
  const [notes, setNotes] = useState<string>('');
  const [newBadges, setNewBadges] = useState<Badge[] | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const unlocked = onSubmit(minutes, notes);
    setNewBadges(unlocked);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-3xl bg-white border border-stone-200 p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* If badges were just unlocked */}
        {newBadges ? (
          <div className="text-center space-y-4 py-2">
            <div className="w-16 h-16 rounded-full bg-[#EAF2E8] text-[#2D5A27] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-bold font-['Fraunces',serif] text-stone-900">
                Quest Completed!
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                You logged {minutes} outdoor minutes for <em>{quest.title}</em>.
              </p>
            </div>

            {newBadges.length > 0 && (
              <div className="bg-[#FAFBF9] p-4 rounded-2xl border border-[#2D5A27]/20 text-left space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D5A27] uppercase tracking-wide">
                  <Sparkles className="w-4 h-4" />
                  <span>New Achievement Unlocked!</span>
                </div>
                {newBadges.map((badge) => (
                  <div key={badge.id} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-stone-100 shadow-xs">
                    <div className="w-8 h-8 rounded-lg bg-[#EAF2E8] text-[#2D5A27] flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900">{badge.name}</div>
                      <div className="text-[11px] text-stone-500">{badge.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl bg-[#2D5A27] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#2D5A27]/20 hover:bg-[#23471f] transition"
            >
              Continue Exploring
            </button>
          </div>
        ) : (
          /* Form to record minutes & reflection */
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF2E8] text-[#2D5A27] flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-['Fraunces',serif] text-stone-900">
                Record Completed Quest
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                {quest.title} · {quest.setting}
              </p>
            </div>

            {/* Self-reported minutes input */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Self-Reported Outdoor Minutes
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="360"
                  value={minutes}
                  onChange={(e) => setMinutes(Math.max(1, Number(e.target.value)))}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#2D5A27]/20 focus:border-[#2D5A27]"
                  required
                />
                <span className="text-xs text-stone-500 font-medium">Minutes outside</span>
              </div>
              <p className="text-[11px] text-stone-400 mt-1">
                Outdoor time is self-reported. We respect your privacy and never track your location.
              </p>
            </div>

            {/* Optional observation note */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Nature Observation Note (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What did you spot? E.g., Saw a yellow butterfly, felt cool wind on my skin..."
                rows={3}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]/20 focus:border-[#2D5A27]"
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl border border-stone-200 text-stone-700 text-xs sm:text-sm font-semibold hover:bg-stone-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-xl bg-[#2D5A27] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#2D5A27]/20 hover:bg-[#23471f] transition"
              >
                Save Progress
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
