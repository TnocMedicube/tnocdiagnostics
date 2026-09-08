import React, { ReactNode } from 'react';
import { useCms } from './CmsContext';
import { LabTest, ImagingService, GalleryPhoto, BusinessConfig } from '../types';

/**
 * Backwards compatibility adapter for useAdmin
 * Proxies to useCms() so all existing and new code share a single source of truth.
 */
export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const useAdmin = () => {
  const cms = useCms();

  return {
    isAdmin: cms.isAdmin,
    login: async (pin: string) => {
      const res = await cms.login('tnocfacility2026', pin);
      return res.success;
    },
    logout: cms.logout,
    verifyPin: (pin: string) => {
      return pin.trim() === 'tnoc2025';
    },
    changePin: (currentPin: string, newPin: string) => {
      return cms.changePassword(currentPin, newPin);
    },
    isLoginModalOpen: false,
    openLoginModal: (_notice?: string) => {},
    closeLoginModal: () => {},
    loginNotice: null as string | null,

    isDashboardOpen: false,
    activeTab: 'tests' as 'tests' | 'imaging' | 'gallery' | 'business' | 'security',
    openDashboard: (_tab?: 'tests' | 'imaging' | 'gallery' | 'business' | 'security' | string) => {},
    closeDashboard: () => {},
    setActiveTab: (_tab: 'tests' | 'imaging' | 'gallery' | 'business' | 'security' | string) => {},

    // Aliased collections
    labTests: cms.tests,
    addLabTest: cms.addTest,
    updateLabTest: cms.updateTest,
    deleteLabTest: cms.deleteTest,
    resetLabTests: cms.resetTests,

    imagingServices: cms.services,
    addImagingService: cms.addService,
    updateImagingService: cms.updateService,
    deleteImagingService: cms.deleteService,
    resetImagingServices: cms.resetServices,

    galleryPhotos: cms.gallery,
    addGalleryPhoto: cms.addGalleryPhoto,
    updateGalleryPhoto: cms.updateGalleryPhoto,
    deleteGalleryPhoto: cms.deleteGalleryPhoto,
    resetGalleryPhotos: cms.resetGallery,
    setFrontHeroPhoto: (photo: GalleryPhoto) => cms.setFeaturedGalleryPhoto(photo.id),
    activeFrontPhotoId: cms.gallery.find((g) => g.isFeatured)?.id || cms.gallery[0]?.id || '',

    businessConfig: cms.businessConfig,
    updateBusinessConfig: cms.updateBusinessConfig,
    resetBusinessConfig: cms.resetBusinessConfig,

    toastMessage: cms.toastMessage,
    showToast: cms.showToast,
  };
};
