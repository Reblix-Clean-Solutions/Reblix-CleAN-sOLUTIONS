import React from 'react';

export const PartnerBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`inline-flex items-center px-3.5 py-1.5 rounded-xl bg-black/80 border border-pink-500/40 hover:border-pink-400 shadow-[0_0_12px_rgba(255,45,141,0.25)] hover:shadow-[0_0_18px_rgba(255,45,141,0.4)] transition-all ${className}`}>
      <a
        href="https://hilfreno.at"
        title="Handwerker finden auf hilfreno.at"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-xs font-mono-cyber text-slate-200 hover:text-white transition-colors"
      >
        <img
          src="https://hilfreno.at/favicon-48x48.png"
          alt="Partner von hilfreno.at"
          width="24"
          height="24"
          style={{ verticalAlign: 'middle', border: 0 }}
        />
        <span style={{ verticalAlign: 'middle' }} className="font-semibold tracking-wide">
          Partner von hilfreno.at
        </span>
      </a>
    </div>
  );
};
