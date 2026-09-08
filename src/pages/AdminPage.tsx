import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  LayoutDashboard,
  Home,
  Activity,
  FileSpreadsheet,
  Image as ImageIcon,
  Video,
  Building2,
  HelpCircle,
  Clock,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  AlertCircle,
  Plus,
  Globe,
  User,
  Key,
  Sparkles,
  Check,
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { Link, useRouter } from '../router/RouterContext';
import { AdminOverviewTab } from './admin/AdminOverviewTab';
import { AdminHomepageTab } from './admin/AdminHomepageTab';
import { AdminServicesTab } from './admin/AdminServicesTab';
import { AdminTestsTab } from './admin/AdminTestsTab';
import { AdminGalleryTab } from './admin/AdminGalleryTab';
import { AdminVideosTab } from './admin/AdminVideosTab';
import { AdminAboutTab } from './admin/AdminAboutTab';
import { AdminPatientInfoTab } from './admin/AdminPatientInfoTab';
import { AdminContactHoursTab } from './admin/AdminContactHoursTab';
import { AdminSeoTab } from './admin/AdminSeoTab';
import { AdminSettingsTab } from './admin/AdminSettingsTab';
import { AdminTestModal } from './admin/AdminTestModal';
import { AdminServiceModal } from './admin/AdminServiceModal';
import { AdminGalleryModal } from './admin/AdminGalleryModal';
import { AdminVideoModal } from './admin/AdminVideoModal';

export const AdminPage: React.FC = () => {
  const {
    isAdmin,
    adminUsername,
    login,
    logout,
    addTest,
    addService,
    addGalleryPhoto,
    addGalleryVideo,
    showToast,
  } = useCms();
  const { currentPath, navigate } = useRouter();

  // Login form state (username + password)
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);

  // Active dashboard tab state
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Global Quick Add modals
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Route synchronization: enforce /admin/login vs /admin/dashboard
  useEffect(() => {
    if (isAdmin && (currentPath === '/admin' || currentPath === '/admin/login')) {
      navigate('/admin/dashboard');
    } else if (!isAdmin && currentPath === '/admin/dashboard') {
      navigate('/admin/login');
    }
  }, [isAdmin, currentPath, navigate]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLogin(true);
    setLoginError('');

    const res = await login(usernameInput.trim(), passwordInput.trim());
    if (!res.success) {
      setLoginError(res.message || 'Invalid administrator username or password.');
      setIsSubmittingLogin(false);
    } else {
      setUsernameInput('');
      setPasswordInput('');
      setIsSubmittingLogin(false);
      navigate('/admin/dashboard');
    }
  };

  const handleQuickDemoLogin = async () => {
    setIsSubmittingLogin(true);
    setLoginError('');
    setUsernameInput('tnocfacility2026');
    setPasswordInput('tnoc2025');
    const res = await login('tnocfacility2026', 'tnoc2025');
    setIsSubmittingLogin(false);
    if (!res.success) {
      setLoginError(res.message || 'Error signing in with demo credentials.');
    } else {
      navigate('/admin/dashboard');
    }
  };

  const handleFillCredentials = () => {
    setUsernameInput('tnocfacility2026');
    setPasswordInput('tnoc2025');
    setLoginError('');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'homepage', label: 'Homepage', icon: Home },
    { id: 'services', label: 'Services', icon: Activity },
    { id: 'tests', label: 'Tests & Prices', icon: FileSpreadsheet },
    { id: 'gallery', label: 'Photo Gallery', icon: ImageIcon },
    { id: 'videos', label: 'Video Gallery', icon: Video },
    { id: 'about', label: 'About & Story', icon: Building2 },
    { id: 'patient-info', label: 'Patient Info & FAQs', icon: HelpCircle },
    { id: 'contact-hours', label: 'Contact & Hours', icon: Clock },
    { id: 'seo', label: 'SEO Management', icon: Globe },
    { id: 'settings', label: 'Security & Logs', icon: Settings },
  ];

  // 1. Dedicated Unauthenticated Login Screen (/admin/login)
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white mx-auto shadow-xl mb-4">
            <Lock className="w-8 h-8" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            TNOC Medical Diagnostics
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Secure Administrator Console • Msamvu, Morogoro
          </p>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl px-4">
          <div className="bg-slate-800/90 py-8 px-6 shadow-2xl rounded-3xl sm:px-10 border border-slate-700 backdrop-blur-xs">
            {/* Quick Demo Access Callout */}
            <div className="mb-6 p-4 rounded-2xl bg-blue-950/70 border border-blue-500/40 text-blue-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-200 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-blue-400" />
                  <span>Administrative Access Credentials</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Pre-configured
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/90 p-3 rounded-xl border border-slate-700/70 text-slate-300 mb-3">
                <div>
                  <span className="text-[10px] text-slate-400 block">Username:</span>
                  <span className="text-blue-300 font-mono font-bold select-all">tnocfacility2026</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Password:</span>
                  <span className="text-blue-300 font-mono font-bold select-all">tnoc2025</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  disabled={isSubmittingLogin}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  <span>1-Click Sign In (Instant Access)</span>
                </button>
                <button
                  type="button"
                  onClick={handleFillCredentials}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-600 transition-colors cursor-pointer"
                  title="Auto-fill form inputs"
                >
                  Auto-fill
                </button>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Admin Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    autoFocus
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Enter username (tnocfacility2026)"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-600 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-hidden text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Admin Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter password (tnoc2025)"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-600 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-hidden text-sm"
                  />
                </div>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-red-900/50 border border-red-700/50 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmittingLogin}
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50 mt-2"
              >
                {isSubmittingLogin ? 'Authenticating...' : 'Sign In to Dashboard'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-700/80 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public Website</span>
              </Link>
            </div>
          </div>

          {/* Admin Features Directory Preview */}
          <div className="mt-8 bg-slate-800/40 rounded-3xl p-6 border border-slate-700/60">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>Available Administration & CMS Features</span>
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Full control over clinical data, TZS pricing, patient instructions, and media:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/70">
                <div className="font-bold text-blue-300 mb-1 flex items-center gap-1.5">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-blue-400" />
                  <span>Tests & Prices CMS</span>
                </div>
                <div className="text-slate-400 text-[11px] leading-relaxed">
                  Manage 100+ lab tests, prices in TZS, sample requirements, and turnaround hours.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/70">
                <div className="font-bold text-red-300 mb-1 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-red-400" />
                  <span>Diagnostic Ultrasound</span>
                </div>
                <div className="text-slate-400 text-[11px] leading-relaxed">
                  Obstetric, pelvic, and abdominal scan procedures, clinical preparation, and modalities.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/70">
                <div className="font-bold text-purple-300 mb-1 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                  <span>Photo Gallery Manager</span>
                </div>
                <div className="text-slate-400 text-[11px] leading-relaxed">
                  Upload facility photos, set hero image, categorize by department, add clinical captions.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/70">
                <div className="font-bold text-rose-300 mb-1 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-rose-400" />
                  <span>Video Tours & Clinical Walkthroughs</span>
                </div>
                <div className="text-slate-400 text-[11px] leading-relaxed">
                  Add YouTube embed or direct MP4/WebM clinic walkthrough videos with modal players.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/70">
                <div className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-amber-400" />
                  <span>Homepage & Emergency Banner</span>
                </div>
                <div className="text-slate-400 text-[11px] leading-relaxed">
                  Edit hero messaging, badge text, statistics counter, and toggle public alert notifications.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/70">
                <div className="font-bold text-emerald-300 mb-1 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Patient Info & FAQ CMS</span>
                </div>
                <div className="text-slate-400 text-[11px] leading-relaxed">
                  Update fasting rules, sample collection advice, and publish/reorder patient FAQs.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/70">
                <div className="font-bold text-cyan-300 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>7-Day Hours & Contacts</span>
                </div>
                <div className="text-slate-400 text-[11px] leading-relaxed">
                  Configure opening/closing schedules, phone lines, WhatsApp link, and Google Maps embed.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/70">
                <div className="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>Security & Audit Logs</span>
                </div>
                <div className="text-slate-400 text-[11px] leading-relaxed">
                  Live timestamped audit trail of all content mutations, password updates, and JSON sync.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-[11px] text-slate-500">
              Restricted medical portal. All administrative activities and clinical data updates are recorded.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Dedicated Authenticated Admin Dashboard Portal (/admin/dashboard)
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Admin Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
              CMS
            </div>
            <div>
              <div className="text-sm font-extrabold tracking-tight">
                TNOC Medical Diagnostics
              </div>
              <div className="text-[10px] text-slate-400">
                Facility Administration Portal • Msamvu
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              <span>Public Website</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-900/60 hover:bg-red-800 text-red-200 text-xs font-bold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full flex-1">
        {/* Mobile Horizontal Tabs Selector */}
        <div className="lg:hidden mb-6 overflow-x-auto pb-2 -mx-4 px-4 flex items-center gap-1.5 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Navigation Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs sticky top-24">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
                CMS Management
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-blue-700 text-white shadow-xs'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-4 h-4 ${
                            isActive ? 'text-white' : 'text-slate-400'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </nav>

              <div className="pt-4 mt-4 border-t border-slate-100 px-3 pb-1">
                <div className="text-[11px] text-slate-600 font-medium flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>{adminUsername || 'tnocfacility2026'}</span>
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>JSON Database Synced</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Active Content Tab Area */}
          <main className="lg:col-span-9">
            {activeTab === 'overview' && (
              <AdminOverviewTab
                onNavigateTab={setActiveTab}
                onOpenAddTest={() => setIsTestModalOpen(true)}
                onOpenAddService={() => setIsServiceModalOpen(true)}
                onOpenAddPhoto={() => setIsGalleryModalOpen(true)}
                onOpenAddVideo={() => setIsVideoModalOpen(true)}
              />
            )}

            {activeTab === 'homepage' && <AdminHomepageTab />}

            {activeTab === 'services' && <AdminServicesTab />}

            {activeTab === 'tests' && <AdminTestsTab />}

            {activeTab === 'gallery' && <AdminGalleryTab />}

            {activeTab === 'videos' && <AdminVideosTab />}

            {activeTab === 'about' && <AdminAboutTab />}

            {activeTab === 'patient-info' && <AdminPatientInfoTab />}

            {activeTab === 'contact-hours' && <AdminContactHoursTab />}

            {activeTab === 'seo' && <AdminSeoTab />}

            {activeTab === 'settings' && <AdminSettingsTab />}
          </main>
        </div>
      </div>

      {/* Global Quick Modals */}
      <AdminTestModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
        onSave={(data) => {
          addTest(data);
          setActiveTab('tests');
        }}
      />

      <AdminServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        onSave={(data) => {
          addService(data);
          setActiveTab('services');
        }}
      />

      <AdminGalleryModal
        isOpen={isGalleryModalOpen}
        onClose={() => setIsGalleryModalOpen(false)}
        onSave={(data) => {
          addGalleryPhoto(data);
          setActiveTab('gallery');
        }}
      />

      <AdminVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onSave={(data) => {
          addGalleryVideo(data);
          setActiveTab('videos');
        }}
      />
    </div>
  );
};
