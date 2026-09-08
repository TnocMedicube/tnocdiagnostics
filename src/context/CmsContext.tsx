import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import {
  LabTest,
  ImagingService,
  GalleryPhoto,
  GalleryVideo,
  OpeningHourDay,
  FaqItem,
  HomepageContent,
  AboutContent,
  PatientInfoContent,
  SeoConfig,
  ActivityLogItem,
  BusinessConfig,
} from '../types';
import {
  ALL_LAB_TESTS,
  IMAGING_SERVICES,
  FACILITY_GALLERY,
  WHY_CHOOSE_US_ITEMS,
} from '../data/testsData';
import { TNOC_BUSINESS_CONFIG } from '../config/businessConfig';
import { api } from '../services/api';

// Versioned local storage keys for persistence
const CMS_STORAGE_KEYS = {
  TESTS: 'tnoc_cms_tests_v3',
  SERVICES: 'tnoc_cms_services_v3',
  GALLERY: 'tnoc_cms_gallery_v3',
  VIDEOS: 'tnoc_cms_videos_v3',
  HOURS: 'tnoc_cms_hours_v3',
  FAQS: 'tnoc_cms_faqs_v3',
  HOMEPAGE: 'tnoc_cms_homepage_v3',
  ABOUT: 'tnoc_cms_about_v3',
  PATIENT_INFO: 'tnoc_cms_patient_info_v3',
  SEO: 'tnoc_cms_seo_v3',
  BUSINESS: 'tnoc_cms_business_v3',
  ACTIVITY_LOG: 'tnoc_cms_activity_log_v3',
  ADMIN_USER: 'tnoc_cms_admin_user_v3',
};

// Initial realistic default tests with TZS pricing
const INITIAL_TESTS: LabTest[] = ALL_LAB_TESTS.map((t, index) => {
  let defaultPrice = 'Price on Inquiry';
  if (t.id.includes('cbc') || t.id.includes('fbp')) defaultPrice = 'TZS 15,000';
  else if (t.id.includes('hemoglobin')) defaultPrice = 'TZS 5,000';
  else if (t.id.includes('esr')) defaultPrice = 'TZS 8,000';
  else if (t.id.includes('blood-grouping')) defaultPrice = 'TZS 10,000';
  else if (t.id.includes('glucose') || t.id.includes('sugar')) defaultPrice = 'TZS 5,000';
  else if (t.id.includes('hba1c')) defaultPrice = 'TZS 25,000';
  else if (t.id.includes('lipid')) defaultPrice = 'TZS 35,000';
  else if (t.id.includes('rft') || t.id.includes('renal') || t.id.includes('creatinine')) defaultPrice = 'TZS 35,000';
  else if (t.id.includes('lft') || t.id.includes('liver')) defaultPrice = 'TZS 40,000';
  else if (t.id.includes('electrolyte')) defaultPrice = 'TZS 35,000';
  else if (t.id.includes('uric-acid')) defaultPrice = 'TZS 15,000';
  else if (t.id.includes('urinalysis') || t.id.includes('urine')) defaultPrice = 'TZS 7,000';
  else if (t.id.includes('malaria')) defaultPrice = 'TZS 5,000';
  else if (t.id.includes('stool')) defaultPrice = 'TZS 7,000';
  else if (t.id.includes('widal') || t.id.includes('typhoid')) defaultPrice = 'TZS 10,000';
  else if (t.id.includes('h-pylori')) defaultPrice = 'TZS 15,000';
  else if (t.id.includes('hepatitis')) defaultPrice = 'TZS 15,000';
  else if (t.id.includes('hiv')) defaultPrice = 'TZS 0 (Counseling & Screen)';
  else if (t.id.includes('syphilis') || t.id.includes('vdrl')) defaultPrice = 'TZS 10,000';
  else if (t.id.includes('crp')) defaultPrice = 'TZS 20,000';
  else if (t.id.includes('tsh') || t.id.includes('thyroid')) defaultPrice = 'TZS 35,000';
  else if (t.id.includes('psa')) defaultPrice = 'TZS 45,000';
  else if (t.id.includes('semen')) defaultPrice = 'TZS 30,000';
  else if (t.id.includes('culture')) defaultPrice = 'TZS 40,000';

  return {
    ...t,
    price: defaultPrice,
    isActive: true,
    isCommon: t.isCommon ?? index < 15,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  };
});

// Initial Services
const INITIAL_SERVICES: ImagingService[] = [
  {
    id: 'clinical-laboratory',
    name: 'Clinical Pathology & Medical Laboratory',
    modality: 'Laboratory Investigation',
    description:
      'Comprehensive clinical diagnostic laboratory investigations spanning hematology, clinical biochemistry, medical microbiology, parasitology, urinalysis, endocrinology, and infectious disease screening.',
    commonIndications: [
      'Routine and executive health checkups',
      'Fever, malaria, typhoid, and systemic infection evaluations',
      'Chronic illness monitoring (Diabetes, Hypertension, Kidney, Liver)',
      'Antenatal, pre-employment, and diagnostic health screens',
    ],
    patientPreparation: 'Varies by test. Fasting required for lipid and blood sugar panels.',
    typicalDuration: '30 mins to 2 hours for routine investigations',
    price: 'Individual test pricing applies',
    status: 'Available Daily',
    isActive: true,
    imageSrc: '/assets/tnoc-laboratory.jpg',
  },
  ...IMAGING_SERVICES.map((s) => ({
    ...s,
    price: s.price || 'TZS 30,000 - 45,000',
    isActive: true,
    imageSrc: '/assets/tnoc-phlebotomy.jpg',
  })),
];

// Initial Facility Gallery
const INITIAL_GALLERY: GalleryPhoto[] = [
  {
    id: 'gal-facility-day',
    title: 'TNOC Diagnostic Facility & Maabara (Daytime)',
    category: 'Facility Exterior',
    description:
      'Front exterior perspective of TNOC Medical Diagnostic Facility in Msamvu, Morogoro, showing prominent signage and accessible entrance ramp.',
    imageSrc: '/assets/tnoc_facility_day.jpg',
    isFeatured: true,
    isActive: true,
    order: 1,
  },
  {
    id: 'gal-laboratory',
    title: 'Clinical Laboratory & Analysis Suite',
    category: 'Laboratory',
    description:
      'Modern diagnostic laboratory equipped with automated clinical analyzers and clean sterile workstations in Msamvu.',
    imageSrc: '/assets/tnoc-laboratory.jpg',
    isFeatured: true,
    isActive: true,
    order: 2,
  },
  {
    id: 'gal-reception',
    title: 'Patient Reception & Consultation Area',
    category: 'Reception & Entrance',
    description:
      'Comfortable, hygienic waiting area and dedicated customer service desk welcoming patients for sample collection and registration.',
    imageSrc: '/assets/tnoc-reception.jpg',
    isFeatured: true,
    isActive: true,
    order: 3,
  },
  {
    id: 'gal-phlebotomy',
    title: 'Sterile Phlebotomy & Specimen Collection',
    category: 'Laboratory',
    description:
      'Hygienic patient-centered blood draw and sample handling station adhering to strict biosafety standards.',
    imageSrc: '/assets/tnoc-phlebotomy.jpg',
    isFeatured: false,
    isActive: true,
    order: 4,
  },
  {
    id: 'gal-facility-night',
    title: 'Illuminated Night View & Emergency Landmark',
    category: 'Night View',
    description:
      'Clear evening illumination ensuring safe patient visibility and emergency diagnostic access in Msamvu.',
    imageSrc: '/assets/tnoc_facility_night.jpg',
    isFeatured: false,
    isActive: true,
    order: 5,
  },
  {
    id: 'gal-entrance-pillar',
    title: 'Roadside Directional Pillar & Entrance',
    category: 'Facility Exterior',
    description:
      'Roadside lightbox totem with the official TNOC stethoscope logo guiding patients from the Msamvu junction.',
    imageSrc: '/assets/tnoc_entrance_pillar.jpg',
    isFeatured: false,
    isActive: true,
    order: 6,
  },
  {
    id: 'gal-front-billboard',
    title: 'Maabara 3D Rooftop Signboard',
    category: 'Facility Exterior',
    description:
      'Vibrant red rooftop sign with clear Maabara designation and official healthcare branding.',
    imageSrc: '/assets/tnoc_front_billboard.jpg',
    isFeatured: false,
    isActive: true,
    order: 7,
  },
];

// Initial Facility Videos (Direct Video Uploads and YouTube Embeds)
const INITIAL_VIDEOS: GalleryVideo[] = [
  {
    id: 'video-facility-tour',
    title: 'TNOC Diagnostics Facility Walkthrough & Patient Journey',
    description:
      'A brief tour of TNOC Medical Diagnostic Facility in Msamvu, showing our reception, sterile phlebotomy, and diagnostic rooms.',
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: '/assets/tnoc_facility_day.jpg',
    isPublished: true,
    order: 1,
    createdAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 'video-lab-standards',
    title: 'Modern Laboratory Standards & Quality Control at Msamvu',
    description:
      'Overview of our clinical pathology automated workflow, sample handling, and rapid turnaround protocol in Morogoro.',
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: '/assets/tnoc-laboratory.jpg',
    isPublished: true,
    order: 2,
    createdAt: '2025-01-01T00:00:00Z',
  },
];

// Initial Opening Hours (Monday – Sunday)
const INITIAL_HOURS: OpeningHourDay[] = [
  {
    day: 'Monday',
    isOpen: true,
    is24Hours: false,
    openTime: '07:30',
    closeTime: '19:00',
    notes: 'Routine investigations & Ultrasound',
  },
  {
    day: 'Tuesday',
    isOpen: true,
    is24Hours: false,
    openTime: '07:30',
    closeTime: '19:00',
    notes: 'Routine investigations & Ultrasound',
  },
  {
    day: 'Wednesday',
    isOpen: true,
    is24Hours: false,
    openTime: '07:30',
    closeTime: '19:00',
    notes: 'Routine investigations & Ultrasound',
  },
  {
    day: 'Thursday',
    isOpen: true,
    is24Hours: false,
    openTime: '07:30',
    closeTime: '19:00',
    notes: 'Routine investigations & Ultrasound',
  },
  {
    day: 'Friday',
    isOpen: true,
    is24Hours: false,
    openTime: '07:30',
    closeTime: '19:00',
    notes: 'Routine investigations & Ultrasound',
  },
  {
    day: 'Saturday',
    isOpen: true,
    is24Hours: false,
    openTime: '08:00',
    closeTime: '17:00',
    notes: 'Weekend consultations & Lab tests',
  },
  {
    day: 'Sunday',
    isOpen: true,
    is24Hours: false,
    openTime: '08:30',
    closeTime: '14:00',
    notes: 'Routine collection & Emergency on-call',
  },
];

// Initial FAQs
const INITIAL_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Do I need an appointment for routine laboratory investigations?',
    answer:
      'No appointment is necessary for routine clinical blood tests, urine tests, or stool screenings. Walk-in patients are welcomed during our regular operating hours. For specialized diagnostic ultrasound sonography, appointments can be scheduled in advance to minimize waiting time.',
    category: 'General',
    isPublished: true,
    order: 1,
  },
  {
    id: 'faq-2',
    question: 'How should I prepare for fasting blood tests (e.g., Blood Sugar, Lipid Profile)?',
    answer:
      'For fasting blood glucose and lipid panels, please refrain from consuming food, milk, tea, coffee, or sugary beverages for 8 to 12 hours prior to your sample collection. Plain water is permitted and encouraged to keep you well-hydrated for comfortable blood sampling.',
    category: 'Preparation',
    isPublished: true,
    order: 2,
  },
  {
    id: 'faq-3',
    question: 'How soon will my test results be ready?',
    answer:
      'Routine hematology (FBP/CBC), blood sugar, malaria tests, and urinalysis are typically ready within 30 to 60 minutes. Biochemistry organ profiles (kidney/liver function) are reported same-day within 1 to 2 hours. Diagnostic ultrasound reports are issued immediately following the procedure.',
    category: 'Results',
    isPublished: true,
    order: 3,
  },
  {
    id: 'faq-4',
    question: 'How do I prepare for an abdominal or pelvic ultrasound examination?',
    answer:
      'For pelvic, obstetric, or urinary bladder ultrasound, drink 3 to 4 glasses of plain water approximately one hour before the scan and avoid urinating to ensure a full bladder for clear imaging. For upper abdominal ultrasound (liver, gall bladder), 6 to 8 hours of fasting is recommended.',
    category: 'Ultrasound',
    isPublished: true,
    order: 4,
  },
  {
    id: 'faq-5',
    question: 'Can my doctor receive my results directly?',
    answer:
      'Yes. Upon your request and with your consent, we can securely transmit your verified diagnostic report via WhatsApp or email directly to your attending clinician or hospital.',
    category: 'Results',
    isPublished: true,
    order: 5,
  },
  {
    id: 'faq-6',
    question: 'Where exactly is TNOC Diagnostics located in Msamvu, Morogoro?',
    answer:
      'Our facility is located in Msamvu, Morogoro, Tanzania, conveniently situated near the main Msamvu junction and transport corridors. Verified GPS coordinates are -6.802722, 37.661222. Direct navigation is available via the "Find Us on Google Maps" button on this website.',
    category: 'Location',
    isPublished: true,
    order: 6,
  },
];

// Initial Homepage Content
const INITIAL_HOMEPAGE: HomepageContent = {
  heroTitle: 'TNOC MEDICAL DIAGNOSTICS',
  heroSubtitle: 'Reliable Medical Diagnostics You Can Trust',
  heroDescription:
    'Professional clinical laboratory investigations and diagnostic ultrasound services in Msamvu, Morogoro.',
  heroImage: '/assets/tnoc_facility_day.jpg',
  primaryCtaText: 'View Tests & Prices',
  primaryCtaLink: '/tests',
  secondaryCtaText: 'Find Us on Google Maps',
  secondaryCtaLink: 'https://www.google.com/maps/dir/?api=1&destination=-6.802722,37.661222',
  featuredServices: ['clinical-laboratory', 'usg-abdo-pelvic', 'usg-obstetric'],
  featuredTests: ['fbp-cbc', 'blood-glucose-fasting', 'lipid-profile', 'rft-profile', 'lft-profile', 'malaria-bs'],
};

// Initial About Content
const INITIAL_ABOUT: AboutContent = {
  aboutTitle: 'About TNOC Medical Diagnostics',
  tagline: 'Precision Diagnostics in the Heart of Msamvu, Morogoro',
  mission:
    'To deliver accurate, prompt, and ethically uncompromising diagnostic laboratory and ultrasound investigations that empower clinicians and elevate patient health outcomes throughout Morogoro.',
  vision:
    'To be the regional benchmark for clinical diagnostic reliability, modern technology, and patient trust in Eastern Tanzania.',
  facilityOverview:
    'TNOC Medical Diagnostic Facility (Maabara ya Msamvu) is a dedicated private diagnostic health facility located in Msamvu, Morogoro. Designed with patient comfort and clinical precision in mind, we provide automated clinical hematology, biochemistry, parasitology, microbiology, and non-invasive ultrasound sonography.',
  coreValues: [
    'Clinical Precision & Quality Control',
    'Integrity & Strict Confidentiality',
    'Rapid Turnaround Times',
    'Compassionate Patient Care',
    'Accessibility & Transparent Pricing',
  ],
  whyChooseStatements: WHY_CHOOSE_US_ITEMS,
};

// Initial Patient Info Content
const INITIAL_PATIENT_INFO: PatientInfoContent = {
  preparationGuidelines: [
    {
      id: 'prep-fasting',
      title: 'Fasting Blood Investigations',
      category: 'Blood Tests',
      instructions: [
        'Fast for 8 to 12 hours prior to sample collection (no food, milk, or juices).',
        'Fasting is essential for Fasting Blood Sugar (FBS), Lipid Profile, and selected hormonal panels.',
        'Drink plenty of plain water to stay hydrated and facilitate easy vein access.',
        'Take regular prescription medications unless explicitly advised otherwise by your doctor.',
      ],
    },
    {
      id: 'prep-urine',
      title: 'Clean-Catch Urine Sampling',
      category: 'Urinalysis & Cultures',
      instructions: [
        'Use only the sterile, hermetically sealed specimen container provided by TNOC.',
        'Wash hands thoroughly before collection.',
        'Allow the first few drops of urine to pass into the toilet, then capture the midstream portion.',
        'Securely tighten the container lid without touching the inner rim or inside surface.',
      ],
    },
    {
      id: 'prep-ultrasound',
      title: 'Ultrasound Examination Guidelines',
      category: 'Diagnostic Ultrasound',
      instructions: [
        'Pelvic / Obstetric / KUB: Drink 3–4 glasses of water 1 hour prior to the scan; do NOT empty bladder.',
        'Upper Abdomen (Gallbladder / Liver / Pancreas): Fast for 6 hours prior to reduce bowel gas.',
        'Wear loose, comfortable two-piece clothing for convenient access to the examination area.',
      ],
    },
  ],
  turnaroundStandards: [
    {
      id: 'tat-routine',
      category: 'Routine Hematology & Rapid Tests',
      timeframe: '30 – 60 Minutes',
      notes: 'Full Blood Picture (CBC), Blood Sugar, Malaria BS/mRDT, Urinalysis, Pregnancy tests.',
    },
    {
      id: 'tat-chemistry',
      category: 'Clinical Chemistry & Organ Profiles',
      timeframe: '1 – 2 Hours',
      notes: 'Kidney function (RFT), Liver enzymes (LFT), Serum electrolytes, Lipid profile.',
    },
    {
      id: 'tat-ultrasound',
      category: 'Diagnostic Ultrasound Sonography',
      timeframe: 'Immediate Report',
      notes: 'Official printed sonography report with clinical findings issued immediately post-scan.',
    },
    {
      id: 'tat-microbiology',
      category: 'Microbiology & Bacterial Cultures',
      timeframe: '48 – 72 Hours',
      notes: 'Incubation, pathogen isolation, and targeted antibiotic susceptibility testing.',
    },
  ],
};

// Initial SEO Config
const INITIAL_SEO: SeoConfig = {
  siteTitle: 'TNOC Medical Diagnostic Facility | TNOC Diagnostics (Maabara ya Msamvu)',
  metaTitle: 'TNOC Medical Diagnostic Facility | Maabara ya Msamvu, Morogoro',
  metaDescription:
    'Reliable medical laboratory investigations and diagnostic ultrasound services in Msamvu, Morogoro, Tanzania. Accurate, prompt results you can trust.',
  keywords:
    'TNOC Medical Diagnostic Facility, TNOC Diagnostics, TNOC Diagnostics Msamvu, Maabara ya Msamvu, Medical laboratory Msamvu, Diagnostic laboratory Msamvu, Medical diagnostics in Msamvu, Ultrasound Msamvu, Dr. Monasser, Morogoro Tanzania',
  ogTitle: 'TNOC Medical Diagnostic Facility | Reliable Diagnostics in Msamvu',
  ogDescription:
    'Professional clinical laboratory tests and diagnostic sonography in Msamvu, Morogoro. Accurate results, modern equipment, and dedicated patient care.',
  ogImage: '/assets/tnoc_facility_day.jpg',
  ogImageAlt: 'TNOC Medical Diagnostic Facility in Msamvu, Morogoro',
  twitterCard: 'summary_large_image',
  robots: 'index, follow',
  canonicalUrl: 'https://tnocdiagnostics.co.tz',
  author: 'TNOC Medical Diagnostic Facility',
};

// Initial Activity Log
const INITIAL_LOGS: ActivityLogItem[] = [
  {
    id: 'log-init',
    timestamp: new Date().toISOString(),
    adminUser: 'System',
    action: 'System Initialized',
    affectedItem: 'TNOC CMS Portal',
    details: 'Initial content store and catalogue prepared.',
  },
];

interface CmsContextType {
  // Admin Authentication
  isAdmin: boolean;
  adminUsername: string;
  login: (usernameOrPin: string, pass?: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void> | void;
  changePassword: (oldPass: string, newPass: string) => Promise<{ success: boolean; message: string }>;
  changeUsername: (newUsername: string) => Promise<{ success: boolean; message: string }>;
  changeAdminPin: (oldPass: string, newPass: string) => boolean;

  // Toast feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Tests Management
  tests: LabTest[];
  addTest: (test: Omit<LabTest, 'id' | 'createdAt' | 'updatedAt'>) => LabTest;
  updateTest: (id: string, updates: Partial<LabTest>) => void;
  deleteTest: (id: string) => void;
  toggleTestActive: (id: string) => void;
  resetTests: () => void;

  // Services Management
  services: ImagingService[];
  addService: (service: Omit<ImagingService, 'id' | 'createdAt' | 'updatedAt'>) => ImagingService;
  updateService: (id: string, updates: Partial<ImagingService>) => void;
  deleteService: (id: string) => void;
  toggleServiceActive: (id: string) => void;
  resetServices: () => void;

  // Gallery Management
  gallery: GalleryPhoto[];
  addGalleryPhoto: (photo: Omit<GalleryPhoto, 'id'>) => GalleryPhoto;
  updateGalleryPhoto: (id: string, updates: Partial<GalleryPhoto>) => void;
  deleteGalleryPhoto: (id: string) => void;
  toggleGalleryActive: (id: string) => void;
  togglePhotoActive: (id: string) => void;
  setFeaturedGalleryPhoto: (id: string) => void;
  setHeroPhoto: (id: string) => void;
  resetGallery: () => void;

  // Video Gallery Management
  videos: GalleryVideo[];
  addGalleryVideo: (video: Omit<GalleryVideo, 'id'>) => GalleryVideo;
  updateGalleryVideo: (id: string, updates: Partial<GalleryVideo>) => void;
  deleteGalleryVideo: (id: string) => void;
  toggleVideoPublished: (id: string) => void;
  resetVideos: () => void;

  // Opening Hours
  openingHours: OpeningHourDay[];
  updateOpeningHourDay: (day: string, updates: Partial<OpeningHourDay>) => void;
  updateOpeningHours: (hours: OpeningHourDay[]) => void;
  resetOpeningHours: () => void;

  // FAQs
  faqs: FaqItem[];
  addFaq: (faq: Omit<FaqItem, 'id'>) => FaqItem;
  updateFaq: (id: string, updates: Partial<FaqItem>) => void;
  deleteFaq: (id: string) => void;
  toggleFaqPublish: (id: string) => void;
  toggleFaqPublished: (id: string) => void;
  resetFaqs: () => void;

  // Homepage Content
  homepage: HomepageContent;
  updateHomepage: (updates: Partial<HomepageContent>) => void;
  resetHomepage: () => void;

  // About Content
  about: AboutContent;
  updateAbout: (updates: Partial<AboutContent>) => void;
  resetAbout: () => void;

  // Patient Info Content
  patientInfo: PatientInfoContent;
  updatePatientInfo: (updates: Partial<PatientInfoContent>) => void;
  resetPatientInfo: () => void;

  // Contact & Location (Business Config)
  businessConfig: BusinessConfig;
  updateBusinessConfig: (updates: Partial<BusinessConfig>) => void;
  resetBusinessConfig: () => void;

  // SEO Config
  seo: SeoConfig;
  updateSeo: (updates: Partial<SeoConfig>) => void;
  resetSeo: () => void;

  // Activity Log
  activityLogs: ActivityLogItem[];
  logActivity: (action: string, affectedItem: string, details?: string) => void;
  clearActivityLogs: () => void;

  // Global Reset
  resetAllToDefaults: () => void;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 4000);
  }, []);

  // Admin Credentials & State
  const [adminUsername, setAdminUsername] = useState<string>('tnocfacility2026');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Initial check on mount for active session and load public data
  useEffect(() => {
    // 1. Verify active admin session with server
    api.verifyAuth().then((isValid) => {
      if (isValid) {
        setIsAdmin(true);
        setAdminUsername('tnocfacility2026');
      }
    });

    // 2. Fetch public database data
    api.getPublicData().then((data) => {
      if (data) {
        if (Array.isArray(data.investigations) && data.investigations.length > 0) {
          setTests(data.investigations);
        }
        if (Array.isArray(data.services) && data.services.length > 0) {
          setServices(data.services);
        }
        if (Array.isArray(data.galleryPhotos) && data.galleryPhotos.length > 0) {
          setGallery(data.galleryPhotos);
        }
        if (Array.isArray(data.galleryVideos) && data.galleryVideos.length > 0) {
          setVideos(data.galleryVideos);
        }
        if (data.homepage) setHomepage(data.homepage);
        if (data.facility) setBusinessConfig(data.facility);
        if (data.about) setAbout(data.about);
        if (data.patientInfo) setPatientInfo(data.patientInfo);
        if (Array.isArray(data.openingHours)) setOpeningHours(data.openingHours);
        if (Array.isArray(data.faqs)) setFaqs(data.faqs);
        if (data.seo) setSeo(data.seo);
        if (Array.isArray(data.activityLogs)) setActivityLogs(data.activityLogs);
      }
    });
  }, []);

  // Activity Log State
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(() => {
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEYS.ACTIVITY_LOG);
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_LOGS;
  });

  const logActivity = useCallback(
    (action: string, affectedItem: string, details?: string) => {
      const newEntry: ActivityLogItem = {
        id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        timestamp: new Date().toISOString(),
        adminUser: adminUsername,
        action,
        affectedItem,
        details,
      };
      setActivityLogs((prev) => [newEntry, ...prev.slice(0, 99)]);
    },
    [adminUsername]
  );

  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEYS.ACTIVITY_LOG, JSON.stringify(activityLogs));
    } catch {}
  }, [activityLogs]);

  // Auth Methods via secure server API
  const login = async (usernameOrPin: string, pass?: string) => {
    const cleanUser = usernameOrPin.trim();
    const cleanPass = pass !== undefined ? pass.trim() : usernameOrPin.trim();

    try {
      const res = await api.login(cleanUser, cleanPass);
      if (res.success) {
        setIsAdmin(true);
        setAdminUsername(cleanUser);
        logActivity('Admin Login', 'Security', `Administrator "${cleanUser}" authenticated successfully.`);
        showToast('Welcome back, Administrator. Full CMS controls enabled.');
        return { success: true, message: 'Authentication successful.' };
      }
    } catch (err: any) {
      logActivity('Failed Login Attempt', 'Security', `Failed login attempt with username: "${cleanUser}".`);
      return {
        success: false,
        message: err.message || 'Invalid administrative credentials.',
      };
    }
    return {
      success: false,
      message: 'Invalid administrative credentials.',
    };
  };

  const changeAdminPin = (oldPass: string, newPass: string): boolean => {
    changePassword(oldPass, newPass);
    return true;
  };

  const logout = async () => {
    await api.logout();
    setIsAdmin(false);
    logActivity('Admin Logout', 'Security', 'Administrator signed out.');
    showToast('Signed out of administrative session.');
  };

  const changePassword = async (oldPass: string, newPass: string) => {
    try {
      await api.changePassword(oldPass, newPass);
      logActivity('Password Changed', 'Security', 'Admin password successfully updated on secure server.');
      showToast('Admin password updated successfully.');
      return { success: true, message: 'Password updated successfully.' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to update password.' };
    }
  };

  const changeUsername = (newUsername: string) => {
    if (newUsername.trim().length < 3) {
      return { success: false, message: 'Username must be at least 3 characters.' };
    }
    const clean = newUsername.trim();
    setAdminUsername(clean);
    logActivity('Username Changed', 'Security', `Admin username set to: ${clean}.`);
    showToast('Admin username updated.');
    return { success: true, message: 'Username updated successfully.' };
  };

  // Tests State
  const [tests, setTests] = useState<LabTest[]>(() => {
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEYS.TESTS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_TESTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEYS.TESTS, JSON.stringify(tests));
    } catch {}
  }, [tests]);

  const addTest = (newTestData: Omit<LabTest, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newTest: LabTest = {
      ...newTestData,
      id: `test-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    setTests((prev) => [newTest, ...prev]);
    logActivity('Test Added', `Test: ${newTest.name}`, `Category: ${newTest.category}, Price: ${newTest.price || 'N/A'}`);
    showToast(`Test "${newTest.name}" added to catalogue.`);
    return newTest;
  };

  const updateTest = (id: string, updates: Partial<LabTest>) => {
    setTests((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updated = { ...t, ...updates, updatedAt: new Date().toISOString() };
          logActivity('Test Updated', `Test: ${t.name}`, `Updated fields: ${Object.keys(updates).join(', ')}`);
          return updated;
        }
        return t;
      })
    );
    showToast('Laboratory test updated successfully.');
  };

  const deleteTest = (id: string) => {
    const target = tests.find((t) => t.id === id);
    setTests((prev) => prev.filter((t) => t.id !== id));
    logActivity('Test Deleted', `Test: ${target?.name || id}`);
    showToast(`Test "${target?.name || id}" removed.`);
  };

  const toggleTestActive = (id: string) => {
    setTests((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const newStatus = !t.isActive;
          logActivity(newStatus ? 'Test Activated' : 'Test Deactivated', `Test: ${t.name}`);
          return { ...t, isActive: newStatus, updatedAt: new Date().toISOString() };
        }
        return t;
      })
    );
  };

  const resetTests = () => {
    setTests(INITIAL_TESTS);
    logActivity('Reset Tests Catalogue', 'Tests', 'Restored original clinical tests catalog.');
    showToast('Tests catalogue restored to clinical defaults.');
  };

  // Services State
  const [services, setServices] = useState<ImagingService[]>(() => {
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEYS.SERVICES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_SERVICES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEYS.SERVICES, JSON.stringify(services));
    } catch {}
  }, [services]);

  const addService = (newServiceData: Omit<ImagingService, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newService: ImagingService = {
      ...newServiceData,
      id: `svc-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    setServices((prev) => [newService, ...prev]);
    logActivity('Service Added', `Service: ${newService.name}`);
    showToast(`Service "${newService.name}" created.`);
    return newService;
  };

  const updateService = (id: string, updates: Partial<ImagingService>) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const updated = { ...s, ...updates, updatedAt: new Date().toISOString() };
          logActivity('Service Updated', `Service: ${s.name}`);
          return updated;
        }
        return s;
      })
    );
    showToast('Service updated successfully.');
  };

  const deleteService = (id: string) => {
    const target = services.find((s) => s.id === id);
    setServices((prev) => prev.filter((s) => s.id !== id));
    logActivity('Service Deleted', `Service: ${target?.name || id}`);
    showToast(`Service "${target?.name || id}" removed.`);
  };

  const toggleServiceActive = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const resetServices = () => {
    setServices(INITIAL_SERVICES);
    logActivity('Reset Services', 'Services', 'Restored default diagnostic services.');
    showToast('Diagnostic services reset to defaults.');
  };

  // Gallery State
  const [gallery, setGallery] = useState<GalleryPhoto[]>(() => {
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEYS.GALLERY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_GALLERY;
  });

  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
    } catch {}
  }, [gallery]);

  const addGalleryPhoto = (photoData: Omit<GalleryPhoto, 'id'>) => {
    const newPhoto: GalleryPhoto = {
      ...photoData,
      id: `gal-${Date.now()}`,
    };
    let updated = [newPhoto, ...gallery];
    if (newPhoto.isFeatured) {
      updated = updated.map((p) => (p.id === newPhoto.id ? p : { ...p, isFeatured: false }));
      // Also sync to SEO ogImage if newly uploaded photo is marked featured
      setSeo((prev) => {
        const updatedSeo = {
          ...prev,
          ogImage: newPhoto.imageSrc,
          ogImageAlt: newPhoto.title || prev.ogImageAlt,
        };
        try {
          localStorage.setItem(CMS_STORAGE_KEYS.SEO, JSON.stringify(updatedSeo));
        } catch {}
        api.syncDatabase({ seo: updatedSeo }).catch(console.warn);
        return updatedSeo;
      });
    }
    setGallery(updated);
    api.syncDatabase({ galleryPhotos: updated }).catch(console.warn);
    logActivity('Gallery Photo Uploaded', `Photo: ${newPhoto.title}`, `Category: ${newPhoto.category}`);
    showToast(`Photograph "${newPhoto.title}" added to gallery.`);
    return newPhoto;
  };

  const updateGalleryPhoto = (id: string, updates: Partial<GalleryPhoto>) => {
    let updated = gallery.map((p) => (p.id === id ? { ...p, ...updates } : p));
    if (updates.isFeatured) {
      updated = updated.map((p) => ({ ...p, isFeatured: p.id === id }));
      const featuredPhoto = updated.find((p) => p.id === id);
      if (featuredPhoto?.imageSrc) {
        setSeo((prev) => {
          const updatedSeo = {
            ...prev,
            ogImage: featuredPhoto.imageSrc,
            ogImageAlt: featuredPhoto.title || prev.ogImageAlt,
          };
          try {
            localStorage.setItem(CMS_STORAGE_KEYS.SEO, JSON.stringify(updatedSeo));
          } catch {}
          api.syncDatabase({ seo: updatedSeo }).catch(console.warn);
          return updatedSeo;
        });
      }
    }
    setGallery(updated);
    api.syncDatabase({ galleryPhotos: updated }).catch(console.warn);
    logActivity('Gallery Photo Updated', `Photo ID: ${id}`);
    showToast('Photograph updated.');
  };

  const deleteGalleryPhoto = (id: string) => {
    const target = gallery.find((p) => p.id === id);
    const updated = gallery.filter((p) => p.id !== id);
    setGallery(updated);
    api.syncDatabase({ galleryPhotos: updated }).catch(console.warn);

    // If deleted photo was currently selected as SEO image, fallback to next available photo
    if (target && (seo.ogImage === target.imageSrc || seo.ogImage === target.id)) {
      const fallbackPhoto = updated.find((p) => p.isFeatured) || updated[0];
      if (fallbackPhoto) {
        setSeo((prev) => {
          const updatedSeo = {
            ...prev,
            ogImage: fallbackPhoto.imageSrc,
            ogImageAlt: fallbackPhoto.title,
          };
          try {
            localStorage.setItem(CMS_STORAGE_KEYS.SEO, JSON.stringify(updatedSeo));
          } catch {}
          api.syncDatabase({ seo: updatedSeo }).catch(console.warn);
          return updatedSeo;
        });
      }
    }

    logActivity('Gallery Photo Deleted', `Photo: ${target?.title || id}`);
    showToast(`Photograph "${target?.title || id}" removed from gallery.`);
  };

  const toggleGalleryActive = (id: string) => {
    setGallery((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p));
      api.syncDatabase({ galleryPhotos: updated }).catch(console.warn);
      return updated;
    });
  };

  const setFeaturedGalleryPhoto = (id: string) => {
    const photo = gallery.find((p) => p.id === id);
    const updated = gallery.map((p) => ({
      ...p,
      isFeatured: p.id === id,
    }));
    setGallery(updated);
    api.syncDatabase({ galleryPhotos: updated }).catch(console.warn);

    // Automatically update SEO social sharing image to the new featured photo
    if (photo?.imageSrc) {
      setSeo((prev) => {
        const updatedSeo = {
          ...prev,
          ogImage: photo.imageSrc,
          ogImageAlt: photo.title || prev.ogImageAlt,
        };
        try {
          localStorage.setItem(CMS_STORAGE_KEYS.SEO, JSON.stringify(updatedSeo));
        } catch {}
        api.syncDatabase({ seo: updatedSeo }).catch(console.warn);
        return updatedSeo;
      });
    }

    logActivity('Featured Photo Changed', `Photo: ${photo?.title || id}`);
    showToast(`Featured hero photograph set to "${photo?.title}" and synced to SEO.`);
  };

  const resetGallery = () => {
    setGallery(INITIAL_GALLERY);
    api.syncDatabase({ galleryPhotos: INITIAL_GALLERY }).catch(console.warn);
    logActivity('Reset Gallery', 'Gallery', 'Restored verified facility gallery.');
    showToast('Facility gallery reset to official photos.');
  };

  // Video Gallery State
  const [videos, setVideos] = useState<GalleryVideo[]>(() => {
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEYS.VIDEOS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_VIDEOS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEYS.VIDEOS, JSON.stringify(videos));
    } catch {}
  }, [videos]);

  const addGalleryVideo = (videoData: Omit<GalleryVideo, 'id'>) => {
    const newVideo: GalleryVideo = {
      ...videoData,
      id: `video-${Date.now()}`,
    };
    setVideos((prev) => [newVideo, ...prev]);
    api.addVideo(newVideo).catch(console.warn);
    logActivity('Gallery Video Added', `Video: ${newVideo.title}`, `Type: ${newVideo.videoType}`);
    showToast(`Video "${newVideo.title}" added to gallery.`);
    return newVideo;
  };

  const updateGalleryVideo = (id: string, updates: Partial<GalleryVideo>) => {
    setVideos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updates } : v))
    );
    api.updateVideo(id, updates).catch(console.warn);
    logActivity('Gallery Video Updated', `Video ID: ${id}`);
    showToast('Video updated.');
  };

  const deleteGalleryVideo = (id: string) => {
    const target = videos.find((v) => v.id === id);
    setVideos((prev) => prev.filter((v) => v.id !== id));
    api.deleteVideo(id).catch(console.warn);
    logActivity('Gallery Video Deleted', `Video: ${target?.title || id}`);
    showToast(`Video "${target?.title || id}" deleted.`);
  };

  const toggleVideoPublished = (id: string) => {
    const target = videos.find((v) => v.id === id);
    if (!target) return;
    const newStatus = !target.isPublished;
    setVideos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isPublished: newStatus } : v))
    );
    api.updateVideo(id, { isPublished: newStatus }).catch(console.warn);
    showToast(newStatus ? 'Video is now published on public gallery.' : 'Video is now hidden from public.');
  };

  const resetVideos = () => {
    setVideos(INITIAL_VIDEOS);
    api.syncDatabase({ galleryVideos: INITIAL_VIDEOS }).catch(console.warn);
    logActivity('Reset Videos', 'Videos', 'Restored default video walkthroughs.');
    showToast('Facility videos reset to defaults.');
  };

  // Opening Hours State
  const [openingHours, setOpeningHours] = useState<OpeningHourDay[]>(() => {
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEYS.HOURS);
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_HOURS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEYS.HOURS, JSON.stringify(openingHours));
    } catch {}
  }, [openingHours]);

  const updateOpeningHourDay = (day: string, updates: Partial<OpeningHourDay>) => {
    setOpeningHours((prev) =>
      prev.map((h) => (h.day.toLowerCase() === day.toLowerCase() ? { ...h, ...updates } : h))
    );
    logActivity('Opening Hours Changed', `Day: ${day}`);
    showToast(`Opening hours for ${day} updated.`);
  };

  const updateOpeningHours = (hours: OpeningHourDay[]) => {
    setOpeningHours(hours);
    try {
      localStorage.setItem(CMS_STORAGE_KEYS.HOURS, JSON.stringify(hours));
    } catch {}
    logActivity('Opening Hours Schedule Saved', 'Hours', 'Weekly operating schedule updated.');
    showToast('Operating hours schedule saved successfully.');
  };

  const resetOpeningHours = () => {
    setOpeningHours(INITIAL_HOURS);
    logActivity('Reset Opening Hours', 'Hours', 'Restored standard operating schedule.');
    showToast('Opening hours restored to default.');
  };

  // FAQs State
  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEYS.FAQS);
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_FAQS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEYS.FAQS, JSON.stringify(faqs));
    } catch {}
  }, [faqs]);

  const addFaq = (faqData: Omit<FaqItem, 'id'>) => {
    const newFaq: FaqItem = {
      ...faqData,
      id: `faq-${Date.now()}`,
    };
    setFaqs((prev) => [...prev, newFaq]);
    logActivity('FAQ Created', `Question: ${newFaq.question}`);
    showToast('New FAQ created.');
    return newFaq;
  };

  const updateFaq = (id: string, updates: Partial<FaqItem>) => {
    setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));
    logActivity('FAQ Updated', `FAQ ID: ${id}`);
    showToast('FAQ updated.');
  };

  const deleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    logActivity('FAQ Deleted', `FAQ ID: ${id}`);
    showToast('FAQ deleted.');
  };

  const toggleFaqPublish = (id: string) => {
    setFaqs((prev) =>
      prev.map((f) => (f.id === id ? { ...f, isPublished: !f.isPublished } : f))
    );
  };

  const resetFaqs = () => {
    setFaqs(INITIAL_FAQS);
    logActivity('Reset FAQs', 'FAQs', 'Restored default patient FAQs.');
    showToast('FAQs reset to defaults.');
  };

  // Homepage Content State
  const [homepage, setHomepage] = useState<HomepageContent>(() => {
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEYS.HOMEPAGE);
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_HOMEPAGE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEYS.HOMEPAGE, JSON.stringify(homepage));
    } catch {}
  }, [homepage]);

  const updateHomepage = (updates: Partial<HomepageContent>) => {
    setHomepage((prev) => ({ ...prev, ...updates }));
    logActivity('Homepage Content Updated', 'Homepage');
    showToast('Homepage content updated.');
  };

  const resetHomepage = () => {
    setHomepage(INITIAL_HOMEPAGE);
    logActivity('Reset Homepage', 'Homepage', 'Restored default homepage content.');
    showToast('Homepage reset to defaults.');
  };

  // About Content State
  const [about, setAbout] = useState<AboutContent>(() => {
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEYS.ABOUT);
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_ABOUT;
  });

  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEYS.ABOUT, JSON.stringify(about));
    } catch {}
  }, [about]);

  const updateAbout = (updates: Partial<AboutContent>) => {
    setAbout((prev) => ({ ...prev, ...updates }));
    logActivity('About Content Updated', 'About TNOC');
    showToast('About page content updated.');
  };

  const resetAbout = () => {
    setAbout(INITIAL_ABOUT);
    logActivity('Reset About', 'About', 'Restored default about content.');
    showToast('About page reset to defaults.');
  };

  // Patient Info State
  const [patientInfo, setPatientInfo] = useState<PatientInfoContent>(() => {
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEYS.PATIENT_INFO);
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_PATIENT_INFO;
  });

  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEYS.PATIENT_INFO, JSON.stringify(patientInfo));
    } catch {}
  }, [patientInfo]);

  const updatePatientInfo = (updates: Partial<PatientInfoContent>) => {
    setPatientInfo((prev) => ({ ...prev, ...updates }));
    logActivity('Patient Info Updated', 'Patient Info');
    showToast('Patient info content updated.');
  };

  const resetPatientInfo = () => {
    setPatientInfo(INITIAL_PATIENT_INFO);
    logActivity('Reset Patient Info', 'Patient Info');
    showToast('Patient info reset to defaults.');
  };

  // Contact & Location State
  const [businessConfig, setBusinessConfig] = useState<BusinessConfig>(() => {
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEYS.BUSINESS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          return {
            ...TNOC_BUSINESS_CONFIG,
            ...parsed,
            phone: !parsed.phone || parsed.phone.includes('Pending') ? TNOC_BUSINESS_CONFIG.phone : parsed.phone,
            phoneRaw: !parsed.phoneRaw ? TNOC_BUSINESS_CONFIG.phoneRaw : parsed.phoneRaw,
            whatsapp: !parsed.whatsapp || parsed.whatsapp.includes('Pending') ? TNOC_BUSINESS_CONFIG.whatsapp : parsed.whatsapp,
            whatsappRaw: !parsed.whatsappRaw ? TNOC_BUSINESS_CONFIG.whatsappRaw : parsed.whatsappRaw,
            email: !parsed.email || parsed.email.includes('info@') ? TNOC_BUSINESS_CONFIG.email : parsed.email,
            secondaryEmail: parsed.secondaryEmail || TNOC_BUSINESS_CONFIG.secondaryEmail,
            directorName: parsed.directorName || TNOC_BUSINESS_CONFIG.directorName,
            directorTitle: parsed.directorTitle || TNOC_BUSINESS_CONFIG.directorTitle,
            directorPhone: parsed.directorPhone || TNOC_BUSINESS_CONFIG.directorPhone,
            directorPhoneRaw: parsed.directorPhoneRaw || TNOC_BUSINESS_CONFIG.directorPhoneRaw,
            directorWhatsapp: parsed.directorWhatsapp || TNOC_BUSINESS_CONFIG.directorWhatsapp,
            directorWhatsappRaw: parsed.directorWhatsappRaw || TNOC_BUSINESS_CONFIG.directorWhatsappRaw,
            directorEmail: parsed.directorEmail || TNOC_BUSINESS_CONFIG.directorEmail,
            directorEmails: parsed.directorEmails || TNOC_BUSINESS_CONFIG.directorEmails,
          };
        }
      }
    } catch {}
    return TNOC_BUSINESS_CONFIG;
  });

  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEYS.BUSINESS, JSON.stringify(businessConfig));
    } catch {}
  }, [businessConfig]);

  const updateBusinessConfig = (updates: Partial<BusinessConfig>) => {
    setBusinessConfig((prev) => ({ ...prev, ...updates }));
    logActivity('Contact & Location Settings Updated', 'Contact & Location');
    showToast('Contact & facility details updated.');
  };

  const resetBusinessConfig = () => {
    setBusinessConfig(TNOC_BUSINESS_CONFIG);
    logActivity('Reset Contact & Location', 'Settings', 'Restored default verified coordinates and Director contact.');
    showToast('Business details reset to defaults.');
  };

  // SEO State
  const [seo, setSeo] = useState<SeoConfig>(() => {
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEYS.SEO);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          return {
            ...INITIAL_SEO,
            ...parsed,
          };
        }
      }
    } catch {}
    return INITIAL_SEO;
  });

  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEYS.SEO, JSON.stringify(seo));
    } catch {}
  }, [seo]);

  // Synchronize global SEO metadata dynamically to the browser DOM document head
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const activeTitle = seo.siteTitle || seo.metaTitle || 'TNOC Medical Diagnostic Facility';
    document.title = activeTitle;

    const setMetaTag = (attributeName: string, attributeValue: string, content: string | undefined) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attributeName, attributeValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard Meta
    setMetaTag('name', 'description', seo.metaDescription);
    if (seo.keywords) setMetaTag('name', 'keywords', seo.keywords);
    if (seo.robots) setMetaTag('name', 'robots', seo.robots);
    if (seo.author) setMetaTag('name', 'author', seo.author);

    // Open Graph
    setMetaTag('property', 'og:title', seo.ogTitle || activeTitle);
    setMetaTag('property', 'og:description', seo.ogDescription || seo.metaDescription);
    setMetaTag('property', 'og:image', seo.ogImage);

    // Twitter Card
    setMetaTag('name', 'twitter:card', seo.twitterCard || 'summary_large_image');
    setMetaTag('name', 'twitter:title', seo.ogTitle || activeTitle);
    setMetaTag('name', 'twitter:description', seo.ogDescription || seo.metaDescription);
    setMetaTag('name', 'twitter:image', seo.ogImage);

    // Canonical link
    if (seo.canonicalUrl) {
      let canonicalEl = document.querySelector('link[rel="canonical"]');
      if (!canonicalEl) {
        canonicalEl = document.createElement('link');
        canonicalEl.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute('href', seo.canonicalUrl);
    }
  }, [seo]);

  const updateSeo = (updates: Partial<SeoConfig>) => {
    setSeo((prev) => ({ ...prev, ...updates }));
    logActivity('SEO Settings Updated', 'SEO');
    showToast('SEO settings updated and synchronized.');
  };

  const resetSeo = () => {
    setSeo(INITIAL_SEO);
    logActivity('Reset SEO', 'SEO');
    showToast('SEO configuration reset to defaults.');
  };

  const clearActivityLogs = () => {
    setActivityLogs([]);
    showToast('Activity log cleared.');
  };

  const resetAllToDefaults = () => {
    setTests(INITIAL_TESTS);
    setServices(INITIAL_SERVICES);
    setGallery(INITIAL_GALLERY);
    setOpeningHours(INITIAL_HOURS);
    setFaqs(INITIAL_FAQS);
    setHomepage(INITIAL_HOMEPAGE);
    setAbout(INITIAL_ABOUT);
    setPatientInfo(INITIAL_PATIENT_INFO);
    setBusinessConfig(TNOC_BUSINESS_CONFIG);
    setSeo(INITIAL_SEO);
    logActivity('Factory Reset', 'All CMS Data', 'All website content restored to factory defaults.');
    showToast('All website modules reset to initial verified defaults.');
  };

  return (
    <CmsContext.Provider
      value={{
        isAdmin,
        adminUsername,
        login,
        logout,
        changePassword,
        changeUsername,
        changeAdminPin,
        toastMessage,
        showToast,

        tests,
        addTest,
        updateTest,
        deleteTest,
        toggleTestActive,
        resetTests,

        services,
        addService,
        updateService,
        deleteService,
        toggleServiceActive,
        resetServices,

        gallery,
        addGalleryPhoto,
        updateGalleryPhoto,
        deleteGalleryPhoto,
        toggleGalleryActive,
        togglePhotoActive: toggleGalleryActive,
        setFeaturedGalleryPhoto,
        setHeroPhoto: setFeaturedGalleryPhoto,
        resetGallery,

        videos,
        addGalleryVideo,
        updateGalleryVideo,
        deleteGalleryVideo,
        toggleVideoPublished,
        resetVideos,

        openingHours,
        updateOpeningHourDay,
        updateOpeningHours,
        resetOpeningHours,

        faqs,
        addFaq,
        updateFaq,
        deleteFaq,
        toggleFaqPublish,
        toggleFaqPublished: toggleFaqPublish,
        resetFaqs,

        homepage,
        updateHomepage,
        resetHomepage,

        about,
        updateAbout,
        resetAbout,

        patientInfo,
        updatePatientInfo,
        resetPatientInfo,

        businessConfig,
        updateBusinessConfig,
        resetBusinessConfig,

        seo,
        updateSeo,
        resetSeo,

        activityLogs,
        logActivity,
        clearActivityLogs,

        resetAllToDefaults,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = (): CmsContextType => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
