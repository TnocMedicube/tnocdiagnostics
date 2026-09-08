export type TestCategoryType =
  | 'hematology'
  | 'chemistry'
  | 'microbiology'
  | 'parasitology'
  | 'urinalysis'
  | 'hormones'
  | 'fertility'
  | 'infectious'
  | 'serology'
  | 'specialized'
  | 'imaging';

export interface LabTest {
  id: string;
  name: string;
  code?: string;
  category: TestCategoryType | string;
  sampleType: string;
  description: string;
  evaluates: string;
  clinicalReasons?: string[];
  preparation?: string;
  turnaroundTime: string;
  availability?: 'Available Daily' | 'Routine' | 'Available on Request' | 'Specialized Schedule' | string;
  price?: string; // TZS price e.g. "TZS 15,000" or configurable
  isActive?: boolean;
  isCommon?: boolean;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  department?: string;
  methodology?: string;
}

export interface ImagingService {
  id: string;
  name: string;
  modality: 'Ultrasound' | 'ECG' | 'Digital X-Ray' | 'Other' | string;
  description: string;
  commonIndications?: string[];
  patientPreparation?: string;
  typicalDuration?: string;
  price?: string;
  status?: 'Available' | 'Available on Request' | 'Configurable / Inquiry' | string;
  isActive?: boolean;
  imageSrc?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  description: string;
  imageSrc: string;
  fallbackGradient?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  order?: number;
}

export interface GalleryVideo {
  id: string;
  title: string;
  description: string;
  videoType: 'upload' | 'youtube';
  videoUrl: string;
  youtubeUrl?: string;
  thumbnailUrl?: string;
  isPublished?: boolean;
  order?: number;
  createdAt?: string;
}

export interface OpeningHourDay {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  isOpen: boolean;
  is24Hours: boolean;
  openTime: string; // e.g. "07:30"
  closeTime: string; // e.g. "19:00"
  notes?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  isPublished?: boolean;
  order?: number;
}

export interface HomepageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImage: string;
  primaryCtaText: string;
  primaryCtaLink?: string;
  secondaryCtaText: string;
  secondaryCtaLink?: string;
  featuredServices?: string[];
  featuredTests?: string[];
}

export interface AboutContent {
  aboutTitle: string;
  tagline: string;
  mission: string;
  vision: string;
  facilityOverview: string;
  coreValues: string[];
  whyChooseStatements?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}

export interface PatientInfoContent {
  preparationGuidelines: Array<{
    id: string;
    title: string;
    category: string;
    instructions: string[];
    icon?: string;
  }>;
  turnaroundStandards: Array<{
    id: string;
    category: string;
    timeframe: string;
    notes: string;
  }>;
}

export interface SeoConfig {
  siteTitle: string;
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogImageAlt?: string;
  twitterCard?: 'summary_large_image' | 'summary';
  robots?: string;
  canonicalUrl?: string;
  author?: string;
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  adminUser: string;
  action: string;
  affectedItem: string;
  details?: string;
}

export interface BusinessConfig {
  businessName: string;
  displayName: string;
  shortName: string;
  swahiliName: string;
  tagline: string;
  description: string;
  facilityType?: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappRaw: string;
  email: string;
  secondaryEmail?: string;
  // Director of TNOC Diagnostics
  directorName?: string;
  directorTitle?: string;
  directorPhone?: string;
  directorPhoneRaw?: string;
  directorWhatsapp?: string;
  directorWhatsappRaw?: string;
  directorEmail?: string;
  directorEmails?: string[];
  address: string;
  area: string;
  city: string;
  region: string;
  country: string;
  landmark: string;
  googleMapsQuery: string;
  googleMapsSearchUrl: string;
  googleMapsDirectionsUrl: string;
  googleMapsEmbedUrl?: string;
  latitude: number | null;
  longitude: number | null;
  openingHours: {
    weekdays: string;
    saturdays: string;
    sundays: string;
    emergencyOrHolidays: string;
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    whatsappCommunity?: string;
  };
  logoPath: string;
  logoSvgPath?: string;
  logoFallbackPath?: string;
  officePhotoPath?: string;
  labPhotoPath?: string;
  logoPlaceholderText: string;
}

