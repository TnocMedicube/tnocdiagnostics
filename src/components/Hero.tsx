import React from 'react';
import {
  MapPin,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  FlaskConical,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { Link } from '../router/RouterContext';
import { useCms } from '../context/CmsContext';

export const Hero: React.FC = () => {
  const { homepage, businessConfig, gallery } = useCms();

  // Pick featured photo or fallback to verified day exterior photo
  const heroPhoto =
    gallery.find((p) => p.isFeatured && p.isActive)?.imageSrc ||
    homepage.heroImage ||
    '/assets/tnoc_facility_day.jpg';

  const title = homepage.heroTitle || 'TNOC MEDICAL DIAGNOSTICS';
  const subtitle = homepage.heroSubtitle || 'Reliable Medical Diagnostics You Can Trust';
  const description =
    homepage.heroDescription ||
    'Professional clinical laboratory investigations and diagnostic ultrasound services in Msamvu, Morogoro.';
  const primaryCta = homepage.primaryCtaText || 'View Tests & Prices';
  const secondaryCta = homepage.secondaryCtaText || 'Find Us on Google Maps';
  const secondaryLink =
    homepage.secondaryCtaLink || businessConfig.googleMapsDirectionsUrl;

  return (
    <section className="relative bg-gradient-to-b from-blue-50/50 via-white to-white pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      {/* Decorative subtle medical grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Clinical Presentation & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Locality & Verification Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/70 border border-blue-200/80 text-blue-900 text-xs sm:text-sm font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-red-600" />
              <span>{title}</span>
              <span className="text-blue-400">•</span>
              <span className="flex items-center gap-1 text-slate-700 font-medium">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                Msamvu, Morogoro
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {subtitle}
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Link
                to="/tests"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                <FileSpreadsheet className="w-5 h-5 text-blue-200" />
                <span>{primaryCta}</span>
                <ArrowRight className="w-4 h-4 text-blue-200 ml-1" />
              </Link>

              <a
                href={secondaryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 hover:text-blue-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-colors"
              >
                <MapPin className="w-5 h-5 text-red-600" />
                <span>{secondaryCta}</span>
              </a>
            </div>

            {/* Clinical Highlights Strip */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <FlaskConical className="w-4 h-4 text-blue-700" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Clinical Pathology</div>
                  <div className="text-xs text-slate-500">Automated Analyzers</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Diagnostic Ultrasound</div>
                  <div className="text-xs text-slate-500">Immediate Reports</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Same-Day Results</div>
                  <div className="text-xs text-slate-500">Fast & Confidential</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Facility Photo Presentation */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Photo Frame Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 ring-1 ring-slate-200/60">
                <img
                  src={heroPhoto}
                  alt="TNOC Medical Diagnostic Facility building in Msamvu, Morogoro, Tanzania"
                  className="w-full h-72 sm:h-96 lg:h-[420px] object-cover object-center"
                  loading="eager"
                />

                {/* Subtle Facility Badge */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-medium text-red-400 uppercase tracking-wider">
                        Verified Facility
                      </div>
                      <div className="text-base font-bold text-white">
                        TNOC Diagnostics (Maabara ya Msamvu)
                      </div>
                      <div className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-red-400" />
                        Msamvu Area, Morogoro, Tanzania
                      </div>
                    </div>

                    <Link
                      to="/gallery"
                      className="px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-xs font-semibold text-white transition-colors"
                    >
                      View Gallery
                    </Link>
                  </div>
                </div>
              </div>

              {/* Verified Trust Badge overlay */}
              <div className="hidden sm:flex absolute -top-4 -right-4 bg-white rounded-xl shadow-lg border border-slate-200 p-3 items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Accurate & Certified</div>
                  <div className="text-[11px] text-slate-500">Quality Diagnostic Standards</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
