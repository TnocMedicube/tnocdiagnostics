import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  UserCheck,
  Microscope,
  FileCheck2,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { TNOC_BUSINESS_CONFIG } from '../config/businessConfig';

export const AboutSection: React.FC = () => {
  const corePrinciples = [
    {
      icon: Microscope,
      title: 'Accurate Diagnostic Investigations',
      description:
        'Standardized testing protocols and regular calibration to support reliable clinical decision-making for healthcare providers and patients.',
    },
    {
      icon: UserCheck,
      title: 'Professional Laboratory Practice',
      description:
        'Guided by experienced laboratory personnel dedicated to ethical medical diagnostic standards and patient dignity.',
    },
    {
      icon: Clock,
      title: 'Timely & Dependable Results',
      description:
        'Streamlined workflow management designed to provide routine test outcomes on the same day without sacrificing verification rigor.',
    },
    {
      icon: ShieldCheck,
      title: 'Strict Patient Confidentiality',
      description:
        'Uncompromising privacy protection for all patient personal information, clinical records, and diagnostic findings.',
    },
    {
      icon: CheckCircle2,
      title: 'Quality-Focused Testing',
      description:
        'Systematic internal quality controls on reagents, analytical equipment, and manual microscopic examinations.',
    },
    {
      icon: Sparkles,
      title: 'Modern Diagnostic Approach',
      description:
        'Integrating automated analyzers with trained microscopic verification and sonographic imaging services.',
    },
    {
      icon: MapPin,
      title: 'Convenient Physical Access',
      description:
        'Strategically situated in Msamvu, Morogoro, providing an easily accessible location for walk-in patients and referrals.',
    },
    {
      icon: FileCheck2,
      title: 'Clear Communication of Results',
      description:
        'Clean, unambiguous diagnostic reports displaying biological reference intervals to assist clinicians in their diagnosis.',
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
            About Our Facility
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight font-display">
            Dedicated to Diagnostic Excellence in Msamvu
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            <strong className="text-blue-900">TNOC Medical Diagnostic Facility</strong> (also known as <strong className="text-red-600">TNOC Diagnostics – Maabara ya Msamvu</strong>) is a medical investigation center providing comprehensive clinical pathology testing and diagnostic ultrasound services in Morogoro, Tanzania.
          </p>
        </div>

        {/* Narrative & Mission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-blue-950 mb-4 font-display">
              Supporting Clinical Care with Reliable Evidence
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
              Modern medicine relies fundamentally on precise, trustworthy diagnostics. At TNOC Diagnostics, we understand that behind every blood tube, swab, or ultrasound examination is a patient seeking answers, reassurance, or targeted treatment.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
              Our laboratory in Msamvu serves walk-in patients, corporate health screens, and physician referrals across Morogoro, providing an essential link between clinical suspicion and definitive therapy.
            </p>

            <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                Comprehensive Laboratory
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                Diagnostic Ultrasound
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-slate-900" />
                Patient Confidentiality
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base sm:text-lg text-white font-display">
                  Physical Presence in Msamvu
                </h4>
                <p className="text-xs text-blue-300">Morogoro Region, Tanzania</p>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Our facility is searchable and discoverable on Google Maps as:
              <br />
              <span className="inline-block font-mono text-xs sm:text-sm bg-black/50 border border-white/10 px-3 py-1.5 rounded-lg text-red-300 font-semibold mt-2">
                TNOC DIAGNOSTICS (MAABARA YA MSAMVU)
              </span>
            </p>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
              Whether you require routine Complete Blood Counts, metabolic chemistry screens, culture and sensitivity investigations, or obstetric ultrasound scans, our team is equipped to assist you promptly.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={TNOC_BUSINESS_CONFIG.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition-colors"
              >
                <span>Get Directions on Maps</span>
              </a>
              <a
                href="#laboratory"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors"
              >
                <span>Explore Available Tests</span>
              </a>
            </div>
          </div>
        </div>

        {/* 8 Core Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {corePrinciples.map((item, index) => {
            const Icon = item.icon;
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className="p-5 rounded-xl bg-white border border-slate-200 hover:border-red-300 hover:shadow-md transition-all duration-200 flex flex-col"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3.5 ${
                    isEven ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-1.5 font-display">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
