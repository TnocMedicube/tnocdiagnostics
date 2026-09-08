import { BusinessConfig } from '../types';

/**
 * =========================================================================
 * TNOC MEDICAL DIAGNOSTIC FACILITY - CENTRAL CONFIGURATION
 * =========================================================================
 * 
 * IMPORTANT CONFIGURATION NOTICE:
 * As mandated, we DO NOT fabricate phone numbers, street landmarks, exact
 * coordinates, or operating hours. Replace the marked placeholders below
 * with your verified business credentials.
 * 
 * Once updated here, the entire website will automatically reflect your
 * verified details across the Header, Hero, Contact, Footer, and Google Maps.
 */

export const TNOC_BUSINESS_CONFIG: BusinessConfig = {
  // Official Business Names
  businessName: 'TNOC MEDICAL DIAGNOSTIC FACILITY',
  displayName: 'TNOC DIAGNOSTICS (MAABARA YA MSAMVU)',
  shortName: 'TNOC Diagnostics',
  swahiliName: 'Maabara ya Msamvu',
  tagline: 'Reliable Medical Diagnostics You Can Trust',
  description:
    'Professional diagnostic laboratory and medical imaging investigations facility dedicated to clinical accuracy, timely results, patient confidentiality, and compassionate care.',

  // Verified Primary Contact Channels (Director & Facility Desk)
  phone: '0741 405 988',
  phoneRaw: '+255741405988',

  whatsapp: '0741 405 988',
  whatsappRaw: '255741405988',

  email: 'drmonasser04@gmail.com',
  secondaryEmail: 'tnocmedicube@gmail.com',

  // Director of TNOC Diagnostics
  directorName: 'Dr. Monasser',
  directorTitle: 'Director of TNOC Diagnostics',
  directorPhone: '0741 405 988',
  directorPhoneRaw: '+255741405988',
  directorWhatsapp: '0741 405 988',
  directorWhatsappRaw: '255741405988',
  directorEmail: 'drmonasser04@gmail.com',
  directorEmails: ['drmonasser04@gmail.com', 'tnocmedicube@gmail.com'],

  // Location Details (Verified locality: Msamvu, Morogoro, Tanzania)
  address: 'Msamvu Area, Morogoro, Tanzania',
  area: 'Msamvu',
  city: 'Morogoro',
  region: 'Morogoro Region',
  country: 'Tanzania',
  landmark: 'Msamvu Area, Morogoro (Coordinates: -6.802722, 37.661222)',

  // Google Maps Integration (Verified Coordinates: -6.802722, 37.661222)
  googleMapsQuery: 'TNOC DIAGNOSTICS (MAABARA YA MSAMVU)',
  googleMapsSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=-6.802722,37.661222',
  googleMapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=-6.802722,37.661222',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=-6.802722,37.661222&hl=en&z=17&output=embed',

  latitude: -6.802722,
  longitude: 37.661222,

  // Operating Schedule
  openingHours: {
    weekdays: 'Monday – Friday: [Insert Verified Hours, e.g. 7:30 AM – 7:00 PM]',
    saturdays: 'Saturday: [Insert Verified Hours, e.g. 8:00 AM – 5:00 PM]',
    sundays: 'Sunday: [Insert Verified Hours / On-Call Investigations]',
    emergencyOrHolidays: 'Public Holidays: [Insert Verified Status]',
  },

  socialMedia: {
    facebook: '',
    instagram: '',
    whatsappCommunity: '',
  },

  // Primary Logo & Visual Asset Paths (Official TNOC Medical Stethoscope Logo)
  logoPath: '/logo.png',
  logoSvgPath: '/logo.svg',
  logoFallbackPath: '/assets/logo.png',
  officePhotoPath: '/assets/tnoc_facility_day.jpg',
  labPhotoPath: '/assets/tnoc-laboratory.jpg',
  logoPlaceholderText: 'TNOC DIAGNOSTICS',
};

/**
 * Official TNOC Brand Color Palette: Red, Blue, and White
 * - Royal & Clinical Navy Blue: Trust, precision, clinical excellence
 * - Diagnostic Medical Red: Urgency, vitality, healthcare symbol
 * - Crisp Medical White: Cleanliness, purity, modern diagnostic hygiene
 */
export const TNOC_THEME = {
  primary: '#0F2942',      // Deep Clinical Navy Blue
  primaryLight: '#1E40AF', // Royal Medical Blue
  blue: '#1E40AF',         // Diagnostic Blue
  blueLight: '#DBEAFE',    // Soft Blue Tint
  blueHover: '#1D4ED8',    // Bright Royal Blue
  red: '#DC2626',          // Medical Diagnostic Red
  redLight: '#FEE2E2',     // Soft Red Tint
  redHover: '#B91C1C',     // Deep Crimson Red
  white: '#FFFFFF',        // Pure Medical White
  bgLight: '#F8FAFC',      // Crisp Medical Slate Canvas
  cardBg: '#FFFFFF',
  textMain: '#0F172A',
  textMuted: '#64748B',
  accent: '#DC2626',       // Red accent for high-priority diagnostic alerts & primary CTAs
};
