'use client';

import React, { useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
      .replace(/,([^,]*)$/, '$1');
  } catch {
    return 'মঙ্গলবার, ৬ অক্টোবর, ২০২৬';
  }
};

interface BannerProps {
  date?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  imageSrc?: string;
}

import { useSearchParams } from 'next/navigation';

export const Banner: React.FC<BannerProps> = ({
  date,
  title = 'আজকের বাজারের দাম এক নজরে',
  description = 'চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।',
  buttonText = 'সব পণ্য দেখুন',
  buttonHref = '#সব-পণ্য',
  imageSrc = '/bazar-hero.png',
}) => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const dynamicDate = useSyncExternalStore(
    emptySubscribe,
    getBengaliDate,
    () => 'মঙ্গলবার, ৬ অক্টোবর, ২০২৬'
  );

  const displayDate = date || dynamicDate || 'মঙ্গলবার, ৬ অক্টোবর, ২০২৬';

  if (category && category !== 'all') {
    return null;
  }

  return (
    <section aria-label="ব্যানার" className="w-full bg-[#f4f6f3] py-6 sm:py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-200/70 rounded-[24px] sm:rounded-[30px] p-6 sm:p-8 md:p-12 shadow-[0_2px_14px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative overflow-hidden">
          
          {/* Left Text Content */}
          <div className="flex-1 flex flex-col items-start text-left z-10 max-w-2xl">
            {/* Date Pill */}
            <div className="inline-flex items-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#edf7f0] border border-[#d8eedf] text-[#168941] text-sm sm:text-[15px] font-semibold select-none mb-3 sm:mb-4">
              <span>{displayDate}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-[38px] font-black text-gray-900 tracking-tight leading-[1.22] mb-3 sm:mb-4">
              {title}
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 font-normal">
              {description}
            </p>

            {/* CTA Button */}
            <Link
              href={buttonHref}
              className="inline-flex items-center justify-center px-6 py-2.5 sm:py-3 rounded-lg bg-[#168941] text-white text-sm sm:text-base font-semibold hover:bg-[#137637] active:scale-95 transition-all duration-200 shadow-sm shadow-[#168941]/30 cursor-pointer"
            >
              {buttonText}
            </Link>
          </div>

          {/* Right Image Illustration */}
          <div className="shrink-0 flex items-center justify-center w-full md:w-auto z-10">
            <div className="relative w-56 h-48 sm:w-64 sm:h-52 md:w-72 md:h-60 transition-transform duration-300 hover:scale-[1.02]">
              <Image
                src={imageSrc}
                alt="আজকের বাজার দর - ফলের ঝুড়ি"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 250px, 300px"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;
