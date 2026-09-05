import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  MapPin,
  ChevronRight,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { TNOC_BUSINESS_CONFIG } from '../config/businessConfig';

interface NavbarProps {
  onOpenContactModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContactModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About Us', href: '#about' },
    { name: 'Laboratory Tests', href: '#laboratory' },
    { name: 'Imaging', href: '#imaging' },
    { name: 'Why TNOC', href: '#why-tnoc' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Location', href: '#location' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const hasVerifiedPhone = Boolean(TNOC_BUSINESS_CONFIG.phoneRaw);
  const hasVerifiedWhatsApp = Boolean(TNOC_BUSINESS_CONFIG.whatsappRaw);

  return (
    <header
      id="main-navigation"
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5'
          : 'bg-white border-b border-slate-100 py-3.5'
      }`}
    >
      {/* Top verified locality notice bar in Deep Royal Blue & Red */}
      <div className="hidden md:block bg-blue-950 text-slate-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>Location: <strong className="text-white">Msamvu, Morogoro, Tanzania</strong></span>
            </span>
            <span className="text-blue-800">|</span>
            <span className="inline-flex items-center gap-1 text-slate-200">
              <Clock className="w-3.5 h-3.5 text-blue-300" />
              <span>Routine & Specialized Diagnostic Laboratory</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={TNOC_BUSINESS_CONFIG.googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-red-300 hover:text-white font-medium transition-colors"
            >
              <span>Search on Google Maps: <strong className="text-white">TNOC DIAGNOSTICS (MAABARA YA MSAMVU)</strong></span>
              <ExternalLink className="w-3 h-3 text-red-400" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center py-1 group" aria-label="TNOC Medical Diagnostic Facility Home">
            <BrandLogo />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-sm font-semibold text-slate-700 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Action Buttons in Red, Blue, White */}
          <div className="hidden sm:flex items-center gap-2.5">
            {hasVerifiedWhatsApp ? (
              <a
                href={`https://wa.me/${TNOC_BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(
                  'Hello TNOC Diagnostics, I would like to inquire about available diagnostic tests.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                title="WhatsApp TNOC Diagnostics"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            ) : null}

            {hasVerifiedPhone ? (
              <a
                href={`tel:${TNOC_BUSINESS_CONFIG.phoneRaw}`}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
                title="Call TNOC Diagnostics"
              >
                <Phone className="w-3.5 h-3.5 text-red-600" />
                <span>Call Us</span>
              </a>
            ) : null}

            <a
              href="#contact"
              onClick={onOpenContactModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md shadow-red-600/20 transition-all duration-150 active:scale-[0.98]"
            >
              <span>Contact TNOC</span>
              <ChevronRight className="w-4 h-4 text-white" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="#contact"
              className="sm:hidden px-3 py-1.5 text-xs font-bold text-white bg-red-600 rounded-lg shadow-sm"
            >
              Contact
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-red-600" /> : <Menu className="w-6 h-6 text-blue-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200"
        >
          {/* Mobile Drawer Brand Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <BrandLogo size="sm" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Locality Badge */}
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl mb-3 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-red-600" />
              <span>Msamvu, Morogoro, Tanzania</span>
            </span>
            <a
              href={TNOC_BUSINESS_CONFIG.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 font-bold hover:underline"
            >
              Get Directions
            </a>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleNavClick}
                className="px-3 py-2.5 text-sm font-semibold text-slate-800 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
            <a
              href={TNOC_BUSINESS_CONFIG.googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-blue-950 bg-blue-50 border border-blue-200 rounded-xl"
            >
              <MapPin className="w-4 h-4 text-red-600" />
              <span>Find Us on Google Maps</span>
            </a>

            <a
              href="#contact"
              onClick={handleNavClick}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md shadow-red-600/20"
            >
              <span>Contact TNOC Diagnostics</span>
              <ChevronRight className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
