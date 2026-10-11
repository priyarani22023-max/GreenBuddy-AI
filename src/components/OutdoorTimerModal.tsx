import React, { useState, useEffect } from 'react';
import { Quest } from '../types/quest';
import { Pause, Play, CheckCircle2, X, Leaf, Sun, Volume2, VolumeX } from 'lucide-react';

interface OutdoorTimerModalProps {
  quest: Quest;
  onClose: () => void;
  onComplete: (actualMinutes: number) => void;
}

export const OutdoorTimerModal: React.FC<OutdoorTimerModalProps> = ({
  quest,
  onClose,
  onComplete,
}) => {
  const targetSeconds = quest.duration * 60;
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor(secondsElapsed / 60);
  const seconds = secondsElapsed % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const progressPercent = Math.min(100, Math.round((secondsElapsed / targetSeconds) * 100));

  const handleFinish = () => {
    const recordedMinutes = Math.max(1, Math.round(secondsElapsed / 60) || quest.duration);
    onComplete(recordedMinutes);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-[#FAFBF9] border border-stone-200 p-6 sm:p-8 shadow-2xl relative text-stone-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
          aria-label="Close outdoor mode"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5F0E2] text-[#2D5A27] text-xs font-semibold">
            <Leaf className="w-3.5 h-3.5" />
            <span>Outdoor Mode Active</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-['Fraunces',serif] text-stone-900">
            {quest.title}
          </h2>
          <p className="text-xs text-stone-500">
            Pocket your phone or keep it dimmed while completing your observations.
          </p>
        </div>

        {/* Large Timer Display */}
        <div className="my-8 text-center">
          <div className="inline-block relative">
            <div className="text-5xl sm:text-6xl font-black font-mono tracking-wider text-[#2D5A27]">
              {formattedTime}
            </div>
            <div className="text-xs text-stone-400 font-medium mt-1">
              Target: {quest.duration} minutes ({progressPercent}% elapsed)
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-stone-200 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-[#2D5A27] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Concise Step Reminders */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 space-y-2 mb-6">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
            Quick Reminders
          </div>
          <ul className="space-y-1.5 text-xs text-stone-700">
            {quest.steps.slice(0, 3).map((st, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-[#EAF2E8] text-[#2D5A27] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="line-clamp-2">{st}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Timer Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex-1 py-3 px-4 rounded-xl border border-stone-300 bg-white text-stone-800 text-xs sm:text-sm font-semibold hover:bg-stone-50 transition flex items-center justify-center gap-2"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Resume</span>
              </>
            )}
          </button>

          <button
            onClick={handleFinish}
            className="flex-1 py-3 px-4 rounded-xl bg-[#2D5A27] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#2D5A27]/20 hover:bg-[#23471f] transition flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Finish & Record</span>
          </button>
        </div>
      </div>
    </div>
  );
};
