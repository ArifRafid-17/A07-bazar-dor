'use client';

import React, { useSyncExternalStore } from 'react';
import Image from 'next/image';

const emptySubscribe = () => () => {};

const getBengaliDate = () => {
  try {
    return new Intl.DateTimeFormat('bn-BD', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
      .format(new Date())
      .replace(/,([^,]*)$/, '$1'); // remove extra comma before year
  } catch {
    // Fallback if Intl bn-BD is not supported
    return 'DATE';
  }
};

const NavBar = () => {
  const currentDate = useSyncExternalStore(
    emptySubscribe,
    getBengaliDate,
    () => null
  );

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand Details */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#168941] flex items-center justify-center">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={20}
                height={20}
                className="brightness-0 invert object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                বাজার দর
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {currentDate}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-sm font-medium text-gray-800 hover:text-[#168941] transition-colors cursor-pointer"
            >
              সাইন ইন
            </button>
            <button
              type="button"
              className="text-sm font-medium text-white bg-[#168941] hover:bg-[#137437] px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              সাইন আপ
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;