import { SiteContent, InquiryRecord } from '../types';

import arBgImg from '../assets/images/ar_reblix_bg_1789845816451.jpg';
import putzfetzenImg from '../assets/images/putzfetzen_stiege_1789845839856.jpg';
import stiegeVorherImg from '../assets/images/stiege_vorher_1789845860148.jpg';
import sztiegenaufgangNachherImg from '../assets/images/sztiegenaufgang_nachher_1789845874550.jpg';
import treppeRedditVorherImg from '../assets/images/treppe_reddit_1.jpg';
import treppeRedditNachherImg from '../assets/images/treppe_reddit_2_opt.jpg';

export const ASSET_IMAGES = {
  bgImage: arBgImg,
  treppeRedditVorherImg,
  treppeRedditNachherImg,
  stiegeVorherImg,
  sztiegenaufgangNachherImg,
  putzfetzenImg,
};

export const INITIAL_SITE_CONTENT: SiteContent = {
  heroTitle: 'Reblix-Services',
  heroSubtitle: 'High-End Gebäudereinigung • Stiegenhaus-Diamantpolitur • Hygiene-Sanierung',
  aboutTitle: 'Über mich',
  aboutText: `Mein Name ist Dominik und ich stehe hinter REBLIX Clean Solutions. Mein Ziel ist es, Kunden eine zuverlässige, gründliche und professionelle Reinigung zu bieten, auf die sie sich langfristig verlassen können.

Sauberkeit und Ordnung sind für mich nicht nur eine Dienstleistung, sondern ein wichtiger Bestandteil eines angenehmen und gepflegten Umfelds. Deshalb lege ich großen Wert auf eine sorgfältige Arbeitsweise und darauf, auch kleinere Details nicht zu übersehen.

Ich biete meine Reinigungsleistungen sowohl für private Haushalte als auch für Unternehmen und gewerbliche Räumlichkeiten an. Dazu gehören unter anderem Gebäudereinigung, Büroreinigung, Unterhaltsreinigung, Stiegenhausreinigung, Grundreinigung und weitere individuelle Reinigungsarbeiten.

Mir ist wichtig, vor jedem Auftrag genau zu verstehen, welche Wünsche und Anforderungen der Kunde hat. Deshalb bespreche ich die Aufgaben und den gewünschten Umfang individuell und suche gemeinsam mit dem Kunden nach einer passenden Lösung.

Ich arbeite zuverlässig, gewissenhaft und verantwortungsvoll. Vereinbarte Termine und Absprachen sind für mich selbstverständlich. Dabei möchte ich nicht nur eine schnelle Reinigung anbieten, sondern ein Ergebnis, mit dem meine Kunden zufrieden sind.

REBLIX Clean Solutions befindet sich im Aufbau und soll für einen modernen, zuverlässigen und kundenorientierten Reinigungsservice stehen. Mein Anspruch ist es, langfristige Kundenbeziehungen aufzubauen und durch gute Arbeit weiterempfohlen zu werden.

Ich freue mich über jede Anfrage und darauf, Kunden bei der Reinigung ihrer Räumlichkeiten zuverlässig zu unterstützen.`,
  contactInfo: {
    title: 'KONTAKT',
    name: 'Dominik Rehberger',
    company: 'Reblix Clean Solutions',
    email: 'reblixcceansoutions@gmail.com',
    phone: '0676 740 8220',
    area: 'Wien, Niederösterreich & ganz Österreich',
  },
  services: [
    {
      id: 'stiegenaufgang',
      title: 'Stiegenaufgang- & Treppenreinigung',
      desc: 'Umfassende Kehrung, Nasswischung, Desinfektion von Handläufen und modernste Diamantpolitur für Stiegenhäuser jeder Größenordnung.',
      features: [
        'Salz- & Schmutzentfernung',
        'Geländer- & Handlauf-Desinfektion',
        'Geruchsneutralisation',
        'Langzeit-Oberflächenschutz',
      ],
    },
    {
      id: 'grosskueche',
      title: 'Großküchen- & Hygiene-Sanierung',
      desc: 'Hygienische Tiefenreinigung für Gastronomie, Hotels und Kantinen nach strengen HACCP- und ÖNORM-Richtlinien.',
      features: [
        'Dampfstrahl-Fettlösung',
        'Lüftungs- & Haubenreinigung',
        'Edelstahl-Veredelung',
        'Bakterielle Abklatsch-Proben',
      ],
    },
    {
      id: 'fensterputzen',
      title: 'Fensterputzen',
      desc: 'Streifenfreie Glas-, Rahmen- & Schaufensterreinigung mit moderner Reinstwasser- und Abziehtechnologie für kristallklaren Durchblick ohne Schlieren.',
      features: [
        'Streifenfreier Glanz ohne Schlieren',
        'Rahmen-, Sims- & Falzreinigung',
        'Osmose- & Reinstwasser-Verfahren',
        'Schaufenster- & Wintergartenreinigung',
      ],
    },
    {
      id: 'wohnungsreinigung',
      title: 'Wohnungsreinigung',
      desc: 'Zuverlässige und diskrete Reinigung für private Haushalte und Wohnungen. Von der regelmäßigen Unterhaltsreinigung bis zur gründlichen End- oder Frühjahrsreinigung.',
      features: [
        'Bad-, WC- & Sanitär-Tiefenhygiene',
        'Küchenreinigung inkl. Oberflächen & Geräte',
        'Gründliche Bodenpflege aller Beläge',
        'Individuelle Wünsche & flexible Intervalle',
      ],
    },
  ],
  images: [
    {
      id: 'img-reddit-treppe-vorher',
      position: 'top-left',
      title: 'Stiegenaufgang: VORHER (Abnutzung & Sanierungsfall)',
      subtitle: 'Ausgangszustand vor der professionellen Sanierung',
      category: 'VORHER // SANIERUNGSBEDARF',
      imageSrc: treppeRedditVorherImg,
      description: 'Treppenstufen mit starker Beanspruchung, Kratzern und Schmutzspuren vor der professionellen Grundreinigung, Aufbereitung und Versiegelung.',
      tags: ['Vorher', 'Stiegenaufgang', 'Treppenstufen', 'Sanierungsbedarf'],
      techSpec: 'Schritt 1: Analyse von Substanz, Trittspuren und Schmutzschichten',
      isBeforeAfter: true,
      beforeAfterType: 'before',
      pairedWithId: 'img-reddit-treppe-nachher',
    },
    {
      id: 'img-reddit-treppe-nachher',
      position: 'top-right',
      title: 'Stiegenaufgang: NACHHER (Aufbereitet & Versiegelt)',
      subtitle: 'Sauberes Meisterergebnis nach Reblix-Aufbereitung',
      category: 'NACHHER // REBLIX MEISTERGLANZ',
      imageSrc: treppeRedditNachherImg,
      description: 'Der vollständig aufbereitete Stiegenaufgang: Saubere Trittflächen, glatte Kanten und tiefenwirksamer Oberflächenschutz für langanhaltende Frische.',
      tags: ['Nachher', 'Stiegenaufgang', 'Meisterglanz', 'Versiegelt'],
      techSpec: 'Schritt 2: Porentiefe Reinigung, Veredelung und Schutzversiegelung',
      isBeforeAfter: true,
      beforeAfterType: 'after',
      pairedWithId: 'img-reddit-treppe-vorher',
    },
    {
      id: 'img-stiege-vorher',
      position: 'center-left',
      title: 'Granit-Stiegenhaus: VORHER (In Reinigung)',
      subtitle: 'Ausgangszustand während der Grundreinigung',
      category: 'REFERENZ // GRUNDREINIGUNG',
      imageSrc: stiegeVorherImg,
      description: 'Treppenstufen mit alltäglicher Beanspruchung, Feuchtigkeit und Laufspuren während des ersten Reinigungsschrittes vor der finalen Versiegelung und Politur.',
      tags: ['Granitstufen', 'Nassreinigung', 'Stiegenaufgang'],
      techSpec: 'Schritt 1: Beseitigung von Grobschmutz und feuchten Trittspuren',
    },
    {
      id: 'img-stiege-nachher',
      position: 'center-middle',
      title: 'Granit-Stiegenhaus: NACHHER (Makellos Sauber)',
      subtitle: 'Perfektes Endergebnis nach Reblix-Reinigung',
      category: 'REFERENZ // MEISTERGLANZ',
      imageSrc: sztiegenaufgangNachherImg,
      description: 'Der komplett gereinigte Stiegenaufgang aus der oberen Perspektive: Streifenfreie, glänzende Granitstufen, hygienisch saubere Geländer und ein gepflegtes Gesamtbild.',
      tags: ['Nachher', 'Makellos Sauber', 'Glanzpolitur'],
      techSpec: 'Schritt 2: Vollständig getrocknet, desinfiziert und porentief sauber',
    },
    {
      id: 'img-equipment-stiege',
      position: 'center-right',
      title: 'Stiegenhaus-Reinigung & Profi-Equipment',
      subtitle: 'Hochwertige Reinigungsausrüstung im Einsatz',
      category: 'EQUIPMENT // STIEGENPFLEGE',
      imageSrc: putzfetzenImg,
      description: 'Professionelles Reinigungsequipment für die Stiegenhauspflege: Ergonomischer Mikrofaser-Wischmopp und Spezialreinigungslösung auf sauber gepflegten Granitstufen für streifenfreie Unterhaltsreinigung.',
      tags: ['Wischmopp', 'Granitstufen', 'Profi-Reinigung'],
      techSpec: 'Materialschonende Pflege für Stein-, Holz- und Fliesenbeläge',
    },
  ],
};

const STORAGE_KEY = 'reblix_site_content_v7';

export function loadSiteContent(): SiteContent {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('reblix_site_content_v6') || localStorage.getItem('reblix_site_content_v5');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Validate structure basic check
      if (parsed && Array.isArray(parsed.services) && Array.isArray(parsed.images)) {
        if (!parsed.heroTitle || parsed.heroTitle.includes('Zukunft der Sauberkeit')) {
          parsed.heroTitle = 'Reblix-Services';
        }
        if (parsed.contactInfo) {
          if (!parsed.contactInfo.email || parsed.contactInfo.email.includes('reblixmedien')) {
            parsed.contactInfo.email = 'reblixcceansoutions@gmail.com';
          }
        }
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load site content from localStorage:', e);
  }
  return INITIAL_SITE_CONTENT;
}

export function saveSiteContent(content: SiteContent): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch (e) {
    console.error('Failed to save site content to localStorage:', e);
  }
}

export function resetSiteContent(): SiteContent {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear storage:', e);
  }
  return INITIAL_SITE_CONTENT;
}

const INQUIRIES_STORAGE_KEY = 'reblix_inquiries';

export function loadInquiriesFromStorage(): InquiryRecord[] {
  try {
    const stored = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load inquiries:', e);
  }
  return [];
}

export function saveInquiryToStorage(inquiryData: {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  targetEmail?: string;
}): InquiryRecord {
  const current = loadInquiriesFromStorage();
  const newRecord: InquiryRecord = {
    id: 'inq_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    date: new Date().toLocaleString('de-AT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    targetEmail: inquiryData.targetEmail || 'reblixcceansoutions@gmail.com',
    name: inquiryData.name || 'Interessent',
    company: inquiryData.company,
    email: inquiryData.email,
    phone: inquiryData.phone,
    objectType: inquiryData.company ? `Firma: ${inquiryData.company}` : 'Direktanfrage',
    message: inquiryData.message,
    read: false,
  };
  const updated = [newRecord, ...current];
  try {
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to persist inquiry:', e);
  }
  return newRecord;
}
