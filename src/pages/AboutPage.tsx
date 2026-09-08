import React from 'react';
import {
  Building2,
  Target,
  Eye,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Image as ImageIcon,
  MapPin,
} from 'lucide-react';
import { Link } from '../router/RouterContext';
import { useCms } from '../context/CmsContext';
import { WhyChooseUs } from '../components/WhyChooseUs';

export const AboutPage: React.FC = () => {
  const { about, businessConfig } = useCms();

  return (
    <div className="py-12 sm:py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5 text-blue-700" />
            <span>Maabara ya Msamvu, Morogoro</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {about.aboutTitle || 'About TNOC Medical Diagnostics'}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            {about.tagline || 'Dedicated to Diagnostic Accuracy, Rapid Turnaround, and Compassionate Care in Morogoro.'}
          </p>
        </div>

        {/* Facility Story & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Clinical Diagnostic Excellence in Msamvu
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              {about.facilityOverview ||
                'TNOC Medical Diagnostic Facility (Maabara ya Msamvu) is a dedicated private diagnostic health facility located in Msamvu, Morogoro. Designed with patient comfort and clinical precision in mind, we provide automated clinical hematology, biochemistry, parasitology, microbiology, and non-invasive ultrasound sonography.'}
            </p>

            <p className="text-base text-slate-600 leading-relaxed">
              Our clinical facility was established to meet the critical need for rapid, trustworthy, and ethically uncompromising medical laboratory and sonographic services. Located in the bustling Msamvu transport corridor, we serve walk-in patients, referred medical cases from local clinics and hospitals, antenatal mothers, and corporate wellness screenings.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold shadow-xs transition-colors"
              >
                <ImageIcon className="w-4 h-4" />
                <span>View Facility Gallery</span>
              </Link>

              <Link
                to="/location"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-sm font-semibold transition-colors"
              >
                <MapPin className="w-4 h-4 text-red-600" />
                <span>Visit Us in Msamvu</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-slate-200">
              <img
                src="/assets/tnoc_facility_day.jpg"
                alt="TNOC Diagnostic Facility exterior in Msamvu Morogoro"
                className="w-full h-80 sm:h-96 object-cover object-center"
              />
              <div className="bg-slate-900 text-white p-4 text-xs">
                <div className="font-bold text-sm">TNOC Diagnostic Facility (Maabara ya Msamvu)</div>
                <div className="text-slate-400 mt-0.5">Verified clinical facility in Msamvu, Morogoro, Tanzania</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <div className="bg-blue-50/70 rounded-3xl p-8 border border-blue-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center mb-5 shadow-xs">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-600 text-base leading-relaxed">
                {about.mission ||
                  'To deliver accurate, prompt, and ethically uncompromised diagnostic laboratory and ultrasound investigations that empower clinicians and elevate patient health outcomes throughout Morogoro.'}
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-red-50/50 rounded-3xl p-8 border border-red-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center mb-5 shadow-xs">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-600 text-base leading-relaxed">
                {about.vision ||
                  'To be the regional benchmark for clinical diagnostic reliability, modern technology, and patient trust in Eastern Tanzania.'}
              </p>
            </div>
          </div>
        </div>

        {/* Core Values Strip */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white mb-16">
          <div className="max-w-2xl mb-8">
            <span className="text-red-400 text-xs font-bold uppercase tracking-wider block mb-2">
              Guiding Principles
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Our Core Clinical Values
            </h3>
            <p className="text-slate-300 text-sm mt-1">
              Every sample, scan, and diagnostic report is governed by strict adherence to clinical ethics and quality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(about.coreValues || [
              'Clinical Precision & Quality Control',
              'Integrity & Strict Confidentiality',
              'Rapid Turnaround Times',
              'Compassionate Patient Care',
              'Accessibility & Transparent Pricing',
            ]).map((val, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-semibold text-white text-sm">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose TNOC Anchor Section */}
        <div id="why-choose-us" className="pt-8">
          <WhyChooseUs />
        </div>
      </div>
    </div>
  );
};
