import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  ExternalLink,
  Copy,
  Check,
  Compass,
  Bus,
  Car,
  Footprints,
  Info,
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { Link } from '../router/RouterContext';

export const LocationPage: React.FC = () => {
  const { businessConfig } = useCms();

  const [copiedCoords, setCopiedCoords] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const coords = `${businessConfig.latitude}, ${businessConfig.longitude}`;

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(coords);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${businessConfig.address}, ${businessConfig.city}, Tanzania`);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const mapsEmbedUrl =
    businessConfig.googleMapsEmbedUrl ||
    `https://maps.google.com/maps?q=${businessConfig.latitude},${businessConfig.longitude}&hl=en&z=17&output=embed`;

  return (
    <div className="py-12 sm:py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-red-600" />
            <span>Facility Location & Directions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            How to Find Us in Msamvu
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            TNOC Medical Diagnostic Facility is conveniently situated in Msamvu, Morogoro, Tanzania, accessible via major regional transit corridors.
          </p>
        </div>

        {/* Location & Navigation Interactive Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 block mb-1">
                  Physical Address
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  {businessConfig.displayName}
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  {businessConfig.address}, {businessConfig.city}, Tanzania
                </p>

                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Address Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-6 border-t border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Verified GPS Coordinates
                </span>
                <div className="flex items-center justify-between font-mono text-sm bg-white p-3 rounded-xl border border-slate-300">
                  <span className="text-slate-800 font-semibold">{coords}</span>
                  <button
                    type="button"
                    onClick={handleCopyCoords}
                    className="p-1 text-slate-500 hover:text-blue-700"
                    title="Copy Coordinates"
                  >
                    {copiedCoords ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <a
                  href={businessConfig.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-md transition-colors"
                >
                  <Navigation className="w-5 h-5 text-blue-200" />
                  <span>Start Google Maps Navigation</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>

                <a
                  href={businessConfig.googleMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-sm rounded-xl transition-colors"
                >
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span>View on Google Maps</span>
                </a>
              </div>
            </div>

            {/* Landmark Advice */}
            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-950 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm font-bold text-blue-900 mb-1">
                  Key Visual Landmarks
                </strong>
                <span>
                  Look for the prominent red rooftop sign reading &ldquo;MAABARA&rdquo; and the roadside lightbox totem bearing the official TNOC stethoscope logo near the Msamvu junction.
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Map Embed Column */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 h-96 lg:h-full min-h-[400px]">
              <iframe
                title="TNOC Medical Diagnostics Google Map Location"
                src={mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Transportation Options Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 mb-4">
              <Bus className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">By Public Transit / Daladala</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Disembark at the central Msamvu Bus Terminal. Our facility is a brief 3 to 5-minute walk or short bajaji ride directly from the main passenger terminal.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600 mb-4">
              <Car className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">By Private Vehicle / Taxi</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct vehicular access from the main highway. Convenient short-term patient parking and passenger drop-off is available right at our entrance.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
              <Footprints className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">On Foot / Walking Access</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Easily accessible pedestrian walkway with clear directional signage guiding walk-in patients safely into our reception lobby.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
