import React from 'react';
import { Hero } from '../components/Hero';
import { HomeServicesSection } from '../components/HomeServicesSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { HomeFeaturedTestsSection } from '../components/HomeFeaturedTestsSection';
import { HomeFacilityPreviewSection } from '../components/HomeFacilityPreviewSection';
import { LocationSection } from '../components/LocationSection';
import { HomeContactCtaSection } from '../components/HomeContactCtaSection';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Diagnostic Services */}
      <HomeServicesSection />

      {/* 3. Why Choose TNOC */}
      <WhyChooseUs />

      {/* 4. Featured Tests */}
      <HomeFeaturedTestsSection />

      {/* 5. Facility Preview */}
      <HomeFacilityPreviewSection />

      {/* 6. Location */}
      <LocationSection />

      {/* 7. Contact CTA */}
      <HomeContactCtaSection />
    </div>
  );
};
