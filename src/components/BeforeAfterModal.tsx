import React, { useState } from 'react';
import { ASSET_IMAGES } from '../data/cleaningData';
import { X, Sparkles, AlertTriangle, CheckCircle, MoveHorizontal } from 'lucide-react';

interface BeforeAfterModalProps {
  isOpen: boolean;
  onClose: () => void;
  beforeImageSrc?: string;
  afterImageSrc?: string;
}

export const BeforeAfterModal: React.FC<BeforeAfterModalProps> = ({ 
  isOpen, 
  onClose,
  beforeImageSrc,
  afterImageSrc 
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  if (!isOpen) return null;

  const currentBefore = beforeImageSrc || ASSET_IMAGES.treppeRedditVorherImg || ASSET_IMAGES.stiegeVorherImg;
  const currentAfter = afterImageSrc || ASSET_IMAGES.treppeRedditNachherImg || ASSET_IMAGES.sztiegenaufgangNachherImg;

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden neon-pink-box-thick bg-[#0b0e17] shadow-[0_0_50px_rgba(255,45,141,0.6)]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#121624] border-b border-pink-500/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-pink-950 border border-pink-500 flex items-center justify-center text-pink-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-white">
                STIEGENHAUS INTENSIV-REINIGUNG // VORHER & NACHHER
              </h3>
              <p className="text-xs font-mono-cyber text-cyan-400">
                VORHER (UNBEHANDELT & NASS) ⇄ NACHHER (MAKIELLOS POLIERT)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-black/60 hover:bg-pink-900 border border-slate-700 hover:border-pink-500 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Interactive Comparison Slider */}
        <div className="p-6">
          <div className="text-xs text-slate-300 mb-3 flex items-center justify-between">
            <span className="flex items-center text-rose-400 font-mono-cyber">
              <AlertTriangle className="w-3.5 h-3.5 mr-1" /> LINKS: Verschmutzter Ausgangszustand
            </span>
            <span className="text-slate-400 font-mono-cyber hidden sm:inline">
              ← SCHIEBER ZIEHEN ZUM VERGLEICHEN →
            </span>
            <span className="flex items-center text-emerald-400 font-mono-cyber">
              <CheckCircle className="w-3.5 h-3.5 mr-1" /> RECHTS: Reblix 4K-Neon Diamantpolitur
            </span>
          </div>

          {/* Interactive Split View */}
          <div
            className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden cursor-ew-resize select-none border-2 border-slate-700"
            onMouseMove={(e) => {
              if (e.buttons === 1) handleSliderMove(e);
            }}
            onClick={handleSliderMove}
            onTouchMove={handleSliderMove}
          >
            {/* After Image (Full background) */}
            <img
              src={currentAfter}
              alt="Nachher sauber"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />

            {/* Before Image (Clipped overlay) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-pink-500 shadow-[0_0_20px_#ff2d8d]"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={currentBefore}
                alt="Vorher schmutzig"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', minWidth: '100%' }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-black/80 border border-red-500/80 text-rose-400 font-mono-cyber text-xs font-bold shadow-[0_0_10px_#ff3b30]">
                VORHER: SCHMUTZIG & NASS
              </div>
            </div>

            {/* After Badge */}
            <div className="absolute top-4 right-4 px-2.5 py-1 rounded bg-black/80 border border-cyan-400 text-cyan-300 font-mono-cyber text-xs font-bold shadow-[0_0_10px_#00f0ff]">
              NACHHER: 4K MAKIELLOS POLIERT
            </div>

            {/* Draggable Divider Handle */}
            <div
              className="absolute inset-y-0 -ml-4 w-8 flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-pink-500 border-2 border-white shadow-[0_0_15px_#ff2d8d] flex items-center justify-center text-white">
                <MoveHorizontal className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Metric Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 font-mono-cyber">
            <div className="p-3 rounded-lg bg-black/50 border border-slate-800">
              <span className="text-[11px] text-slate-400">OBERFLÄCHENDESINFEKTION</span>
              <div className="text-lg font-bold font-display text-pink-400">99.98% REDUKTION</div>
              <p className="text-[11px] text-slate-400 mt-0.5">Entfernung von Keimen, Algen & Salzkristallen</p>
            </div>
            <div className="p-3 rounded-lg bg-black/50 border border-slate-800">
              <span className="text-[11px] font-mono-cyber text-slate-400">LICHTREFLEXIONSINDEX</span>
              <div className="text-lg font-bold font-display text-cyan-400">4K SPIEGELGLANZ</div>
              <p className="text-[11px] text-slate-400 mt-0.5">Atmosphärische Neonlicht-Reflexion</p>
            </div>
            <div className="p-3 rounded-lg bg-black/50 border border-slate-800">
              <span className="text-[11px] font-mono-cyber text-slate-400">TRITTSICHERHEIT</span>
              <div className="text-lg font-bold font-display text-emerald-400">KLASSE R10 ZERTIFIZIERT</div>
              <p className="text-[11px] text-slate-400 mt-0.5">Optimaler Grip trotz extremem Hochglanz</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#0a0d14] border-t border-slate-800">
          <span className="text-xs font-mono-cyber text-slate-400">
            TECHNOLOGIE: REBLIX NANO-POLITUR & HEISSDAMPF-VERFAHREN
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-pink-600 hover:bg-pink-500 text-white font-mono-cyber text-xs font-bold shadow-[0_0_12px_#ff2d8d] transition-all cursor-pointer"
          >
            SCHLIESSEN
          </button>
        </div>
      </div>
    </div>
  );
};
