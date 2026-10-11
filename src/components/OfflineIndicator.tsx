import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-700/95 px-3.5 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-xs border border-amber-600/40 animate-fade-in">
      <WifiOff className="w-3.5 h-3.5 text-amber-200" />
      <span>Offline Mode — Cached assets & built-in quests active.</span>
    </div>
  );
};
