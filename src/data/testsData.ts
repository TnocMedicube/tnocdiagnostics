import { LabTest, ImagingService, TestCategoryType, GalleryPhoto } from '../types';

export interface CategoryMeta {
  id: TestCategoryType;
  title: string;
  swahiliTitle?: string;
  subtitle: string;
  description: string;
  badge: string;
  iconName: string;
}

export const LAB_CATEGORIES: CategoryMeta[] = [
  {
    id: 'hematology',
    title: 'Hematology',
    swahiliTitle: 'Vipimo vya Damu',
    subtitle: 'Cellular blood counts, hemoglobin & coagulation dynamics',
    description:
      'Comprehensive evaluation of peripheral blood cells, oxygen-carrying capacity, coagulation pathways, and red cell morphology.',
    badge: '14 Investigations',
    iconName: 'Activity',
  },
  {
    id: 'chemistry',
    title: 'Clinical Chemistry',
    swahiliTitle: 'Kemia ya Mwili na Viungo',
    subtitle: 'Metabolic markers, renal & hepatic organ profiles',
    description:
      'Biochemical assessment of liver enzymes, kidney filtration function, glucose regulation, lipid balance, and essential serum electrolytes.',
    badge: '25+ Investigations',
    iconName: 'Beaker',
  },
  {
    id: 'microbiology',
    title: 'Microbiology & Cultures',
    swahiliTitle: 'Uchunguzi wa Vimelea na Dawa (Culture)',
    subtitle: 'Microscopy, pathogen isolation & antibiotic susceptibility',
    description:
      'Systematic identification of bacterial pathogens from clinical specimens paired with targeted antimicrobial susceptibility testing to guide responsible treatment.',
    badge: 'Culture & Sensitivity',
    iconName: 'Microscope',
  },
  {
    id: 'parasitology',
    title: 'Parasitology',
    swahiliTitle: 'Uchunguzi wa Vimelea na Minyoo',
    subtitle: 'Malaria blood films, stool protozoa & helminths',
    description:
      'Direct microscopic detection of blood-borne parasites such as Plasmodium falciparum, intestinal protozoa, helminth ova, and urinary schistosoma.',
    badge: 'Microscopic Detection',
    iconName: 'Bug',
  },
  {
    id: 'urinalysis',
    title: 'Urinalysis',
    swahiliTitle: 'Kipimo cha Mkojo',
    subtitle: 'Biochemical dipstick analysis & urinary sediment microscopy',
    description:
      'Multi-parameter screening of urinary chemical constituents combined with microscopic evaluation of cellular elements, casts, and crystals.',
    badge: 'Rapid & Microscopic',
    iconName: 'Droplet',
  },
  {
    id: 'hormones',
    title: 'Endocrinology & Hormones',
    swahiliTitle: 'Vipimo vya Homoni',
    subtitle: 'Thyroid, metabolic & endocrine regulatory markers',
    description:
      'Immunoassay quantification of thyroid-stimulating hormone, reproductive regulators, and endocrine feedback loops.',
    badge: 'Quantitative Immunoassays',
    iconName: 'ShieldCheck',
  },
  {
    id: 'fertility',
    title: 'Fertility Investigations',
    swahiliTitle: 'Uchunguzi wa Uzazi',
    subtitle: 'Comprehensive seminal analysis & reproductive hormone profiles',
    description:
      'Standardized macroscopic and microscopic semen analysis conforming to clinical protocols, complemented by gonadal hormonal panels.',
    badge: 'Male & Female Panels',
    iconName: 'HeartPulse',
  },
  {
    id: 'infectious',
    title: 'Infectious Disease Screening',
    swahiliTitle: 'Uchunguzi wa Magonjwa ya Maambukizi',
    subtitle: 'Viral hepatitis, serological screening & rapid detection',
    description:
      'High-specificity serological detection of viral hepatitis surface markers, syphilis antibodies, and rapid infectious disease screens with clear clinical counseling.',
    badge: 'Confidential Screening',
    iconName: 'ShieldAlert',
  },
  {
    id: 'serology',
    title: 'Serology & Immunology',
    swahiliTitle: 'Kinga na Serolojia',
    subtitle: 'Inflammatory proteins, rheumatoid markers & antibody titers',
    description:
      'Measurement of circulating immune complexes, acute phase reactants like CRP, and antibody responses to systemic inflammatory or post-streptococcal conditions.',
    badge: 'Immune Response',
    iconName: 'Sparkles',
  },
  {
    id: 'specialized',
    title: 'Specialized Investigations',
    swahiliTitle: 'Vipimo Maalum',
    subtitle: 'Tumor markers, micronutrients, vitamins & cardiac enzymes',
    description:
      'Advanced specialized biochemical investigations including PSA, serum ferritin, micronutrient levels, and cardiac biomarker determinations.',
    badge: 'Specialized Profile',
    iconName: 'FileText',
  },
];

export const ALL_LAB_TESTS: LabTest[] = [
  // ==================== A. HEMATOLOGY ====================
  {
    id: 'fbp-cbc',
    name: 'FBP / Full Blood Picture (Complete Blood Count)',
    code: 'HEM-01',
    category: 'hematology',
    sampleType: 'Blood',
    description:
      'A comprehensive automated and differential evaluation of the cellular elements of blood, providing essential diagnostic insight into overall health.',
    evaluates:
      'Red Blood Cells (RBC), White Blood Cells (WBC) total & differential, Hemoglobin (Hb), Hematocrit (HCT), Mean Corpuscular Indices (MCV, MCH, MCHC, RDW), and Platelet count.',
    clinicalReasons: [
      'Investigation of anemia, fatigue, or pallor',
      'Evaluation of suspected acute or chronic infections',
      'Pre-operative general medical evaluation',
      'Monitoring response to chemotherapy or bone marrow medications',
      'Unexplained bruising or bleeding tendencies',
    ],
    preparation: 'No mandatory fasting required for standard FBP. Stay normally hydrated.',
    turnaroundTime: 'Same Day (Within 1–2 hours)',
    availability: 'Available Daily',
    isCommon: true,
  },
  {
    id: 'hemoglobin-hb',
    name: 'Hemoglobin Concentration (Hb)',
    code: 'HEM-02',
    category: 'hematology',
    sampleType: 'Blood',
    description:
      'Quantitative measurement of hemoglobin concentration in whole blood to assess oxygen transport capacity.',
    evaluates: 'Circulating hemoglobin levels in grams per deciliter (g/dL).',
    clinicalReasons: ['Rapid anemia screening', 'Antenatal care baseline assessment', 'Pre-procedural check'],
    preparation: 'No special preparation needed.',
    turnaroundTime: 'Within 30–45 minutes',
    availability: 'Available Daily',
    isCommon: true,
  },
  {
    id: 'esr-rate',
    name: 'ESR (Erythrocyte Sedimentation Rate)',
    code: 'HEM-03',
    category: 'hematology',
    sampleType: 'Blood',
    description:
      'A non-specific measure of systemic inflammation, determining the rate at which red blood cells sediment in anticoagulated blood over one hour.',
    evaluates: 'Erythrocyte sedimentation distance in millimeters per hour (mm/hr).',
    clinicalReasons: [
      'Monitoring inflammatory autoimmune disorders',
      'Evaluating persistent unexplained fever or systemic malaise',
      'Assessing chronic infectious processes',
    ],
    preparation: 'Standard blood collection; no fasting required.',
    turnaroundTime: 'Same Day (Approximately 1.5 hours)',
    availability: 'Available Daily',
    isCommon: true,
  },
  {
    id: 'blood-film-smear',
    name: 'Peripheral Blood Film / Smear Examination',
    code: 'HEM-04',
    category: 'hematology',
    sampleType: 'Blood',
    description:
      'Detailed manual microscopic review of Romanowsky-stained peripheral blood smear by laboratory specialists.',
    evaluates:
      'Red cell morphology (microcytosis, hypochromia, anisopoikilocytosis, target cells, sickle forms), white cell maturity, and platelet distribution.',
    clinicalReasons: [
      'Detailed investigation of unexplained anemia or cytopenias',
      'Evaluation of suspected hematological disorders or blood dyscrasias',
      'Corroboration of automated hematology counter anomalies',
    ],
    preparation: 'Standard venipuncture.',
    turnaroundTime: 'Same Day',
    availability: 'Available Daily',
  },
  {
    id: 'platelet-count',
    name: 'Platelet Count (Thrombocytes)',
    code: 'HEM-05',
    category: 'hematology',
    sampleType: 'Blood',
    description: 'Specific quantification of circulating thrombocytes essential for normal blood clotting.',
    evaluates: 'Total platelets per microliter of blood.',
    clinicalReasons: ['Thrombocytopenia investigation', 'Bleeding disorders', 'Viral infection monitoring'],
    preparation: 'None.',
    turnaroundTime: 'Within 1 hour',
    availability: 'Available Daily',
  },
  {
    id: 'reticulocyte-count',
    name: 'Reticulocyte Count',
    code: 'HEM-06',
    category: 'hematology',
    sampleType: 'Blood',
    description:
      'Assessment of juvenile, non-nucleated red blood cells newly released from bone marrow.',
    evaluates: 'Erythropoietic bone marrow activity and regeneration capacity.',
    clinicalReasons: ['Distinguishing between hemolytic and aplastic anemia', 'Monitoring recovery after iron or B12 therapy'],
    preparation: 'None.',
    turnaroundTime: 'Same Day',
    availability: 'Available Daily',
  },
  {
    id: 'sickling-test',
    name: 'Sickling Test / Sickle Cell Screening',
    code: 'HEM-07',
    category: 'hematology',
    sampleType: 'Blood',
    description:
      'Sodium metabisulfite reducing solubility test to identify presence of sickling hemoglobin (HbS) under deoxygenated conditions.',
    evaluates: 'Erythrocyte morphological transformation under deoxygenation.',
    clinicalReasons: ['Sickle cell trait or disease screening in pediatric and adult patients', 'Family screening'],
    preparation: 'None required.',
    turnaroundTime: 'Same Day (Within 2 hours)',
    availability: 'Available Daily',
    isCommon: true,
  },
  {
    id: 'blood-grouping-rh',
    name: 'Blood Grouping (ABO) & Rh (D) Factor',
    code: 'HEM-08',
    category: 'hematology',
    sampleType: 'Blood',
    description:
      'Determination of red blood cell surface antigens using monoclonal typing antisera for both forward and reverse grouping.',
    evaluates: 'ABO group (A, B, AB, O) and Rhesus factor (Rh positive / Rh negative).',
    clinicalReasons: [
      'Pre-transfusion compatibility screening',
      'Antenatal assessment for Rh incompatibility prevention',
      'Pre-employment or personal health identification card',
    ],
    preparation: 'No special preparation.',
    turnaroundTime: 'Within 45 minutes',
    availability: 'Available Daily',
    isCommon: true,
  },
  {
    id: 'coagulation-profile',
    name: 'Coagulation Profile (PT / INR & APTT)',
    code: 'HEM-09',
    category: 'hematology',
    sampleType: 'Blood',
    description:
      'Evaluation of extrinsic and intrinsic coagulation cascades, crucial for surgical preparedness and anticoagulation monitoring.',
    evaluates: 'Prothrombin Time (PT), International Normalized Ratio (INR), and Activated Partial Thromboplastin Time (APTT).',
    clinicalReasons: [
      'Pre-operative surgical clearance',
      'Monitoring oral anticoagulant therapy (e.g. Warfarin)',
      'Investigation of bleeding or clotting disorders',
    ],
    preparation: 'Sodium citrate tube collection; note any anticoagulants currently prescribed.',
    turnaroundTime: 'Same Day',
    availability: 'Available Daily',
  },
  {
    id: 'd-dimer',
    name: 'D-Dimer Investigation',
    code: 'HEM-10',
    category: 'hematology',
    sampleType: 'Blood',
    description:
      'Measurement of fibrin degradation products generated during plasmin-mediated fibrinolysis of cross-linked blood clots.',
    evaluates: 'Fibrin degradation fragments indicating intravascular thrombus formation.',
    clinicalReasons: ['Evaluation of suspected venous thromboembolism (DVT / PE)', 'Coagulation activation assessment'],
    preparation: 'Standard collection.',
    turnaroundTime: 'Same Day',
    availability: 'Available on Request',
  },

  // ==================== B. CLINICAL CHEMISTRY ====================
  {
    id: 'fasting-blood-glucose',
    name: 'Fasting Blood Glucose (FBG)',
    code: 'CHM-01',
    category: 'chemistry',
    sampleType: 'Blood',
    description:
      'Precision quantitative determination of plasma glucose concentration after an overnight fasting period.',
    evaluates: 'Basal plasma glucose level (mmol/L or mg/dL).',
    clinicalReasons: ['Diagnosis and monitoring of Diabetes Mellitus', 'Evaluation of metabolic dysfunction', 'Routine health wellness checks'],
    preparation: 'Strict overnight fasting (8 to 12 hours required); water may be consumed freely.',
    turnaroundTime: 'Within 30–60 minutes',
    availability: 'Available Daily',
    isCommon: true,
  },
  {
    id: 'random-blood-glucose',
    name: 'Random Blood Glucose (RBG)',
    code: 'CHM-02',
    category: 'chemistry',
    sampleType: 'Blood',
    description:
      'Measurement of circulating blood glucose taken without regard to the timing of the last meal.',
    evaluates: 'Current plasma glucose concentration.',
    clinicalReasons: ['Rapid emergency hypoglycemia or hyperglycemia check', 'Walk-in symptomatic assessment'],
    preparation: 'No fasting required.',
    turnaroundTime: 'Within 20–30 minutes',
    availability: 'Available Daily',
    isCommon: true,
  },
  {
    id: 'hba1c-glycated',
    name: 'HbA1c / Glycated Hemoglobin',
    code: 'CHM-03',
    category: 'chemistry',
    sampleType: 'Blood',
    description:
      'Gold-standard measurement reflecting average plasma glucose concentrations over the preceding 2 to 3 months.',
    evaluates: 'Percentage of glycated hemoglobin (HbA1c %).',
    clinicalReasons: ['Long-term glycemic monitoring in diagnosed diabetic patients', 'Assessment of diabetes treatment efficacy'],
    preparation: 'No fasting needed.',
    turnaroundTime: 'Same Day',
    availability: 'Available Daily',
    isCommon: true,
  },
  {
    id: 'lft-liver-panel',
    name: 'Liver Function Tests (LFT Full Panel)',
    code: 'CHM-04',
    category: 'chemistry',
    sampleType: 'Blood',
    description:
      'Panel of biochemical markers assessing hepatocyte integrity, synthetic function, and biliary clearance.',
    evaluates:
      'ALT (SGPT), AST (SGOT), Alkaline Phosphatase (ALP), Total Bilirubin, Direct Bilirubin, Total Protein, and Albumin.',
    clinicalReasons: [
      'Investigation of jaundice or abdominal discomfort',
      'Monitoring patients on potentially hepatotoxic medications',
      'Assessment of chronic hepatitis or hepatic parenchymal disease',
    ],
    preparation: 'Preferably 6–8 hours fasting or light meal.',
    turnaroundTime: 'Same Day (Within 2–4 hours)',
    availability: 'Available Daily',
    isCommon: true,
  },
  {
    id: 'rft-renal-panel',
    name: 'Renal Function Tests (RFT / Kidney Profile)',
    code: 'CHM-05',
    category: 'chemistry',
    sampleType: 'Blood',
    description:
      'Biochemical evaluation of glomerular filtration efficiency and nitrogenous waste excretion.',
    evaluates: 'Serum Creatinine, Blood Urea, and Estimated Glomerular Filtration Rate (eGFR calculation).',
    clinicalReasons: [
      'Screening and monitoring in hypertension and diabetes',
      'Investigation of acute kidney injury or chronic renal disease',
      'Medication dose adjustment and safety monitoring',
    ],
    preparation: 'Avoid strenuous heavy physical exertion right before test.',
    turnaroundTime: 'Same Day (Within 2–4 hours)',
    availability: 'Available Daily',
    isCommon: true,
  },
  {
    id: 'serum-electrolytes',
    name: 'Serum Electrolytes (Na+, K+, Cl-, Ca2+)',
    code: 'CHM-06',
    category: 'chemistry',
    sampleType: 'Blood',
    description:
      'Measurement of vital ionic compounds maintaining cellular osmotic pressure, neuromuscular excitability, and acid-base equilibrium.',
    evaluates: 'Sodium (Na+), Potassium (K+), Chloride (Cl-), and Total Calcium (Ca2+).',
    clinicalReasons: ['Fluid-electrolyte imbalance evaluation', 'Dehydration or persistent vomiting/diarrhea', 'Cardiac arrhythmia monitoring'],
    preparation: 'No special dietary restriction unless advised.',
    turnaroundTime: 'Same Day',
    availability: 'Available Daily',
  },
  {
    id: 'lipid-profile',
    name: 'Lipid Profile (Cholesterol Panel)',
    code: 'CHM-07',
    category: 'chemistry',
    sampleType: 'Blood',
    description:
      'Comprehensive profiling of circulating lipoproteins to evaluate cardiovascular risk stratification.',
    evaluates: 'Total Cholesterol, HDL ("good") Cholesterol, LDL ("bad") Cholesterol, and Triglycerides.',
    clinicalReasons: ['Cardiovascular risk assessment', 'Hypertension workup', 'Monitoring lipid-lowering therapy'],
    preparation: '10–12 hour overnight fasting strongly recommended for accurate triglyceride measurement.',
    turnaroundTime: 'Same Day',
    availability: 'Available Daily',
    isCommon: true,
  },
  {
    id: 'uric-acid',
    name: 'Serum Uric Acid',
    code: 'CHM-08',
    category: 'chemistry',
    sampleType: 'Blood',
    description: 'Quantitative measurement of purine breakdown products in blood serum.',
    evaluates: 'Uric acid concentration.',
    clinicalReasons: ['Investigation of gout and inflammatory joint swelling', 'Assessment of hyperuricemia or renal calculi risk'],
    preparation: 'Avoid high-purine foods (red meat, organ meats) and alcohol prior to testing.',
    turnaroundTime: 'Same Day',
    availability: 'Available Daily',
  },
  {
    id: 'pancreatic-enzymes',
    name: 'Amylase & Lipase',
    code: 'CHM-09',
    category: 'chemistry',
    sampleType: 'Blood',
    description: 'Enzyme markers released into the bloodstream during acute pancreatic inflammation.',
    evaluates: 'Serum alpha-amylase and lipase enzymatic activity.',
    clinicalReasons: ['Investigation of severe epigastric pain or suspected pancreatitis'],
    preparation: 'Standard blood sample.',
    turnaroundTime: 'Same Day',
    availability: 'Available on Request',
  },

  // ==================== C. MICROBIOLOGY ====================
  {
    id: 'urine-culture-sensitivity',
    name: 'Urine Culture & Sensitivity (Urine C/S)',
    code: 'MIC-01',
    category: 'microbiology',
    sampleType: 'Urine',
    description:
      'Diagnostic gold standard for Urinary Tract Infections (UTI): quantitative aerobic bacterial culture coupled with standardized antibiotic susceptibility testing (AST).',
    evaluates: 'Specific bacterial organism identification (CFU/mL count) and customized antibiotic susceptibility panel.',
    clinicalReasons: [
      'Recurrent, persistent, or complicated urinary tract infections',
      'Antenatal asymptomatic bacteriuria screening',
      'Treatment failure following empiric antimicrobial therapy',
    ],
    preparation:
      'Clean-catch midstream urine sample collected in a sterile container after perineal cleansing, preferably the first morning void.',
    turnaroundTime: '48 to 72 hours (required for microbial incubation and disk diffusion)',
    availability: 'Routine',
    isCommon: true,
  },
  {
    id: 'wound-swab-culture',
    name: 'Wound Swab Culture & Sensitivity',
    code: 'MIC-02',
    category: 'microbiology',
    sampleType: 'Swab',
    description:
      'Isolation and identification of pyogenic bacterial pathogens from cutaneous ulcers, surgical wounds, or soft tissue abscesses.',
    evaluates: 'Pathogen identification and antimicrobial susceptibility profile.',
    clinicalReasons: ['Chronic non-healing ulcers', 'Post-operative wound discharge', 'Guiding targeted surgical wound dressing antibiotics'],
    preparation: 'Collected prior to application of topical antiseptic creams or new antibiotic regimens.',
    turnaroundTime: '48 to 72 hours',
    availability: 'Routine',
  },
  {
    id: 'stool-culture',
    name: 'Stool Culture & Sensitivity',
    code: 'MIC-03',
    category: 'microbiology',
    sampleType: 'Stool',
    description:
      'Bacteriological screening for enteric pathogens such as Salmonella, Shigella, and pathogenic coliforms.',
    evaluates: 'Bacterial enteropathogen identification and drug sensitivity.',
    clinicalReasons: ['Severe prolonged diarrhea', 'Suspected bacterial dysentery or foodborne outbreak investigation'],
    preparation: 'Fresh stool collected in a clean, sterile stool container without urine contamination.',
    turnaroundTime: '48 to 72 hours',
    availability: 'Routine',
  },
  {
    id: 'hvs-examination-culture',
    name: 'High Vaginal Swab (HVS) Microscopy & Culture',
    code: 'MIC-04',
    category: 'microbiology',
    sampleType: 'Swab',
    description:
      'Two-tiered investigation: immediate wet mount and Gram-stain microscopy followed by microbiological culture for candidiasis, bacterial vaginosis, or Trichomonas.',
    evaluates: 'Clue cells, fungal hyphae, bacterial morphotypes, and culture sensitivity when indicated.',
    clinicalReasons: ['Abnormal vaginal discharge', 'Pelvic inflammatory symptoms', 'Recurrent vaginitis'],
    preparation: 'Avoid vaginal douching, spermicides, or topical intravaginal suppositories 24 hours prior to sampling.',
    turnaroundTime: 'Microscopy: Same Day | Culture: 48–72 hours',
    availability: 'Available Daily',
    isCommon: true,
  },
  {
    id: 'sputum-culture',
    name: 'Sputum Examination & Culture',
    code: 'MIC-05',
    category: 'microbiology',
    sampleType: 'Sputum',
    description:
      'Microscopic and bacteriological analysis of deep-expectorated lower respiratory secretions.',
    evaluates: 'Bacterial pathogens causing lower respiratory tract infections.',
    clinicalReasons: ['Persistent productive cough', 'Suspected bacterial pneumonia or bronchiectasis'],
    preparation: 'Rinse mouth with clean water before deep expectoration into sterile cup; avoid collecting mere saliva.',
    turnaroundTime: '48 to 72 hours',
    availability: 'Routine',
  },
  {
    id: 'blood-culture',
    name: 'Blood Culture & Sensitivity',
    code: 'MIC-06',
    category: 'microbiology',
    sampleType: 'Blood',
    description:
      'Strictly aseptic blood collection inoculated into culture broth bottles to detect bacteremia or fungemia.',
    evaluates: 'Circulating blood-borne systemic pathogens and drug resistance profile.',
    clinicalReasons: ['Suspected sepsis', 'Prolonged fever of unknown origin (FUO)', 'Endovascular infection evaluation'],
    preparation: 'Aseptic venipuncture performed ideally prior to commencement of systemic antibiotics.',
    turnaroundTime: 'Preliminary 48h, final up to 5–7 days',
    availability: 'Available on Request',
  },

  // ==================== D. PARASITOLOGY ====================
  {
    id: 'malaria-blood-film',
    name: 'Malaria Parasite (BS / Thick & Thin Blood Film)',
    code: 'PAR-01',
    category: 'parasitology',
    sampleType: 'Blood',
    description:
      'Definitive diagnostic microscopy using Giemsa-stained blood films to identify Plasmodium species and parasite density quantification.',
    evaluates: 'Presence of Plasmodium (falciparum, malariae, ovale, vivax), stage of development, and parasite clearance.',
    clinicalReasons: ['Fever, chills, rigors, headache, or suspected clinical malaria in an endemic setting'],
    preparation: 'Finger-prick or whole blood venipuncture.',
    turnaroundTime: 'Within 30–60 minutes',
    availability: 'Available Daily',
    isCommon: true,
  },
  {
    id: 'malaria-rdt',
    name: 'Malaria Rapid Diagnostic Test (mRDT)',
    code: 'PAR-02',
    category: 'parasitology',
    sampleType: 'Blood',
    description:
      'Immunochromatographic lateral flow assay detecting Plasmodium histidine-rich protein II (HRP2) and/or pLDH antigens.',
    evaluates: 'Qualitative malaria antigen screening.',
    clinicalReasons: ['Rapid urgent point-of-care malaria screening'],
    preparation: 'No preparation needed.',
    turnaroundTime: 'Within 15–20 minutes',
    availability: 'Available Daily',
  },
  {
    id: 'stool-microscopy-ova',
    name: 'Stool Analysis: Microscopy for Ova & Parasites (O&P)',
    code: 'PAR-03',
    category: 'parasitology',
    sampleType: 'Stool',
    description:
      'Direct saline and Lugol iodine wet preparation microscopy to detect intestinal protozoan cysts, trophozoites, and helminth ova.',
    evaluates:
      'Entamoeba histolytica/dispar, Giardia lamblia, Ascaris, Hookworm, Trichuris trichiura, and red/white blood cells.',
    clinicalReasons: ['Gastrointestinal cramping, diarrhea, or bloating', 'Pediatric failure to thrive or anemia workup'],
    preparation: 'Fresh stool sample collected without water or urine contamination.',
    turnaroundTime: 'Within 1–2 hours',
    availability: 'Available Daily',
    isCommon: true,
  },
  {
    id: 'urine-schistosomiasis',
    name: 'Urine Examination for Schistosoma haematobium',
    code: 'PAR-04',
    category: 'parasitology',
    sampleType: 'Urine',
    description:
      'Centrifuged or filtration microscopic examination of terminal urine specimens to identify terminal-spined Schistosoma haematobium eggs.',
    evaluates: 'Schistosoma haematobium ova and microscopic hematuria.',
    clinicalReasons: ['Painless terminal hematuria', 'Patients with history of freshwater contact in endemic zones'],
    preparation: 'Collect terminal urine between 10:00 AM and 2:00 PM (peak egg excretion).',
    turnaroundTime: 'Same Day',
    availability: 'Available Daily',
  },

  // ==================== E. URINALYSIS ====================
  {
    id: 'urine-dipstick-routine',
    name: 'Urinalysis / Complete Urine Routine (Dipstick & Microscopy)',
    code: 'URN-01',
    category: 'urinalysis',
    sampleType: 'Urine',
    description:
      'Dual biochemical dipstick profiling and centrifuged microscopic sediment examination for comprehensive renal and urinary tract evaluation.',
    evaluates:
      'pH, Specific Gravity, Protein, Glucose, Ketones, Bilirubin, Urobilinogen, Blood, Nitrites, Leukocyte Esterase, pus cells (WBC), RBC, epithelial cells, casts, and crystals.',
    clinicalReasons: [
      'Evaluation of dysuria, flank pain, or frequency',
      'Screening for proteinuria in hypertension or diabetes',
      'Routine medical examination and antenatal checkups',
    ],
    preparation: 'Midstream clean-catch sample in sterile container.',
    turnaroundTime: 'Within 30–45 minutes',
    availability: 'Available Daily',
    isCommon: true,
  },
  {
    id: 'urine-pregnancy-hcg',
    name: 'Urine Pregnancy Test (Urine hCG)',
    code: 'URN-02',
    category: 'urinalysis',
    sampleType: 'Urine',
    description:
      'High-sensitivity qualitative chromatographic immunoassay detecting human Chorionic Gonadotropin (hCG) in urine.',
    evaluates: 'Presence of pregnancy hormone hCG above clinical threshold.',
    clinicalReasons: ['Early confirmation of suspected pregnancy', 'Pre-radiological or medication safety check in females of childbearing age'],
    preparation: 'First morning urine is preferred due to highest hormone concentration.',
    turnaroundTime: 'Within 15 minutes',
    availability: 'Available Daily',
    isCommon: true,
  },

  // ==================== F. HORMONAL / ENDOCRINOLOGY ====================
  {
    id: 'thyroid-panel-tsh',
    name: 'Thyroid Panel (TSH, Free T3, Free T4)',
    code: 'HRM-01',
    category: 'hormones',
    sampleType: 'Blood',
    description:
      'Quantitative chemiluminescent determination of thyroid-stimulating hormone and active circulating thyroid hormones.',
    evaluates: 'TSH, FT3, and FT4 concentrations assessing thyroid gland regulatory axis.',
    clinicalReasons: [
      'Investigation of hyperthyroidism (tremors, palpitations, weight loss)',
      'Investigation of hypothyroidism (unexplained fatigue, weight gain, cold intolerance)',
      'Goiter evaluation or thyroid medication monitoring',
    ],
    preparation: 'Standard blood draw; inform laboratory of any thyroid supplements taken.',
    turnaroundTime: 'Same Day to Next Day',
    availability: 'Available Daily',
    isCommon: true,
  },
  {
    id: 'beta-hcg-quantitative',
    name: 'Beta-hCG (Quantitative Serum)',
    code: 'HRM-02',
    category: 'hormones',
    sampleType: 'Blood',
    description:
      'Precise quantitative blood measurement of intact human Chorionic Gonadotropin down to milli-international units per milliliter.',
    evaluates: 'Exact circulating serum beta-hCG titer (mIU/mL).',
    clinicalReasons: [
      'Assessment of early gestational viability and serial doubling time',
      'Evaluation of suspected ectopic pregnancy',
      'Follow-up of gestational trophoblastic disease',
    ],
    preparation: 'No fasting necessary.',
    turnaroundTime: 'Same Day',
    availability: 'Available Daily',
  },
  {
    id: 'prolactin-hormone',
    name: 'Serum Prolactin',
    code: 'HRM-03',
    category: 'hormones',
    sampleType: 'Blood',
    description: 'Immunoassay measurement of pituitary prolactin secretion.',
    evaluates: 'Basal prolactin concentration.',
    clinicalReasons: ['Investigation of galactorrhea, amenorrhea, or unexplained infertility'],
    preparation: 'Rest quietly 20 minutes before collection; morning sample preferred.',
    turnaroundTime: 'Same Day',
    availability: 'Available Daily',
  },

  // ==================== G. FERTILITY INVESTIGATIONS ====================
  {
    id: 'semen-analysis',
    name: 'Semen Analysis (Seminogram / Sperm Count)',
    code: 'FRT-01',
    category: 'fertility',
    sampleType: 'Semen',
    description:
      'Standardized macroscopic and microscopic laboratory evaluation of human semen following clinical international laboratory guidelines.',
    evaluates:
      'Volume, liquefaction time, pH, viscosity, sperm concentration (count per mL), total sperm number, percentage motility (progressive vs non-progressive), and normal morphology percentage.',
    clinicalReasons: [
      'Evaluation of male fertility status in couples attempting conception',
      'Post-vasectomy verification of azoospermia',
      'Assessment following varicocelectomy or reproductive surgery',
    ],
    preparation:
      'Crucial preparation: strict sexual abstinence for 2 to 7 days prior to collection. Sample should be produced directly into sterile container.',
    turnaroundTime: 'Same Day (Evaluated within 1 hour of liquefaction)',
    availability: 'Specialized Schedule',
    isCommon: true,
  },
  {
    id: 'female-fertility-profile',
    name: 'Female Reproductive Hormone Profile (FSH, LH, Progesterone, Estradiol)',
    code: 'FRT-02',
    category: 'fertility',
    sampleType: 'Blood',
    description:
      'Comprehensive endocrine mapping of follicular development, ovulatory trigger, and luteal adequacy.',
    evaluates: 'Follicle-Stimulating Hormone (FSH), Luteinizing Hormone (LH), Estradiol (E2), and Progesterone.',
    clinicalReasons: [
      'Investigation of irregular menstrual cycles or amenorrhea',
      'Confirmation of ovulation (Day 21 Progesterone)',
      'Evaluation of ovarian reserve or perimenopausal transition',
    ],
    preparation: 'Timing depends strictly on menstrual cycle day (e.g. Day 2–4 for baseline, Day 21 for progesterone).',
    turnaroundTime: 'Same Day to Next Day',
    availability: 'Routine',
  },
  {
    id: 'male-fertility-testosterone',
    name: 'Serum Total Testosterone',
    code: 'FRT-03',
    category: 'fertility',
    sampleType: 'Blood',
    description: 'Quantitative determination of the primary male androgenic steroid hormone.',
    evaluates: 'Circulating testosterone concentration.',
    clinicalReasons: ['Investigation of hypogonadism, erectile dysfunction, low libido, or impaired spermatogenesis'],
    preparation: 'Morning blood sample recommended (7:00 AM – 10:00 AM) when testosterone levels peak.',
    turnaroundTime: 'Same Day',
    availability: 'Routine',
  },

  // ==================== H. INFECTIOUS DISEASE TESTING ====================
  {
    id: 'hepatitis-b-surface-antigen',
    name: 'Hepatitis B Surface Antigen (HBsAg)',
    code: 'INF-01',
    category: 'infectious',
    sampleType: 'Blood',
    description:
      'Serological screening for Hepatitis B virus outer envelope protein, indicating active acute or chronic infection.',
    evaluates: 'Presence of circulating Hepatitis B surface antigen.',
    clinicalReasons: [
      'Antenatal screening for prevention of vertical transmission',
      'Pre-operative and blood donation screening',
      'Investigation of elevated liver enzymes',
    ],
    preparation: 'Standard blood sample.',
    turnaroundTime: 'Within 30–60 minutes',
    availability: 'Available Daily',
    isCommon: true,
  },
  {
    id: 'hepatitis-c-antibody',
    name: 'Hepatitis C Virus Antibody (Anti-HCV)',
    code: 'INF-02',
    category: 'infectious',
    sampleType: 'Blood',
    description: 'High-specificity antibody screening assay identifying exposure to Hepatitis C virus.',
    evaluates: 'Anti-HCV antibodies (reactive vs non-reactive).',
    clinicalReasons: ['Liver disease investigation', 'Pre-operative screening protocol'],
    preparation: 'None.',
    turnaroundTime: 'Within 30–60 minutes',
    availability: 'Available Daily',
    isCommon: true,
  },
  {
    id: 'syphilis-screening-vdrl-rpr',
    name: 'Syphilis Screening (VDRL / RPR / Treponemal)',
    code: 'INF-03',
    category: 'infectious',
    sampleType: 'Blood',
    description:
      'Serological screening for antibodies associated with Treponema pallidum infection, supporting routine sexual health and antenatal screening.',
    evaluates: 'Reaginic or treponemal antibodies.',
    clinicalReasons: ['Routine antenatal clinic profile', 'Investigation of genital ulcers or rashes'],
    preparation: 'Standard collection.',
    turnaroundTime: 'Within 45 minutes',
    availability: 'Available Daily',
    isCommon: true,
  },
  {
    id: 'hiv-confidential-screening',
    name: 'HIV Screening (Rapid Diagnostic Protocol)',
    code: 'INF-04',
    category: 'infectious',
    sampleType: 'Blood',
    description:
      'Confidential antibody/antigen rapid testing performed in strict compliance with national diagnostic algorithm guidelines and pre/post-test counseling protocols.',
    evaluates: 'HIV-1 and HIV-2 antibodies and/or p24 antigen.',
    clinicalReasons: ['Antenatal PMTCT screening', 'Voluntary confidential testing', 'Clinical assessment'],
    preparation: 'Pre-test briefing provided in our private consultation room.',
    turnaroundTime: 'Within 30 minutes',
    availability: 'Available Daily',
    isCommon: true,
  },

  // ==================== I. SEROLOGY / IMMUNOLOGY ====================
  {
    id: 'crp-c-reactive-protein',
    name: 'C-Reactive Protein (Quantitative / Semi-Quantitative CRP)',
    code: 'SER-01',
    category: 'serology',
    sampleType: 'Blood',
    description:
      'Acute-phase reactant synthesized by the liver, rising rapidly in response to acute inflammatory stimuli, tissue injury, or serious bacterial infection.',
    evaluates: 'Serum CRP concentration in mg/L.',
    clinicalReasons: [
      'Differentiating acute bacterial from minor viral infections',
      'Assessing inflammatory activity in rheumatic or autoimmune diseases',
      'Monitoring post-surgical wound infection onset',
    ],
    preparation: 'Standard blood collection.',
    turnaroundTime: 'Same Day (Within 1–2 hours)',
    availability: 'Available Daily',
    isCommon: true,
  },
  {
    id: 'rheumatoid-factor-rf',
    name: 'Rheumatoid Factor (RF)',
    code: 'SER-02',
    category: 'serology',
    sampleType: 'Blood',
    description: 'Agglutination or turbidimetric detection of autoantibodies directed against IgG Fc fragments.',
    evaluates: 'Circulating rheumatoid factor titer.',
    clinicalReasons: ['Investigation of polyarticular joint pain, morning stiffness, and suspected rheumatoid arthritis'],
    preparation: 'Standard sample.',
    turnaroundTime: 'Same Day',
    availability: 'Available Daily',
  },
  {
    id: 'aso-titre',
    name: 'ASO Titre (Anti-Streptolysin O)',
    code: 'SER-03',
    category: 'serology',
    sampleType: 'Blood',
    description:
      'Measurement of antibody levels directed against streptolysin O, an exotoxin produced by Group A beta-hemolytic Streptococcus.',
    evaluates: 'Serum ASO antibody titer (IU/mL).',
    clinicalReasons: ['Evaluation of suspected post-streptococcal sequelae such as acute rheumatic fever or post-streptococcal glomerulonephritis'],
    preparation: 'Standard blood draw.',
    turnaroundTime: 'Same Day',
    availability: 'Available Daily',
  },
  {
    id: 'widal-febrile-antigens',
    name: 'Widal Agglutination Reaction',
    code: 'SER-04',
    category: 'serology',
    sampleType: 'Blood',
    description:
      'Serological tube/slide agglutination reaction detecting somatic (O) and flagellar (H) antibodies against Salmonella enterica serovars. Note: Clinically evaluated in context with patient history and culture verification.',
    evaluates: 'O and H agglutinin titers.',
    clinicalReasons: ['Supportive adjunct in prolonged febrile illness where culture access is pending'],
    preparation: 'Standard sample.',
    turnaroundTime: 'Same Day',
    availability: 'Available Daily',
  },
  {
    id: 'brucella-antibodies',
    name: 'Brucella Serology (Febrile Agglutination)',
    code: 'SER-05',
    category: 'serology',
    sampleType: 'Blood',
    description:
      'Detection of specific antibodies against Brucella abortus and Brucella melitensis in patients with occupational or unpasteurized dairy exposure.',
    evaluates: 'Brucella agglutinating antibodies.',
    clinicalReasons: ['Undulant fever, chronic arthralgia, or night sweats with livestock exposure'],
    preparation: 'Standard collection.',
    turnaroundTime: 'Same Day',
    availability: 'Routine',
  },

  // ==================== J. SPECIALIZED INVESTIGATIONS ====================
  {
    id: 'psa-prostate-specific',
    name: 'Prostate Specific Antigen (Total & Free PSA)',
    code: 'SPC-01',
    category: 'specialized',
    sampleType: 'Blood',
    description:
      'Immunoassay measuring serine protease produced by prostate epithelial cells, supporting clinical evaluation of prostatic tissue.',
    evaluates: 'Serum Total PSA and Free PSA percentage.',
    clinicalReasons: [
      'Evaluation of lower urinary tract symptoms (nocturia, weak stream) in men aged 50+',
      'Adjunct in clinical prostate health assessment',
    ],
    preparation: 'Avoid vigorous cycling or ejaculation 48 hours prior to blood draw; testing should precede digital rectal examination.',
    turnaroundTime: 'Same Day to Next Day',
    availability: 'Available Daily',
    isCommon: true,
  },
  {
    id: 'serum-ferritin',
    name: 'Serum Ferritin & Iron Profile',
    code: 'SPC-02',
    category: 'specialized',
    sampleType: 'Blood',
    description:
      'Accurate assessment of total body iron stores, distinguishing true iron-deficiency anemia from anemia of chronic disease.',
    evaluates: 'Serum Ferritin (ng/mL) and transferrin saturation.',
    clinicalReasons: ['Refractory microcytic anemia', 'Investigation of iron overload states'],
    preparation: 'Morning sample preferred.',
    turnaroundTime: 'Same Day',
    availability: 'Routine',
  },
  {
    id: 'cardiac-troponin',
    name: 'Cardiac Troponin Biomarker',
    code: 'SPC-03',
    category: 'specialized',
    sampleType: 'Blood',
    description:
      'High-sensitivity cardiac biomarker released following myocardial cellular distress or acute coronary syndrome.',
    evaluates: 'Circulating cardiac troponin levels.',
    clinicalReasons: ['Acute chest pain evaluation', 'Urgent myocardial injury assessment'],
    preparation: 'Immediate blood sample without delay.',
    turnaroundTime: 'Rapid / Within 1 hour',
    availability: 'Available Daily',
  },
  {
    id: 'vitamin-d-b12',
    name: 'Vitamin D (25-OH) & Vitamin B12',
    code: 'SPC-04',
    category: 'specialized',
    sampleType: 'Blood',
    description:
      'Nutritional biomarker assays evaluating bone mineralization reserves and neuro-hematological cofactor adequacy.',
    evaluates: 'Serum 25-hydroxyvitamin D and active cyanocobalamin.',
    clinicalReasons: ['Unexplained peripheral neuropathy, bone aches, or macrocytic megaloblastic anemia'],
    preparation: 'Standard blood draw.',
    turnaroundTime: '1 to 2 Days',
    availability: 'Available on Request',
  },
];

// ==================== IMAGING & DIAGNOSTIC INVESTIGATIONS ====================
// CRITICAL REQUIREMENT: Dedicated, completely separate section with distinct scanning styling!

export const IMAGING_SERVICES: ImagingService[] = [
  {
    id: 'img-ob-gyn',
    name: 'Obstetric & Antenatal Ultrasound',
    modality: 'Ultrasound',
    description:
      'High-resolution non-invasive sonographic examination evaluating fetal viability, accurate gestational dating, anatomical development, amniotic fluid index, and placental localization.',
    commonIndications: [
      'Early pregnancy confirmation and dating scan',
      'Second trimester fetal anomaly and anatomical assessment',
      'Growth monitoring, presentation, and placental location in third trimester',
    ],
    patientPreparation: 'Drink 2–3 glasses of water 45 minutes before scan in early pregnancy for adequate acoustic window.',
    typicalDuration: '20–30 minutes',
    status: 'Available',
  },
  {
    id: 'img-pelvic',
    name: 'Pelvic Ultrasound (Gynaecological)',
    modality: 'Ultrasound',
    description:
      'Detailed transabdominal imaging of the female pelvic viscera, evaluating uterine myometrium, endometrial stripe, and bilateral adnexa.',
    commonIndications: [
      'Investigation of pelvic pain or abnormal uterine bleeding',
      'Evaluation of uterine fibroids, adenomyosis, or endometrial thickening',
      'Assessment of ovarian follicular morphology and ovarian cysts',
    ],
    patientPreparation: 'Full urinary bladder required; drink 750mL–1L of water 1 hour prior to examination.',
    typicalDuration: '15–20 minutes',
    status: 'Available',
  },
  {
    id: 'img-abdominal',
    name: 'Abdominal Ultrasound (Upper Abdomen)',
    modality: 'Ultrasound',
    description:
      'Comprehensive sonographic visualization of solid upper abdominal parenchymal organs and hepatobiliary architecture.',
    commonIndications: [
      'Evaluation of right upper quadrant pain or suspected gallstones (cholelithiasis)',
      'Assessment of hepatomegaly, fatty liver infiltration, or splenomegaly',
      'Screening for ascites, renal architecture, or abdominal aortic caliber',
    ],
    patientPreparation: 'Fast for at least 6 hours prior to scan to reduce bowel gas and ensure gallbladder distension.',
    typicalDuration: '20–25 minutes',
    status: 'Available',
  },
  {
    id: 'img-kub-renal',
    name: 'Renal & Urinary Tract Ultrasound (KUB)',
    modality: 'Ultrasound',
    description:
      'Sonographic evaluation of the kidneys, ureteric junctions, and urinary bladder assessing renal parenchymal thickness and outflow obstruction.',
    commonIndications: [
      'Flank or loin pain, suspected renal calculi or hydronephrosis',
      'Recurrent urinary tract infections or hematuria investigation',
      'Post-void residual urine volume determination',
    ],
    patientPreparation: 'Drink 1 liter of water 1 hour before the exam to ensure bladder fullness.',
    typicalDuration: '15–20 minutes',
    status: 'Available',
  },
  {
    id: 'img-prostate',
    name: 'Prostate & Bladder Ultrasound',
    modality: 'Ultrasound',
    description:
      'Transabdominal sonographic assessment measuring prostatic volume, parenchymal texture, and post-void residual volume in men.',
    commonIndications: [
      'Hesitancy, weak urinary stream, or nocturnal frequency',
      'Monitoring benign prostatic enlargement response',
    ],
    patientPreparation: 'Full bladder required prior to initial scan; post-micturition scan performed immediately after voiding.',
    typicalDuration: '15–20 minutes',
    status: 'Available',
  },
  {
    id: 'img-breast',
    name: 'Breast Ultrasound',
    modality: 'Ultrasound',
    description:
      'High-frequency targeted sonography differentiating solid masses from benign fluid-filled cysts in mammary tissue.',
    commonIndications: [
      'Evaluation of palpable breast lumps or localized mastalgia',
      'Adjunct diagnostic imaging in women under 40 years',
    ],
    patientPreparation: 'Wear comfortable two-piece clothing; avoid applying talcum powder or lotion on chest area.',
    typicalDuration: '20 minutes',
    status: 'Available',
  },
  {
    id: 'img-thyroid',
    name: 'Thyroid & Neck Ultrasound',
    modality: 'Ultrasound',
    description:
      'Detailed sonography of thyroid lobes and isthmus to characterize nodularity, cystic changes, and cervical lymph nodes.',
    commonIndications: [
      'Investigation of palpable neck swelling or goiter',
      'Characterizing solitary vs multinodular thyroid architecture',
    ],
    patientPreparation: 'Remove neck jewelry and open-collar clothing.',
    typicalDuration: '15 minutes',
    status: 'Available',
  },
  {
    id: 'img-doppler',
    name: 'Doppler Ultrasound (Vascular Investigations)',
    modality: 'Ultrasound',
    description:
      'Color and spectral Doppler analysis evaluating blood flow velocities, arterial patency, and venous competence.',
    commonIndications: [
      'Suspected deep vein thrombosis (DVT) in lower limbs',
      'Peripheral arterial disease assessment or carotid flow evaluation',
    ],
    patientPreparation: 'Varies based on region examined; typically no fasting for peripheral limbs.',
    typicalDuration: '30–45 minutes',
    status: 'Available on Request',
  },
  {
    id: 'img-ecg',
    name: '12-Lead Diagnostic ECG (Electrocardiogram)',
    modality: 'ECG',
    description:
      'Resting electrophysiological tracing recording the electrical cardiac conduction system from 12 anatomical leads.',
    commonIndications: [
      'Chest pain, palpitations, or dizziness investigation',
      'Pre-operative cardiac risk clearance',
      'Hypertension cardiac remodeling assessment',
    ],
    patientPreparation: 'Rest calmly 10 minutes prior to lead placement; avoid heavy caffeine right before.',
    typicalDuration: '10–15 minutes',
    status: 'Available',
  },
];

// Why Choose TNOC Diagnostic Facility propositions
export const WHY_CHOOSE_TNOC = [
  {
    title: 'Professional Diagnostic Practice',
    description:
      'Investigations performed by qualified laboratory scientists and sonography personnel adhering to standard operating procedures and rigorous internal quality control.',
    icon: 'Award',
  },
  {
    title: 'Broad Range of Investigations',
    description:
      'From routine hematology and clinical chemistry to advanced microbiological cultures, hormones, and ultrasound imaging under one convenient roof in Msamvu.',
    icon: 'Layers',
  },
  {
    title: 'Timely & Reliable Turnaround',
    description:
      'Recognizing that timely diagnostic clarity is critical for patient management, routine tests are processed promptly with same-day reporting.',
    icon: 'Clock',
  },
  {
    title: 'Strict Patient Confidentiality',
    description:
      'All diagnostic investigations and personal health records are handled with the highest standard of medical ethics and absolute privacy safeguards.',
    icon: 'Shield',
  },
  {
    title: 'Convenient Strategic Location',
    description:
      'Easily accessible in Msamvu, Morogoro, adjacent to major transport corridors, making it simple for patients to reach us quickly.',
    icon: 'MapPin',
  },
  {
    title: 'Modern Diagnostic Approach',
    description:
      'Utilizing contemporary automated analyzers, sterile sample collection disposables, and standardized microscopic confirmation protocols.',
    icon: 'Microscope',
  },
  {
    title: 'Integrated Lab & Imaging Services',
    description:
      'Seamless coordination between pathology laboratory tests and diagnostic sonography, eliminating the need to visit multiple distant facilities.',
    icon: 'Activity',
  },
  {
    title: 'Clear Communication of Results',
    description:
      'Standardized, clearly formatted diagnostic reports delivered securely with normal biological reference ranges for physician clinical correlation.',
    icon: 'FileCheck',
  },
];

export const WHY_CHOOSE_US_ITEMS = WHY_CHOOSE_TNOC;

// Facility gallery showcasing verified TNOC Medical Diagnostic Facility photos
export const FACILITY_GALLERY: GalleryPhoto[] = [
  {
    id: 'gal-original-photo',
    title: 'Msamvu Diagnostic Facility & Maabara Site',
    category: 'Facility Exterior',
    description:
      'Original exterior photograph of the facility in Msamvu, Morogoro, showing the prominent red rooftop Maabara sign, clinical window graphics, security grilles, and patient entrance ramp.',
    imageSrc: '/assets/facility_original_exterior.jpg',
    fallbackGradient: 'from-red-900 to-amber-950',
  },
  {
    id: 'gal-facility-day',
    title: 'TNOC Diagnostic Facility & Maabara (Daytime View)',
    category: 'Daytime Exterior',
    description:
      'Full exterior daytime perspective of TNOC Medical Diagnostic Facility in Msamvu, Morogoro, featuring modern 3D rooftop signage, window graphics, security grilles, and accessible entrance ramp.',
    imageSrc: '/assets/tnoc_facility_day.jpg',
    fallbackGradient: 'from-blue-900 to-slate-900',
  },
  {
    id: 'gal-facility-night',
    title: 'Illuminated Night View & 24/7 Facility Beacon',
    category: 'Night & Illuminated',
    description:
      'Nighttime perspective showcasing the illuminated backlit 3D signboard and warm interior lighting, providing a clear landmark for evening consultations and emergency lab services in Msamvu.',
    imageSrc: '/assets/tnoc_facility_night.jpg',
    fallbackGradient: 'from-slate-950 to-blue-950',
  },
  {
    id: 'gal-entrance-pillar',
    title: 'Roadside Totem Sign & Patient Entrance',
    category: 'Entrance & Totem Sign',
    description:
      'Dedicated roadside pillar lightbox sign displaying the official TNOC logo, laboratory and ultrasound service indicators, and directional arrow welcoming patients at the entrance ramp.',
    imageSrc: '/assets/tnoc_entrance_pillar.jpg',
    fallbackGradient: 'from-red-950 to-blue-900',
  },
  {
    id: 'gal-front-billboard',
    title: 'Maabara 3D Rooftop Billboard & Building Facade',
    category: '3D Rooftop Billboard',
    description:
      'Front-facing angle highlighting the vibrant red 3D acrylic rooftop billboard with yellow Maabara lettering, official TNOC stethoscope emblem, and clear facility branding.',
    imageSrc: '/assets/tnoc_front_billboard.jpg',
    fallbackGradient: 'from-red-900 to-slate-950',
  },
];
