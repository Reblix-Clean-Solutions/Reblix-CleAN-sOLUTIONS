import React, { useState } from 'react';
import { X, ShieldAlert, Lock, ShieldCheck } from 'lucide-react';
import { PartnerBadge } from './PartnerBadge';

interface FooterProps {
  onOpenAdmin?: () => void;
  isAdmin?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, isAdmin }) => {
  const [legalModal, setLegalModal] = useState<'Datenschutzerklärung' | 'Impressum' | 'AGB' | null>(null);

  return (
    <footer className="w-full mt-8 pt-6 border-t border-slate-800 text-center font-mono-cyber select-none">
      <div className="max-w-4xl mx-auto space-y-4">
        
        {/* Hilfreno Partner Badge - Exact requested link and markup */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <PartnerBadge />
          
          {/* Admin Login Button */}
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs border transition-all cursor-pointer ${
                isAdmin
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-[0_0_10px_#10b981]'
                  : 'bg-black/80 border-slate-700 text-slate-400 hover:text-pink-300 hover:border-pink-500/60 shadow-[0_0_10px_rgba(0,0,0,0.5)]'
              }`}
            >
              {isAdmin ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-bold">ADMIN-BEREICH AKTIV</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>ADMIN // LOGIN</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Exactly specified line 1 */}
        <p className="text-xs sm:text-sm text-slate-300 tracking-wide">
          © 2024 Reblix Clean Solutions. Alle Rechte vorbehalten. |{' '}
          <button
            onClick={() => setLegalModal('Datenschutzerklärung')}
            className="hover:text-pink-400 hover:underline transition-colors cursor-pointer"
          >
            Datenschutzerklärung
          </button>{' '}
          |{' '}
          <button
            onClick={() => setLegalModal('Impressum')}
            className="hover:text-pink-400 hover:underline transition-colors cursor-pointer"
          >
            Impressum
          </button>{' '}
          |{' '}
          <button
            onClick={() => setLegalModal('AGB')}
            className="hover:text-pink-400 hover:underline transition-colors cursor-pointer"
          >
            AGB
          </button>
        </p>

        {/* Exactly specified line 2 */}
        <p className="text-xs text-pink-400/90 font-semibold tracking-wider">
          Diese Webseite wurde mit Hilfe von KI erstellt.
        </p>
      </div>

      {/* Legal Dialog Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in text-left">
          <div className="relative w-full max-w-2xl rounded-xl neon-pink-box bg-[#0c0f18] p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center space-x-2 text-pink-400 font-display font-bold">
                <ShieldAlert className="w-5 h-5" />
                <span>{legalModal.toUpperCase()} // REBLIX CLEAN SOLUTIONS</span>
              </div>
              <button
                onClick={() => setLegalModal(null)}
                className="w-7 h-7 rounded bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
              {legalModal === 'Impressum' && (
                <>
                  <p><strong>Medieninhaber & Betreiber:</strong></p>
                  <p>
                    Dominik Rehberger<br />
                    Reblix Clean Solutions<br />
                    E-Mail: reblixmediensolutions@gmail.com<br />
                    Telefon: 0676 740 8220<br />
                    Unternehmensgegenstand: Denkmal-, Fassaden- und Gebäudereinigung, Unterhaltsreinigung, Stiegenhausreinigung.
                  </p>
                  <p>
                    Rechtsform: Einzelunternehmen<br />
                    Gewerbeordnung: www.ris.bka.gv.at<br />
                    Aufsichtsbehörde: Magistrat / Bezirkshauptmannschaft Österreich
                  </p>
                </>
              )}

              {legalModal === 'Datenschutzerklärung' && (
                <>
                  <p><strong>Datenschutz & Datenverarbeitung:</strong></p>
                  <p>
                    Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre 
                    Daten (wie Name, Telefon, E-Mail aus dem Anfrageformular) ausschließlich auf Grundlage der 
                    gesetzlichen Bestimmungen (DSGVO, TKG 2003).
                  </p>
                  <p>
                    Wenn Sie per Formular auf der Website oder per E-Mail Kontakt mit uns aufnehmen, werden Ihre 
                    angegebenen Daten zwecks Bearbeitung der Anfrage direkt an reblixmediensolutions@gmail.com gesendet 
                    und für eventuelle Rückfragen gespeichert.
                  </p>
                </>
              )}

              {legalModal === 'AGB' && (
                <>
                  <p><strong>Allgemeine Geschäftsbedingungen (AGB):</strong></p>
                  <p>
                    1. Geltungsbereich: Für alle Reinigungs- und Dienstleistungsaufträge der Reblix Clean Solutions.<br />
                    2. Leistungserbringung: Die Reinigungsarbeiten werden fachmännisch nach anerkannten Regeln des 
                    Gebäudereiniger-Handwerks unter Einhaltung gültiger Qualitäts- und Sicherheitsstandards durchgeführt.<br />
                    3. Gewährleistung: Etwaige Beanstandungen sind zeitnah nach Durchführung der Arbeiten mitzuteilen.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 pt-3 border-t border-slate-800 text-right">
              <button
                onClick={() => setLegalModal(null)}
                className="px-4 py-1.5 rounded bg-pink-600 hover:bg-pink-500 text-white text-xs font-mono-cyber cursor-pointer"
              >
                SCHLIESSEN
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
