/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { LabTestsSection } from './components/LabTestsSection';
import { ImagingSection } from './components/ImagingSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { FacilityGallery } from './components/FacilityGallery';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingMobileBar } from './components/FloatingMobileBar';
import { LabTest, ImagingService } from './types';

export default function App() {
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<
    LabTest | ImagingService | null
  >(null);

  const handleSelectServiceForInquiry = (service: LabTest | ImagingService) => {
    setSelectedServiceForInquiry(service);
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearPreselectedTest = () => {
    setSelectedServiceForInquiry(null);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-sky-500 selection:text-white pb-16 lg:pb-0">
      {/* Top Sticky Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <Hero
          onSearchClick={() => {
            const labEl = document.getElementById('laboratory');
            if (labEl) {
              labEl.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          onOpenContact={() => {
            const contactEl = document.getElementById('contact');
            if (contactEl) {
              contactEl.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        {/* About Section */}
        <AboutSection />

        {/* Laboratory Tests Section */}
        <LabTestsSection
          onSelectTestForInquiry={(test) => handleSelectServiceForInquiry(test)}
        />

        {/* Dedicated Imaging & Diagnostic Ultrasound Section */}
        <ImagingSection
          onSelectImagingForInquiry={(service) =>
            handleSelectServiceForInquiry(service)
          }
        />

        {/* Why Choose TNOC Section */}
        <WhyChooseUs />

        {/* Facility Gallery & Tour */}
        <FacilityGallery />

        {/* How to Find Us & Google Maps Navigation Section */}
        <LocationSection />

        {/* Contact, Information & Inquiry Form Section */}
        <ContactSection
          preselectedTest={selectedServiceForInquiry}
          onClearPreselectedTest={handleClearPreselectedTest}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Touch-Friendly Floating Mobile Bottom Bar */}
      <FloatingMobileBar />
    </div>
  );
}
