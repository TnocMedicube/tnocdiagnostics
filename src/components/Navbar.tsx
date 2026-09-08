import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  MapPin,
  Clock,
  ExternalLink,
  FlaskConical,
  Activity,
  FileSpreadsheet,
  Building2,
  CheckCircle2,
  Image as ImageIcon,
  ClipboardList,
  HelpCircle,
  Clock3,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { Link, useRouter } from '../router/RouterContext';
import { useCms } from '../context/CmsContext';

export const Navbar: React.FC = () => {
  const { businessConfig } = useCms();
  const { currentPath } = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click or Esc
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileDropdown(null);
  }, [currentPath]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-xs">
      {/* Top Clinical Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>
                Location: <strong className="text-white font-medium">{businessConfig.address || 'Msamvu, Morogoro, Tanzania'}</strong>
              </span>
            </span>
            <span className="text-slate-700">|</span>
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Mon – Fri: 7:30 AM – 7:00 PM | Sat: 8:00 AM – 5:00 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={businessConfig.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <span>Get Directions to Msamvu</span>
              <ExternalLink className="w-3 h-3 text-red-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`transition-all duration-200 border-b border-slate-200/80 ${
          scrolled ? 'py-2.5 bg-white/95 backdrop-blur-md shadow-sm' : 'py-3.5 bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center py-1 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
              aria-label="TNOC Medical Diagnostics Home"
            >
              <BrandLogo />
            </Link>

            {/* Desktop Navigation */}
            <nav
              ref={dropdownRef}
              className="hidden lg:flex items-center gap-1 xl:gap-2"
              aria-label="Main Navigation"
            >
              {/* Home */}
              <Link
                to="/"
                className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                  currentPath === '/'
                    ? 'text-blue-700 bg-blue-50/80'
                    : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
                }`}
              >
                Home
              </Link>

              {/* Services ▼ */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('services')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
                  aria-expanded={activeDropdown === 'services'}
                  aria-haspopup="true"
                  className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                    currentPath.startsWith('/services') || currentPath === '/tests'
                      ? 'text-blue-700 bg-blue-50/80'
                      : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === 'services' ? 'rotate-180 text-blue-700' : 'text-slate-400'
                    }`}
                  />
                </button>

                {activeDropdown === 'services' && (
                  <div
                    className="absolute left-0 mt-1 w-64 rounded-xl bg-white shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                    role="menu"
                  >
                    <Link
                      to="/services?category=laboratory"
                      className="flex items-start gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-800 transition-colors"
                      role="menuitem"
                    >
                      <FlaskConical className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-900">Laboratory Services</div>
                        <div className="text-xs text-slate-500">Hematology, chemistry, microbiology</div>
                      </div>
                    </Link>

                    <Link
                      to="/services?category=ultrasound"
                      className="flex items-start gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-800 transition-colors"
                      role="menuitem"
                    >
                      <Activity className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-900">Diagnostic Ultrasound</div>
                        <div className="text-xs text-slate-500">Abdominal, pelvic & obstetric sonography</div>
                      </div>
                    </Link>

                    <div className="my-1 border-t border-slate-100" />

                    <Link
                      to="/tests"
                      className="flex items-start gap-3 px-4 py-2.5 text-sm text-blue-700 font-semibold hover:bg-blue-50 transition-colors"
                      role="menuitem"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" />
                      <div>
                        <div>Tests & Prices</div>
                        <div className="text-xs font-normal text-slate-500">Searchable test catalog</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* About ▼ */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('about')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
                  aria-expanded={activeDropdown === 'about'}
                  aria-haspopup="true"
                  className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                    currentPath.startsWith('/about') || currentPath === '/gallery'
                      ? 'text-blue-700 bg-blue-50/80'
                      : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
                  }`}
                >
                  <span>About</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === 'about' ? 'rotate-180 text-blue-700' : 'text-slate-400'
                    }`}
                  />
                </button>

                {activeDropdown === 'about' && (
                  <div
                    className="absolute left-0 mt-1 w-64 rounded-xl bg-white shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                    role="menu"
                  >
                    <Link
                      to="/about"
                      className="flex items-start gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-800 transition-colors"
                      role="menuitem"
                    >
                      <Building2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-900">About TNOC</div>
                        <div className="text-xs text-slate-500">Overview, mission & clinical vision</div>
                      </div>
                    </Link>

                    <Link
                      to="/about#why-choose-us"
                      className="flex items-start gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-800 transition-colors"
                      role="menuitem"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-900">Why Choose TNOC</div>
                        <div className="text-xs text-slate-500">Standards, accuracy & ethics</div>
                      </div>
                    </Link>

                    <Link
                      to="/gallery"
                      className="flex items-start gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-800 transition-colors"
                      role="menuitem"
                    >
                      <ImageIcon className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-900">Facility Gallery</div>
                        <div className="text-xs text-slate-500">Photos of our laboratory & clinic</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Patient Info ▼ */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('patient-info')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === 'patient-info' ? null : 'patient-info')}
                  aria-expanded={activeDropdown === 'patient-info'}
                  aria-haspopup="true"
                  className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                    currentPath.startsWith('/patient-info')
                      ? 'text-blue-700 bg-blue-50/80'
                      : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
                  }`}
                >
                  <span>Patient Info</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === 'patient-info' ? 'rotate-180 text-blue-700' : 'text-slate-400'
                    }`}
                  />
                </button>

                {activeDropdown === 'patient-info' && (
                  <div
                    className="absolute left-0 mt-1 w-64 rounded-xl bg-white shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                    role="menu"
                  >
                    <Link
                      to="/patient-info#preparation"
                      className="flex items-start gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-800 transition-colors"
                      role="menuitem"
                    >
                      <ClipboardList className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-900">Test Preparation</div>
                        <div className="text-xs text-slate-500">Fasting, urine & scan guidelines</div>
                      </div>
                    </Link>

                    <Link
                      to="/patient-info#faqs"
                      className="flex items-start gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-800 transition-colors"
                      role="menuitem"
                    >
                      <HelpCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-900">FAQs</div>
                        <div className="text-xs text-slate-500">Common questions & answers</div>
                      </div>
                    </Link>

                    <Link
                      to="/patient-info#turnaround"
                      className="flex items-start gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-800 transition-colors"
                      role="menuitem"
                    >
                      <Clock3 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-900">Turnaround Times</div>
                        <div className="text-xs text-slate-500">Expected reporting schedules</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Location */}
              <Link
                to="/location"
                className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                  currentPath === '/location'
                    ? 'text-blue-700 bg-blue-50/80'
                    : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
                }`}
              >
                Location
              </Link>

              {/* Contact */}
              <Link
                to="/contact"
                className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                  currentPath === '/contact'
                    ? 'text-blue-700 bg-blue-50/80'
                    : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Primary CTA on the Right */}
            <div className="hidden lg:flex items-center gap-2.5">
              <Link
                to="/tests"
                className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-900 rounded-lg shadow-sm hover:shadow-md transition-all duration-150 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                View Tests & Prices
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                to="/tests"
                className="px-3 py-1.5 text-xs font-bold text-white bg-blue-700 rounded-md"
              >
                Tests & Prices
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:text-blue-700 hover:bg-slate-100 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] md:top-[90px] bottom-0 bg-white/98 backdrop-blur-md z-50 overflow-y-auto border-t border-slate-200 px-4 py-6 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-2">
            {/* Home */}
            <Link
              to="/"
              className={`px-3 py-2.5 rounded-lg text-base font-semibold ${
                currentPath === '/' ? 'bg-blue-50 text-blue-700' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            {/* Services Accordion */}
            <div className="border-b border-slate-100 pb-2">
              <button
                type="button"
                onClick={() => setMobileDropdown(mobileDropdown === 'services' ? null : 'services')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-50"
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${mobileDropdown === 'services' ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileDropdown === 'services' && (
                <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50/70 rounded-lg mt-1">
                  <Link
                    to="/services?category=laboratory"
                    className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-700"
                  >
                    • Laboratory Services
                  </Link>
                  <Link
                    to="/services?category=ultrasound"
                    className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-700"
                  >
                    • Diagnostic Ultrasound
                  </Link>
                  <Link
                    to="/tests"
                    className="block px-3 py-2 text-sm font-bold text-blue-700 hover:text-blue-800"
                  >
                    • Tests & Prices
                  </Link>
                </div>
              )}
            </div>

            {/* About Accordion */}
            <div className="border-b border-slate-100 pb-2">
              <button
                type="button"
                onClick={() => setMobileDropdown(mobileDropdown === 'about' ? null : 'about')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-50"
              >
                <span>About</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${mobileDropdown === 'about' ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileDropdown === 'about' && (
                <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50/70 rounded-lg mt-1">
                  <Link
                    to="/about"
                    className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-700"
                  >
                    • About TNOC
                  </Link>
                  <Link
                    to="/about#why-choose-us"
                    className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-700"
                  >
                    • Why Choose TNOC
                  </Link>
                  <Link
                    to="/gallery"
                    className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-700"
                  >
                    • Facility Gallery
                  </Link>
                </div>
              )}
            </div>

            {/* Patient Info Accordion */}
            <div className="border-b border-slate-100 pb-2">
              <button
                type="button"
                onClick={() => setMobileDropdown(mobileDropdown === 'patient-info' ? null : 'patient-info')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-50"
              >
                <span>Patient Info</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${mobileDropdown === 'patient-info' ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileDropdown === 'patient-info' && (
                <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50/70 rounded-lg mt-1">
                  <Link
                    to="/patient-info#preparation"
                    className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-700"
                  >
                    • Test Preparation
                  </Link>
                  <Link
                    to="/patient-info#faqs"
                    className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-700"
                  >
                    • FAQs
                  </Link>
                  <Link
                    to="/patient-info#turnaround"
                    className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-700"
                  >
                    • Turnaround Times
                  </Link>
                </div>
              )}
            </div>

            {/* Location */}
            <Link
              to="/location"
              className={`px-3 py-2.5 rounded-lg text-base font-semibold ${
                currentPath === '/location' ? 'bg-blue-50 text-blue-700' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Location
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              className={`px-3 py-2.5 rounded-lg text-base font-semibold ${
                currentPath === '/contact' ? 'bg-blue-50 text-blue-700' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Contact
            </Link>

            {/* Primary Mobile CTA */}
            <div className="pt-4 mt-2 space-y-2">
              <Link
                to="/tests"
                className="w-full flex items-center justify-center py-3 px-4 bg-blue-700 text-white font-bold text-center rounded-xl shadow-md active:bg-blue-800 text-sm"
              >
                View Tests & Prices
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
