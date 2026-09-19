import React from 'react';
import { ActiveTab } from '../types';
import { Phone, Sparkles, Lock, ShieldCheck } from 'lucide-react';

interface HeaderNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenContact: () => void;
  onOpenAdmin: () => void;
  isAdmin: boolean;
  phoneNumber: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenContact,
  onOpenAdmin,
  isAdmin,
  phoneNumber,
}) => {
  const navItems: ActiveTab[] = ['STARTSEITE', 'DIENSTLEISTUNGEN', 'GALERIE', 'ÜBER MICH'];

  return (
    <header className="relative w-full border-b border-pink-500/30 pb-4 mb-6 select-none">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Company Identity / Cyber Logo */}
        <div 
          onClick={() => setActiveTab('STARTSEITE')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-lg bg-black border-2 border-pink-500 flex items-center justify-center shadow-[0_0_15px_#ff2d8d] group-hover:scale-105 transition-transform">
            <span className="text-xl font-bold font-display text-pink-500 group-hover:text-pink-400">R</span>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_6px_#00f0ff]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg sm:text-xl font-bold font-display tracking-widest text-white group-hover:text-pink-200 transition-colors">
                REBLIX
              </span>
              <span className="text-xs font-mono-cyber px-1.5 py-0.5 rounded bg-pink-950/80 text-pink-300 border border-pink-500/40 font-semibold tracking-wider">
                CLEAN SOLUTIONS
              </span>
            </div>
            <p className="text-[11px] font-mono-cyber text-cyan-400/90 tracking-wider">
              GEBÄUDEREINIGUNG • HIGH-TECH CYBER SERVICE
            </p>
          </div>
        </div>

        {/* The glowing pink neon menu: "STARTSEITE", "DIENSTLEISTUNGEN", "GALERIE", "ÜBER MICH" */}
        <nav className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 md:gap-4 bg-black/60 px-3 sm:px-4 py-2 rounded-xl border border-pink-500/40 shadow-[0_0_20px_rgba(255,45,141,0.2)]">
          {navItems.map((item) => {
            const isActive = activeTab === item;
            return (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`relative px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-bold font-display tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'neon-pink-text bg-pink-950/40 border-b-2 border-pink-500 shadow-[0_4px_12px_rgba(255,45,141,0.4)]'
                    : 'text-pink-400/80 hover:text-pink-300 hover:text-shadow-[0_0_8px_#ff2d8d]'
                }`}
              >
                {item}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-pink-500 shadow-[0_0_6px_#ff2d8d]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Fast Action CTA / Hotline & Admin Option */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <a
            href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
            className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-black/70 border border-cyan-500/60 text-cyan-300 hover:text-cyan-100 hover:border-cyan-400 text-xs font-mono-cyber transition-all shadow-[0_0_12px_rgba(0,240,255,0.3)] group cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform animate-pulse" />
            <span className="font-bold">{phoneNumber}</span>
          </a>

          <button
            onClick={onOpenContact}
            className="flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-display font-bold tracking-wider transition-all shadow-[0_0_18px_#ff2d8d] hover:shadow-[0_0_25px_#ff2d8d] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>KONTAKT</span>
          </button>

          {/* Explicit "ADMIN" Option */}
          <button
            onClick={onOpenAdmin}
            title="Admin-Bereich öffnen"
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono-cyber font-bold border transition-all cursor-pointer ${
              isAdmin
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-[0_0_10px_#10b981]'
                : 'bg-black/70 border-slate-700 text-slate-400 hover:text-pink-300 hover:border-pink-500/60'
            }`}
          >
            {isAdmin ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden lg:inline">ADMIN</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>ADMIN</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
