import React from 'react';
import {
  Search,
  MapPin,
  Phone,
  MessageCircle,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { TNOC_BUSINESS_CONFIG } from '../config/businessConfig';

interface HeroProps {
  onSearchClick?: () => void;
  onOpenContact?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearchClick }) => {
  const hasPhone = Boolean(TNOC_BUSINESS_CONFIG.phoneRaw);
  const hasWhatsApp = Boolean(TNOC_BUSINESS_CONFIG.whatsappRaw);

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 text-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Subtle diagnostic grid pattern background */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Decorative ambient glowing accents: Royal Blue & Medical Red */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines, Identity & CTAs */}
          <div className="lg:col-span-7 flex flex-col text-left">
            {/* Primary Business Identity Tag with Red Pulse Dot */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/90 border border-blue-500/40 text-blue-200 text-xs sm:text-sm font-semibold mb-5 w-fit shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse ring-2 ring-red-400/40" />
              <span className="tracking-wide">TNOC DIAGNOSTICS – MAABARA YA MSAMVU</span>
            </div>

            {/* Official Name Callout in Diagnostic Red & Royal Blue */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-4 bg-red-600 rounded-full inline-block" />
              <p className="text-xs sm:text-sm uppercase tracking-widest text-red-400 font-bold font-display">
                {TNOC_BUSINESS_CONFIG.businessName}
              </p>
            </div>

            {/* Primary Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-display leading-[1.15] mb-4">
              Reliable Medical Diagnostics <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-300 to-blue-300">
                You Can Trust
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mb-6">
              Professional laboratory investigations and diagnostic imaging services with an uncompromising focus on clinical accuracy, timely results, and patient-centered care in Msamvu, Morogoro.
            </p>

            {/* Verified Location Card / Local SEO anchor */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-xl mb-7">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-red-600/20 text-red-400 shrink-0 mt-0.5 border border-red-500/30">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm text-slate-300">
                  <span className="font-semibold text-white">Find Us in Msamvu, Morogoro:</span>
                  <p className="text-slate-300 mt-0.5">
                    Search on Google Maps: <strong className="text-blue-300 font-semibold">{TNOC_BUSINESS_CONFIG.googleMapsQuery}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Main Action CTAs in Red, Blue, White */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <a
                href="#laboratory"
                onClick={onSearchClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-lg shadow-red-600/30 transition-all duration-150 active:scale-[0.98]"
              >
                <Search className="w-4 h-4" />
                <span>View Our Tests</span>
              </a>

              <a
                href={TNOC_BUSINESS_CONFIG.googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-semibold text-white bg-blue-900/80 hover:bg-blue-800 border border-blue-500/40 rounded-xl transition-all duration-150 shadow-md backdrop-blur-sm"
              >
                <MapPin className="w-4 h-4 text-red-400" />
                <span>Find Us on Google Maps</span>
              </a>

              {/* Dynamic Call Button */}
              {hasPhone ? (
                <a
                  href={`tel:${TNOC_BUSINESS_CONFIG.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-white/20 rounded-xl transition-colors"
                >
                  <Phone className="w-4 h-4 text-red-400" />
                  <span>Call TNOC</span>
                </a>
              ) : (
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-white/20 rounded-xl transition-colors"
                >
                  <Phone className="w-4 h-4 text-red-400" />
                  <span>Call / Contact Info</span>
                </a>
              )}

              {/* Dynamic WhatsApp Button */}
              {hasWhatsApp && (
                <a
                  href={`https://wa.me/${TNOC_BUSINESS_CONFIG.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900/90 border border-emerald-700/60 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Us</span>
                </a>
              )}
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-xs sm:text-sm text-slate-300 font-medium">Accurate Diagnostic Protocols</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-xs sm:text-sm text-slate-300 font-medium">Timely & Same-Day Results</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-red-400 shrink-0" />
                <span className="text-xs sm:text-sm text-slate-300 font-medium">Strict Patient Privacy</span>
              </div>
            </div>
          </div>

          {/* Right Column: Facility Office Photo & Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 p-2.5 border border-white/20 shadow-2xl shadow-black/50 group">
              {/* Facility Office Photo Showcase */}
              <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden bg-slate-950 flex flex-col justify-between p-4 sm:p-5 text-white">
                {/* Real Office Photo background */}
                <img
                  src={TNOC_BUSINESS_CONFIG.officePhotoPath || '/assets/office-photo.jpg'}
                  alt="TNOC Medical Diagnostic Facility Office and Reception in Msamvu, Morogoro"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to gradient if image fails
                    const target = e.currentTarget;
                    target.style.display = 'none';
                  }}
                />

                {/* Subtle dark gradient overlay to ensure text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60 pointer-events-none" />

                {/* Top Badge: Verified Facility */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/90 text-white border border-white/20 text-xs font-bold shadow-sm backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span>Official Facility Photo</span>
                  </span>
                  <span className="text-[11px] font-bold text-white bg-blue-900/90 px-2.5 py-1 rounded-full border border-blue-400/30 backdrop-blur-sm">
                    MSAMVU • MOROGORO
                  </span>
                </div>

                {/* Bottom card content */}
                <div className="relative z-10 pt-4 space-y-2 bg-slate-950/80 -mx-4 -mb-4 sm:-mx-5 sm:-mb-5 p-4 rounded-b-xl border-t border-white/10 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-white font-display flex items-center gap-2">
                        <span>TNOC Diagnostics</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-red-600/20 text-red-300 border border-red-500/30">
                          Maabara ya Msamvu
                        </span>
                      </h2>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Verified office building & laboratory entrance in Msamvu
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      Msamvu, Morogoro, Tanzania
                    </span>
                    <a
                      href="#gallery"
                      className="inline-flex items-center gap-1 text-blue-300 hover:text-white font-semibold transition-colors"
                    >
                      <span>Explore Gallery</span>
                      <ArrowRight className="w-3.5 h-3.5 text-red-400" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
