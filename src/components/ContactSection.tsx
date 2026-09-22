import React, { useState } from 'react';
import { ContactInfo, ServiceItem } from '../types';
import { 
  Mail, Phone, User, Building, Copy, Check, Sparkles, MapPin, 
  ExternalLink, HeartHandshake, Send, CheckCircle, MessageSquare 
} from 'lucide-react';
import { PartnerBadge } from './PartnerBadge';
import { saveInquiryToStorage } from '../data/cleaningData';

interface ContactSectionProps {
  contactInfo: ContactInfo;
  services?: ServiceItem[];
  prefilledService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  contactInfo,
}) => {
  const [copied, setCopied] = useState(false);
  const [hasClickedEmail, setHasClickedEmail] = useState(false);

  // Form states for instant direct message
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // Exact target email requested by user
  const emailAddress = contactInfo.email || 'reblixcceansoutions@gmail.com';

  // Direct Gmail web compose link: pre-populates recipient and subject
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}&su=${encodeURIComponent('Reblix Clean Solutions - Anfrage')}`;

  const copyContactData = () => {
    const text = `KONTAKTDATEN\n${contactInfo.name}\n${contactInfo.company}\n${emailAddress}\nTel. ${contactInfo.phone}\n${contactInfo.area}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleEmailClick = () => {
    setHasClickedEmail(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!email.trim() && !phone.trim()) {
      setFormError('Bitte geben Sie mindestens eine E-Mail-Adresse oder Telefonnummer an.');
      return;
    }

    if (!message.trim()) {
      setFormError('Bitte geben Sie Ihre Nachricht ein.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save directly into local storage so Dominik sees it in the Admin-Bereich
      saveInquiryToStorage({
        name: name.trim() || 'Interessent',
        company: company.trim() || 'Privat / Nicht angegeben',
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
        targetEmail: emailAddress,
      });

      // Dispatch storage event so open admin components sync immediately
      window.dispatchEvent(new Event('storage'));

      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset form fields
      setCompany('');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      console.error('Error saving message:', err);
      setIsSubmitting(false);
      setFormError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    }
  };

  return (
    <div id="kontakt" className="w-full mb-10 pt-4">
      {/* Outer Card with Neon Blue & Pink Framing */}
      <div className="rounded-2xl bg-gradient-to-b from-[#0c0f18] via-[#080911] to-black border-2 border-cyan-500/50 shadow-[0_0_35px_rgba(0,240,255,0.25)] p-6 sm:p-10 relative overflow-hidden">
        
        {/* Subtle Cyber Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10 space-y-6 text-center">
          
          {/* Header Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/70 border border-pink-500/50 text-pink-300 text-xs font-mono-cyber">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DIREKTER KONTAKT // 24/7 ERREICHBAR</span>
            </div>
            <PartnerBadge />
          </div>

          {/* Section Heading */}
          <h2 className="text-3xl sm:text-4xl font-black font-display tracking-wider neon-pink-text">
            KONTAKT
          </h2>

          {/* User Requested Prominent Direct Notice */}
          <div className="p-4 sm:p-5 rounded-xl bg-pink-950/30 border border-pink-500/50 font-mono-cyber text-left sm:text-center space-y-2">
            <p className="text-sm sm:text-base text-white font-semibold leading-relaxed">
              Bei Interesse bitte an die E-Mail{' '}
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleEmailClick}
                className="text-cyan-300 hover:text-cyan-100 underline decoration-cyan-400 font-bold transition-colors inline-flex items-center gap-1"
                title="Direkt in Gmail verfassen und senden"
              >
                <span>{emailAddress}</span>
                <ExternalLink className="w-3.5 h-3.5 inline" />
              </a>{' '}
              senden.
            </p>
            <p className="text-xs sm:text-sm text-pink-300 flex items-center justify-start sm:justify-center gap-2">
              <HeartHandshake className="w-4 h-4 text-pink-400 flex-shrink-0" />
              <span>Danke für Ihr Interesse, wir werden uns so schnell wie möglich bei Ihnen melden.</span>
            </p>
          </div>

          {/* Exact Kontaktdaten Card matching user screenshot */}
          <div className="text-left max-w-xl mx-auto p-5 sm:p-6 rounded-xl bg-black/85 border-2 border-pink-500 shadow-[0_0_25px_rgba(255,45,141,0.35)] space-y-3.5 font-mono-cyber">
            
            {/* Header: KONTAKTDATEN with KOPIEREN Button */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <span className="text-xs sm:text-sm text-pink-400 font-bold uppercase tracking-widest">
                KONTAKTDATEN
              </span>
              <button
                onClick={copyContactData}
                className="flex items-center space-x-1 text-[11px] text-cyan-300 hover:text-cyan-100 bg-cyan-950/60 px-3 py-1 rounded border border-cyan-500/40 transition-colors cursor-pointer"
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

            {/* Inhaber / Name */}
            <div className="space-y-2 text-sm pt-1">
              <div className="text-xl sm:text-2xl font-bold font-display text-white tracking-wide flex items-center gap-2.5">
                <User className="w-5 h-5 text-pink-500 flex-shrink-0" />
                <span>{contactInfo.name}</span>
              </div>

              {/* Company */}
              <div className="text-sm sm:text-base font-bold text-pink-400 flex items-center gap-2.5">
                <Building className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span>{contactInfo.company}</span>
              </div>

              {/* Exact E-Mail with Gmail auto-redirect */}
              <div className="pt-1">
                <a
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleEmailClick}
                  className="text-cyan-300 hover:text-cyan-100 flex items-center gap-2.5 group transition-colors text-sm sm:text-base break-all font-semibold"
                  title="Klicken, um die E-Mail direkt in Gmail zu öffnen"
                >
                  <Mail className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="underline group-hover:text-cyan-200">{emailAddress}</span>
                </a>
              </div>

              {/* Phone */}
              <div>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
                  className="text-white hover:text-pink-300 flex items-center gap-2.5 group transition-colors text-base sm:text-lg font-bold"
                >
                  <Phone className="w-5 h-5 text-pink-500 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="neon-pink-text">Tel. {contactInfo.phone}</span>
                </a>
              </div>
            </div>

            {/* Area */}
            <div className="pt-3 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>{contactInfo.area}</span>
            </div>
          </div>

          {/* Feedback message banner upon clicking email */}
          {hasClickedEmail && (
            <div className="max-w-xl mx-auto p-4 rounded-xl bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200 text-center font-mono-cyber shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-fade-in space-y-1">
              <div className="flex items-center justify-center gap-2 font-bold text-sm text-white">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Gmail wurde geöffnet!</span>
              </div>
              <p className="text-xs text-emerald-300">
                Danke für Ihr Interesse, wir werden uns so schnell wie möglich bei Ihnen melden.
              </p>
            </div>
          )}

          {/* Action Buttons: Direct Gmail Compose and Phone Dial */}
          <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3 pt-1">
            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleEmailClick}
              className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-display text-xs font-bold tracking-wider text-center shadow-[0_0_20px_#00f0ff] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>IN GMAIL ÖFFNEN & SENDEN</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <a
              href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
              className="flex-1 py-3 px-5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-display text-xs font-bold tracking-wider text-center shadow-[0_0_18px_#ff2d8d] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>0676 740 8220 ANRUFEN</span>
            </a>
          </div>

          {/* User Requested: SOFORT NACHRICHT SENDEN (unterhalb der E-Mail-Adresse / Kontaktdaten) */}
          <div className="max-w-xl mx-auto pt-6 text-left">
            <div className="rounded-2xl bg-black/90 border-2 border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.3)] p-5 sm:p-7 space-y-4">
              
              {/* Box Title */}
              <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-400 flex items-center justify-center shadow-[0_0_10px_#00f0ff]">
                    <Send className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-display text-white tracking-wide flex items-center gap-2">
                      <span>SOFORT NACHRICHT SENDEN</span>
                    </h3>
                    <p className="text-[11px] text-cyan-300/80 font-mono-cyber">
                      Hinterlassen Sie hier Firmenname, E-Mail & Telefonnummer für Dominik
                    </p>
                  </div>
                </div>
                <div className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-pink-950 border border-pink-500/40 text-pink-300 text-[10px] font-mono-cyber">
                  <MessageSquare className="w-3 h-3 text-pink-400" />
                  <span>DIREKTBOX</span>
                </div>
              </div>

              {/* Success Notification after sending */}
              {submitSuccess ? (
                <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/90 to-black border-2 border-emerald-400 text-center font-mono-cyber space-y-3 shadow-[0_0_25px_rgba(16,185,129,0.35)] animate-fade-in">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-900/60 border border-emerald-400 flex items-center justify-center shadow-[0_0_15px_#10b981]">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold font-display text-white">
                      NACHRICHT ERFOLGREICH ÜBERMITTELT!
                    </h4>
                    <p className="text-sm sm:text-base font-bold text-emerald-300 leading-snug">
                      Danke für deine Nachricht, wir werden uns so schnell wie möglich bei Ihnen melden.
                    </p>
                    <p className="text-xs text-slate-300 pt-1">
                      Ihre Nachricht wurde direkt im Admin-Bereich von Dominik Rehberger hinterlegt.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSubmitSuccess(false)}
                      className="px-4 py-2 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-400 text-emerald-200 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Weitere Nachricht verfassen
                    </button>
                  </div>
                </div>
              ) : (
                /* Form Fields */
                <form onSubmit={handleSendMessage} className="space-y-3.5 font-mono-cyber">
                  {formError && (
                    <div className="p-3 rounded-lg bg-red-950/80 border border-red-500 text-red-200 text-xs">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Firmenname */}
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-300 font-semibold flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Firmenname</span>
                      </label>
                      <input
                        type="text"
                        placeholder="z. B. Hausverwaltung Mustermann GmbH..."
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#080b12] border border-slate-700 focus:border-cyan-400 text-white text-xs outline-none transition-all placeholder:text-slate-600 shadow-inner"
                      />
                    </div>

                    {/* Name / Ansprechpartner */}
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-300 font-semibold flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-pink-400" />
                        <span>Ihr Name / Ansprechpartner</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Vor- und Nachname..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#080b12] border border-slate-700 focus:border-pink-400 text-white text-xs outline-none transition-all placeholder:text-slate-600 shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* E-Mail Adresse */}
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-300 font-semibold flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Ihre E-Mail-Adresse *</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="ihre.adresse@beispiel.at"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#080b12] border border-slate-700 focus:border-cyan-400 text-white text-xs outline-none transition-all placeholder:text-slate-600 shadow-inner"
                      />
                    </div>

                    {/* Telefonnummer */}
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-300 font-semibold flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-pink-400" />
                        <span>Ihre Telefonnummer *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="z. B. 0676 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#080b12] border border-slate-700 focus:border-pink-400 text-white text-xs outline-none transition-all placeholder:text-slate-600 shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Nachricht */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-300 font-semibold flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Ihre Nachricht / Anliegen *</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Beschreiben Sie kurz Ihr Reinigungsvorhaben oder gewünschte Leistungen (z. B. Stiegenhausreinigung, Büroreinigung, Terminwunsch)..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#080b12] border border-slate-700 focus:border-cyan-400 text-white text-xs outline-none transition-all placeholder:text-slate-600 resize-none shadow-inner leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-cyan-600 hover:from-pink-500 hover:to-cyan-500 text-white font-display text-xs sm:text-sm font-bold tracking-widest shadow-[0_0_22px_#ff2d8d] hover:shadow-[0_0_30px_#00f0ff] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" />
                    <span>SOFORT NACHRICHT SENDEN</span>
                  </button>

                  <p className="text-[10px] text-slate-500 text-center pt-0.5">
                    Ihre Daten werden vertraulich behandelt und direkt an Dominik übermittelt.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
