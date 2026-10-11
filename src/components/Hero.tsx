import React from 'react';
import { Compass, Sparkles, ShieldCheck, Footprints, Leaf } from 'lucide-react';

interface HeroProps {
  onStartQuest: () => void;
  onExploreOffline: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartQuest, onExploreOffline }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-[#F2F7F0] via-[#F8FAF6] to-[#F8FAF6] border-b border-[#2D5A27]/10">
      {/* Subtle organic background foliage shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#E3EFE0]/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-72 h-72 rounded-full bg-[#EBF3E8]/80 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5F0E2] text-[#2D5A27] text-xs font-semibold tracking-wide border border-[#CDE1C8]">
              <Leaf className="w-3.5 h-3.5" />
              <span>Hacktoberfest 2026 “Touch Grass” Challenge</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 font-['Fraunces',serif] leading-[1.12]">
              Less Scrolling. <br />
              <span className="text-[#2D5A27] italic font-normal">More Growing.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-['Plus_Jakarta_Sans',sans-serif]">
              Your AI companion for little adventures in the natural world.
              Designed to make the screen the shortest part of your day: generate a personalized quest, step outside, and reconnect with real soil, leaves, and skies.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onStartQuest}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#2D5A27] text-white text-sm font-semibold shadow-md shadow-[#2D5A27]/20 hover:bg-[#23471f] hover:shadow-lg transition-all active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#2D5A27]"
              >
                <Compass className="w-4 h-4" />
                <span>Find My Nature Quest</span>
              </button>
              <button
                onClick={onExploreOffline}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-stone-300/80 bg-white/80 text-stone-700 text-sm font-semibold hover:bg-stone-50 hover:text-stone-900 transition-colors"
              >
                <Footprints className="w-4 h-4 text-[#4A7C43]" />
                <span>Quick Offline Activities</span>
              </button>
            </div>

            {/* Nature Philosophy points */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-xs text-stone-500 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2D5A27]" />
                <span>100% Private · Zero GPS Tracking</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#2D5A27]" />
                <span>Gemma 3 Open-Weight AI</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-[#2D5A27]" />
                <span>Works Full Offline PWA</span>
              </div>
            </div>
          </div>

          {/* Nature Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-gradient-to-br from-[#EAF2E8] via-[#F4F8F3] to-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#D5E5D1] shadow-sm">
              {/* SVG Nature artwork */}
              <svg viewBox="0 0 400 320" className="w-full h-auto drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Sun */}
                <circle cx="200" cy="70" r="38" fill="#FDE68A" opacity="0.8" />
                <circle cx="200" cy="70" r="28" fill="#FBBF24" />

                {/* Soft background hills */}
                <path d="M-20 280 C60 210 160 220 240 250 C320 280 380 230 420 260 L420 340 L-20 340 Z" fill="#D3E7CE" />
                <path d="M-20 300 C80 250 180 270 280 260 C350 250 390 280 420 290 L420 340 L-20 340 Z" fill="#A8D5A2" />

                {/* Foreground Meadow */}
                <path d="M-10 305 C100 295 240 310 410 295 L410 330 L-10 330 Z" fill="#4A7C43" />

                {/* Left Tree */}
                <path d="M75 290 Q78 200 80 160 Q82 200 85 290" stroke="#78350F" stroke-width="8" stroke-linecap="round" />
                <circle cx="78" cy="155" r="36" fill="#2E7D32" opacity="0.9" />
                <circle cx="62" cy="140" r="24" fill="#388E3C" />
                <circle cx="95" cy="145" r="26" fill="#43A047" />

                {/* Right Canopy Tree */}
                <path d="M315 285 Q318 190 320 145" stroke="#78350F" stroke-width="9" stroke-linecap="round" />
                <circle cx="320" cy="130" r="42" fill="#1B5E20" opacity="0.95" />
                <circle cx="300" cy="120" r="30" fill="#2E7D32" />
                <circle cx="342" cy="125" r="28" fill="#4CAF50" />

                {/* Center Gentle Sprout & Moss Mound */}
                <ellipse cx="200" cy="285" rx="55" ry="16" fill="#2D5A27" />
                {/* Sprout */}
                <path d="M200 285 Q200 245 200 230" stroke="#81C784" stroke-width="4" stroke-linecap="round" />
                <path d="M200 245 C185 235 180 215 198 220" fill="#66BB6A" />
                <path d="M200 235 C215 225 220 205 202 210" fill="#81C784" />

                {/* Wildflowers */}
                <circle cx="130" cy="275" r="5" fill="#F472B6" />
                <circle cx="130" cy="275" r="2" fill="#FEF08A" />
                <circle cx="150" cy="285" r="4.5" fill="#FB923C" />
                <circle cx="260" cy="280" r="5" fill="#60A5FA" />
                <circle cx="275" cy="272" r="4" fill="#FBBF24" />

                {/* Flying mindful birds */}
                <path d="M120 95 Q125 90 130 95 Q135 90 140 95" stroke="#2D5A27" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.75" />
                <path d="M150 80 Q154 76 158 80 Q162 76 166 80" stroke="#2D5A27" stroke-width="1.8" stroke-linecap="round" fill="none" opacity="0.75" />
                <path d="M255 100 Q260 95 265 100 Q270 95 275 100" stroke="#2D5A27" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.75" />
              </svg>

              {/* Floating micro card */}
              <div className="mt-4 bg-white/90 backdrop-blur-xs rounded-2xl p-3.5 border border-[#2D5A27]/10 flex items-center gap-3 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-[#EAF2E8] flex items-center justify-center text-[#2D5A27] shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Today's Nature Invitation</div>
                  <div className="text-[11px] text-stone-600 line-clamp-1">
                    Step outside for 15 minutes · Notice 3 shades of green
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
