'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface CategoryBarProps {
  categories: Category[];
}

export const CategoryBar = ({ categories }: CategoryBarProps) => {
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get('category');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll positions for scroll buttons and fade indicators
  const updateScrollIndicators = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    updateScrollIndicators();
    window.addEventListener('resize', updateScrollIndicators);
    return () => window.removeEventListener('resize', updateScrollIndicators);
  }, [categories]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = direction === 'left' ? -260 : 260;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-20 transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Left Arrow Button (Desktop) */}
        {canScrollLeft && (
          <div className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 items-center">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="w-8 h-8 rounded-full bg-white/95 shadow-md border border-gray-200/80 flex items-center justify-center text-gray-700 hover:text-[#168941] hover:border-[#168941]/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Scroll left"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="w-6 h-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          </div>
        )}

        {/* Categories Horizontal Scroll List */}
        <div
          ref={scrollContainerRef}
          onScroll={updateScrollIndicators}
          className="flex items-center gap-2 sm:gap-2.5 py-3 overflow-x-auto no-scrollbar scroll-smooth"
          role="navigation"
          aria-label="পণ্যের ক্যাটাগরি"
        >
          {/* Category Pills */}
          {categories.map((c) => {
            const isActive = activeSlug === c.slug;
            return (
              <Link
                key={c.id}
                href={`/?category=${c.slug}`}
                className={`group shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none active:scale-95 ${
                  isActive
                    ? 'bg-[#168941] text-white font-semibold shadow-sm shadow-[#168941]/25 ring-2 ring-[#168941]/20'
                    : 'bg-gray-50/90 text-gray-700 hover:bg-emerald-50/70 hover:text-[#168941] border border-gray-200/70 hover:border-[#168941]/35'
                }`}
              >
                <span className="text-base sm:text-lg group-hover:scale-115 transition-transform duration-200">
                  {c.icon}
                </span>
                <span>{c.nameBn}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Arrow Button (Desktop) */}
        {canScrollRight && (
          <div className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 items-center">
            <div className="w-6 h-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            <button
              type="button"
              onClick={() => scroll('right')}
              className="w-8 h-8 rounded-full bg-white/95 shadow-md border border-gray-200/80 flex items-center justify-center text-gray-700 hover:text-[#168941] hover:border-[#168941]/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Scroll right"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CategoryBar;
