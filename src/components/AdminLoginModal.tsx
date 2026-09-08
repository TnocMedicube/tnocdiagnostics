import React, { useState } from 'react';
import { Shield, Lock, Key, X, AlertCircle, Check, ArrowRight } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const AdminLoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login, loginNotice } = useAdmin();
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showDefaultHint, setShowDefaultHint] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!pin.trim()) {
      setError('Please enter the administrator passcode.');
      return;
    }
    const success = login(pin);
    if (!success) {
      setError('Invalid administrator passcode. Please try again.');
    } else {
      setPin('');
      setError(null);
    }
  };

  const handleQuickDemoLogin = () => {
    login('tnoc2025');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900">
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center shadow-inner">
              <Shield className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                TNOC Administrator Login
              </h3>
              <p className="text-xs text-slate-300">
                Authorized Personnel & Clinic Staff Only
              </p>
            </div>
          </div>
          <button
            onClick={closeLoginModal}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {loginNotice && (
            <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
              <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Administrative Permission Required</span>
                <span>{loginNotice}</span>
              </div>
            </div>
          )}

          <p className="text-xs text-slate-600 mb-5 leading-relaxed">
            Only authorized TNOC staff can upload photos, manage the facility gallery, add/edit diagnostic services, and configure clinic information.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-pin-input"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Administrator Passcode (PIN)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  id="admin-pin-input"
                  type="password"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Enter passcode (Default: tnoc2025)"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  autoFocus
                />
              </div>
            </div>

            {error && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-sm font-bold shadow-md shadow-red-950/20 transition-all flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span>Unlock Administrator Access</span>
            </button>
          </form>

          {/* Quick Helper Credentials Note */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="text-slate-400">Default Staff Passcode:</span>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="inline-flex items-center gap-1 font-mono font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-200/60 transition-colors"
              title="Click to auto-fill default admin passcode"
            >
              <span>tnoc2025</span>
              <ArrowRight className="w-3 h-3 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
