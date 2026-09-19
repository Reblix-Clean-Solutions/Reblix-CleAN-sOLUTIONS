import React, { useState, useEffect } from 'react';
import { ActiveTab, ImagePanel, SiteContent } from './types';
import { loadSiteContent, saveSiteContent, resetSiteContent } from './data/cleaningData';
import { CyberBackground } from './components/CyberBackground';
import { BrowserChromeFrame } from './components/BrowserChromeFrame';
import { HeaderNav } from './components/HeaderNav';
import { HeroBanner } from './components/HeroBanner';
import { ImageGrid2x3 } from './components/ImageGrid2x3';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BeforeAfterModal } from './components/BeforeAfterModal';
import { ImageDetailModal } from './components/ImageDetailModal';
import { AdminModal } from './components/AdminModal';
import { ShieldCheck, Edit3, LogOut } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('STARTSEITE');
  const [selectedPanel, setSelectedPanel] = useState<ImagePanel | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [prefilledService, setPrefilledService] = useState<string | undefined>(undefined);

  // Dynamic Site Content loaded from localStorage
  const [siteContent, setSiteContent] = useState<SiteContent>(() => loadSiteContent());

  // Admin Mode state (verschlüsselter Admin-Bereich)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('reblix_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  const handleOpenContact = (serviceName?: string) => {
    if (serviceName) setPrefilledService(serviceName);
    const contactElem = document.getElementById('kontakt');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSaveContent = (newContent: SiteContent) => {
    setSiteContent(newContent);
    saveSiteContent(newContent);
  };

  const handleResetContent = () => {
    const defaultContent = resetSiteContent();
    setSiteContent(defaultContent);
  };

  return (
    <CyberBackground>
      {/* Optional Top Floating Cyber Admin Toolbar when logged in */}
      {isAdmin && (
        <div className="fixed top-0 inset-x-0 z-40 bg-pink-950/90 border-b border-pink-500/80 px-4 py-1.5 flex items-center justify-between text-xs font-mono-cyber shadow-[0_4px_15px_rgba(255,45,141,0.3)]">
          <div className="flex items-center gap-2 text-pink-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ADMIN-MODUS AKTIV // Dominik Rehberger</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="flex items-center gap-1 text-white bg-pink-600 hover:bg-pink-500 px-3 py-0.5 rounded font-bold transition-all shadow-[0_0_8px_#ff2d8d] cursor-pointer"
            >
              <Edit3 className="w-3 h-3" />
              <span>Admin-Panel öffnen</span>
            </button>
            <button
              onClick={() => {
                setIsAdmin(false);
                try {
                  localStorage.removeItem('reblix_admin_auth');
                } catch (e) {
                  console.error(e);
                }
              }}
              className="flex items-center gap-1 text-slate-300 hover:text-white bg-black/60 px-2.5 py-0.5 rounded border border-slate-700 cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>Abmelden</span>
            </button>
          </div>
        </div>
      )}

      {/* 16:9 Chrome Browser Window Frame */}
      <BrowserChromeFrame>
        {/* Navigation Header */}
        <HeaderNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenContact={() => handleOpenContact()}
          onOpenAdmin={() => setIsAdminModalOpen(true)}
          isAdmin={isAdmin}
          phoneNumber={siteContent.contactInfo.phone}
        />

        {/* Dynamic Tab Views */}
        {activeTab === 'STARTSEITE' && (
          <main>
            {/* Central Large Text Field */}
            <HeroBanner
              title={siteContent.heroTitle}
              subtitle={siteContent.heroSubtitle}
              onCompareStairs={() => setIsCompareOpen(true)}
              onExploreServices={() => setActiveTab('DIENSTLEISTUNGEN')}
              isAdmin={isAdmin}
              onOpenAdmin={() => setIsAdminModalOpen(true)}
            />

            {/* Images Grid with Top 2 Images side-by-side as Before/After */}
            <ImageGrid2x3
              images={siteContent.images}
              onSelectPanel={(panel) => setSelectedPanel(panel)}
              onOpenCompare={() => setIsCompareOpen(true)}
              isAdmin={isAdmin}
              onOpenAdmin={() => setIsAdminModalOpen(true)}
            />

            {/* "Über mich" Section by Dominik Rehberger */}
            <AboutSection 
              aboutTitle={siteContent.aboutTitle}
              aboutText={siteContent.aboutText}
              onOpenContact={() => handleOpenContact()} 
              isAdmin={isAdmin}
              onOpenAdmin={() => setIsAdminModalOpen(true)}
            />
          </main>
        )}

        {activeTab === 'DIENSTLEISTUNGEN' && (
          <main>
            <ServicesSection
              services={siteContent.services}
              onOpenContact={(srv) => handleOpenContact(srv)}
              onCompareStairs={() => setIsCompareOpen(true)}
              isAdmin={isAdmin}
              onOpenAdmin={() => setIsAdminModalOpen(true)}
            />
            {/* Also show the image gallery for reference */}
            <ImageGrid2x3
              images={siteContent.images}
              onSelectPanel={(panel) => setSelectedPanel(panel)}
              onOpenCompare={() => setIsCompareOpen(true)}
              isAdmin={isAdmin}
              onOpenAdmin={() => setIsAdminModalOpen(true)}
            />
          </main>
        )}

        {activeTab === 'GALERIE' && (
          <main>
            <div className="mb-6 p-4 rounded-xl bg-pink-950/40 border border-pink-500 text-center font-mono-cyber">
              <h2 className="text-xl font-bold font-display text-white neon-pink-text mb-1">
                4K NEON REFERENZ-GALERIE // VORHER & NACHHER
              </h2>
              <p className="text-xs text-slate-300">
                Die ersten zwei Fotos stellen den direkten Vorher-/Nachher-Vergleich dar. Wählen Sie ein Motiv für die 4K-Vollbild-Inspektion.
              </p>
            </div>
            <ImageGrid2x3
              images={siteContent.images}
              onSelectPanel={(panel) => setSelectedPanel(panel)}
              onOpenCompare={() => setIsCompareOpen(true)}
              isAdmin={isAdmin}
              onOpenAdmin={() => setIsAdminModalOpen(true)}
            />
          </main>
        )}

        {activeTab === 'ÜBER MICH' && (
          <main>
            <AboutSection 
              aboutTitle={siteContent.aboutTitle}
              aboutText={siteContent.aboutText}
              onOpenContact={() => handleOpenContact()} 
              isAdmin={isAdmin}
              onOpenAdmin={() => setIsAdminModalOpen(true)}
            />
          </main>
        )}

        {/* KONTAKT Section (Always clearly present below) */}
        <ContactSection 
          contactInfo={siteContent.contactInfo}
          services={siteContent.services}
          prefilledService={prefilledService} 
        />

        {/* Footer */}
        <Footer 
          onOpenAdmin={() => setIsAdminModalOpen(true)} 
          isAdmin={isAdmin} 
        />
      </BrowserChromeFrame>

      {/* Interactive Before/After Comparison Modal (Die beiden hinzugefügten Fotos) */}
      <BeforeAfterModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        beforeImageSrc={siteContent.images[0]?.imageSrc}
        afterImageSrc={siteContent.images[1]?.imageSrc}
      />

      {/* 4K Image Detail Inspection Modal */}
      <ImageDetailModal
        panel={selectedPanel}
        onClose={() => setSelectedPanel(null)}
        onOpenContact={() => handleOpenContact(selectedPanel?.title)}
      />

      {/* Admin Dashboard & Security Modal */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        siteContent={siteContent}
        onSaveContent={handleSaveContent}
        onResetContent={handleResetContent}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
    </CyberBackground>
  );
}
