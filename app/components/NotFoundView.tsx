'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFoundView() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/');
    }
  };

  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div className="w-full flex-1 flex items-center justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#fbfdfa] via-[#f4f7f2] to-[#edf3eb]">
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Subtle Ambient Glow */}
        <div className="relative mx-auto mb-8 sm:mb-10 w-fit">
          <div className="absolute -inset-4 bg-emerald-400/20 blur-2xl rounded-full -z-10 animate-pulse" />
          
          {/* 404 Illustrated Badge / Graphic */}
          <div className="relative inline-flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-emerald-100 shadow-xl shadow-emerald-900/5">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-4xl sm:text-5xl select-none animate-bounce">🛒</span>
              <div className="relative">
                <span className="text-5xl sm:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-[#168941] via-[#1bb454] to-[#126833] bg-clip-text text-transparent">
                  ৪০৪
                </span>
                <span className="absolute -top-1 -right-4 px-2 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-red-100 text-red-600 rounded-full border border-red-200 shadow-xs">
                  404
                </span>
              </div>
              <span className="text-4xl sm:text-5xl select-none">🔍</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#168941] text-xs sm:text-sm font-semibold border border-emerald-200/60 mt-1">
              <span className="w-2 h-2 rounded-full bg-[#168941] animate-ping" />
              <span>পাতাটি পাওয়া যায়নি বা লোড করা সম্ভব হয়নি</span>
            </div>
          </div>
        </div>

        {/* Headings & Friendly Explanation */}
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
          দুঃখিত! কাঙ্ক্ষিত পৃষ্ঠাটি পাওয়া যায়নি
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto leading-relaxed mb-8">
          আপনি যে পাতাটি খুঁজছেন তা হয়তো মুছে ফেলা হয়েছে, লিঙ্কটি পরিবর্তিত হয়েছে অথবা সাময়িক ত্রুটির কারণে লোড হচ্ছে না।
        </p>

        {/* Quick Search Box */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
          <div className="relative flex items-center">
            <div className="absolute left-3.5 text-gray-400 pointer-events-none">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="পণ্য বা বাজারের নাম লিখে খুঁজুন..."
              className="w-full pl-11 pr-24 py-3 rounded-2xl bg-white border border-gray-200 text-sm sm:text-[15px] text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#168941]/30 focus:border-[#168941] transition-all"
            />
            <button
              type="submit"
              className="absolute right-1.5 px-4 py-2 rounded-xl bg-[#168941] hover:bg-[#137437] text-white text-xs sm:text-sm font-medium shadow-xs transition-colors cursor-pointer"
            >
              খুঁজুন
            </button>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#168941] hover:bg-[#137437] active:scale-[0.98] text-white text-sm sm:text-base font-semibold shadow-md shadow-[#168941]/20 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>হোমে ফিরে যান</span>
          </Link>

          <button
            type="button"
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white hover:bg-gray-50 active:scale-[0.98] text-gray-700 text-sm sm:text-base font-semibold border border-gray-200 shadow-xs transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>পূর্ববর্তী পাতা</span>
          </button>

          <button
            type="button"
            onClick={handleReload}
            className="inline-flex items-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl bg-white/70 hover:bg-white text-gray-600 hover:text-gray-900 text-sm font-medium border border-gray-200/80 transition-all cursor-pointer"
            title="পুনরায় লোড করুন"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>রিলোড করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
}
