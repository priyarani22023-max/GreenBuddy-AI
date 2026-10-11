import React from 'react';
import {
  Leaf,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
  Heart,
  Terminal,
  BookOpen,
  Code2,
  ExternalLink,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-10">
      {/* Challenge Hero */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5F0E2] text-[#2D5A27] text-xs font-semibold">
          <Leaf className="w-3.5 h-3.5" />
          <span>Hacktoberfest 2026 Open-Source AI Challenge</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-['Fraunces',serif] text-stone-900 tracking-tight">
          Touch Grass with GreenBuddy AI
        </h2>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl font-['Plus_Jakarta_Sans',sans-serif]">
          In an era of endless algorithmic feeds, doomscrolling, and perpetual screen time, GreenBuddy AI was created for the Hacktoberfest 2026 “Touch Grass” challenge. Its core principle is radical simplicity: <strong>the screen should be the shortest part of the user experience</strong>. Generate a quick, creative quest, absorb the prompt in 15 seconds, pocket your device, and step outside.
        </p>
      </div>

      {/* Why Gemma Matters */}
      <div className="space-y-4 pt-4 border-t border-stone-100">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#2D5A27]" />
          <h3 className="text-lg sm:text-xl font-bold font-['Fraunces',serif] text-stone-900">
            Why Open-Weight Gemma is Central to this Mission
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#F2F7F0]/60 border border-[#2D5A27]/20 space-y-2">
            <h4 className="text-sm font-bold text-stone-900">1. True Offline Autonomy</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Nature happens away from Wi-Fi towers. Gemma 3 1B runs directly on consumer laptops and edge chips via Ollama, generating rich nature quests deep in wooded parks or remote gardens without an internet uplink.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#F2F7F0]/60 border border-[#2D5A27]/20 space-y-2">
            <h4 className="text-sm font-bold text-stone-900">2. Complete Personal Privacy</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Your outdoor routines, journal notes, and time habits never touch proprietary corporate data centers. With Gemma running locally, all inference remains 100% on your device.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#F2F7F0]/60 border border-[#2D5A27]/20 space-y-2">
            <h4 className="text-sm font-bold text-stone-900">3. Open-Source AI Ethics</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Open-weight models foster transparency and educational inspectability. Students and builders can inspect prompt templates, test parameters, and fine-tune for local biomes without vendor lock-in.
            </p>
          </div>
        </div>
      </div>

      {/* Architecture Overview */}
      <div className="space-y-4 pt-4 border-t border-stone-100">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#2D5A27]" />
          <h3 className="text-lg sm:text-xl font-bold font-['Fraunces',serif] text-stone-900">
            System Architecture
          </h3>
        </div>
        <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80 font-mono text-xs text-stone-700 leading-relaxed overflow-x-auto space-y-2">
          <div className="text-stone-500 font-sans font-semibold text-[11px] uppercase tracking-wider">
            Flow Diagram
          </div>
          <div>[User Interface: React + Vite + Tailwind + PWA]</div>
          <div className="text-stone-400 pl-4">│  (Cached offline assets & Service Worker)</div>
          <div className="text-stone-400 pl-4">▼</div>
          <div>[Express Backend: /api/quest & /api/health]</div>
          <div className="text-stone-400 pl-4">│  (Input validation, safety guardrails, provider routing)</div>
          <div className="text-stone-400 pl-4">├───► Mode A: Local Ollama HTTP API (http://127.0.0.1:11434 with gemma3:1b)</div>
          <div className="text-stone-400 pl-4">├───► Mode B: Configured Hosted Gemma Endpoint (OpenAI-compatible)</div>
          <div className="text-stone-400 pl-4">└───► Mode C: Verified Built-in Curated Library (Zero-network fallback)</div>
        </div>
      </div>

      {/* Local Quickstart Commands */}
      <div className="space-y-4 pt-4 border-t border-stone-100">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-[#2D5A27]" />
          <h3 className="text-lg sm:text-xl font-bold font-['Fraunces',serif] text-stone-900">
            Run Gemma Locally in 2 Minutes
          </h3>
        </div>
        <div className="space-y-3">
          <div className="bg-stone-900 text-stone-200 p-4 rounded-2xl font-mono text-xs space-y-2 overflow-x-auto">
            <div className="text-stone-400"># Step 1: Install Ollama (https://ollama.com) & pull Gemma 3 1B</div>
            <div className="text-emerald-400">ollama run gemma3:1b</div>
            <div className="text-stone-400 pt-2"># Step 2: In a new terminal, launch the full-stack app</div>
            <div className="text-emerald-400">git clone https://github.com/hacktoberfest2026/greenbuddy-ai.git</div>
            <div className="text-emerald-400">npm install</div>
            <div className="text-emerald-400">npm run dev</div>
            <div className="text-stone-400 pt-2"># Step 3: Open http://localhost:3000 in your browser</div>
          </div>
          <p className="text-xs text-stone-500">
            The app automatically connects to your local Ollama instance at <code>http://127.0.0.1:11434</code> without any API keys or internet connection required.
          </p>
        </div>
      </div>

      {/* Nature Safety Code of Conduct */}
      <div className="space-y-3 pt-4 border-t border-stone-100">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-700" />
          <h3 className="text-lg sm:text-xl font-bold font-['Fraunces',serif] text-stone-900">
            Nature Safety & Leave No Trace Principles
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600">
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70">
            <strong className="text-stone-900 block mb-1">Never Eat or Forage Wild Plants</strong>
            GreenBuddy AI strictly prohibits recommending the ingestion or tasting of wild mushrooms, berries, or foliage.
          </div>
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70">
            <strong className="text-stone-900 block mb-1">Observe Without Disturbing</strong>
            Keep a respectful distance from wildlife, nesting birds, and burrows. Never break live branches or trample fragile root systems.
          </div>
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70">
            <strong className="text-stone-900 block mb-1">Stay Mindful of Surroundings</strong>
            When doing quests on sidewalks or in parks, remain attentive to traffic, cyclists, uneven paths, and changing weather.
          </div>
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70">
            <strong className="text-stone-900 block mb-1">Leave No Trace</strong>
            Carry out any trash you find, leave natural items where you found them, and help protect public outdoor sanctuaries.
          </div>
        </div>
      </div>

      {/* Licensing and Attribution */}
      <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-stone-500">
        <div>
          <span className="font-bold text-stone-700">Open Source License: </span>
          <span>Apache 2.0 License.</span>
        </div>
        <div>
          <span className="font-bold text-stone-700">Model Attribution: </span>
          <span>Gemma open weights provided by Google under the Gemma Terms of Use.</span>
        </div>
      </div>
    </div>
  );
};
