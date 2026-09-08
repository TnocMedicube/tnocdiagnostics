import fs from 'fs';
import path from 'path';
import { hashPassword, verifyPassword, AdminUserRecord } from './auth';

export interface DatabaseSchema {
  admin: AdminUserRecord;
  investigations: any[];
  services: any[];
  galleryPhotos: any[];
  galleryVideos: any[];
  homepage: Record<string, any>;
  facility: Record<string, any>;
  about: Record<string, any>;
  patientInfo: Record<string, any>;
  openingHours: any[];
  faqs: any[];
  seo: Record<string, any>;
  activityLogs: any[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Default initial admin credentials as mandated:
// Username: tnocfacility2026
// Password: tnoc2025
const DEFAULT_ADMIN_USERNAME = 'tnocfacility2026';
const DEFAULT_ADMIN_PASSWORD = 'tnoc2025';

function getInitialDatabase(): DatabaseSchema {
  const adminAuth = hashPassword(DEFAULT_ADMIN_PASSWORD);

  return {
    admin: {
      username: DEFAULT_ADMIN_USERNAME,
      salt: adminAuth.salt,
      hash: adminAuth.hash,
      updatedAt: new Date().toISOString(),
    },
    investigations: [
      {
        id: 'test-fbp-cbc',
        name: 'Full Blood Picture (CBC / FBP) & 5-Part Differential',
        code: 'HEM-01',
        category: 'Hematology',
        sampleType: 'Whole Blood (EDTA - Purple Top)',
        price: 'TZS 15,000',
        turnaroundTime: '30 – 45 Minutes',
        evaluates: 'WBC, RBC, Hemoglobin, Platelets, Hematocrit, and 5-part differential.',
        description: 'Comprehensive automated analyzer assessment of all cellular blood components for infection, anemia, and hematologic disorders.',
        preparation: 'No special fasting required. Patient may drink water normally.',
        isCommon: true,
        isActive: true,
        department: 'Clinical Hematology',
        methodology: 'Automated 5-Part Hematology Analyzer',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
      {
        id: 'test-hemoglobin-quick',
        name: 'Hemoglobin Concentration (Hb Level)',
        code: 'HEM-02',
        category: 'Hematology',
        sampleType: 'Capillary or Venous Blood',
        price: 'TZS 5,000',
        turnaroundTime: '15 – 30 Minutes',
        evaluates: 'Hemoglobin levels to detect anemia or polycythemia.',
        description: 'Rapid quantitative photometer analysis of blood hemoglobin status.',
        preparation: 'No preparation needed.',
        isCommon: true,
        isActive: true,
        department: 'Clinical Hematology',
        methodology: 'Photometric Microcuvette',
      },
      {
        id: 'test-esr',
        name: 'Erythrocyte Sedimentation Rate (ESR)',
        code: 'HEM-03',
        category: 'Hematology',
        sampleType: 'Sodium Citrate Blood (Black Top)',
        price: 'TZS 8,000',
        turnaroundTime: '60 Minutes',
        evaluates: 'Nonspecific systemic inflammation, chronic infections, and autoimmune flare-ups.',
        description: 'Standard Westergren automated sedimentation assay to detect active systemic inflammation.',
        preparation: 'No preparation needed.',
        isCommon: true,
        isActive: true,
        department: 'Clinical Hematology',
        methodology: 'Westergren Method',
      },
      {
        id: 'test-blood-group-rh',
        name: 'Blood Grouping (ABO & Rhesus Factor Type)',
        code: 'HEM-04',
        category: 'Hematology',
        sampleType: 'Venous Blood (EDTA)',
        price: 'TZS 10,000',
        turnaroundTime: '20 – 30 Minutes',
        evaluates: 'ABO blood group antigen typing and Rh (D) positive/negative factor determination.',
        description: 'Official verified blood type certificate for transfusion readiness, antenatal care, and medical records.',
        preparation: 'No preparation required.',
        isCommon: true,
        isActive: true,
        department: 'Immunohematology',
        methodology: 'Agglutination Tube & Tile Method',
      },
      {
        id: 'test-fasting-glucose',
        name: 'Fasting Blood Glucose (FBG) / Random Blood Sugar (RBS)',
        code: 'CHM-01',
        category: 'Clinical Biochemistry',
        sampleType: 'Fluoride Oxalate Plasma (Grey Top) or Serum',
        price: 'TZS 5,000',
        turnaroundTime: '20 – 30 Minutes',
        evaluates: 'Blood glucose concentration to evaluate diabetes mellitus, impaired tolerance, and hypoglycemia.',
        description: 'Precision enzymatic hexokinase assay measuring circulating glucose.',
        preparation: 'For Fasting Blood Sugar: Minimum 8–10 hours of fasting (water permitted).',
        isCommon: true,
        isActive: true,
        department: 'Clinical Biochemistry',
        methodology: 'Glucose Oxidase / Hexokinase',
      },
      {
        id: 'test-hba1c-glycated',
        name: 'Glycated Hemoglobin (HbA1c) 3-Month Diabetes Monitor',
        code: 'CHM-02',
        category: 'Clinical Biochemistry',
        sampleType: 'Whole Blood (EDTA)',
        price: 'TZS 25,000',
        turnaroundTime: '45 – 60 Minutes',
        evaluates: 'Average glycemic control over the preceding 8 to 12 weeks.',
        description: 'NGSP-standardized automated HbA1c testing for diabetes diagnosis and treatment monitoring.',
        preparation: 'No fasting required. Test can be conducted anytime.',
        isCommon: true,
        isActive: true,
        department: 'Clinical Biochemistry',
        methodology: 'HPLC / Fluorescence Immunoassay',
      },
      {
        id: 'test-lipid-profile-full',
        name: 'Complete Fasting Lipid Profile Panel',
        code: 'CHM-03',
        category: 'Clinical Biochemistry',
        sampleType: 'Serum (SST Gold Top)',
        price: 'TZS 35,000',
        turnaroundTime: '1 – 2 Hours',
        evaluates: 'Total Cholesterol, HDL (Good), LDL (Bad), VLDL, and Triglycerides.',
        description: 'Comprehensive cardiovascular risk stratification and lipid metabolic analysis.',
        preparation: 'Strict 10–12 hour overnight fasting required. Water is encouraged.',
        isCommon: true,
        isActive: true,
        department: 'Clinical Biochemistry',
        methodology: 'Enzymatic Spectrophotometry',
      },
      {
        id: 'test-renal-function-rft',
        name: 'Renal Function Test (RFT / Kidney Panel)',
        code: 'CHM-04',
        category: 'Clinical Biochemistry',
        sampleType: 'Serum (SST Gold Top)',
        price: 'TZS 35,000',
        turnaroundTime: '1 – 2 Hours',
        evaluates: 'Serum Creatinine, Blood Urea Nitrogen (BUN), eGFR, and Electrolytes.',
        description: 'Critical biochemical investigation assessing glomerular filtration and kidney health.',
        preparation: 'Avoid high-protein meals and intense exercise immediately before test. Normal hydration.',
        isCommon: true,
        isActive: true,
        department: 'Clinical Biochemistry',
        methodology: 'Modified Jaffe & Enzymatic Urease',
      },
      {
        id: 'test-liver-function-lft',
        name: 'Liver Function Test (LFT / Hepatic Panel)',
        code: 'CHM-05',
        category: 'Clinical Biochemistry',
        sampleType: 'Serum (SST Gold Top)',
        price: 'TZS 40,000',
        turnaroundTime: '1 – 2 Hours',
        evaluates: 'ALT, AST, ALP, Total Bilirubin, Direct Bilirubin, Total Protein, and Albumin.',
        description: 'Comprehensive hepatic cellular integrity and biliary excretory evaluation.',
        preparation: 'Overnight fasting (8 hours) is recommended for optimal baseline measurements.',
        isCommon: true,
        isActive: true,
        department: 'Clinical Biochemistry',
        methodology: 'IFCC Standard Kinetic Assay',
      },
      {
        id: 'test-serum-electrolytes',
        name: 'Serum Electrolytes (Na+, K+, Cl-)',
        code: 'CHM-06',
        category: 'Clinical Biochemistry',
        sampleType: 'Serum (SST Gold Top)',
        price: 'TZS 35,000',
        turnaroundTime: '45 – 60 Minutes',
        evaluates: 'Sodium, Potassium, and Chloride ion concentrations.',
        description: 'Direct Ion-Selective Electrode analysis for fluid balance, cardiac rhythm, and renal electrolyte retention.',
        preparation: 'No special preparation needed.',
        isCommon: true,
        isActive: true,
        department: 'Clinical Biochemistry',
        methodology: 'Direct Ion-Selective Electrode (ISE)',
      },
      {
        id: 'test-uric-acid',
        name: 'Serum Uric Acid Level (Gout Evaluation)',
        code: 'CHM-07',
        category: 'Clinical Biochemistry',
        sampleType: 'Serum (SST Gold Top)',
        price: 'TZS 15,000',
        turnaroundTime: '45 – 60 Minutes',
        evaluates: 'Uric acid levels in patients with joint pain, suspected gout, or kidney stones.',
        description: 'Enzymatic determination of purine metabolism byproduct.',
        preparation: 'Fasting 4 hours preferred. Avoid alcohol 24h prior.',
        isCommon: true,
        isActive: true,
        department: 'Clinical Biochemistry',
        methodology: 'Enzymatic Uricase Assay',
      },
      {
        id: 'test-routine-urinalysis',
        name: 'Routine Urinalysis (10-Parameter Dipstick & Microscopy)',
        code: 'URN-01',
        category: 'Urinalysis & Clinical Microscopy',
        sampleType: 'Clean Catch Midstream Urine',
        price: 'TZS 7,000',
        turnaroundTime: '30 Minutes',
        evaluates: 'Protein, Glucose, Leukocytes, Nitrites, Blood, pH, Specific Gravity, plus sediment microscopy (casts, crystals, cells, bacteria).',
        description: 'Essential diagnostic screening for urinary tract infections, renal disease, and metabolic disorders.',
        preparation: 'Midstream clean-catch specimen in sterile clinic-provided container.',
        isCommon: true,
        isActive: true,
        department: 'Clinical Microscopy',
        methodology: 'Reflectance Photometry & High-Power Microscopy',
      },
      {
        id: 'test-malaria-bs-mrdt',
        name: 'Malaria Blood Slide (BS) & Rapid Antigen Test (mRDT)',
        code: 'PAR-01',
        category: 'Parasitology & Infectious Disease',
        sampleType: 'Capillary or Venous Blood (EDTA)',
        price: 'TZS 5,000',
        turnaroundTime: '20 – 30 Minutes',
        evaluates: 'Plasmodium falciparum and mixed species trophozoites/gametocytes, parasite density quantification.',
        description: 'Gold-standard Giemsa thick and thin film microscopic evaluation combined with dual-antigen rapid strip testing.',
        preparation: 'No preparation. Specimen taken promptly on arrival for immediate febrile workup.',
        isCommon: true,
        isActive: true,
        department: 'Medical Parasitology',
        methodology: 'Giemsa Staining & Immunochromatographic Assay',
      },
      {
        id: 'test-stool-routine-oc',
        name: 'Stool Analysis (Routine & Ova/Cyst Microscopy)',
        code: 'PAR-02',
        category: 'Parasitology & Infectious Disease',
        sampleType: 'Fresh Stool Specimen',
        price: 'TZS 7,000',
        turnaroundTime: '30 – 45 Minutes',
        evaluates: 'Helminth ova, protozoan cysts (Giardia, Amoeba), WBCs, RBCs, and occult blood.',
        description: 'Direct saline and iodine wet mount microscopy for gastrointestinal parasites and enteric inflammation.',
        preparation: 'Provide freshly passed sample in sterile collection pot without urine contamination.',
        isCommon: true,
        isActive: true,
        department: 'Medical Parasitology',
        methodology: 'Direct Saline & Iodine Wet Mount Microscopy',
      },
      {
        id: 'test-widal-typhoid',
        name: 'Widal Agglutination & Typhoid Rapid Screen',
        code: 'SER-01',
        category: 'Serology & Immunology',
        sampleType: 'Serum (SST Gold Top)',
        price: 'TZS 10,000',
        turnaroundTime: '30 – 45 Minutes',
        evaluates: 'Salmonella typhi and paratyphi O and H antibody titers.',
        description: 'Semiquantitative tube and slide agglutination assay for enteric fever evaluation.',
        preparation: 'No preparation required.',
        isCommon: true,
        isActive: true,
        department: 'Clinical Serology',
        methodology: 'Slide & Tube Agglutination',
      },
      {
        id: 'test-hpylori-antigen',
        name: 'Helicobacter pylori (H. pylori) Antigen Test',
        code: 'SER-02',
        category: 'Serology & Immunology',
        sampleType: 'Stool Antigen or Serum Antibody',
        price: 'TZS 15,000',
        turnaroundTime: '30 – 45 Minutes',
        evaluates: 'Active H. pylori infection in patients with dyspepsia, gastritis, or peptic ulcer disease.',
        description: 'High-sensitivity monoclonal antigen immunoassay distinguishing active gastrointestinal colonization.',
        preparation: 'Avoid bismuth and antibiotics 2 weeks prior if possible for stool antigen test.',
        isCommon: true,
        isActive: true,
        department: 'Clinical Serology',
        methodology: 'Chromatographic Immunoassay',
      },
      {
        id: 'test-hepatitis-b-hbsag',
        name: 'Hepatitis B Surface Antigen (HBsAg Screen)',
        code: 'SER-03',
        category: 'Serology & Immunology',
        sampleType: 'Serum (SST Gold Top)',
        price: 'TZS 15,000',
        turnaroundTime: '30 – 45 Minutes',
        evaluates: 'Detection of active Hepatitis B viral infection for medical, prenatal, or pre-employment clearance.',
        description: 'High-specificity third-generation immunochromatographic screen.',
        preparation: 'No preparation needed.',
        isCommon: true,
        isActive: true,
        department: 'Clinical Serology',
        methodology: 'Immunoassay',
      },
      {
        id: 'test-hiv-counseling-screen',
        name: 'HIV 1 & 2 Rapid Screening & Pre/Post Counseling',
        code: 'SER-04',
        category: 'Serology & Immunology',
        sampleType: 'Venous Blood or Serum',
        price: 'TZS 0 (Free Confidential Counseling)',
        turnaroundTime: '20 – 30 Minutes',
        evaluates: 'HIV-1 and HIV-2 antibodies following national Tanzania testing algorithm.',
        description: 'Confidential voluntary counseling and rapid testing (VCT) with certified counseling staff.',
        preparation: 'No preparation needed. Strict patient confidentiality guaranteed.',
        isCommon: true,
        isActive: true,
        department: 'Clinical Serology',
        methodology: 'National 3-Test Rapid Algorithm',
      },
      {
        id: 'test-syphilis-vdrl-rpr',
        name: 'Syphilis Screen (VDRL / RPR / Treponemal Rapid)',
        code: 'SER-05',
        category: 'Serology & Immunology',
        sampleType: 'Serum (SST Gold Top)',
        price: 'TZS 10,000',
        turnaroundTime: '30 Minutes',
        evaluates: 'Treponema pallidum infection for antenatal screening and STI diagnostics.',
        description: 'Rapid nontreponemal and treponemal serological assay.',
        preparation: 'No preparation needed.',
        isCommon: true,
        isActive: true,
        department: 'Clinical Serology',
        methodology: 'Flocculation & Immunochromatography',
      },
      {
        id: 'test-crp-quantitative',
        name: 'C-Reactive Protein (CRP) Quantitative',
        code: 'SER-06',
        category: 'Serology & Immunology',
        sampleType: 'Serum (SST Gold Top)',
        price: 'TZS 20,000',
        turnaroundTime: '45 – 60 Minutes',
        evaluates: 'Acute bacterial vs viral infection severity and tissue injury.',
        description: 'Turbidimetric quantitative measurement of systemic acute-phase reactant.',
        preparation: 'No preparation needed.',
        isCommon: true,
        isActive: true,
        department: 'Clinical Serology',
        methodology: 'Immunoturbidimetry',
      },
      {
        id: 'test-thyroid-tsh',
        name: 'Thyroid Stimulating Hormone (TSH / Thyroid Panel)',
        code: 'HOR-01',
        category: 'Endocrinology & Hormones',
        sampleType: 'Serum (SST Gold Top)',
        price: 'TZS 35,000',
        turnaroundTime: '1 – 2 Hours',
        evaluates: 'Hypothyroidism, hyperthyroidism, metabolic rate dysfunction, and goiter workup.',
        description: 'High-sensitivity chemiluminescence enzyme immunoassay for anterior pituitary thyroid axis.',
        preparation: 'Morning sample preferred. Withhold biotin supplements 24h prior.',
        isCommon: true,
        isActive: true,
        department: 'Clinical Endocrinology',
        methodology: 'Chemiluminescence Immunoassay (CLIA)',
      },
      {
        id: 'test-prostate-psa',
        name: 'Prostate-Specific Antigen (Total PSA Screen)',
        code: 'HOR-02',
        category: 'Endocrinology & Hormones',
        sampleType: 'Serum (SST Gold Top)',
        price: 'TZS 45,000',
        turnaroundTime: '1 – 2 Hours',
        evaluates: 'Prostate health in men aged 40+, assessing benign prostatic hyperplasia (BPH) and prostate screening.',
        description: 'Quantitative immunoassay for circulating prostate-specific antigen.',
        preparation: 'Avoid ejaculation and cycling for 48 hours before sample collection.',
        isCommon: true,
        isActive: true,
        department: 'Clinical Endocrinology',
        methodology: 'Chemiluminescence Immunoassay',
      },
      {
        id: 'test-bacterial-culture-c-s',
        name: 'Microbial Culture & Antibiotic Susceptibility (C&S)',
        code: 'MIC-01',
        category: 'Microbiology',
        sampleType: 'Urine, Swab, Sputum, or Aspirate',
        price: 'TZS 40,000',
        turnaroundTime: '48 – 72 Hours',
        evaluates: 'Bacterial pathogen identification and precise antibiotic sensitivity profiling.',
        description: 'Targeted microbial culture, organism identification, and Kirby-Bauer antibiotic disc diffusion to ensure tailored clinical treatment.',
        preparation: 'Collect specimen prior to commencing antimicrobial therapy when possible.',
        isCommon: false,
        isActive: true,
        department: 'Medical Microbiology',
        methodology: 'Selective Culture Media & Kirby-Bauer Disc Diffusion',
      },
    ],
    services: [
      {
        id: 'clinical-laboratory',
        name: 'Clinical Pathology & Medical Laboratory',
        modality: 'Laboratory Investigation',
        price: 'Refer to Test Catalog',
        status: 'Available Daily',
        description:
          'Comprehensive clinical diagnostic laboratory investigations spanning hematology, clinical biochemistry, medical microbiology, parasitology, urinalysis, endocrinology, and infectious disease screening.',
        commonIndications: [
          'Routine and executive wellness checkups',
          'Febrile illness, malaria, and typhoid evaluations',
          'Chronic disease monitoring (Diabetes, Hypertension, Kidney, Liver)',
          'Antenatal, pre-employment, and diagnostic health screens',
        ],
        patientPreparation: 'Varies by test. Fasting required for lipid and blood sugar panels.',
        typicalDuration: '15 – 60 Minutes',
        isActive: true,
        imageSrc: '/assets/tnoc-laboratory.jpg',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
      {
        id: 'ultrasound-sonography',
        name: 'Diagnostic Ultrasound Sonography',
        modality: 'Ultrasound',
        price: 'Inquire at Reception',
        status: 'Available Daily',
        description:
          'High-resolution non-invasive diagnostic ultrasound imaging providing crystal-clear visualization of abdominal organs, pelvic structures, obstetric fetal development, kidneys, liver, and soft tissues.',
        commonIndications: [
          'Abdominal pain, gallstones, liver pathology, and renal calculi',
          'Antenatal obstetric scans, gestational age, and fetal wellbeing',
          'Pelvic examinations, uterine fibroids, and ovarian assessments',
          'KUB (Kidneys, Ureters, Bladder) and prostate enlargement checks',
        ],
        patientPreparation:
          'Pelvic/Obstetric: Full bladder required (drink 3-4 glasses of water 1hr prior). Abdominal: Fasting 6 hours preferred.',
        typicalDuration: '20 – 30 Minutes',
        isActive: true,
        imageSrc: '/assets/tnoc_ultrasound.jpg',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
      {
        id: 'routine-checkups',
        name: 'Routine Health & Executive Checkup Packages',
        modality: 'Comprehensive Screen',
        price: 'Configurable Package Pricing',
        status: 'Available Daily',
        description:
          'Proactive wellness screening packages customized for corporate employees, executives, pre-employment clearance, and annual family health checkups.',
        commonIndications: [
          'Annual comprehensive health maintenance',
          'Early detection of lifestyle and metabolic disorders',
          'Pre-employment and fitness-to-work medical certifications',
          'Senior citizen metabolic and organ screening',
        ],
        patientPreparation: 'Overnight fasting recommended for morning panels.',
        typicalDuration: '1 – 2 Hours',
        isActive: true,
        imageSrc: '/assets/tnoc_facility_day.jpg',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
    ],
    galleryPhotos: [
      {
        id: 'photo-hero-exterior',
        title: 'TNOC Diagnostic Facility Entrance & Building Signage',
        category: 'Exterior & Landmark',
        description: 'The official exterior entrance of TNOC Medical Diagnostic Facility located along the main access way in Msamvu, Morogoro.',
        imageSrc: '/assets/tnoc_facility_day.jpg',
        isFeatured: true,
        isActive: true,
        order: 1,
      },
      {
        id: 'photo-lab-suite',
        title: 'Diagnostic Laboratory Suite & Automated Analyzers',
        category: 'Laboratory',
        description: 'Our modern, temperature-controlled laboratory workstation equipped with precision automated clinical analyzers in Msamvu.',
        imageSrc: '/assets/tnoc-laboratory.jpg',
        isFeatured: true,
        isActive: true,
        order: 2,
      },
      {
        id: 'photo-ultrasound-suite',
        title: 'Dedicated Diagnostic Ultrasound Examination Room',
        category: 'Imaging Suite',
        description: 'Private, patient-friendly ultrasound examination room ensuring utmost comfort, privacy, and clear diagnostic imaging.',
        imageSrc: '/assets/tnoc_ultrasound.jpg',
        isFeatured: true,
        isActive: true,
        order: 3,
      },
      {
        id: 'photo-reception-desk',
        title: 'Patient Reception & Clinical Triage Station',
        category: 'Reception',
        description: 'Welcoming front-desk patient reception area with courteous medical registrars assisting with inquiries and test booking.',
        imageSrc: '/assets/tnoc_reception.jpg',
        isFeatured: false,
        isActive: true,
        order: 4,
      },
      {
        id: 'photo-phlebotomy-station',
        title: 'Sterile Phlebotomy & Blood Draw Station',
        category: 'Patient Care',
        description: 'Ergonomic, strictly sterile blood collection station ensuring gentle, quick, and safe sample collection.',
        imageSrc: '/assets/tnoc_phlebotomy.jpg',
        isFeatured: false,
        isActive: true,
        order: 5,
      },
      {
        id: 'photo-sign-detail',
        title: 'Official TNOC Road & Direction Signage',
        category: 'Exterior & Landmark',
        description: 'Clear road signage guiding patients and visitors directly from the Msamvu roundabout to our facility entrance.',
        imageSrc: '/assets/tnoc_sign_road.jpg',
        isFeatured: false,
        isActive: true,
        order: 6,
      },
    ],
    galleryVideos: [
      {
        id: 'video-facility-tour',
        title: 'TNOC Diagnostics Facility Walkthrough & Patient Journey',
        description: 'A brief tour of TNOC Medical Diagnostic Facility in Msamvu, showing our reception, phlebotomy, and diagnostic rooms.',
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
        description: 'Overview of our clinical pathology automated workflow, sample handling, and rapid turnaround protocol in Morogoro.',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnailUrl: '/assets/tnoc-laboratory.jpg',
        isPublished: true,
        order: 2,
        createdAt: '2025-01-01T00:00:00Z',
      },
    ],
    homepage: {
      heroTitle: 'Reliable Medical Diagnostics You Can Trust in Msamvu',
      heroSubtitle: 'Accurate Laboratory Investigations & Diagnostic Imaging',
      heroDescription:
        'Serving patients and healthcare providers across Morogoro with rapid, verified diagnostic testing, modern automated laboratory equipment, and compassionate clinical care at Msamvu.',
      heroImage: '/assets/tnoc_facility_day.jpg',
      primaryCtaText: 'View Tests & Prices',
      primaryCtaLink: '/tests',
      secondaryCtaText: 'Our Services',
      secondaryCtaLink: '/services',
      featuredServices: ['clinical-laboratory', 'ultrasound-sonography', 'routine-checkups'],
      featuredTests: ['test-fbp-cbc', 'test-fasting-glucose', 'test-lipid-profile-full', 'test-renal-function-rft', 'test-malaria-bs-mrdt', 'test-hba1c-glycated'],
      whyTnoc: [
        {
          title: 'Clinical Precision & Automated Analyzers',
          description: 'Calibrated laboratory instruments ensuring benchmark accuracy for your medical management.',
          icon: 'Award',
        },
        {
          title: 'Prompt Turnaround Times',
          description: 'Most routine investigations completed within 30 to 60 minutes with official printed results.',
          icon: 'Clock',
        },
        {
          title: 'Experienced Medical Laboratory Staff',
          description: 'Dedicated team led by Dr. Monasser, upholding strict patient confidentiality and compassionate service.',
          icon: 'Users',
        },
        {
          title: 'Convenient Msamvu Location',
          description: 'Centrally positioned in Msamvu with easy access for patients traveling from Morogoro and neighboring areas.',
          icon: 'MapPin',
        },
      ],
    },
    facility: {
      facilityName: 'TNOC MEDICAL DIAGNOSTIC FACILITY',
      displayName: 'TNOC DIAGNOSTICS (MAABARA YA MSAMVU)',
      shortName: 'TNOC Diagnostics',
      swahiliName: 'Maabara ya Msamvu',
      tagline: 'Reliable Medical Diagnostics You Can Trust',
      description:
        'Professional diagnostic laboratory and medical imaging investigations facility dedicated to clinical accuracy, timely results, patient confidentiality, and compassionate care.',
      phone: '0741 405 988',
      phoneRaw: '+255741405988',
      whatsapp: '0741 405 988',
      whatsappRaw: '255741405988',
      email: 'drmonasser04@gmail.com',
      secondaryEmail: 'tnocmedicube@gmail.com',
      directorName: 'Dr. Monasser',
      directorTitle: 'Director of TNOC Diagnostics',
      directorPhone: '0741 405 988',
      directorPhoneRaw: '+255741405988',
      directorWhatsapp: '0741 405 988',
      directorWhatsappRaw: '255741405988',
      directorEmail: 'drmonasser04@gmail.com',
      directorEmails: ['drmonasser04@gmail.com', 'tnocmedicube@gmail.com'],
      address: 'Msamvu Area, Morogoro, Tanzania',
      area: 'Msamvu',
      city: 'Morogoro',
      region: 'Morogoro Region',
      country: 'Tanzania',
      landmark: 'Msamvu Area, Morogoro (Coordinates: -6.802722, 37.661222)',
      googleMapsQuery: 'TNOC DIAGNOSTICS (MAABARA YA MSAMVU)',
      googleMapsSearchUrl: 'https://www.google.com/maps/search/?api=1&query=-6.802722,37.661222',
      googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-6.802722,37.661222',
      googleMapsEmbedUrl: 'https://maps.google.com/maps?q=-6.802722,37.661222&hl=en&z=17&output=embed',
      latitude: -6.802722,
      longitude: 37.661222,
      locationDescription:
        'Located conveniently within the Msamvu transportation hub and commercial area of Morogoro. Readily accessible via private car, bajaji, and public transit, offering prompt walk-in patient triage.',
    },
    about: {
      aboutTitle: 'About TNOC Medical Diagnostic Facility',
      tagline: 'Advancing Clinical Diagnostic Excellence in Morogoro',
      mission:
        'To deliver accurate, prompt, and patient-centered diagnostic investigations using modern technology, empowering clinicians and patients with actionable medical insights.',
      vision:
        'To be the preferred diagnostic reference center in Morogoro and Eastern Tanzania, renowned for unwavering clinical integrity, diagnostic speed, and compassionate patient care.',
      facilityOverview:
        'Established to bridge the diagnostic gap in Morogoro, TNOC Medical Diagnostic Facility (Maabara ya Msamvu) operates modern clinical laboratory testing and ultrasound sonography suites. We pride ourselves on strict quality control, standardized calibration, and rapid turnaround for urgent clinical cases.',
      coreValues: [
        'Accuracy & Clinical Integrity',
        'Speed & Timely Result Delivery',
        'Patient Privacy & Dignity',
        'Hygiene & Biosafety Compliance',
        'Continuous Quality Improvement',
      ],
      whyChooseStatements: [
        {
          title: 'Qualified Diagnostic Leadership',
          description: 'Supervised by Dr. Monasser and registered laboratory scientists dedicated to diagnostic precision.',
          icon: 'ShieldCheck',
        },
        {
          title: 'State-of-the-Art Instruments',
          description: 'Automated 5-part hematology, dry and wet clinical chemistry, and high-frequency sonography equipment.',
          icon: 'Award',
        },
        {
          title: 'Clear & Transparent Pricing',
          description: 'Upfront prices published openly in Tanzanian Shillings (TZS) with no hidden diagnostic charges.',
          icon: 'CheckCircle2',
        },
      ],
    },
    patientInfo: {
      preparationGuidelines: [
        {
          id: 'prep-fasting',
          title: 'Fasting Blood Tests (Glucose & Lipid Profile)',
          category: 'Clinical Chemistry',
          instructions: [
            'Fast for 8 to 12 hours before your blood draw. You should not consume any food, milk, or juices.',
            'Drinking plain water is encouraged to keep your veins well hydrated and easy to access.',
            'Take essential prescription medications with plain water unless your physician has specifically advised otherwise.',
          ],
        },
        {
          id: 'prep-urinalysis',
          title: 'Clean-Catch Midstream Urine Collection',
          category: 'Microscopy',
          instructions: [
            'Thoroughly wash your hands and cleanse the genital area prior to collection.',
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
    },
    openingHours: [
      { day: 'Monday', isOpen: true, is24Hours: false, openTime: '07:30', closeTime: '19:00', notes: 'Full clinical laboratory & diagnostic ultrasound' },
      { day: 'Tuesday', isOpen: true, is24Hours: false, openTime: '07:30', closeTime: '19:00', notes: 'Full clinical laboratory & diagnostic ultrasound' },
      { day: 'Wednesday', isOpen: true, is24Hours: false, openTime: '07:30', closeTime: '19:00', notes: 'Full clinical laboratory & diagnostic ultrasound' },
      { day: 'Thursday', isOpen: true, is24Hours: false, openTime: '07:30', closeTime: '19:00', notes: 'Full clinical laboratory & diagnostic ultrasound' },
      { day: 'Friday', isOpen: true, is24Hours: false, openTime: '07:30', closeTime: '19:00', notes: 'Full clinical laboratory & diagnostic ultrasound' },
      { day: 'Saturday', isOpen: true, is24Hours: false, openTime: '08:00', closeTime: '17:00', notes: 'Routine & emergency laboratory investigations' },
      { day: 'Sunday', isOpen: true, is24Hours: false, openTime: '09:00', closeTime: '14:00', notes: 'Emergency & scheduled diagnostic tests on-call' },
    ],
    faqs: [
      {
        id: 'faq-1',
        question: 'Where is TNOC Medical Diagnostic Facility located in Morogoro?',
        answer:
          'We are conveniently located in the Msamvu area of Morogoro, Tanzania, near the main Msamvu transportation terminal (GPS Coordinates: -6.802722, 37.661222). You can use our Google Maps directions link for direct turn-by-turn navigation.',
        category: 'Location & Access',
        isPublished: true,
        order: 1,
      },
      {
        id: 'faq-2',
        question: 'Do I need a doctor referral to get diagnostic tests done?',
        answer:
          'No referral is strictly required for routine health checkups, blood sugar, lipid profiles, or malaria/infection screens. However, if your doctor has provided an investigation request form, please bring it with you so our laboratory technicians can match the exact tests requested.',
        category: 'Appointments & Walk-ins',
        isPublished: true,
        order: 2,
      },
      {
        id: 'faq-3',
        question: 'How quickly will I receive my laboratory test results?',
        answer:
          'Most routine laboratory tests (such as CBC/FBP, malaria, blood sugar, urinalysis, and rapid serology) are ready within 30 to 60 minutes. Organ function panels (Kidney/Liver profiles) take approximately 1 to 2 hours. Diagnostic ultrasound reports with printed images are issued immediately after your scan.',
        category: 'Results & Turnaround',
        isPublished: true,
        order: 3,
      },
      {
        id: 'faq-4',
        question: 'Are your test prices fixed and transparent in Tanzanian Shillings?',
        answer:
          'Yes. We publish our standard investigation prices openly on our website in Tanzanian Shillings (TZS). Our patient reception desk provides transparent billing with no hidden fees.',
        category: 'Pricing & Payment',
        isPublished: true,
        order: 4,
      },
      {
        id: 'faq-5',
        question: 'How should I prepare for a fasting blood sugar or lipid profile test?',
        answer:
          'You should fast for 8 to 12 hours before specimen collection. Do not eat meals or drink juice, tea, or soda during this period. You are encouraged to drink plain water so your veins remain well hydrated.',
        category: 'Patient Preparation',
        isPublished: true,
        order: 5,
      },
      {
        id: 'faq-6',
        question: 'Can I receive my laboratory results via WhatsApp or Email?',
        answer:
          'Yes. Upon request during sample collection, our laboratory desk can securely send your verified PDF test report directly to your personal WhatsApp number or email address, in addition to providing an official printed hard copy.',
        category: 'Results & Delivery',
        isPublished: true,
        order: 6,
      },
    ],
    seo: {
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
    },
    activityLogs: [
      {
        id: 'log-init',
        timestamp: new Date().toISOString(),
        adminUser: 'System',
        action: 'System Initialized',
        affectedItem: 'TNOC Database',
        details: 'Initial content store and verified clinical catalogue prepared.',
      },
    ],
  };
}

let cachedDb: DatabaseSchema | null = null;

export function loadDatabase(): DatabaseSchema {
  if (cachedDb) return cachedDb;

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      cachedDb = JSON.parse(raw);
      // Ensure admin exists
      if (!cachedDb?.admin) {
        const initial = getInitialDatabase();
        cachedDb!.admin = initial.admin;
        saveDatabase(cachedDb!);
      }
      return cachedDb!;
    }
  } catch (err) {
    console.error('Error loading database file, falling back to default:', err);
  }

  const initial = getInitialDatabase();
  cachedDb = initial;
  saveDatabase(initial);
  return initial;
}

export function saveDatabase(data: DatabaseSchema): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    cachedDb = data;
    return true;
  } catch (err) {
    console.error('Error saving database to file:', err);
    return false;
  }
}

export function getPublicData(): Omit<DatabaseSchema, 'admin'> {
  const db = loadDatabase();
  const { admin, ...publicData } = db;
  return publicData;
}

export function logDbActivity(action: string, affectedItem: string, details?: string, adminUser = 'tnocfacility2026') {
  const db = loadDatabase();
  const newLog = {
    id: 'log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    timestamp: new Date().toISOString(),
    adminUser,
    action,
    affectedItem,
    details: details || '',
  };

  db.activityLogs = [newLog, ...(db.activityLogs || [])].slice(0, 100);
  saveDatabase(db);
}

export function resetDatabaseToDefaults() {
  const fresh = getInitialDatabase();
  saveDatabase(fresh);
  return fresh;
}
