import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DashboardStats } from './components/DashboardStats';
import { QuestGenerator } from './components/QuestGenerator';
import { ActiveQuestCard } from './components/ActiveQuestCard';
import { OutdoorTimerModal } from './components/OutdoorTimerModal';
import { QuestCompletionModal } from './components/QuestCompletionModal';
import { BadgesSection } from './components/BadgesSection';
import { QuestHistorySection } from './components/QuestHistorySection';
import { HealthDrawer } from './components/HealthDrawer';
import { AboutSection } from './components/AboutSection';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { useProgress } from './hooks/useProgress';
import { useAIHealth } from './hooks/useAIHealth';
import { Quest, Badge } from './types/quest';
import { BUILT_IN_QUESTS } from './data/builtInQuests';
import { Leaf, Sparkles, Compass, Footprints, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'quests' | 'progress' | 'about'>('home');
  const [activeQuest, setActiveQuest] = useState<Quest | null>(BUILT_IN_QUESTS[2]); // Initial 15 min Leaf Explorer
  const [isGenerating, setIsGenerating] = useState(false);
  const [isHealthDrawerOpen, setIsHealthDrawerOpen] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [timerElapsedMinutes, setTimerElapsedMinutes] = useState<number | undefined>(undefined);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  const { progress, completeQuest, resetProgress } = useProgress();
  const { health, loading: healthLoading, refreshHealth } = useAIHealth();

  const handleQuestGenerated = (quest: Quest, _source: string, _isFallback: boolean) => {
    setActiveQuest(quest);
    // Smooth scroll down to the active quest card
    setTimeout(() => {
      const el = document.getElementById('active-quest-container');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleStartTimer = (quest: Quest) => {
    setActiveQuest(quest);
    setIsTimerOpen(true);
  };

  const handleTimerComplete = (actualMinutes: number) => {
    setIsTimerOpen(false);
    setTimerElapsedMinutes(actualMinutes);
    setIsCompleteModalOpen(true);
  };

  const handleOpenCompleteModal = (quest: Quest) => {
    setActiveQuest(quest);
    setTimerElapsedMinutes(quest.duration);
    setIsCompleteModalOpen(true);
  };

  const handleRecordQuest = (actualMinutes: number, notes?: string): Badge[] => {
    if (!activeQuest) return [];
    return completeQuest(activeQuest, actualMinutes, notes);
  };

  // Check if active quest was already completed today
  const todayStr = new Date().toISOString().split('T')[0];
  const isCompletedToday = Boolean(
    activeQuest &&
      progress.completedQuests.some(
        (q) =>
          q.questTitle === activeQuest.title &&
          q.completedAt.startsWith(todayStr)
      )
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF6] text-[#1E2E1D]">
      {/* Offline Toast */}
      <OfflineIndicator />

      {/* Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        health={health}
        onOpenHealthDrawer={() => setIsHealthDrawerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* TAB 1: HOME */}
        {currentTab === 'home' && (
          <div className="space-y-10">
            {/* Hero Section */}
            <Hero
              onStartQuest={() => {
                const el = document.getElementById('quest-generator-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setCurrentTab('quests');
              }}
              onExploreOffline={() => setCurrentTab('quests')}
            />

            {/* Dashboard Summary Cards */}
            <DashboardStats
              progress={progress}
              onViewBadges={() => setCurrentTab('progress')}
              onViewHistory={() => setCurrentTab('progress')}
            />

            {/* Quests Container */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
              {/* Quest Generator */}
              <QuestGenerator
                onQuestGenerated={handleQuestGenerated}
                isLoading={isGenerating}
                setIsLoading={setIsGenerating}
              />

              {/* Active Quest Presentation */}
              {activeQuest && (
                <div id="active-quest-container" className="scroll-mt-24 space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                      Your Selected Nature Adventure
                    </span>
                    <span className="text-xs text-stone-500">
                      Step outside once you have read the steps below
                    </span>
                  </div>
                  <ActiveQuestCard
                    quest={activeQuest}
                    isCompletedToday={isCompletedToday}
                    onStartTimer={handleStartTimer}
                    onOpenCompleteModal={handleOpenCompleteModal}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: NATURE QUESTS */}
        {currentTab === 'quests' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-extrabold font-['Fraunces',serif] text-stone-900">
                Nature Quests
              </h1>
              <p className="text-sm text-stone-600 mt-1">
                Generate dynamic activities using Gemma AI or select from our curated offline library.
              </p>
            </div>

            {/* Generator Form */}
            <QuestGenerator
              onQuestGenerated={handleQuestGenerated}
              isLoading={isGenerating}
              setIsLoading={setIsGenerating}
            />

            {/* Active Quest Presentation */}
            {activeQuest && (
              <div id="active-quest-container" className="scroll-mt-24 space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    Active Nature Quest
                  </span>
                </div>
                <ActiveQuestCard
                  quest={activeQuest}
                  isCompletedToday={isCompletedToday}
                  onStartTimer={handleStartTimer}
                  onOpenCompleteModal={handleOpenCompleteModal}
                />
              </div>
            )}

            {/* Quick Offline Inspiration Cards */}
            <div className="pt-6 border-t border-stone-200/80">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold font-['Fraunces',serif] text-stone-900">
                    Quick Offline Curated Picks
                  </h3>
                  <p className="text-xs text-stone-500">
                    Instant activities ready right now without any model inference delay.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {BUILT_IN_QUESTS.slice(0, 6).map((q) => (
                  <div
                    key={q.id}
                    onClick={() => {
                      setActiveQuest(q);
                      const el = document.getElementById('active-quest-container');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`p-4 rounded-2xl border transition cursor-pointer ${
                      activeQuest?.id === q.id
                        ? 'bg-[#F2F7F0] border-[#2D5A27] shadow-xs'
                        : 'bg-white border-stone-200/80 hover:border-stone-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="capitalize font-semibold text-stone-700">{q.setting}</span>
                      <span>{q.duration} mins</span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-900 mt-2 font-['Fraunces',serif]">
                      {q.title}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                      {q.description}
                    </p>
                    <div className="mt-3 text-[11px] font-semibold text-[#2D5A27] flex items-center gap-1">
                      <span>Select Activity</span>
                      <span>→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MY PROGRESS */}
        {currentTab === 'progress' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-extrabold font-['Fraunces',serif] text-stone-900">
                My Outdoor Journey
              </h1>
              <p className="text-sm text-stone-600 mt-1">
                Self-reported fresh air statistics, streak records, and unlocked nature badges.
              </p>
            </div>

            {/* Dashboard Summary Cards */}
            <DashboardStats
              progress={progress}
              onViewBadges={() => {}}
              onViewHistory={() => {}}
            />

            {/* Badges Grid */}
            <BadgesSection progress={progress} />

            {/* History Log */}
            <QuestHistorySection
              progress={progress}
              onOpenResetDialog={() => setIsResetDialogOpen(true)}
            />
          </div>
        )}

        {/* TAB 4: ABOUT & HACKTOBERFEST */}
        {currentTab === 'about' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
            <AboutSection />
          </div>
        )}
      </main>

      {/* Modals & Dialogs */}
      {isTimerOpen && activeQuest && (
        <OutdoorTimerModal
          quest={activeQuest}
          onClose={() => setIsTimerOpen(false)}
          onComplete={handleTimerComplete}
        />
      )}

      {isCompleteModalOpen && activeQuest && (
        <QuestCompletionModal
          quest={activeQuest}
          initialMinutes={timerElapsedMinutes}
          onClose={() => {
            setIsCompleteModalOpen(false);
            setTimerElapsedMinutes(undefined);
          }}
          onSubmit={handleRecordQuest}
        />
      )}

      <HealthDrawer
        isOpen={isHealthDrawerOpen}
        onClose={() => setIsHealthDrawerOpen(false)}
        health={health}
        loading={healthLoading}
        onRefresh={refreshHealth}
      />

      <ResetConfirmModal
        isOpen={isResetDialogOpen}
        onClose={() => setIsResetDialogOpen(false)}
        onConfirm={resetProgress}
      />

      {/* Minimal Nature Footer */}
      <footer className="border-t border-[#2D5A27]/10 bg-white/60 py-8 px-4 text-center text-xs text-stone-500">
        <div className="max-w-6xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-1.5 font-bold text-stone-700">
            <Leaf className="w-4 h-4 text-[#2D5A27]" />
            <span>GreenBuddy AI — Hacktoberfest 2026 “Touch Grass” Challenge</span>
          </div>
          <p className="text-[11px] text-stone-500">
            Powered by open-weight Gemma 3 · 100% Client-Side Privacy & Self-Reported Metrics · Apache-2.0 License
          </p>
        </div>
      </footer>
    </div>
  );
}
