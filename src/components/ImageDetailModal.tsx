import React from 'react';
import { ImagePanel } from '../types';
import { X, Sparkles, CheckCircle2, ShieldCheck, Activity, Phone } from 'lucide-react';

interface ImageDetailModalProps {
  panel: ImagePanel | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ImageDetailModal: React.FC<ImageDetailModalProps> = ({
  panel,
  onClose,
  onOpenContact,
}) => {
  if (!panel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden neon-pink-box-thick bg-[#0b0e17] shadow-[0_0_60px_rgba(255,45,141,0.65)] flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#121624] border-b border-pink-500/50 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-pink-950 border border-pink-500 flex items-center justify-center text-pink-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono-cyber text-cyan-400 font-bold tracking-wider">
                {panel.category}
              </span>
              <h3 className="text-lg font-bold font-display text-white">
                {panel.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-black/60 hover:bg-pink-900 border border-slate-700 hover:border-pink-500 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main 4K Image Container */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl overflow-hidden border-2 border-slate-700 bg-black shadow-[0_0_25px_rgba(0,0,0,0.8)]">
            <img
              src={panel.imageSrc}
              alt={panel.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 left-3 px-3 py-1 rounded bg-black/80 border border-pink-500/80 text-pink-300 text-xs font-mono-cyber shadow-[0_0_12px_#ff2d8d]">
              RESOLUTION: 4K ULTRA-HIGH DEFINITION
            </div>
          </div>

          {/* Description & Technical Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <h4 className="text-xs font-mono-cyber text-cyan-400 uppercase tracking-widest mb-1">
                  PROJEKTBESCHREIBUNG & ANALYSE
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  {panel.description}
                </p>
              </div>

              {/* Technical Telemetry Box */}
              <div className="p-4 rounded-xl bg-black/60 border border-pink-500/40 space-y-2">
                <div className="flex items-center space-x-2 text-pink-400 text-xs font-mono-cyber font-bold">
                  <Activity className="w-4 h-4 text-pink-500 animate-pulse" />
                  <span>SYSTEM-TELEMETRIE // VERFAHRENS-KENNZAHLEN</span>
                </div>
                <p className="text-xs font-mono-cyber text-slate-300 bg-slate-900/80 p-2.5 rounded border border-slate-800">
                  {panel.techSpec}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {panel.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono-cyber px-2.5 py-1 rounded-md bg-slate-900 text-cyan-300 border border-cyan-500/40"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Side Action Column */}
            <div className="space-y-4 bg-gradient-to-b from-[#131722] to-[#090b10] p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-mono-cyber text-slate-400 tracking-wider">
                  QUALITÄTSGARANTIE
                </span>
                <div className="flex items-start space-x-2 text-xs text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Zertifizierte Fachkräfte & modernste Robotertechnologie</span>
                </div>
                <div className="flex items-start space-x-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Schonende, umweltgerechte Nanoreiniger</span>
                </div>
                <div className="flex items-start space-x-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                  <span>24/7 Notfallbereitschaft & Termintreue</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenContact();
                  }}
                  className="w-full py-2.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-display text-xs font-bold tracking-wider shadow-[0_0_15px_#ff2d8d] transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>DIESEN SERVICE ANFRAGEN</span>
                </button>

                <a
                  href="tel:06767408220"
                  className="w-full py-2 rounded-lg bg-black/60 hover:bg-black border border-cyan-400 text-cyan-300 font-mono-cyber text-xs font-bold text-center flex items-center justify-center space-x-2 transition-colors"
                >
                  <Phone className="w-3 h-3 text-cyan-400" />
                  <span>TEL. 0676 740 8220</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#0a0d14] border-t border-slate-800 flex-shrink-0">
          <span className="text-xs font-mono-cyber text-slate-400">
            REBLIX CLEAN SOLUTIONS // DIE ZUKUNFT DER SAUBERKEIT IN 4K NEON
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-mono-cyber text-xs transition-colors cursor-pointer"
          >
            SCHLIESSEN
          </button>
        </div>
      </div>
    </div>
  );
};
