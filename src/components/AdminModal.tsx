import React, { useState, useEffect } from 'react';
import { SiteContent, ImagePanel, ServiceItem, InquiryRecord } from '../types';
import { 
  Lock, KeyRound, ShieldCheck, X, Save, RotateCcw, Plus, Trash2, 
  Upload, Image as ImageIcon, FileText, CheckCircle, AlertTriangle, Sparkles, Mail, Phone, Calendar,
  Building, Send, ExternalLink
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteContent: SiteContent;
  onSaveContent: (newContent: SiteContent) => void;
  onResetContent: () => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

// Encrypted SHA-256 target hash for admin authentication (1304)
const SECURE_ADMIN_HASH = '8ecb5bcd8cd84cc3ffc6f5dc3076d81c0a457a6bd4b305a33f318b623d701c2e';

async function computeSha256(text: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(text.trim());
  const buffer = await crypto.subtle.digest('SHA-256', data);
  const byteArray = Array.from(new Uint8Array(buffer));
  return byteArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  siteContent,
  onSaveContent,
  onResetContent,
  isAdmin,
  setIsAdmin,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<'TEXTE' | 'SERVICES' | 'BILDER' | 'ANFRAGEN'>('TEXTE');
  const [tempContent, setTempContent] = useState<SiteContent>(siteContent);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);

  // Load inquiries from localStorage
  const loadInquiries = () => {
    try {
      const stored = localStorage.getItem('reblix_inquiries');
      if (stored) {
        setInquiries(JSON.parse(stored));
      } else {
        setInquiries([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Sync tempContent and inquiries when siteContent changes or modal opens, and listen to storage events
  useEffect(() => {
    setTempContent(JSON.parse(JSON.stringify(siteContent)));
    loadInquiries();

    const handleStorageChange = () => {
      loadInquiries();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [siteContent, isOpen]);

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter((inq) => inq.id !== id);
    setInquiries(updated);
    try {
      localStorage.setItem('reblix_inquiries', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const hashed = await computeSha256(pinInput);
      if (hashed === SECURE_ADMIN_HASH) {
        setIsAdmin(true);
        setPinError(false);
        setPinInput('');
        try {
          localStorage.setItem('reblix_admin_auth', 'true');
        } catch (err) {
          console.error(err);
        }
        return;
      }
    } catch (err) {
      console.error(err);
    }
    setPinError(true);
    setTimeout(() => setPinError(false), 2500);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem('reblix_admin_auth');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = () => {
    onSaveContent(tempContent);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Möchten Sie wirklich alle Texte und Bilder auf den Standardzustand zurücksetzen?')) {
      onResetContent();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // Image Management Helpers
  const handleImageFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const updated = [...tempContent.images];
          updated[index].imageSrc = event.target.result as string;
          setTempContent({ ...tempContent, images: updated });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newImg: ImagePanel = {
            id: 'img-' + Date.now(),
            title: 'Neues Projekt ' + (tempContent.images.length + 1),
            subtitle: 'Professionelle Reinigungsdokumentation',
            category: 'REFERENZ // NEU',
            imageSrc: event.target.result as string,
            description: 'Beschreibung der durchgeführten Reinigung eingeben...',
            tags: ['Neu', '4K Glanz', 'Reblix'],
            techSpec: 'Reblix Qualitätsstandard erfüllt',
          };
          setTempContent({ ...tempContent, images: [...tempContent.images, newImg] });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (index: number) => {
    if (window.confirm('Dieses Bild wirklich aus der Galerie entfernen?')) {
      const updated = tempContent.images.filter((_, i) => i !== index);
      setTempContent({ ...tempContent, images: updated });
    }
  };

  const handleAddService = () => {
    const newService: ServiceItem = {
      id: 'service-' + Date.now(),
      title: 'Neue Dienstleistung',
      desc: 'Beschreibung der Reinigungsleistung hier eingeben...',
      features: ['Sorgfältige Ausführung', 'Modernste Technik', 'Termintreue'],
    };
    setTempContent({ ...tempContent, services: [...tempContent.services, newService] });
  };

  const handleDeleteService = (index: number) => {
    if (window.confirm('Diese Dienstleistung wirklich löschen?')) {
      const updated = tempContent.services.filter((_, i) => i !== index);
      setTempContent({ ...tempContent, services: updated });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md animate-fade-in font-mono-cyber">
      <div className="relative w-full max-w-5xl rounded-2xl bg-[#090c14] border-2 border-pink-500 shadow-[0_0_40px_rgba(255,45,141,0.4)] flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-pink-950/80 via-black to-cyan-950/80 border-b border-pink-500/40">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-black border border-pink-500 flex items-center justify-center text-pink-400 shadow-[0_0_10px_#ff2d8d]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-display text-white tracking-wider">
                  REBLIX ADMIN-PANEL
                </h2>
                {isAdmin && (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950/90 text-emerald-400 border border-emerald-500 flex items-center gap-1 font-bold">
                    <ShieldCheck className="w-3 h-3" />
                    AUTORISIERT
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                Inhalte, Dienstleistungen, Texte & Bilder direkt bearbeiten
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isAdmin && (
              <button
                onClick={handleLogout}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Abmelden
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-black/60 hover:bg-pink-600/30 border border-slate-700 hover:border-pink-500 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!isAdmin ? (
          /* Login Screen */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-6 overflow-y-auto">
            <div className="w-16 h-16 rounded-2xl bg-pink-950/60 border-2 border-pink-500 flex items-center justify-center text-pink-400 shadow-[0_0_25px_#ff2d8d]">
              <KeyRound className="w-8 h-8 animate-pulse" />
            </div>

            <div className="max-w-md space-y-2">
              <h3 className="text-xl font-bold font-display text-white tracking-wider">
                ADMINISTRATION // PASSWORT EINGEBEN
              </h3>
              <p className="text-xs text-slate-300">
                Bitte geben Sie den 4-stelligen Zugangscode ein, um Texte zu ändern sowie Bilder hinzuzufügen oder zu entfernen.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
              <div className="relative">
                <input
                  type="password"
                  maxLength={20}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Passwort eingeben"
                  autoFocus
                  className={`w-full px-4 py-3 rounded-xl bg-black border text-center text-lg tracking-[0.3em] font-bold text-white outline-none transition-all ${
                    pinError
                      ? 'border-red-500 shadow-[0_0_15px_#ef4444] text-red-300'
                      : 'border-pink-500 focus:border-cyan-400 focus:shadow-[0_0_15px_#00f0ff]'
                  }`}
                />
              </div>

              {pinError && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-red-400 animate-bounce">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Falsches Passwort! Bitte erneut versuchen.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-display text-xs font-bold tracking-widest shadow-[0_0_20px_#ff2d8d] transition-all cursor-pointer"
              >
                ENTSPERREN & ANMELDEN
              </button>
            </form>
          </div>
        ) : (
          /* Logged In Management Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Sub Nav Tabs */}
            <div className="flex items-center gap-2 px-5 py-2.5 bg-black/60 border-b border-slate-800 text-xs">
              <button
                onClick={() => setActiveAdminTab('TEXTE')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  activeAdminTab === 'TEXTE'
                    ? 'bg-pink-600 text-white shadow-[0_0_12px_#ff2d8d]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>TEXTE & ÜBER MICH</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('SERVICES')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  activeAdminTab === 'SERVICES'
                    ? 'bg-pink-600 text-white shadow-[0_0_12px_#ff2d8d]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>DIENSTLEISTUNGEN ({tempContent.services.length})</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('BILDER')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  activeAdminTab === 'BILDER'
                    ? 'bg-pink-600 text-white shadow-[0_0_12px_#ff2d8d]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>BILDER & GALERIE ({tempContent.images.length})</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('ANFRAGEN')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  activeAdminTab === 'ANFRAGEN'
                    ? 'bg-cyan-600 text-white shadow-[0_0_12px_#00f0ff]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>NACHRICHTEN ({inquiries.length})</span>
                {inquiries.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 bg-cyan-400 text-black text-[10px] font-black rounded-full shadow-[0_0_8px_#00f0ff]">
                    {inquiries.length}
                  </span>
                )}
              </button>

              <div className="ml-auto flex items-center gap-2">
                {saveSuccess && (
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 animate-pulse">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Gespeichert!
                  </span>
                )}
                <button
                  onClick={handleReset}
                  title="Alle Änderungen verwerfen und auf Standard zurücksetzen"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Zurücksetzen</span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-[0_0_15px_#10b981] transition-all cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>ÄNDERUNGEN SPEICHERN</span>
                </button>
              </div>
            </div>

            {/* Tab Body */}
            <div className="flex-1 p-5 overflow-y-auto space-y-6 text-xs text-slate-300">
              
              {/* Tab 1: TEXTE & ÜBER MICH */}
              {activeAdminTab === 'TEXTE' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  {/* Hero Headline */}
                  <div className="p-4 rounded-xl bg-black/60 border border-slate-800 space-y-3">
                    <h4 className="text-sm font-bold font-display text-white flex items-center gap-2 text-pink-400">
                      <span>1. HAUPT-ÜBERSCHRIFT & SLOGAN (STARTSEITE)</span>
                    </h4>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">HAUPTTITEL</label>
                      <input
                        type="text"
                        value={tempContent.heroTitle}
                        onChange={(e) => setTempContent({ ...tempContent, heroTitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#0d1019] border border-slate-700 text-white font-bold outline-none focus:border-pink-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">UNTERTITEL / SCHLAGWORTE</label>
                      <input
                        type="text"
                        value={tempContent.heroSubtitle}
                        onChange={(e) => setTempContent({ ...tempContent, heroSubtitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#0d1019] border border-slate-700 text-white outline-none focus:border-pink-500"
                      />
                    </div>
                  </div>

                  {/* "Über mich" Text */}
                  <div className="p-4 rounded-xl bg-black/60 border border-pink-500/40 shadow-[0_0_15px_rgba(255,45,141,0.15)] space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold font-display text-pink-400">
                        2. TEXT "ÜBER MICH" (DOMINIK REHBERGER)
                      </h4>
                      <span className="text-[10px] text-slate-400">
                        Wird auf der Website im Bereich "Über mich" angezeigt
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">TITEL DES BEREICHS</label>
                      <input
                        type="text"
                        value={tempContent.aboutTitle}
                        onChange={(e) => setTempContent({ ...tempContent, aboutTitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#0d1019] border border-slate-700 text-white font-bold outline-none focus:border-pink-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">VOLLSTÄNDIGER TEXT</label>
                      <textarea
                        rows={12}
                        value={tempContent.aboutText}
                        onChange={(e) => setTempContent({ ...tempContent, aboutText: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-lg bg-[#0d1019] border border-slate-700 text-slate-200 text-xs leading-relaxed outline-none focus:border-pink-500 resize-y"
                      />
                    </div>
                  </div>

                  {/* Kontaktangaben */}
                  <div className="p-4 rounded-xl bg-black/60 border border-slate-800 space-y-3">
                    <h4 className="text-sm font-bold font-display text-cyan-400">
                      3. KONTAKTDATEN (EMPFÄNGER-ADRESSE FÜR ANFRAGEN)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">NAME</label>
                        <input
                          type="text"
                          value={tempContent.contactInfo.name}
                          onChange={(e) => setTempContent({
                            ...tempContent,
                            contactInfo: { ...tempContent.contactInfo, name: e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0d1019] border border-slate-700 text-white outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">UNTERNEHMEN</label>
                        <input
                          type="text"
                          value={tempContent.contactInfo.company}
                          onChange={(e) => setTempContent({
                            ...tempContent,
                            contactInfo: { ...tempContent.contactInfo, company: e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0d1019] border border-slate-700 text-white outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">E-MAIL (ANFRAGEN WERDEN HIERHER GESENDET)</label>
                        <input
                          type="email"
                          value={tempContent.contactInfo.email}
                          onChange={(e) => setTempContent({
                            ...tempContent,
                            contactInfo: { ...tempContent.contactInfo, email: e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0d1019] border border-pink-500/60 text-pink-300 font-bold outline-none focus:border-pink-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">TELEFON</label>
                        <input
                          type="text"
                          value={tempContent.contactInfo.phone}
                          onChange={(e) => setTempContent({
                            ...tempContent,
                            contactInfo: { ...tempContent.contactInfo, phone: e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0d1019] border border-slate-700 text-white outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: DIENSTLEISTUNGEN */}
              {activeAdminTab === 'SERVICES' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold font-display text-white">
                        DIENSTLEISTUNGEN VERWALTEN
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Bearbeiten Sie Titel, Beschreibungstexte und Aufzählungspunkte der angebotenen Leistungen.
                      </p>
                    </div>
                    <button
                      onClick={handleAddService}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold shadow-[0_0_10px_#ff2d8d] transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>LEISTUNG HINZUFÜGEN</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {tempContent.services.map((srv, idx) => (
                      <div key={srv.id} className="p-4 rounded-xl bg-black/70 border border-slate-800 space-y-3 relative group">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-xs font-bold text-pink-400">
                            LEISTUNG #0{idx + 1}
                          </span>
                          <button
                            onClick={() => handleDeleteService(idx)}
                            className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-950/40 transition-colors cursor-pointer"
                            title="Diese Leistung löschen"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">TITEL DER LEISTUNG</label>
                            <input
                              type="text"
                              value={srv.title}
                              onChange={(e) => {
                                const updated = [...tempContent.services];
                                updated[idx].title = e.target.value;
                                setTempContent({ ...tempContent, services: updated });
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-[#0d1019] border border-slate-700 text-white font-bold outline-none focus:border-pink-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">STICHWORTE / FEATURES (KOMMA-GETRENNT)</label>
                            <input
                              type="text"
                              value={srv.features.join(', ')}
                              onChange={(e) => {
                                const updated = [...tempContent.services];
                                updated[idx].features = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                                setTempContent({ ...tempContent, services: updated });
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-[#0d1019] border border-slate-700 text-slate-200 outline-none focus:border-cyan-400"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">UNTERTEXT / BESCHREIBUNG</label>
                          <textarea
                            rows={3}
                            value={srv.desc}
                            onChange={(e) => {
                              const updated = [...tempContent.services];
                              updated[idx].desc = e.target.value;
                              setTempContent({ ...tempContent, services: updated });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-[#0d1019] border border-slate-700 text-slate-200 leading-relaxed outline-none focus:border-pink-500 resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: BILDER & GALERIE */}
              {activeAdminTab === 'BILDER' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-pink-950/40 border border-pink-500/50">
                    <div>
                      <h4 className="text-sm font-bold font-display text-white">
                        BILDER VERWALTEN // VORHER-NACHHER & BESCHREIBUNGEN
                      </h4>
                      <p className="text-[11px] text-slate-300">
                        Die ersten zwei Bilder bilden das <strong>Vorher/Nachher-Beispiel nebeneinander</strong>. 
                        Sie können neue Fotos von Ihrem Gerät hochladen oder URLs eingeben.
                      </p>
                    </div>

                    <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-[0_0_12px_#00f0ff] transition-all cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>NEUES BILD HOCHLADEN</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleNewImageUpload}
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {tempContent.images.map((img, idx) => (
                      <div
                        key={img.id}
                        className={`p-4 rounded-xl bg-black/80 border ${
                          idx < 2 ? 'border-pink-500 shadow-[0_0_15px_rgba(255,45,141,0.25)]' : 'border-slate-800'
                        } space-y-3 flex flex-col justify-between`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-bold text-pink-400">
                              {idx === 0 && '⚡ BILD 1: VORHER (NEBENEINANDER)'}
                              {idx === 1 && '⚡ BILD 2: NACHHER (NEBENEINANDER)'}
                              {idx > 1 && `BILD #${idx + 1} (${img.category})`}
                            </span>
                            <button
                              onClick={() => handleDeleteImage(idx)}
                              className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-950/50 cursor-pointer"
                              title="Bild entfernen"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Image preview & replace file */}
                          <div className="flex gap-3 mb-3">
                            <div className="w-24 h-20 rounded-lg overflow-hidden border border-slate-700 bg-black flex-shrink-0">
                              <img
                                src={img.imageSrc}
                                alt={img.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 space-y-1.5">
                              <label className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer">
                                <Upload className="w-3 h-3" />
                                <span>Bilddatei ersetzen</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleImageFileChange(idx, e)}
                                />
                              </label>

                              <div>
                                <input
                                  type="text"
                                  placeholder="Oder Bild-URL einfügen..."
                                  value={img.imageSrc.startsWith('data:') ? '(Lokale Bilddatei hochgeladen)' : img.imageSrc}
                                  onChange={(e) => {
                                    const updated = [...tempContent.images];
                                    updated[idx].imageSrc = e.target.value;
                                    setTempContent({ ...tempContent, images: updated });
                                  }}
                                  className="w-full px-2 py-1 rounded bg-[#0d1019] border border-slate-800 text-[10px] text-slate-300 outline-none truncate"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Editable fields */}
                          <div className="space-y-2">
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-0.5">TITEL</label>
                              <input
                                type="text"
                                value={img.title}
                                onChange={(e) => {
                                  const updated = [...tempContent.images];
                                  updated[idx].title = e.target.value;
                                  setTempContent({ ...tempContent, images: updated });
                                }}
                                className="w-full px-2.5 py-1.5 rounded bg-[#0d1019] border border-slate-700 text-white font-bold text-xs outline-none focus:border-pink-500"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] text-slate-400 mb-0.5">KATEGORIE-TAG</label>
                              <input
                                type="text"
                                value={img.category}
                                onChange={(e) => {
                                  const updated = [...tempContent.images];
                                  updated[idx].category = e.target.value;
                                  setTempContent({ ...tempContent, images: updated });
                                }}
                                className="w-full px-2.5 py-1.5 rounded bg-[#0d1019] border border-slate-700 text-cyan-300 text-xs outline-none focus:border-cyan-400"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] text-slate-400 mb-0.5">BESCHREIBUNG</label>
                              <textarea
                                rows={2}
                                value={img.description}
                                onChange={(e) => {
                                  const updated = [...tempContent.images];
                                  updated[idx].description = e.target.value;
                                  setTempContent({ ...tempContent, images: updated });
                                }}
                                className="w-full px-2.5 py-1.5 rounded bg-[#0d1019] border border-slate-700 text-slate-200 text-xs outline-none focus:border-pink-500 resize-none leading-relaxed"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: ANFRAGEN & POSTEINGANG */}
              {activeAdminTab === 'ANFRAGEN' && (
                <div className="space-y-4 max-w-4xl mx-auto">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-black/60 border border-cyan-500/40">
                    <div>
                      <h4 className="text-sm font-bold font-display text-white flex items-center gap-2">
                        <Mail className="w-4 h-4 text-cyan-400" />
                        <span>EINGEGANGENE NACHRICHTEN & SOFORT-ANFRAGEN</span>
                        <span className="text-xs font-mono-cyber px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                          {inquiries.length} gesamt
                        </span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Hier sehen Sie alle Direktnachrichten mit Firmenname, E-Mail und Telefonnummer, die Besucher über die Website hinterlassen haben.
                      </p>
                    </div>

                    {inquiries.length > 0 && (
                      <button
                        onClick={() => {
                          if (confirm('Möchten Sie wirklich alle Nachrichten löschen?')) {
                            setInquiries([]);
                            localStorage.removeItem('reblix_inquiries');
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-700 text-red-300 text-xs transition-colors cursor-pointer self-start sm:self-auto"
                      >
                        Alle leeren
                      </button>
                    )}
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="p-10 rounded-xl bg-black/40 border border-slate-800 text-center space-y-3">
                      <div className="w-12 h-12 mx-auto rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400">
                        <Mail className="w-6 h-6" />
                      </div>
                      <h5 className="text-sm font-bold font-display text-slate-300">
                        Keine neuen Nachrichten vorhanden
                      </h5>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Sobald ein Besucher über „Sofort Nachricht senden“ eine Anfrage absendet, erscheint sie sofort hier mit Firmenname, Kontaktdaten und Text.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {inquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className="p-4 sm:p-5 rounded-xl bg-[#0c0f18] border-2 border-cyan-500/40 hover:border-cyan-400 space-y-3 transition-colors shadow-lg"
                        >
                          {/* Card Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
                              <span className="font-bold text-white text-sm sm:text-base font-display">{inq.name}</span>
                              
                              {inq.company && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-mono-cyber px-2.5 py-0.5 rounded bg-pink-950/80 text-pink-300 border border-pink-500/50">
                                  <Building className="w-3 h-3 text-pink-400" />
                                  <span>Firma: {inq.company}</span>
                                </span>
                              )}

                              {inq.objectType && !inq.company && (
                                <span className="text-[10px] font-mono-cyber px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                                  {inq.objectType}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono-cyber">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-slate-500" />
                                <span>{inq.date}</span>
                              </span>
                              <button
                                onClick={() => handleDeleteInquiry(inq.id)}
                                title="Nachricht löschen"
                                className="p-1.5 rounded hover:bg-red-950 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Contact Details */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-cyber bg-black/50 p-2.5 rounded-lg border border-slate-800/80">
                            <div className="flex items-center gap-2 text-slate-200">
                              <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                              <span className="text-slate-400">E-Mail:</span>
                              <a href={`mailto:${inq.email}`} className="text-cyan-300 hover:text-cyan-100 underline truncate font-semibold">
                                {inq.email || 'Nicht angegeben'}
                              </a>
                            </div>

                            <div className="flex items-center gap-2 text-slate-200">
                              <Phone className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                              <span className="text-slate-400">Tel:</span>
                              <a href={`tel:${(inq.phone || '').replace(/\s+/g, '')}`} className="text-pink-300 hover:text-pink-100 font-bold truncate">
                                {inq.phone || 'Nicht angegeben'}
                              </a>
                            </div>
                          </div>

                          {/* Message Body */}
                          {inq.message && (
                            <div className="p-3.5 rounded-lg bg-black/80 border border-cyan-500/20 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                              <div className="text-[10px] text-cyan-400 uppercase font-mono-cyber font-bold mb-1">
                                Nachrichtentext:
                              </div>
                              <p className="whitespace-pre-wrap">{inq.message}</p>
                            </div>
                          )}

                          {/* Quick Action Reply Buttons */}
                          <div className="flex flex-wrap items-center gap-2 pt-1 font-mono-cyber">
                            {inq.email && (
                              <a
                                href={`mailto:${inq.email}?subject=${encodeURIComponent(`Reblix Clean Solutions - Antwort auf Ihre Anfrage (${inq.company || inq.name})`)}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400 text-cyan-200 text-xs font-bold transition-colors"
                              >
                                <Mail className="w-3 h-3 text-cyan-300" />
                                <span>Per E-Mail antworten</span>
                              </a>
                            )}

                            {inq.phone && (
                              <a
                                href={`tel:${inq.phone.replace(/\s+/g, '')}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-950/80 hover:bg-pink-900 border border-pink-400 text-pink-200 text-xs font-bold transition-colors"
                              >
                                <Phone className="w-3 h-3 text-pink-300" />
                                <span>Anrufen ({inq.phone})</span>
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Modal Bottom Bar */}
            <div className="flex items-center justify-between px-5 py-3 bg-black/90 border-t border-slate-800 text-xs">
              <span className="text-[11px] text-slate-500">
                Tipp: Alle Änderungen werden direkt im Browser gespeichert und bleiben erhalten.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                >
                  Schließen & Vorschau
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-bold shadow-[0_0_12px_#ff2d8d] cursor-pointer"
                >
                  SPEICHERN
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
