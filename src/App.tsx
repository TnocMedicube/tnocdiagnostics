/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingMobileBar } from './components/FloatingMobileBar';
import { CmsProvider, useCms } from './context/CmsContext';
import { Router, useRouter } from './router/RouterContext';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { TestsPage } from './pages/TestsPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { PatientInfoPage } from './pages/PatientInfoPage';
import { LocationPage } from './pages/LocationPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

function ToastContainer() {
  const { toastMessage } = useCms();

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 bg-slate-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 text-xs sm:text-sm font-semibold flex items-center gap-2 backdrop-blur-md animate-fade-in"
    >
      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
      <span>{toastMessage}</span>
    </div>
  );
}

function MainLayout() {
  const { currentPath, navigate } = useRouter();
  const isAdminRoute = currentPath.startsWith('/admin');

  // Route selector
  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/':
      case '/home':
        return <HomePage />;
      case '/services':
        return <ServicesPage />;
      case '/tests':
        return <TestsPage />;
      case '/about':
        return <AboutPage />;
      case '/gallery':
        return <GalleryPage />;
      case '/patient-info':
        return <PatientInfoPage />;
      case '/location':
        return <LocationPage />;
      case '/contact':
        return <ContactPage />;
      case '/admin':
      case '/admin/login':
      case '/admin/dashboard':
        return <AdminPage />;
      default:
        // Handle any sub-admin paths
        if (currentPath.startsWith('/admin')) {
          return <AdminPage />;
        }
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Public Navbar: Rendered on all public pages, strictly hidden on /admin */}
      {!isAdminRoute && <Navbar />}

      {/* Main Page Content */}
      <main id="main-content" className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Public Footer: Rendered on all public pages, strictly hidden on /admin */}
      {!isAdminRoute && <Footer />}

      {/* Floating Mobile Bar: Rendered on mobile for public pages */}
      {!isAdminRoute && <FloatingMobileBar />}

      {/* System Toast Notification Container */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <CmsProvider>
        <MainLayout />
      </CmsProvider>
    </Router>
  );
}
