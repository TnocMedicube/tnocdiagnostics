import React from 'react';
import {
  FlaskConical,
  Activity,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react';
import { Link } from '../router/RouterContext';

export const HomeServicesSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Activity className="w-3.5 h-3.5 text-blue-700" />
              <span>Core Diagnostic Modalities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Diagnostic Services at TNOC
            </h2>
            <p className="mt-2 text-base sm:text-lg text-slate-600">
              Integrated pathology laboratory testing and non-invasive diagnostic ultrasound under one roof in Msamvu, Morogoro.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 font-bold text-blue-700 hover:text-blue-900 hover:underline text-sm group"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 3 High-Level Service Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 1. Clinical Laboratory */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 mb-5">
                <FlaskConical className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Clinical Laboratory
              </h3>

              <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                Automated hematology, clinical biochemistry, medical parasitology, urinalysis, microbiology cultures, and specialized hormonal investigations.
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Full Blood Picture (CBC / FBP) & Blood Typing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Kidney (RFT), Liver (LFT) & Lipid Panels</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Malaria, Typhoid & Parasitology Screen</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Urine & Stool Routine Analysis</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/services?category=laboratory"
                className="text-sm font-bold text-blue-700 hover:text-blue-900"
              >
                Learn More →
              </Link>
              <Link
                to="/tests"
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-blue-700"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>See Lab Tests & Prices</span>
              </Link>
            </div>
          </div>

          {/* 2. Diagnostic Ultrasound */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-red-300 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 mb-5">
                <Activity className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Diagnostic Ultrasound
              </h3>

              <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                High-resolution sonographic investigations providing immediate structural clarity for abdominal, pelvic, obstetrical, and superficial tissue assessments.
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Abdominal & Pelvic Ultrasound</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Obstetric & Antenatal Fetal Scans</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Kidney, Ureter & Bladder (KUB) Sonography</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Scrotal, Prostate & Thyroid Ultrasound</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/services?category=ultrasound"
                className="text-sm font-bold text-red-600 hover:text-red-700"
              >
                Learn More →
              </Link>
              <span className="text-xs font-medium text-slate-500">Immediate Reports</span>
            </div>
          </div>

          {/* 3. Other Diagnostic Services */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 mb-5">
                <ShieldAlert className="w-6 h-6 text-slate-700" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Other Diagnostic Services
              </h3>

              <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                Specialized preventive screenings, confidential rapid checks, antenatal wellness panels, and physician-requested follow-up investigations.
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0" />
                  <span>Confidential Viral Screening & Counseling</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0" />
                  <span>Pre-Employment & School Health Checkups</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0" />
                  <span>Comprehensive Antenatal Profile</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0" />
                  <span>Fertility & Semen Diagnostic Parameters</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/services"
                className="text-sm font-bold text-slate-800 hover:text-blue-700"
              >
                View Services →
              </Link>
              <Link
                to="/contact"
                className="text-xs font-semibold text-slate-500 hover:text-blue-700"
              >
                Inquire With Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
