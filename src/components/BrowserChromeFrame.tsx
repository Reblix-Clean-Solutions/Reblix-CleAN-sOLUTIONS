import React, { useState } from 'react';
import { Sparkles, Terminal, Activity, Zap, CheckCircle } from 'lucide-react';

interface BrowserChromeFrameProps {
  children: React.ReactNode;
}

export const BrowserChromeFrame: React.FC<BrowserChromeFrameProps> = ({ children }) => {
  const [cleaningWipeActive, setCleaningWipeActive] = useState(false);
  const [wipeCompletedToast, setWipeCompletedToast] = useState(false);

  const triggerRobotWipe = () => {
    if (cleaningWipeActive) return;
    setCleaningWipeActive(true);
    setTimeout(() => {
      setCleaningWipeActive(false);
      setWipeCompletedToast(true);
      setTimeout(() => setWipeCompletedToast(false), 3500);
    }, 2400);
  };

  return (
    <div className="relative w-full max-w-[1440px] mx-auto transition-all duration-300">
      {/* Outer Metallic Chrome Frame */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-slate-600/80 bg-gradient-to-b from-[#1a1d26] via-[#0d0f15] to-[#07090e] shadow-[0_20px_70px_rgba(0,0,0,0.95)]">
        
        {/* Top Integrated Neon Light Strips (Pink & Blue) */}
        <div className="w-full flex h-1.5 overflow-hidden">
          <div className="w-1/2 h-full bg-gradient-to-r from-pink-500 via-pink-400 to-fuchsia-500 shadow-[0_0_12px_#ff2d8d]" />
          <div className="w-1/2 h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 shadow-[0_0_12px_#00f0ff]" />
        </div>

        {/* Chrome Window Header Bar */}
        <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 bg-gradient-to-r from-[#171b24] via-[#1f2430] to-[#151821] border-b border-slate-700/80 select-none">
          {/* Window Control Buttons */}
          <div className="flex items-center space-x-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#ff3b30] shadow-[0_0_8px_rgba(255,59,48,0.7)] border border-red-400/40 cursor-pointer hover:opacity-80 transition-opacity" title="Schließen" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#ffcc00] shadow-[0_0_8px_rgba(255,204,0,0.7)] border border-amber-400/40 cursor-pointer hover:opacity-80 transition-opacity" title="Minimieren" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_rgba(0,240,255,0.7)] border border-cyan-400/40 cursor-pointer hover:opacity-80 transition-opacity" title="Vollbild" />
            
            <div className="hidden sm:flex items-center ml-4 pl-3 border-l border-slate-700 text-[11px] font-mono-cyber text-slate-400">
              <Terminal className="w-3 h-3 mr-1.5 text-cyan-400" />
              <span className="text-slate-300">HTTPS://REBLIX-CLEAN.SOLUTIONS</span>
              <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] bg-pink-500/20 text-pink-300 border border-pink-500/40 font-bold">
                SECURE 4K NEON
              </span>
            </div>
          </div>

          {/* Center Display / Telemetry */}
          <div className="flex items-center space-x-2 text-[11px] font-mono-cyber">
            <span className="hidden md:inline-flex items-center text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1.5" />
              ONLINE
            </span>
            <span className="text-slate-400 hidden lg:inline">REBLIX // WIEN & UMGEBUNG</span>
          </div>

          {/* Glanz-Effekt Trigger on Frame */}
          <div className="flex items-center space-x-3">
            <button
              onClick={triggerRobotWipe}
              className="group relative flex items-center space-x-2 px-2.5 py-1 rounded bg-[#10141d] hover:bg-[#161c28] border border-cyan-500/50 text-cyan-300 hover:text-cyan-200 text-xs font-mono-cyber transition-all shadow-[0_0_10px_rgba(0,240,255,0.25)] hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] cursor-pointer"
              title="Oberflächen-Glanzzyklus auslösen"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-400 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline font-bold tracking-wider">GLANZ-EFFEKT</span>
            </button>
          </div>
        </div>

        {/* Dynamic Cleaning Wipe Animation when triggered - Sweeps from absolute top to bottom */}
        {cleaningWipeActive && (
          <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
            {/* Full-width Glanz Sweep Beam gliding from top (0%) to bottom (100%) */}
            <div className="animate-glanz-full">
              {/* Diffuse Light Aura */}
              <div className="w-full h-16 bg-gradient-to-r from-transparent via-cyan-400/80 via-pink-500/80 to-transparent blur-md shadow-[0_0_50px_#00f0ff,0_0_80px_#ff2d8d]" />
              {/* Razor-sharp Center Laser Blade */}
              <div className="w-full h-2 bg-gradient-to-r from-transparent via-cyan-200 via-white via-pink-200 to-transparent shadow-[0_0_25px_#ffffff,0_0_45px_#00f0ff]" />
              {/* Trailing crystal wet shine sheen */}
              <div className="w-full h-32 bg-gradient-to-b from-cyan-400/20 via-pink-500/10 to-transparent blur-sm" />
            </div>
            <div className="absolute inset-0 bg-cyan-500/5 backdrop-blur-[0.5px] transition-opacity duration-500" />
          </div>
        )}

        {/* Toast when wipe complete */}
        {wipeCompletedToast && (
          <div className="absolute top-14 right-8 z-50 flex items-center gap-2 px-3 py-2 rounded-lg bg-black/90 border border-pink-500 text-pink-300 text-xs font-mono-cyber shadow-[0_0_20px_#ff2d8d] animate-fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>4K NANO-ABZIEHZYKLUS ERFOLGREICH: 100% REIN</span>
          </div>
        )}

        {/* Inner Window Content Frame */}
        <div className="relative bg-[#06080e]/95 backdrop-blur-xl p-4 sm:p-6 lg:p-8">
          {children}
        </div>

        {/* Bottom Integrated Neon Light Strips (Blue & Pink) */}
        <div className="w-full flex h-1.5 overflow-hidden">
          <div className="w-1/2 h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 shadow-[0_0_12px_#00f0ff]" />
          <div className="w-1/2 h-full bg-gradient-to-r from-pink-500 via-pink-400 to-fuchsia-500 shadow-[0_0_12px_#ff2d8d]" />
        </div>

        {/* Chrome Bottom Status Footer Strip */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-[#0e1118] border-t border-slate-800 text-[10px] font-mono-cyber text-slate-400">
          <div className="flex items-center space-x-3">
            <span className="flex items-center text-pink-400">
              <Zap className="w-3 h-3 mr-1 text-pink-500" /> REBLIX HIGH-PERFORMANCE
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-300">ÖSTERREICHWEITER SERVICE // 24/7 EINSATZ</span>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span className="text-cyan-400">4K NEON RESOLUTION</span>
          </div>
        </div>
      </div>
    </div>
  );
};
