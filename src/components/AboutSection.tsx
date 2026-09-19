import React from 'react';
import { User, Mail, Phone, CheckCircle2, Shield, Sparkles, MapPin, Edit3 } from 'lucide-react';
import { PartnerBadge } from './PartnerBadge';

interface AboutSectionProps {
  aboutTitle: string;
  aboutText: string;
  onOpenContact: () => void;
  isAdmin?: boolean;
  onOpenAdmin?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ 
  aboutTitle, 
  aboutText, 
  onOpenContact,
  isAdmin,
  onOpenAdmin 
}) => {
  // Split paragraphs by double line breaks for clean editorial typography
  const paragraphs = aboutText
    .replace(/^###\s*/, '')
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="w-full mb-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-pink-500/30">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-pink-950/80 border border-pink-500 flex items-center justify-center text-pink-400">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white">
              {aboutTitle.replace(/^###\s*/, '').toUpperCase()} // DOMINIK REHBERGER
            </h2>
            <p className="text-xs font-mono-cyber text-pink-400">
              REBLIX CLEAN SOLUTIONS • DER INHABER
            </p>
          </div>
        </div>

        {isAdmin && onOpenAdmin && (
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-pink-950/80 hover:bg-pink-900 text-pink-300 border border-pink-500/50 text-xs font-mono-cyber transition-all cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Text bearbeiten</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left / Main Profile: Personal statement from Dominik */}
        <div className="lg:col-span-8 rounded-xl bg-gradient-to-br from-[#0e121e] via-[#090b12] to-black border border-slate-700/80 p-6 sm:p-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono-cyber">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PERSÖNLICHE VERPFLICHTUNG ZU HÖCHSTER SAUBERKEIT</span>
            </div>
            
            {/* Integrated Hilfreno Partner Badge */}
            <PartnerBadge />
          </div>

          <h3 className="text-2xl font-bold font-display text-white leading-tight">
            Zuverlässigkeit, Gründlichkeit und Handschlagqualität
          </h3>

          {/* Render exact user paragraphs with clean readable typography */}
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-sans">
            {paragraphs.map((para, idx) => (
              <p key={idx} className="text-slate-200">
                {para}
              </p>
            ))}
          </div>

          {/* Guarantees */}
          <div className="space-y-2 pt-4 border-t border-slate-800">
            <div className="flex items-center space-x-2 text-xs text-slate-200 font-mono-cyber">
              <CheckCircle2 className="w-4 h-4 text-pink-500 flex-shrink-0" />
              <span>Persönliche Betreuung: Direkter Ansprechpartner vor Ort vor jedem Auftrag</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-200 font-mono-cyber">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Gründliche Ausführung mit Liebe zum Detail und modernem Equipment</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-200 font-mono-cyber">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Verlässliche Absprachen & termingerechte Durchführung garantiert</span>
            </div>
          </div>
        </div>

        {/* Right: Contact & Identity Card */}
        <div className="lg:col-span-4 rounded-xl neon-pink-box bg-gradient-to-b from-[#120e1a] via-[#0b0c14] to-black p-6 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Cyber Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            {/* Dominik Rehberger / Reblix Emblem */}
            <div className="p-4 rounded-xl bg-black/80 border-2 border-slate-600/90 shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-pink-950 to-black border border-pink-500/80 mb-2 shadow-[0_0_12px_rgba(255,45,141,0.5)]">
                <span className="text-2xl font-black font-display text-white tracking-tighter">
                  R<span className="text-pink-500">.</span>
                </span>
              </div>
              <div className="text-base font-black font-display tracking-widest text-white">
                REBLIX CLEAN SOLUTIONS
              </div>
              <div className="text-[10px] font-mono-cyber text-cyan-400 tracking-wider uppercase mt-0.5">
                Inhaber: Dominik Rehberger
              </div>
              <div className="mt-2 text-[10px] text-slate-400 border-t border-slate-800 pt-1.5 font-mono-cyber">
                Moderner, zuverlässiger & kundenorientierter Reinigungsservice
              </div>
            </div>

            {/* Inhaber & Direct Email */}
            <div className="space-y-3 p-3.5 rounded-lg bg-black/60 border border-slate-800 text-xs font-mono-cyber">
              <div>
                <span className="text-slate-400 text-[10px] block">INHABER:</span>
                <span className="text-white font-bold text-sm">Dominik Rehberger</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">UNTERNEHMEN:</span>
                <span className="text-pink-400 font-bold">Reblix Clean Solutions</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">E-MAIL FÜR ANFRAGEN:</span>
                <a
                  href="mailto:reblixmediensolutions@gmail.com"
                  className="text-cyan-300 hover:text-cyan-200 underline font-semibold flex items-center gap-1.5 mt-0.5 break-all"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span>reblixmediensolutions@gmail.com</span>
                </a>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">TELEFON DIREKT:</span>
                <a
                  href="tel:06767408220"
                  className="text-white hover:text-pink-300 font-bold flex items-center gap-1.5 mt-0.5"
                >
                  <Phone className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />
                  <span>0676 740 8220</span>
                </a>
              </div>
              <div className="pt-1 border-t border-slate-800/80">
                <span className="text-slate-400 text-[10px] block">EINSATZBEREICH:</span>
                <span className="text-slate-200 text-[11px] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                  <span>Private Haushalte & Gewerbe</span>
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenContact}
            className="w-full mt-4 py-2.5 rounded-lg bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-display text-xs font-bold tracking-wider shadow-[0_0_15px_#ff2d8d] transition-all cursor-pointer"
          >
            JETZT ANFRAGE STELLEN
          </button>
        </div>

      </div>
    </div>
  );
};
