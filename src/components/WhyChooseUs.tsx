import React from 'react';
import {
  Award,
  Layers,
  Clock,
  Shield,
  MapPin,
  Microscope,
  Activity,
  FileCheck,
  CheckCircle,
} from 'lucide-react';
import { WHY_CHOOSE_TNOC } from '../data/testsData';

const ICON_MAP: Record<string, React.ElementType> = {
  Award,
  Layers,
  Clock,
  Shield,
  MapPin,
  Microscope,
  Activity,
  FileCheck,
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-tnoc" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
            <CheckCircle className="w-3.5 h-3.5 text-red-600" />
            <span>Why TNOC Diagnostics</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight font-display">
            Committed to Quality, Speed & Patient Respect
          </h2>

          <p className="text-base sm:text-lg text-slate-600 mt-2 leading-relaxed">
            Our medical diagnostic facility in Msamvu is built around standard operating procedures, clean hygienic environments, and compassionate patient care.
          </p>
        </div>

        {/* 8 Value Propositions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_TNOC.map((prop, idx) => {
            const Icon = ICON_MAP[prop.icon] || Award;
            const isRed = idx % 2 === 0;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-red-300 hover:bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                      isRed
                        ? 'bg-red-50 text-red-600 border border-red-100'
                        : 'bg-blue-50 text-blue-800 border border-blue-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 font-display">
                    {prop.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {prop.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-blue-900">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  <span>Clinical Standard Verified</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
