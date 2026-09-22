import React from 'react';
import { Cpu, Layers, Edit3 } from 'lucide-react';

interface HeroBannerProps {
  title: string;
  subtitle: string;
  onCompareStairs: () => void;
  onExploreServices: () => void;
  isAdmin?: boolean;
  onOpenAdmin?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  subtitle,
  onCompareStairs,
  onExploreServices,
  isAdmin,
  onOpenAdmin,
}) => {
  return (
    <div className="relative w-full mb-8 rounded-xl bg-gradient-to-r from-black/90 via-[#0d0914]/90 to-black/90 border border-pink-500/50 p-6 sm:p-8 shadow-[0_0_30px_rgba(255,45,141,0.25)] text-center overflow-hidden">
      {/* Decorative Cyber Grid Background in Hero */}
      <div className="absolute inset-0 bg-[radial-gradient(#ff2d8d15_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-50" />
      
      {/* Corner Bracket Accents */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-pink-500 shadow-[0_0_8px_#ff2d8d]" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-pink-500 shadow-[0_0_8px_#ff2d8d]" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400 shadow-[0_0_8px_#00f0ff]" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400 shadow-[0_0_8px_#00f0ff]" />

      {isAdmin && onOpenAdmin && (
        <button
          onClick={onOpenAdmin}
          className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/80 hover:bg-pink-950 border border-pink-500/60 text-pink-300 text-xs font-mono-cyber cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Titel bearbeiten</span>
        </button>
      )}

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Futuristic Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/60 text-pink-300 text-xs font-mono-cyber mb-4 shadow-[0_0_12px_rgba(255,45,141,0.3)]">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
          <span className="tracking-widest font-bold">NEXT-GEN GEBÄUDEREINIGUNG & HYGIENE-TECHNIK</span>
        </div>

        {/* Central Large Cyberpunk Neon Header */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-wider neon-cyberpunk-title uppercase mb-4 leading-tight">
          {title}
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed mb-6 font-medium font-sans">
          {subtitle}
        </p>

        {/* Action Buttons & Quick Interactivity */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onCompareStairs}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-display text-xs sm:text-sm font-bold tracking-wider shadow-[0_0_20px_#ff2d8d] hover:shadow-[0_0_28px_#ff2d8d] transition-all cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            <span>VORHER / NACHHER VERGLEICH</span>
          </button>

          <button
            onClick={onExploreServices}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-black/80 hover:bg-slate-900 border border-cyan-400 text-cyan-300 hover:text-cyan-200 font-display text-xs sm:text-sm font-bold tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_22px_rgba(0,240,255,0.6)] transition-all cursor-pointer"
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>DIENSTLEISTUNGEN ANSEHEN</span>
          </button>
        </div>
      </div>
    </div>
  );
};
