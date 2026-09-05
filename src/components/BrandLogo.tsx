import React, { useState } from 'react';
import { TNOC_BUSINESS_CONFIG } from '../config/businessConfig';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'header' | 'footer';
  showSubtext?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'header',
  showSubtext = true,
  size = 'md',
}) => {
  const [imageError, setImageError] = useState(false);
  const logoSrc = TNOC_BUSINESS_CONFIG.logoSvgPath || TNOC_BUSINESS_CONFIG.logoPath || '/logo.svg';
  const isDarkBg = variant === 'footer' || variant === 'dark';

  const sizeClasses = {
    sm: 'h-9 w-9 sm:h-10 sm:w-10',
    md: 'h-11 w-11 sm:h-12 sm:w-12',
    lg: 'h-14 w-14 sm:h-16 sm:w-16',
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official TNOC Brand Emblem / Logo Asset */}
      <div className="relative shrink-0">
        {!imageError ? (
          <div className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center">
            <img
              src={logoSrc}
              alt="TNOC Medical Diagnostic Facility Official Stethoscope Logo"
              className={`${sizeClasses} object-contain rounded-2xl`}
              onError={() => setImageError(true)}
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          /* Red, Blue and White Stethoscope Vector Emblem (Exact geometry matching tnoc_logo_720) */
          <div
            className={`relative ${sizeClasses} rounded-2xl overflow-hidden shadow-sm flex items-center justify-center`}
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 720 720"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="squircle-logo">
                  <rect x="0" y="0" width="720" height="720" rx="160" ry="160" />
                </clipPath>
              </defs>

              <g clipPath="url(#squircle-logo)">
                {/* Diagonal split background: Red top-left, Blue bottom-right */}
                <polygon points="0,0 720,0 0,720" fill="#D32729" />
                <polygon points="720,0 720,720 0,720" fill="#1570D0" />

                {/* Stethoscope in pure white */}
                <g fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round">
                  <path
                    d="M 242 165 C 242 275, 270 355, 360 388 C 450 355, 478 275, 478 165"
                    strokeWidth="44"
                  />
                  <path d="M 360 388 L 360 562" strokeWidth="44" />
                  <circle cx="360" cy="562" r="64" strokeWidth="44" />
                </g>

                <circle cx="242" cy="155" r="28" fill="#FFFFFF" />
                <circle cx="478" cy="155" r="28" fill="#FFFFFF" />
              </g>
            </svg>
          </div>
        )}
      </div>

      {/* Brand Typographic Identity: Royal Blue, Medical Red, and Pure White/Dark Slate */}
      <div className="flex flex-col text-left">
        <div className="flex items-baseline gap-1.5">
          <span
            className={`font-black tracking-tight text-lg sm:text-xl font-display leading-none ${
              isDarkBg ? 'text-white' : 'text-blue-950'
            }`}
          >
            TNOC
          </span>
          <span className="font-extrabold tracking-tight text-lg sm:text-xl font-display leading-none text-red-600">
            DIAGNOSTICS
          </span>
        </div>

        {showSubtext && (
          <span
            className={`text-[10px] sm:text-xs font-semibold tracking-wider uppercase mt-1 ${
              isDarkBg ? 'text-red-300' : 'text-slate-600'
            }`}
          >
            <span className={isDarkBg ? 'text-white' : 'text-blue-900'}>MAABARA YA MSAMVU</span> • MOROGORO
          </span>
        )}
      </div>
    </div>
  );
};
