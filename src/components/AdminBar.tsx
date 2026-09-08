import React from 'react';
import {
  Shield,
  PlusCircle,
  Camera,
  Settings,
  LogOut,
  Sliders,
  Beaker,
  Radio,
  ExternalLink,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const AdminBar: React.FC = () => {
  const { isAdmin, logout, openDashboard } = useAdmin();

  if (!isAdmin) return null;

  return (
    <aside
      aria-label="Administrator Controls"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl bg-slate-900/95 backdrop-blur-md border border-red-500/40 rounded-2xl shadow-2xl shadow-black/60 text-white p-2.5 px-4 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-300"
    >
      {/* Left: Admin Status Indicator */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-sm">
          <Shield className="w-4 h-4" />
        </div>
        <div className="hidden sm:block text-left">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold font-display text-white">
              TNOC ADMIN ACTIVE
            </span>
          </div>
          <p className="text-[10px] text-slate-300">
            Full control & editing unlocked
          </p>
        </div>
      </div>

      {/* Center: Quick Action Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
        <button
          onClick={() => openDashboard('tests')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-white/10 transition-colors whitespace-nowrap"
          title="Manage Laboratory Tests catalog"
        >
          <Beaker className="w-3.5 h-3.5 text-red-400" />
          <span>Lab Tests</span>
        </button>

        <button
          onClick={() => openDashboard('imaging')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-white/10 transition-colors whitespace-nowrap"
          title="Manage Imaging & Ultrasound services"
        >
          <Radio className="w-3.5 h-3.5 text-blue-400" />
          <span>Imaging</span>
        </button>

        <button
          onClick={() => openDashboard('gallery')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-white/10 transition-colors whitespace-nowrap"
          title="Upload facility photos or change hero scene"
        >
          <Camera className="w-3.5 h-3.5 text-emerald-400" />
          <span>Photos & Gallery</span>
        </button>

        <button
          onClick={() => openDashboard('business')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-white/10 transition-colors whitespace-nowrap hidden md:inline-flex"
          title="Edit clinic phone, WhatsApp, opening hours"
        >
          <Settings className="w-3.5 h-3.5 text-amber-400" />
          <span>Clinic Info</span>
        </button>

        <button
          onClick={() => openDashboard()}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-950/40 transition-all hover:scale-105 whitespace-nowrap"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Admin Portal</span>
        </button>
      </div>

      {/* Right: Exit / Log Out */}
      <div className="shrink-0 flex items-center gap-1">
        <button
          onClick={logout}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-red-600 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          title="Log out of Admin Mode"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Log Out</span>
        </button>
      </div>
    </aside>
  );
};
