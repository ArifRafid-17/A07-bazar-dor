'use client';

import React from 'react';
import MarqueeText from 'react-marquee-text';

export interface ProductChange {
  dir: 'up' | 'down' | 'flat' | string;
  pct: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  change?: ProductChange;
}

export const toBengaliNumber = (num: number | string | undefined | null): string => {
  if (num === undefined || num === null) return '';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
};

export const getBengaliUnit = (unit: string): string => {
  switch (unit?.toLowerCase()) {
    case 'kg':
      return 'কেজি';
    case 'litre':
    case 'liter':
      return 'লিটার';
    case 'dozen':
      return 'ডজন';
    case 'piece':
    case 'pc':
      return 'পিস';
    case 'gm':
    case 'gram':
      return 'গ্রাম';
    default:
      return unit || '';
  }
};

interface MarqueeBarProps {
  products: Product[];
}

export const MarqueeBar: React.FC<MarqueeBarProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="চলতি বাজার দর"
      className="w-full bg-[#fbfdfa] border-y border-gray-200/80 overflow-hidden select-none py-1.5 transition-colors"
    >
      <div className="w-full">
        <MarqueeText
          duration={25}
          pauseOnHover={true}
          textSpacing="0px"
          direction="right"
          className="bazar-dor-marquee flex items-center"
        >
          {products.map((p) => {
            const isUp = p.change?.dir === 'up';
            const isDown = p.change?.dir === 'down';
            const absPct = p.change ? Math.abs(p.change.pct) : 0;

            return (
              <div
                key={p.id}
                className="inline-flex items-center gap-2.5 px-6 py-1 border-r border-gray-200/90 whitespace-nowrap text-sm cursor-pointer hover:bg-black/[0.02] transition-colors"
                title={`${p.nameBn} - ${toBengaliNumber(p.today)} টাকা/${getBengaliUnit(p.unit)}`}
              >
                {/* Product Icon */}
                <span className="text-base select-none leading-none shrink-0" aria-hidden="true">
                  {p.image || p.categoryIcon || '🛍️'}
                </span>

                {/* Product Name */}
                <span className="font-bold text-gray-900 text-sm sm:text-[14.5px]">
                  {p.nameBn}
                </span>

                {/* Price & Unit */}
                <span className="font-semibold text-gray-700 text-sm sm:text-[14px]">
                  {toBengaliNumber(p.today)} টাকা/{getBengaliUnit(p.unit)}
                </span>

                {/* Price Change Indicator */}
                {p.change && (
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold ${
                      isUp
                        ? 'text-red-500'
                        : isDown
                        ? 'text-[#168941]'
                        : 'text-gray-400'
                    }`}
                  >
                    {isUp && (
                      <svg
                        className="w-2.5 h-2.5 fill-current shrink-0"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12 4l-8 14h16z" />
                      </svg>
                    )}
                    {isDown && (
                      <svg
                        className="w-2.5 h-2.5 fill-current shrink-0"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12 20l8-14H4z" />
                      </svg>
                    )}
                    <span>{toBengaliNumber(absPct)}%</span>
                  </span>
                )}
              </div>
            );
          })}
        </MarqueeText>
      </div>
    </section>
  );
};
