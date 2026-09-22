export type ActiveTab = 'STARTSEITE' | 'DIENSTLEISTUNGEN' | 'GALERIE' | 'ÜBER MICH';

export interface ImagePanel {
  id: string;
  position?: string;
  title: string;
  subtitle: string;
  category: string;
  imageSrc: string;
  description: string;
  tags: string[];
  techSpec?: string;
  isBeforeAfter?: boolean;
  beforeAfterType?: 'before' | 'after';
  pairedWithId?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  features: string[];
}

export interface ContactInfo {
  title: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  area: string;
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutText: string;
  contactInfo: ContactInfo;
  services: ServiceItem[];
  images: ImagePanel[];
}

export interface InquiryRecord {
  id: string;
  date: string;
  targetEmail: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  objectType?: string;
  message: string;
  read?: boolean;
}
