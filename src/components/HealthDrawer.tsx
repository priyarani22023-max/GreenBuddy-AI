import React from 'react';
import { HealthResponse } from '../types/quest';
import {
  Cpu,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  X,
  ExternalLink,
  Terminal,
  ShieldCheck,
  Server,
} from 'lucide-react';

interface HealthDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  health: HealthResponse | null;
  loading: boolean;
  onRefresh: () => void;
}

export const HealthDrawer: React.FC<HealthDrawerProps> = ({
  isOpen,
  onClose,
  health,
  loading,
  onRefresh,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-stone-200 p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
          aria-label="Close diagnostics"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
          <div className="w-10 h-10 rounded-xl bg-[#EAF2E8] text-[#2D5A27] flex items-center justify-center shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-['Fraunces',serif] text-stone-900">
              Gemma AI Runtime & Diagnostics
            </h3>
            <p className="text-xs text-stone-500">
              Live status verification for local Ollama, hosted models, and fallback systems.
            </p>
          </div>
        </div>

        {/* Active Provider Banner */}
        <div className="my-5 p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Current Active Mode
            </span>
            <button
              onClick={onRefresh}
              disabled={loading}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#2D5A27] hover:underline cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Re-check Now</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {health?.activeProvider === 'ollama' ? (
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            ) : health?.activeProvider === 'hosted' ? (
              <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                <Server className="w-5 h-5" />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
            )}

            <div>
              <div className="text-sm font-bold text-stone-900">
                {health?.activeProvider === 'ollama'
                  ? 'Local Gemma via Ollama (Live Connected)'
                  : health?.activeProvider === 'hosted'
                  ? `Hosted Gemma Endpoint (${health?.hosted.model || 'Active'})`
                  : 'Built-in Nature Quest Library (Offline / Standalone)'}
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                {health?.activeProvider === 'ollama'
                  ? `Inference running on device with model ${health.ollama.model}.`
                  : health?.activeProvider === 'hosted'
                  ? 'Inference running via verified remote Gemma host.'
                  : 'Zero external dependencies active. All 24 curated quests are pre-cached.'}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Provider Rows */}
        <div className="space-y-3">
          {/* 1. Local Ollama */}
          <div className="p-4 rounded-2xl border border-stone-200/90 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-stone-600" />
                <span className="text-sm font-bold text-stone-900">1. Local Ollama Runtime</span>
              </div>
              {health?.ollama.reachable ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Reachable
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                  Not Detected
                </span>
              )}
            </div>

            <div className="mt-2 text-xs text-stone-600 space-y-1">
              <div>
                <span className="font-semibold text-stone-700">Target Endpoint: </span>
                <code className="bg-stone-100 px-1 py-0.5 rounded text-[11px]">
                  {health?.ollama.configuredUrl || 'http://127.0.0.1:11434'}
                </code>
              </div>
              <div>
                <span className="font-semibold text-stone-700">Target Model: </span>
                <code className="bg-stone-100 px-1 py-0.5 rounded text-[11px]">
                  {health?.ollama.model || 'gemma3:1b'}
                </code>
              </div>
              {health?.ollama.error && (
                <div className="text-amber-700 mt-1 font-medium bg-amber-50/70 p-2 rounded-lg border border-amber-200/50">
                  {health.ollama.error}
                </div>
              )}
            </div>

            {/* Quick Ollama start guide */}
            <div className="mt-3 pt-3 border-t border-stone-100">
              <div className="text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                How to start Gemma locally on your computer:
              </div>
              <div className="bg-stone-900 text-stone-200 p-2.5 rounded-xl font-mono text-[11px] space-y-1 overflow-x-auto">
                <div className="text-stone-400"># 1. Download & start Ollama (ollama.com)</div>
                <div>ollama run gemma3:1b</div>
              </div>
              <p className="text-[11px] text-stone-500 mt-1.5 leading-relaxed">
                <em>Note:</em> When testing in cloud-hosted previews, browser sandbox security cannot reach your private laptop's localhost. In local development (`npm run dev`), it connects seamlessly!
              </p>
            </div>
          </div>

          {/* 2. Hosted Gemma Endpoint */}
          <div className="p-4 rounded-2xl border border-stone-200/90 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-stone-600" />
                <span className="text-sm font-bold text-stone-900">2. Hosted Gemma Inference</span>
              </div>
              {health?.hosted.reachable ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Connected
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                  Not Configured
                </span>
              )}
            </div>
            <p className="mt-2 text-xs text-stone-500 leading-relaxed">
              Configurable via server-side environment variables: <code className="bg-stone-100 px-1 py-0.5 rounded text-[11px]">HOSTED_GEMMA_URL</code> and <code className="bg-stone-100 px-1 py-0.5 rounded text-[11px]">HOSTED_GEMMA_API_KEY</code>.
            </p>
          </div>

          {/* 3. Built-in Offline Library */}
          <div className="p-4 rounded-2xl border border-[#2D5A27]/30 bg-[#F2F7F0]/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2D5A27]" />
                <span className="text-sm font-bold text-[#2D5A27]">
                  3. Built-in Curated Quests (Always Ready)
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                Active & Cached
              </span>
            </div>
            <p className="mt-1 text-xs text-stone-600 leading-relaxed">
              Contains 24 verified, screen-free nature activities across Garden, Park, Balcony, and Neighborhood settings. Zero latency, 100% offline reliability.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-100 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition"
          >
            Close Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
};
