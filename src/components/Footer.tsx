import React from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  ExternalLink,
  ShieldCheck,
  HeartPulse,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { TNOC_BUSINESS_CONFIG } from '../config/businessConfig';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Identity Column */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="footer" />

            <p className="text-xs uppercase tracking-widest text-red-500 font-bold font-display">
              TNOC MEDICAL DIAGNOSTIC FACILITY
            </p>

            <p className="text-sm text-slate-300 font-medium">
              &ldquo;Professional Diagnostic Services You Can Trust.&rdquo;
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Providing reliable clinical laboratory investigations and diagnostic ultrasound examinations in Msamvu, Morogoro, Tanzania.
            </p>

            <div className="pt-2 flex flex-col gap-1.5 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>Msamvu Area, Morogoro, Tanzania</span>
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Routine Pathology & Sonography</span>
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#hero" className="hover:text-red-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-red-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#laboratory" className="hover:text-red-400 transition-colors">
                  Laboratory Tests
                </a>
              </li>
              <li>
                <a href="#imaging" className="hover:text-red-400 transition-colors">
                  Imaging Services
                </a>
              </li>
              <li>
                <a href="#why-tnoc" className="hover:text-red-400 transition-colors">
                  Why Choose TNOC
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-red-400 transition-colors">
                  Facility Gallery
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-red-400 transition-colors">
                  Location & Map
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-red-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Laboratory Tests Disciplines */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Laboratory Disciplines
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <a href="#laboratory" className="hover:text-red-300 transition-colors">
                  Hematology & Full Blood Picture (FBP)
                </a>
              </li>
              <li>
                <a href="#laboratory" className="hover:text-red-300 transition-colors">
                  Clinical Chemistry (LFT, RFT, Glucose)
                </a>
              </li>
              <li>
                <a href="#laboratory" className="hover:text-red-300 transition-colors">
                  Microbiology Culture & Sensitivity
                </a>
              </li>
              <li>
                <a href="#laboratory" className="hover:text-red-300 transition-colors">
                  Parasitology & Malaria Testing
                </a>
              </li>
              <li>
                <a href="#laboratory" className="hover:text-red-300 transition-colors">
                  Complete Urinalysis & Dipstick
                </a>
              </li>
              <li>
                <a href="#laboratory" className="hover:text-red-300 transition-colors">
                  Endocrinology & Thyroid Hormones
                </a>
              </li>
              <li>
                <a href="#laboratory" className="hover:text-red-300 transition-colors">
                  Fertility & Semen Analysis
                </a>
              </li>
              <li>
                <a href="#laboratory" className="hover:text-red-300 transition-colors">
                  Infectious Disease Screening
                </a>
              </li>
              <li>
                <a href="#laboratory" className="hover:text-red-300 transition-colors">
                  Serology & Immunology
                </a>
              </li>
            </ul>
          </div>

          {/* Google Maps & Location Card */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Find on Google Maps
            </h4>
            <p className="text-xs text-slate-300">
              Search Google Maps directly on your smartphone:
            </p>

            <div className="p-3 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-red-400 font-semibold select-all break-words">
              {TNOC_BUSINESS_CONFIG.googleMapsQuery}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={TNOC_BUSINESS_CONFIG.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md shadow-red-600/20 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Get Directions to Msamvu</span>
              </a>

              <a
                href={TNOC_BUSINESS_CONFIG.googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl transition-colors"
              >
                <span>View Google Maps Listing</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Medical Clinical Disclaimer (Crucial Requirement) */}
        <div className="py-6 border-b border-white/10">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-slate-400 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-200">Medical Diagnostic Disclaimer:</strong>{' '}
              Diagnostic tests are performed to support clinical assessment and should be interpreted in the appropriate clinical context. Laboratory and imaging results should be reviewed by a qualified healthcare professional. This website does not provide online medical diagnosis or individualized prescription therapy.
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Local SEO Footer Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {currentYear} <strong>TNOC Medical Diagnostic Facility</strong> (TNOC Diagnostics – Maabara ya Msamvu). All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Msamvu, Morogoro, Tanzania</span>
            <span>•</span>
            <span>Clinical Laboratory & Diagnostic Imaging</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
