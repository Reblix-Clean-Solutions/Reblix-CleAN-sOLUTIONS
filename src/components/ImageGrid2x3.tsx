import React from 'react';
import { ImagePanel } from '../types';
import { Maximize2, Sparkles, Layers, Activity, ArrowRight, ArrowLeftRight, CheckCircle } from 'lucide-react';

interface ImageGrid2x3Props {
  images: ImagePanel[];
  onSelectPanel: (panel: ImagePanel) => void;
  onOpenCompare: () => void;
  isAdmin?: boolean;
  onOpenAdmin?: () => void;
}

export const ImageGrid2x3: React.FC<ImageGrid2x3Props> = ({
  images,
  onSelectPanel,
  onOpenCompare,
  isAdmin,
  onOpenAdmin,
}) => {
  // The first two images are placed side-by-side as Before/After comparison (die hinzugefügten Fotos)
  const hasPair = images.length >= 2;
  const beforeImage = hasPair ? images[0] : null;
  const afterImage = hasPair ? images[1] : null;
  // Das Bild was vorher bei Vorher/Nachher war, kommt eine Zeile drunter
  const remainingImages = hasPair ? images.slice(2) : images;

  return (
    <div className="w-full mb-10">
      {/* Section Header with Cyber Accent */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-2 border-b border-pink-500/30">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-pink-500 animate-pulse" />
          <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-wider">
            REBLIX 4K PROJEKTE & ECHTE REFERENZEN
          </h2>
          <span className="text-[10px] font-mono-cyber px-2 py-0.5 rounded bg-pink-950/70 text-pink-300 border border-pink-500/40">
            VORHER / NACHHER & GALERIE
          </span>
        </div>
        <div className="flex items-center gap-3">
          {isAdmin && onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="text-xs font-mono-cyber text-pink-400 hover:text-pink-300 underline cursor-pointer"
            >
              [Bilder verwalten]
            </button>
          )}
          <div className="flex items-center space-x-2 text-xs font-mono-cyber text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>KLICKEN FÜR 4K-DETAILS</span>
          </div>
        </div>
      </div>

      {/* 1. TOP SECTION: DIE ERSTEN ZWEI FOTOS NEBENEINANDER (VORHER / NACHHER) */}
      {beforeImage && afterImage && (
        <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#110d18] via-[#090a12] to-black border-2 border-pink-500/80 shadow-[0_0_25px_rgba(255,45,141,0.25)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold font-mono-cyber text-pink-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>INTERAKTIVER STIEGENHAUS-VERGLEICH // VORHER & NACHHER</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold font-display text-white">
                Direkter Vorher-/Nachher-Vergleich nebeneinander
              </h3>
            </div>

            <button
              onClick={onOpenCompare}
              className="self-start sm:self-auto flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono-cyber font-bold shadow-[0_0_12px_#00f0ff] transition-all cursor-pointer"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>SCHIEBEREGLER ÖFFNEN</span>
            </button>
          </div>

          {/* Side-by-side 2 column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* VORHER Panel */}
            <div
              onClick={() => onSelectPanel(beforeImage)}
              className="group relative rounded-xl overflow-hidden neon-pink-box-thick bg-[#0b0e17] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_25px_#ff2d8d] cursor-pointer flex flex-col justify-between"
            >
              <div className="absolute top-3 left-3 z-20">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono-cyber font-black tracking-wider bg-rose-950/95 text-rose-300 border border-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]">
                  ⚡ 1. VORHER (UNBEHANDELT)
                </span>
              </div>

              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                <img
                  src={beforeImage.imageSrc}
                  alt={beforeImage.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[11px] font-mono-cyber text-slate-300 border border-slate-700">
                  Klicken für Vollbild
                </div>
              </div>

              <div className="p-4 bg-gradient-to-b from-[#0e111a] to-[#080911] border-t-2 border-rose-500/50 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-base font-bold font-display text-white group-hover:text-rose-300 transition-colors">
                    {beforeImage.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    {beforeImage.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <div className="p-2 rounded bg-black/60 border border-rose-900/50 text-[11px] font-mono-cyber text-rose-300 flex items-center gap-1.5 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>{beforeImage.techSpec || 'Ausgangszustand vor Reblix-Reinigung'}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {beforeImage.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono-cyber px-2 py-0.5 rounded bg-slate-900 text-rose-300 border border-rose-900/60">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* NACHHER Panel */}
            <div
              onClick={() => onSelectPanel(afterImage)}
              className="group relative rounded-xl overflow-hidden neon-pink-box-thick bg-[#0b0e17] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_25px_#00f0ff] cursor-pointer flex flex-col justify-between"
            >
              <div className="absolute top-3 left-3 z-20">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono-cyber font-black tracking-wider bg-emerald-950/95 text-emerald-300 border border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]">
                  ✨ 2. NACHHER (REBLIX MEISTERGLANZ)
                </span>
              </div>

              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                <img
                  src={afterImage.imageSrc}
                  alt={afterImage.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[11px] font-mono-cyber text-slate-300 border border-slate-700">
                  Klicken für Vollbild
                </div>
              </div>

              <div className="p-4 bg-gradient-to-b from-[#0e111a] to-[#080911] border-t-2 border-emerald-500/50 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-base font-bold font-display text-white group-hover:text-emerald-300 transition-colors">
                    {afterImage.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    {afterImage.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <div className="p-2 rounded bg-black/60 border border-emerald-900/50 text-[11px] font-mono-cyber text-emerald-300 flex items-center gap-1.5 mb-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{afterImage.techSpec || 'Reinheitsgrad 99.9% • Diamantpolitur'}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {afterImage.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono-cyber px-2 py-0.5 rounded bg-slate-900 text-emerald-300 border border-emerald-900/60">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 2. WEITERE REFERENZBILDER MIT DETAILLIERTER BESCHREIBUNG */}
      {remainingImages.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-pink-500" />
            <h3 className="text-sm font-bold font-display text-slate-200 tracking-wider">
              WEITERE REINIGUNGSOBJEKTE MIT AUSFÜHRLICHER BESCHREIBUNG
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {remainingImages.map((panel) => {
              return (
                <div
                  key={panel.id}
                  onClick={() => onSelectPanel(panel)}
                  className="group relative rounded-xl overflow-hidden neon-pink-box-thick bg-[#0b0e17] transition-all duration-300 hover:scale-[1.015] hover:shadow-[0_0_30px_#ff2d8d] cursor-pointer flex flex-col justify-between"
                >
                  {/* Corner Decorative Tech Elements */}
                  <div className="absolute top-1.5 left-1.5 z-20 w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
                  <div className="absolute top-1.5 right-1.5 z-20 w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
                  <div className="absolute bottom-1.5 left-1.5 z-20 w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
                  <div className="absolute bottom-1.5 right-1.5 z-20 w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

                  {/* Category Badge at Top */}
                  <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono-cyber font-bold tracking-wider bg-black/85 text-pink-300 border border-pink-500/60 shadow-[0_0_8px_rgba(255,45,141,0.5)]">
                      {panel.category}
                    </span>
                  </div>

                  {/* Image Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                    <img
                      src={panel.imageSrc}
                      alt={panel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Sweep on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    {/* Inspect Action Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-pink-600/90 text-white text-xs font-mono-cyber font-bold shadow-[0_0_15px_#ff2d8d]">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>4K NEON DETAILS ÖFFNEN</span>
                      </div>
                    </div>
                  </div>

                  {/* Caption & Description Area */}
                  <div className="p-4 bg-gradient-to-b from-[#0c0f1a] to-[#080a12] border-t-2 border-pink-500/50 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-mono-cyber text-cyan-400 font-semibold mb-0.5">
                        {panel.subtitle}
                      </div>
                      <h3 className="text-base font-bold font-display text-white group-hover:text-pink-300 transition-colors mb-2">
                        {panel.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed mb-3">
                        {panel.description}
                      </p>
                    </div>

                    <div>
                      {/* Telemetry Readout */}
                      {panel.techSpec && (
                        <div className="p-2 rounded bg-black/60 border border-slate-800 text-[11px] font-mono-cyber text-cyan-300 mb-2.5 flex items-center space-x-1.5">
                          <Sparkles className="w-3 h-3 text-pink-400 flex-shrink-0" />
                          <span className="truncate">{panel.techSpec}</span>
                        </div>
                      )}

                      {/* Feature Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {panel.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono-cyber px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
