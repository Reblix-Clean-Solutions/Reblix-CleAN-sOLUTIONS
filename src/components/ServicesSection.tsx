import React from 'react';
import { ServiceItem } from '../types';
import { Sparkles, Check, ArrowRight, ShieldCheck, Edit3 } from 'lucide-react';

interface ServicesSectionProps {
  services: ServiceItem[];
  onOpenContact: (serviceName?: string) => void;
  onCompareStairs: () => void;
  isAdmin?: boolean;
  onOpenAdmin?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onOpenContact,
  onCompareStairs,
  isAdmin,
  onOpenAdmin,
}) => {
  return (
    <div className="w-full mb-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-2 border-b border-pink-500/30">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-pink-950/80 border border-pink-500 flex items-center justify-center text-pink-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white">
              DIENSTLEISTUNGEN // SPEZIALGEBIETE
            </h2>
            <p className="text-xs font-mono-cyber text-pink-400">
              REBLIX CLEAN SOLUTIONS • HIGH-END GEBÄUDEREINIGUNG
            </p>
          </div>
        </div>

        {isAdmin && onOpenAdmin && (
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-pink-950/80 hover:bg-pink-900 text-pink-300 border border-pink-500/50 text-xs font-mono-cyber transition-all cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Leistungen bearbeiten</span>
          </button>
        )}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv, idx) => (
          <div
            key={srv.id}
            className="rounded-xl p-6 bg-gradient-to-b from-[#0e121c] to-[#07090f] border border-slate-700/80 hover:border-pink-500 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(255,45,141,0.3)] flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono-cyber px-2.5 py-0.5 rounded bg-black border border-cyan-500/40 text-cyan-300 font-bold">
                  MODUL 0{idx + 1}
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>

              <h3 className="text-lg font-bold font-display text-white group-hover:text-pink-300 transition-colors mb-2">
                {srv.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans">
                {srv.desc}
              </p>

              {/* Feature Points */}
              <div className="space-y-2 mb-6">
                {srv.features.map((feat) => (
                  <div key={feat} className="flex items-center space-x-2 text-xs text-slate-200 font-mono-cyber">
                    <Check className="w-3.5 h-3.5 text-pink-500 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              {srv.id === 'stiegenaufgang' || srv.title.toLowerCase().includes('stiege') || srv.title.toLowerCase().includes('treppe') ? (
                <button
                  onClick={onCompareStairs}
                  className="text-xs font-mono-cyber text-cyan-300 hover:text-cyan-100 flex items-center space-x-1 cursor-pointer"
                >
                  <span>Vorher/Nachher ansehen</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-[11px] font-mono-cyber text-slate-400">
                  4K Neon Qualitätsstandard
                </span>
              )}

              <button
                onClick={() => onOpenContact(srv.title)}
                className="px-3.5 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-display font-bold tracking-wider shadow-[0_0_10px_#ff2d8d] transition-all cursor-pointer"
              >
                ANFRAGEN
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
