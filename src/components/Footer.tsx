import React from 'react';
import {
  MapPin,
  Clock,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { Link } from '../router/RouterContext';
import { useCms } from '../context/CmsContext';

export const Footer: React.FC = () => {
  const { businessConfig } = useCms();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Identity Column */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="footer" />

            <p className="text-xs uppercase tracking-widest text-red-500 font-bold">
              TNOC MEDICAL DIAGNOSTICS
            </p>

            <p className="text-sm text-slate-300 font-medium">
              &ldquo;Reliable Medical Diagnostics You Can Trust&rdquo;
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Professional clinical laboratory investigations and diagnostic ultrasound services in Msamvu, Morogoro, Tanzania.
            </p>

            <div className="pt-2 flex flex-col gap-1.5 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>{businessConfig.address}, {businessConfig.city}</span>
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Mon – Fri: 07:30 – 19:00 | Sat: 08:00 – 17:00</span>
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-400 transition-colors">
                  Diagnostic Services
                </Link>
              </li>
              <li>
                <Link to="/tests" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  Tests & Prices Catalogue
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">
                  About TNOC Diagnostics
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-blue-400 transition-colors">
                  Facility Photo Gallery
                </Link>
              </li>
              <li>
                <Link to="/patient-info" className="hover:text-blue-400 transition-colors">
                  Patient Information & Prep
                </Link>
              </li>
              <li>
                <Link to="/location" className="hover:text-blue-400 transition-colors">
                  Location & Directions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Diagnostic Modalities */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Diagnostic Modalities
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link to="/services?category=laboratory" className="hover:text-blue-400 transition-colors">
                  Automated Hematology (FBP/CBC)
                </Link>
              </li>
              <li>
                <Link to="/services?category=laboratory" className="hover:text-blue-400 transition-colors">
                  Clinical Chemistry (Liver & Kidney)
                </Link>
              </li>
              <li>
                <Link to="/services?category=laboratory" className="hover:text-blue-400 transition-colors">
                  Medical Parasitology & Malaria
                </Link>
              </li>
              <li>
                <Link to="/services?category=ultrasound" className="hover:text-blue-400 transition-colors">
                  Abdominal & Pelvic Ultrasound
                </Link>
              </li>
              <li>
                <Link to="/services?category=ultrasound" className="hover:text-blue-400 transition-colors">
                  Obstetric & Antenatal Fetal Scans
                </Link>
              </li>
              <li>
                <Link to="/patient-info#faqs" className="hover:text-blue-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Locality & Verification Notice */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Google Maps
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verify our facility listing or get direct driving navigation:
            </p>
            <a
              href={businessConfig.googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-900/60 hover:bg-blue-800 border border-blue-700/60 text-xs font-medium text-white transition-colors"
            >
              <span>TNOC on Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-red-400" />
            </a>

            <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Verified Facility in Msamvu</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Location Information */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} TNOC Medical Diagnostic Facility (Maabara ya Msamvu). All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span>Msamvu, Morogoro, Tanzania</span>
            <span>•</span>
            <span className="text-slate-400">Quality Diagnostic Care</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
