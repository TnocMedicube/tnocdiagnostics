import React, { useState, useEffect } from 'react';
import {
  FlaskConical,
  Activity,
  CheckCircle2,
  Clock,
  Droplet,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { Link, useRouter } from '../router/RouterContext';
import { useCms } from '../context/CmsContext';

export const ServicesPage: React.FC = () => {
  const { services, businessConfig } = useCms();
  const { currentQuery } = useRouter();

  const [activeCategory, setActiveCategory] = useState<'all' | 'laboratory' | 'ultrasound'>('all');

  useEffect(() => {
    const categoryParam = currentQuery.get('category');
    if (categoryParam === 'laboratory') {
      setActiveCategory('laboratory');
    } else if (categoryParam === 'ultrasound') {
      setActiveCategory('ultrasound');
    } else {
      setActiveCategory('all');
    }
  }, [currentQuery]);

  const labServices = services.filter(
    (s) =>
      s.isActive &&
      (s.modality.toLowerCase().includes('lab') ||
        s.name.toLowerCase().includes('lab') ||
        s.name.toLowerCase().includes('pathology'))
  );

  const ultrasoundServices = services.filter(
    (s) =>
      s.isActive &&
      (s.modality.toLowerCase().includes('ultrasound') ||
        s.name.toLowerCase().includes('ultrasound') ||
        s.modality.toLowerCase().includes('sonography'))
  );

  return (
    <div className="py-12 sm:py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/80 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Activity className="w-3.5 h-3.5 text-blue-700" />
            <span>Diagnostic Facilities in Msamvu</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Diagnostic Services
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            TNOC Medical Diagnostic Facility provides accredited clinical laboratory pathology testing and diagnostic ultrasound examinations in Morogoro.
          </p>

          {/* Quick Filter Buttons */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Services
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('laboratory')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeCategory === 'laboratory'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span>Clinical Laboratory</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('ultrasound')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeCategory === 'ultrasound'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Diagnostic Ultrasound</span>
            </button>
          </div>
        </div>

        {/* Section 1: Clinical Laboratory Services */}
        {(activeCategory === 'all' || activeCategory === 'laboratory') && (
          <div className="mb-16">
            <div className="bg-blue-50/60 rounded-3xl p-6 sm:p-8 lg:p-10 border border-blue-100 mb-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-700 text-white text-xs font-bold mb-3">
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>Clinical Pathology Department</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Automated Clinical Laboratory Investigations
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                  Our laboratory operates automated hematology analyzers, clinical chemistry photometers, and biosafety hoods to ensure high reproducibility, minimal human error, and swift report turnaround.
                </p>

                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    to="/tests"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold shadow-xs transition-colors"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Browse All Tests & Prices</span>
                  </Link>

                  <Link
                    to="/patient-info#preparation"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-sm font-semibold transition-colors"
                  >
                    <span>Sample Preparation Guide</span>
                  </Link>
                </div>
              </div>

              {/* Lab disciplines highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-blue-200/70">
                <div className="bg-white rounded-xl p-4 border border-blue-100">
                  <div className="font-bold text-slate-900 text-sm mb-1">Hematology</div>
                  <p className="text-xs text-slate-500">
                    Full Blood Picture (FBP/CBC), ESR, Hemoglobin, Blood Grouping & Crossmatch.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-blue-100">
                  <div className="font-bold text-slate-900 text-sm mb-1">Clinical Biochemistry</div>
                  <p className="text-xs text-slate-500">
                    Renal Function (RFT), Liver Function (LFT), Lipid Profile, Fasting Blood Sugar, HbA1c.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-blue-100">
                  <div className="font-bold text-slate-900 text-sm mb-1">Parasitology & Rapid Tests</div>
                  <p className="text-xs text-slate-500">
                    Malaria BS & mRDT, Stool analysis, Widal (Salmonella), H. Pylori antigen, Urinalysis.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-blue-100">
                  <div className="font-bold text-slate-900 text-sm mb-1">Microbiology & Serology</div>
                  <p className="text-xs text-slate-500">
                    Urine & Swab Culture and Sensitivity, Hepatitis B & C, VDRL/Syphilis, HIV screening.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Diagnostic Ultrasound Services */}
        {(activeCategory === 'all' || activeCategory === 'ultrasound') && (
          <div className="mb-16">
            <div className="bg-red-50/50 rounded-3xl p-6 sm:p-8 lg:p-10 border border-red-100 mb-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-600 text-white text-xs font-bold mb-3">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Sonography & Ultrasound Department</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  High-Resolution Diagnostic Sonography
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                  Non-invasive, radiation-free diagnostic imaging with clear anatomical visualization. All ultrasound scans include immediate printed diagnostic reports for your physician.
                </p>
              </div>

              {/* Ultrasound modalities grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {ultrasoundServices.map((svc) => (
                  <div
                    key={svc.id}
                    className="bg-white rounded-2xl p-6 border border-red-100 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-full">
                          {svc.modality}
                        </span>
                        <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {svc.status}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {svc.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                        {svc.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="text-xs font-bold text-slate-800">Key Indications:</div>
                        <ul className="text-xs text-slate-600 space-y-1">
                          {svc.commonIndications.slice(0, 3).map((ind, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                              <span>{ind}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-blue-600" />
                          <span>Duration: {svc.typicalDuration}</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">
                            Estimated Fee
                          </span>
                          <span className="text-sm font-bold text-slate-900">
                            {svc.price || 'TZS 30,000 - 45,000'}
                          </span>
                        </div>

                        <Link
                          to="/contact"
                          className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors"
                        >
                          Book / Inquire
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Patient Assurance Banner */}
        <div className="rounded-2xl bg-slate-900 text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Need assistance selecting the right investigation?
            </h3>
            <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
              Bring your physician's laboratory request form or consult with our qualified laboratory personnel at our Msamvu facility.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/tests"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold text-center transition-colors"
            >
              Open Tests & Prices
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold text-center border border-white/20 transition-colors"
            >
              Contact Facility
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
