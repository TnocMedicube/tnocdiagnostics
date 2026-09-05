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
  category: TestCategoryType;
  sampleType: 'Blood' | 'Urine' | 'Stool' | 'Swab' | 'Semen' | 'Sputum' | 'Fluid' | 'Non-invasive / Scan' | 'Other';
  description: string;
  evaluates: string;
  clinicalReasons: string[];
  preparation?: string;
  turnaroundTime: string;
  availability: 'Available Daily' | 'Routine' | 'Available on Request' | 'Specialized Schedule';
  isCommon?: boolean;
  notes?: string;
}

export interface ImagingService {
  id: string;
  name: string;
  modality: 'Ultrasound' | 'ECG' | 'Digital X-Ray' | 'Other';
  description: string;
  commonIndications: string[];
  patientPreparation?: string;
  typicalDuration: string;
  status: 'Available' | 'Available on Request' | 'Configurable / Inquiry';
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  description: string;
  imageSrc: string;
  fallbackGradient?: string;
}

export interface BusinessConfig {
  businessName: string;
  displayName: string;
  shortName: string;
  swahiliName: string;
  tagline: string;
  description: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappRaw: string;
  email: string;
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
