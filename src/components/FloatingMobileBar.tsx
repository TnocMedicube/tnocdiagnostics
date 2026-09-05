import React from 'react';
import { Phone, MessageCircle, Navigation, MapPin } from 'lucide-react';
import { TNOC_BUSINESS_CONFIG } from '../config/businessConfig';

export const FloatingMobileBar: React.FC = () => {
  const hasPhone = Boolean(TNOC_BUSINESS_CONFIG.phoneRaw);
  const hasWhatsApp = Boolean(TNOC_BUSINESS_CONFIG.whatsappRaw);

  return (
    <div
      id="floating-mobile-bar"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-white/10 px-3 py-2 shadow-2xl shadow-black"
      role="region"
      aria-label="Quick Mobile Actions"
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2 text-center">
        {/* Call Action */}
        {hasPhone ? (
          <a
            href={`tel:${TNOC_BUSINESS_CONFIG.phoneRaw}`}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-blue-900 active:bg-blue-950 text-white min-h-[46px] shadow-sm transition-colors border border-blue-800"
            aria-label="Call TNOC Diagnostics"
          >
            <Phone className="w-4 h-4 mb-0.5 text-white" />
            <span className="text-[11px] font-bold tracking-tight">CALL</span>
          </a>
        ) : (
          <a
            href="#contact"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-900 text-slate-200 min-h-[46px] transition-colors border border-white/10"
            aria-label="View Contact Information"
          >
            <Phone className="w-4 h-4 mb-0.5 text-red-400" />
            <span className="text-[11px] font-bold tracking-tight">CONTACT</span>
          </a>
        )}

        {/* WhatsApp Action */}
        {hasWhatsApp ? (
          <a
            href={`https://wa.me/${TNOC_BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(
              'Hello TNOC Diagnostics (Maabara ya Msamvu), I would like to inquire about tests.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white min-h-[46px] shadow-sm transition-colors"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 mb-0.5" />
            <span className="text-[11px] font-bold tracking-tight">WHATSAPP</span>
          </a>
        ) : (
          <a
            href="#contact"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-900 text-slate-200 min-h-[46px] transition-colors border border-white/10"
            aria-label="Send Inquiry"
          >
            <MessageCircle className="w-4 h-4 mb-0.5 text-emerald-400" />
            <span className="text-[11px] font-bold tracking-tight">INQUIRE</span>
          </a>
        )}

        {/* Google Maps / Directions Action */}
        <a
          href={TNOC_BUSINESS_CONFIG.googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-red-600 active:bg-red-700 text-white min-h-[46px] font-bold shadow-md shadow-red-600/30 transition-all border border-red-500"
          aria-label="Get Directions in Google Maps"
        >
          <Navigation className="w-4 h-4 mb-0.5" />
          <span className="text-[11px] font-extrabold tracking-tight">MAP / GO</span>
        </a>
      </div>
    </div>
  );
};
