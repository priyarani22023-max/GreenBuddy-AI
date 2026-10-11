import React, { useState } from 'react';
import { PWAInstallButton } from './PWAInstallButton';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { HealthResponse } from '../types/quest';
import { Wifi, WifiOff, Cpu, Menu, X, CheckCircle2, AlertTriangle } from 'lucide-react';

interface HeaderProps {
  currentTab: 'home' | 'quests' | 'progress' | 'about';
  onSelectTab: (tab: 'home' | 'quests' | 'progress' | 'about') => void;
  health: HealthResponse | null;
  onOpenHealthDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  health,
  onOpenHealthDrawer,
}) => {
  const isOnline = useOnlineStatus();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getProviderBadge = () => {
    if (!health) {
      return {
        label: 'Checking AI...',
        color: 'text-stone-500 bg-stone-100',
        dot: 'bg-stone-400',
      };
    }
    if (health.activeProvider === 'ollama') {
      return {
        label: 'Gemma 3 (Ollama Local)',
        color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
        dot: 'bg-emerald-500',
      };
    }
    if (health.activeProvider === 'hosted') {
      return {
        label: `Gemma (${health.hosted.model || 'Hosted'})`,
        color: 'text-teal-800 bg-teal-50 border-teal-200',
        dot: 'bg-teal-500',
      };
    }
    return {
      label: 'Offline Fallback Quests',
      color: 'text-amber-800 bg-amber-50 border-amber-200',
      dot: 'bg-amber-500',
    };
  };

  const providerBadge = getProviderBadge();

  const handleNavClick = (tab: 'home' | 'quests' | 'progress' | 'about') => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8FAF6]/90 backdrop-blur-md border-b border-[#2D5A27]/10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group focus-visible:outline-2 focus-visible:outline-[#2D5A27] rounded-lg p-1 -ml-1"
        >
          <img
            src="/leaf-icon.svg"
            alt="GreenBuddy AI leaf"
            className="w-8 h-8 rounded-full shadow-xs group-hover:scale-105 transition-transform duration-200"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-stone-900 text-base tracking-tight font-['Fraunces',serif]">
                GreenBuddy<span className="text-[#2D5A27]"> AI</span>
              </span>
            </div>
            <p className="text-[10px] text-stone-500 font-medium -mt-1 hidden sm:block">
              Your Offline Nature Companion
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-stone-600">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              currentTab === 'home'
                ? 'text-[#2D5A27] bg-[#EAF2E8] font-semibold'
                : 'hover:text-stone-900 hover:bg-stone-100/60'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('quests')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              currentTab === 'quests'
                ? 'text-[#2D5A27] bg-[#EAF2E8] font-semibold'
                : 'hover:text-stone-900 hover:bg-stone-100/60'
            }`}
          >
            Nature Quests
          </button>
          <button
            onClick={() => handleNavClick('progress')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              currentTab === 'progress'
                ? 'text-[#2D5A27] bg-[#EAF2E8] font-semibold'
                : 'hover:text-stone-900 hover:bg-stone-100/60'
            }`}
          >
            My Progress
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              currentTab === 'about'
                ? 'text-[#2D5A27] bg-[#EAF2E8] font-semibold'
                : 'hover:text-stone-900 hover:bg-stone-100/60'
            }`}
          >
            About & Hacktoberfest
          </button>
        </nav>

        {/* Action controls & status */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Provider Status Pill Button */}
          <button
            onClick={onOpenHealthDrawer}
            title="Click to view AI Runtime & Model status details"
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors hover:shadow-xs ${providerBadge.color}`}
          >
            <span className={`w-2 h-2 rounded-full ${providerBadge.dot} animate-pulse`} />
            <Cpu className="w-3.5 h-3.5 opacity-75 hidden sm:inline" />
            <span className="truncate max-w-[130px] sm:max-w-[170px]">{providerBadge.label}</span>
          </button>

          {/* Network Online / Offline Status */}
          <div
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md ${
              isOnline ? 'text-stone-500' : 'text-amber-800 bg-amber-100/80 font-medium'
            }`}
            title={isOnline ? 'Device is online' : 'Device is offline'}
          >
            {isOnline ? (
              <Wifi className="w-3.5 h-3.5 text-stone-400" />
            ) : (
              <WifiOff className="w-3.5 h-3.5 text-amber-700" />
            )}
            <span className="hidden lg:inline">{isOnline ? 'Online' : 'Offline'}</span>
          </div>

          {/* PWA Install Button */}
          <PWAInstallButton />

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-[#2D5A27]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200/80 bg-[#FAFBF9] px-4 pt-2 pb-4 space-y-1">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'home' ? 'bg-[#EAF2E8] text-[#2D5A27]' : 'text-stone-700'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('quests')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'quests' ? 'bg-[#EAF2E8] text-[#2D5A27]' : 'text-stone-700'
            }`}
          >
            Nature Quests
          </button>
          <button
            onClick={() => handleNavClick('progress')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'progress' ? 'bg-[#EAF2E8] text-[#2D5A27]' : 'text-stone-700'
            }`}
          >
            My Progress
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'about' ? 'bg-[#EAF2E8] text-[#2D5A27]' : 'text-stone-700'
            }`}
          >
            About & Hacktoberfest
          </button>
        </div>
      )}
    </header>
  );
};
