import React, { useState, useEffect } from 'react';
import { ContactInfo, ServiceItem } from '../types';
import { Mail, Phone, User, Building, Copy, Check, Send, Sparkles, MapPin } from 'lucide-react';
import { PartnerBadge } from './PartnerBadge';

interface ContactSectionProps {
  contactInfo: ContactInfo;
  services: ServiceItem[];
  prefilledService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  contactInfo,
  services,
  prefilledService 
}) => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    objectType: prefilledService || (services[0]?.title ?? 'Stiegenaufgang- & Treppenreinigung'),
    message: '',
  });

  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, objectType: prefilledService }));
    }
  }, [prefilledService]);

  const copyContactData = () => {
    const text = `KONTAKT\n${contactInfo.name}\n${contactInfo.company}\n${contactInfo.email}\nTel. ${contactInfo.phone}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Store inquiry locally so Admin can also inspect incoming leads
    try {
      const storedInquiries = JSON.parse(localStorage.getItem('reblix_inquiries') || '[]');
      storedInquiries.unshift({
        id: 'inq-' + Date.now(),
        date: new Date().toLocaleString('de-AT'),
        targetEmail: contactInfo.email,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        objectType: formData.objectType,
        message: formData.message || 'Keine zusätzliche Nachricht angegeben',
      });
      localStorage.setItem('reblix_inquiries', JSON.stringify(storedInquiries));
    } catch (err) {
      console.error('Failed to save inquiry:', err);
    }

    // Show on-page confirmation directly without navigating away to email app
    setFormSubmitted(true);
  };

  return (
    <div id="kontakt" className="w-full mb-10 pt-4">
      {/* Outer Card with Neon Blue & Pink Framing */}
      <div className="rounded-2xl bg-gradient-to-b from-[#0c0f18] via-[#080911] to-black border-2 border-cyan-500/50 shadow-[0_0_35px_rgba(0,240,255,0.25)] p-6 sm:p-8 relative overflow-hidden">
        
        {/* Subtle Cyber Accents */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-start">
          
          {/* Left Column: EXACT required contact details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/70 border border-pink-500/50 text-pink-300 text-xs font-mono-cyber">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>DIREKTER KONTAKT // 24/7 ERREICHBAR</span>
                </div>
                {/* Partner Badge */}
                <PartnerBadge />
              </div>

              {/* Exact Header: KONTAKT */}
              <h2 className="text-3xl sm:text-4xl font-black font-display tracking-wider neon-pink-text mb-3">
                {contactInfo.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Haben Sie Fragen oder möchten Sie ein Angebot anfordern? Jede Anfrage wird direkt an{' '}
                <strong className="text-pink-400 font-mono-cyber underline">{contactInfo.email}</strong> gesendet 
                und persönlich von Dominik Rehberger beantwortet.
              </p>
            </div>

            {/* Exactly formatted required contact card */}
            <div className="p-5 rounded-xl bg-black/80 border-2 border-pink-500 shadow-[0_0_20px_rgba(255,45,141,0.35)] space-y-3.5 font-mono-cyber">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs text-pink-400 font-bold uppercase tracking-widest">
                  KONTAKTDATEN
                </span>
                <button
                  onClick={copyContactData}
                  className="flex items-center space-x-1 text-[11px] text-cyan-300 hover:text-cyan-100 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/40 transition-colors cursor-pointer"
                  title="Alle Kontaktdaten in die Zwischenablage kopieren"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">KOPIERT</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>KOPIEREN</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="text-xl font-bold font-display text-white tracking-wide flex items-center gap-2">
                  <User className="w-4 h-4 text-pink-500" />
                  <span>{contactInfo.name}</span>
                </div>

                <div className="text-sm font-bold text-pink-400 flex items-center gap-2">
                  <Building className="w-4 h-4 text-cyan-400" />
                  <span>{contactInfo.company}</span>
                </div>

                <div className="pt-1">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-cyan-300 hover:text-cyan-100 flex items-center gap-2 group transition-colors text-sm break-all font-semibold"
                  >
                    <Mail className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="underline group-hover:text-cyan-200">{contactInfo.email}</span>
                  </a>
                </div>

                <div>
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
                    className="text-white hover:text-pink-300 flex items-center gap-2 group transition-colors text-base font-bold"
                  >
                    <Phone className="w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="neon-pink-text">Tel. {contactInfo.phone}</span>
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-[11px] text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>{contactInfo.area}</span>
              </div>
            </div>

            {/* Quick Action Dial Buttons */}
            <div className="flex gap-3">
              <a
                href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
                className="flex-1 py-3 px-4 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-display text-xs font-bold tracking-wider text-center shadow-[0_0_15px_#ff2d8d] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>JETZT ANRUFEN</span>
              </a>

              <a
                href={`mailto:${contactInfo.email}?subject=Reblix%20Clean%20Solutions%20Anfrage`}
                className="flex-1 py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-display text-xs font-bold tracking-wider text-center shadow-[0_0_15px_#00f0ff] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>E-MAIL SENDEN</span>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Cyber Inquiry Form */}
          <div className="lg:col-span-7 rounded-xl bg-black/60 border border-slate-800 p-6">
            <h3 className="text-lg font-bold font-display text-white mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>UNVERBINDLICHE ANFRAGE SENDEN</span>
            </h3>
            <p className="text-xs text-slate-400 mb-5 font-mono-cyber">
              Wird direkt an <span className="text-cyan-300 underline font-semibold">{contactInfo.email}</span> übermittelt.
            </p>

            {formSubmitted ? (
              <div className="p-6 sm:p-8 rounded-xl bg-[#0e1620] border-2 border-emerald-500/70 text-center space-y-4 animate-fade-in font-mono-cyber shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-950/80 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 shadow-[0_0_20px_#10b981]">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold font-display text-white tracking-wide">
                  Danke für Ihr Interesse!
                </h4>
                <p className="text-sm text-slate-200 max-w-md mx-auto leading-relaxed font-sans">
                  Wir werden die Anfrage so schnell wie möglich bearbeiten und uns bei Ihnen melden.
                </p>
                <div className="pt-2">
                  <span className="inline-block px-3 py-1 rounded bg-black/60 border border-slate-700 text-xs text-slate-400">
                    Übermittelt an: <span className="text-cyan-300 font-semibold">{contactInfo.email}</span>
                  </span>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => {
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        objectType: services[0]?.title ?? 'Stiegenaufgang- & Treppenreinigung',
                        message: '',
                      });
                      setFormSubmitted(false);
                    }}
                    className="px-5 py-2.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-display font-bold tracking-wider shadow-[0_0_12px_#ff2d8d] transition-all cursor-pointer"
                  >
                    WEITERE ANFRAGE SENDEN
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono-cyber text-slate-300 mb-1">
                      IHR NAME / UNTERNEHMEN *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="z.B. Dominik / Hausverwaltung"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0d1019] border border-slate-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-white text-xs font-mono-cyber outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-cyber text-slate-300 mb-1">
                      TELEFONNUMMER *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="z.B. 0676 123 4567"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0d1019] border border-slate-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-white text-xs font-mono-cyber outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono-cyber text-slate-300 mb-1">
                      IHRE E-MAIL-ADRESSE *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ihre-adresse@beispiel.at"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0d1019] border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white text-xs font-mono-cyber outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-cyber text-slate-300 mb-1">
                      GEWÜNSCHTE LEISTUNG
                    </label>
                    <select
                      value={formData.objectType}
                      onChange={(e) => setFormData({ ...formData, objectType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0d1019] border border-slate-700 focus:border-cyan-400 text-white text-xs font-mono-cyber outline-none transition-all cursor-pointer"
                    >
                      {services.map((srv) => (
                        <option key={srv.id} value={srv.title}>
                          {srv.title}
                        </option>
                      ))}
                      <option value="Individuelle Reinigungsleistung">Weitere / Individuelle Reinigungsarbeiten</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono-cyber text-slate-300 mb-1">
                    NACHRICHT / OBJEKTBESCHREIBUNG (OPTIONAL)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Beschreiben Sie kurz das Objekt, Anzahl der Stiegen/Etagen, Fenster oder besondere Anforderungen..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0d1019] border border-slate-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-white text-xs font-mono-cyber outline-none transition-all placeholder:text-slate-600 resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <span className="text-[11px] text-slate-400 font-mono-cyber">
                    Empfänger: <strong className="text-pink-400">{contactInfo.email}</strong>
                  </span>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-display text-xs font-bold tracking-wider shadow-[0_0_15px_#ff2d8d] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>ANFRAGE AN {contactInfo.email.split('@')[0]} SENDEN</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
