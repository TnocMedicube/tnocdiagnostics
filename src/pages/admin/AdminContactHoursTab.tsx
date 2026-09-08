import React, { useState } from 'react';
import { Save, RotateCcw, Phone, MessageCircle, MapPin, Clock, Navigation, Mail, UserCheck, ShieldCheck } from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export const AdminContactHoursTab: React.FC = () => {
  const {
    businessConfig,
    updateBusinessConfig,
    resetBusinessConfig,
    openingHours,
    updateOpeningHours,
    resetOpeningHours,
    showToast,
  } = useCms();

  // Business Config state
  const [displayName, setDisplayName] = useState(businessConfig.displayName || '');
  const [facilityType, setFacilityType] = useState(businessConfig.facilityType || '');
  const [address, setAddress] = useState(businessConfig.address || '');
  const [city, setCity] = useState(businessConfig.city || '');
  const [phone, setPhone] = useState(businessConfig.phone || '');
  const [phoneRaw, setPhoneRaw] = useState(businessConfig.phoneRaw || '');
  const [whatsapp, setWhatsapp] = useState(businessConfig.whatsapp || '');
  const [whatsappRaw, setWhatsappRaw] = useState(businessConfig.whatsappRaw || '');
  const [email, setEmail] = useState(businessConfig.email || 'drmonasser04@gmail.com');
  const [secondaryEmail, setSecondaryEmail] = useState(businessConfig.secondaryEmail || 'tnocmedicube@gmail.com');

  // Director of TNOC Diagnostics contact
  const [directorName, setDirectorName] = useState(businessConfig.directorName || 'Dr. Monasser');
  const [directorTitle, setDirectorTitle] = useState(businessConfig.directorTitle || 'Director of TNOC Diagnostics');
  const [directorPhone, setDirectorPhone] = useState(businessConfig.directorPhone || '0741 405 988');
  const [directorPhoneRaw, setDirectorPhoneRaw] = useState(businessConfig.directorPhoneRaw || '+255741405988');
  const [directorWhatsapp, setDirectorWhatsapp] = useState(businessConfig.directorWhatsapp || '0741 405 988');
  const [directorWhatsappRaw, setDirectorWhatsappRaw] = useState(businessConfig.directorWhatsappRaw || '255741405988');
  const [directorEmail, setDirectorEmail] = useState(businessConfig.directorEmail || 'drmonasser04@gmail.com');

  const [latitude, setLatitude] = useState(String(businessConfig.latitude));
  const [longitude, setLongitude] = useState(String(businessConfig.longitude));
  const [googleMapsDirectionsUrl, setGoogleMapsDirectionsUrl] = useState(
    businessConfig.googleMapsDirectionsUrl || ''
  );

  // Hours state
  const [hoursList, setHoursList] = useState(openingHours);

  const handleDayChange = (
    index: number,
    field: 'isOpen' | 'is24Hours' | 'openTime' | 'closeTime',
    value: any
  ) => {
    const updated = [...hoursList];
    updated[index] = { ...updated[index], [field]: value };
    setHoursList(updated);
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessConfig({
      displayName: displayName.trim(),
      facilityType: facilityType.trim(),
      address: address.trim(),
      city: city.trim(),
      phone: phone.trim(),
      phoneRaw: phoneRaw.trim(),
      whatsapp: whatsapp.trim(),
      whatsappRaw: whatsappRaw.trim(),
      email: email.trim(),
      secondaryEmail: secondaryEmail.trim(),
      directorName: directorName.trim(),
      directorTitle: directorTitle.trim(),
      directorPhone: directorPhone.trim(),
      directorPhoneRaw: directorPhoneRaw.trim(),
      directorWhatsapp: directorWhatsapp.trim(),
      directorWhatsappRaw: directorWhatsappRaw.trim(),
      directorEmail: directorEmail.trim(),
      directorEmails: [directorEmail.trim(), secondaryEmail.trim()].filter(Boolean),
      latitude: parseFloat(latitude) || -6.802722,
      longitude: parseFloat(longitude) || 37.661222,
      googleMapsDirectionsUrl: googleMapsDirectionsUrl.trim(),
    });
    updateOpeningHours(hoursList);
    showToast('Contact information and opening hours schedule updated successfully.');
  };

  const handleReset = () => {
    if (window.confirm('Reset contact details and operating hours to verified clinical defaults?')) {
      resetBusinessConfig();
      resetOpeningHours();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Contact Channels & Operating Hours
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage official telephone, WhatsApp, GPS location, and daily facility schedule
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      <form onSubmit={handleSaveAll} className="space-y-6">
        {/* Contact Info Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-5">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-700" />
            <span>Facility Contact & Location Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Facility Display Name *
              </label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Facility Subtitle / Classification
              </label>
              <input
                type="text"
                value={facilityType}
                onChange={(e) => setFacilityType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Physical Street Address *
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                City / Region *
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Telephone Display Text
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +255 754 000 000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Telephone Dial Number (No spaces)
              </label>
              <input
                type="text"
                value={phoneRaw}
                onChange={(e) => setPhoneRaw(e.target.value)}
                placeholder="e.g. +255754000000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-mono focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                WhatsApp Display Text
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="e.g. +255 754 000 000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                WhatsApp Chat Number (Digits only)
              </label>
              <input
                type="text"
                value={whatsappRaw}
                onChange={(e) => setWhatsappRaw(e.target.value)}
                placeholder="e.g. 255754000000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-mono focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Facility Official Inquiries Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Facility Email (Primary / Director) *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="drmonasser04@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Secondary / Administrative Email
              </label>
              <input
                type="email"
                value={secondaryEmail}
                onChange={(e) => setSecondaryEmail(e.target.value)}
                placeholder="tnocmedicube@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Latitude Coordinates
              </label>
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-mono text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Longitude Coordinates
              </label>
              <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-mono text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Google Maps Navigation URL
              </label>
              <input
                type="text"
                value={googleMapsDirectionsUrl}
                onChange={(e) => setGoogleMapsDirectionsUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs font-mono focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Director of TNOC Diagnostics Contact Card */}
        <div className="bg-gradient-to-br from-white to-blue-50/40 rounded-2xl p-6 sm:p-8 border border-blue-200/80 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Director of TNOC Diagnostics
                </h3>
                <p className="text-xs text-slate-500">
                  Direct contact channels for executive escalation, clinical inquiries, and referrals
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-700 bg-blue-100/70 px-2.5 py-1 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Leadership Direct Line</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Director Name *
              </label>
              <input
                type="text"
                required
                value={directorName}
                onChange={(e) => setDirectorName(e.target.value)}
                placeholder="Dr. Monasser"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Designation / Clinical Title *
              </label>
              <input
                type="text"
                required
                value={directorTitle}
                onChange={(e) => setDirectorTitle(e.target.value)}
                placeholder="Director of TNOC Diagnostics"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden bg-white"
              />
            </div>
          </div>

          {/* Director Phone & WhatsApp (0741405988) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Director Direct Phone (Normal Calls) *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={directorPhone}
                  onChange={(e) => {
                    const val = e.target.value;
                    setDirectorPhone(val);
                    const clean = val.replace(/[^0-9]/g, '');
                    if (clean.startsWith('0')) {
                      setDirectorPhoneRaw('+255' + clean.slice(1));
                    }
                  }}
                  placeholder="0741 405 988"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden bg-white pl-9 font-mono"
                />
                <Phone className="w-4 h-4 text-blue-600 absolute left-3 top-3" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                0741 405 988 (Normal phone call link: tel:{directorPhoneRaw})
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Director WhatsApp Line (Normal & WhatsApp Call) *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={directorWhatsapp}
                  onChange={(e) => {
                    const val = e.target.value;
                    setDirectorWhatsapp(val);
                    const clean = val.replace(/[^0-9]/g, '');
                    if (clean.startsWith('0')) {
                      setDirectorWhatsappRaw('255' + clean.slice(1));
                    }
                  }}
                  placeholder="0741 405 988"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-hidden bg-white pl-9 font-mono"
                />
                <MessageCircle className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Chat/Call link: https://wa.me/{directorWhatsappRaw}
              </p>
            </div>
          </div>

          {/* Director Emails (drmonasser04@gmail.com and tnocmedicube@gmail.com) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Director Direct Email *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={directorEmail}
                  onChange={(e) => setDirectorEmail(e.target.value)}
                  placeholder="drmonasser04@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden bg-white pl-9 font-mono"
                />
                <Mail className="w-4 h-4 text-blue-600 absolute left-3 top-3" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Direct consultation email: drmonasser04@gmail.com
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Director Facility / Corporate Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={secondaryEmail}
                  onChange={(e) => setSecondaryEmail(e.target.value)}
                  placeholder="tnocmedicube@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden bg-white pl-9 font-mono"
                />
                <Mail className="w-4 h-4 text-purple-600 absolute left-3 top-3" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Secondary facility email: tnocmedicube@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Operating Hours Table Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>Weekly Operating Hours Schedule</span>
          </h3>

          <div className="space-y-3">
            {hoursList.map((dayItem, idx) => (
              <div
                key={dayItem.day}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm"
              >
                <div className="w-32 font-bold text-slate-900">
                  {dayItem.day}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <label className="inline-flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dayItem.isOpen}
                      onChange={(e) => handleDayChange(idx, 'isOpen', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded-sm"
                    />
                    <span className="font-semibold text-slate-700">Open</span>
                  </label>

                  <label className="inline-flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dayItem.is24Hours}
                      disabled={!dayItem.isOpen}
                      onChange={(e) => handleDayChange(idx, 'is24Hours', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded-sm disabled:opacity-40"
                    />
                    <span className="font-semibold text-slate-700">24 Hours</span>
                  </label>
                </div>

                {!dayItem.is24Hours && dayItem.isOpen && (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={dayItem.openTime}
                      onChange={(e) => handleDayChange(idx, 'openTime', e.target.value)}
                      placeholder="07:00 AM"
                      className="w-24 px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-900"
                    />
                    <span className="text-slate-400">to</span>
                    <input
                      type="text"
                      value={dayItem.closeTime}
                      onChange={(e) => handleDayChange(idx, 'closeTime', e.target.value)}
                      placeholder="09:00 PM"
                      className="w-24 px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-900"
                    />
                  </div>
                )}

                {dayItem.is24Hours && dayItem.isOpen && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                    Open 24 Hours
                  </span>
                )}

                {!dayItem.isOpen && (
                  <span className="text-xs font-semibold text-slate-400">
                    Closed all day
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Contact & Schedule</span>
          </button>
        </div>
      </form>
    </div>
  );
};
