'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product } from '../../Product/types';
import { ProductCard } from '../../Product/ProductCard';
import { toBengaliNumber } from '../../Product/utils';

interface CategoryPageViewProps {
  categoryName: string;
  categoryIcon: string;
  products: Product[];
}

export default function CategoryPageView({
  categoryName,
  categoryIcon,
  products,
}: CategoryPageViewProps) {
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sortBy === 'price-asc') {
      return list.sort((a, b) => a.today - b.today);
    }
    if (sortBy === 'price-desc') {
      return list.sort((a, b) => b.today - a.today);
    }
    return list;
  }, [products, sortBy]);

  return (
    <div className="w-full flex-1 bg-[#f4f6f3] py-6 sm:py-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center text-xs sm:text-sm text-gray-500 select-none">
          <Link href="/" className="hover:text-[#168941] transition-colors">
            হোম
          </Link>
          <span className="mx-2 text-gray-400">›</span>
          <span className="text-gray-700 font-medium">{categoryName}</span>
        </nav>

        {/* Category Header Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl shrink-0 select-none shadow-xs">
              {categoryIcon}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                {categoryName}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
                {toBengaliNumber(products.length)}টি পণ্যের আজকের বাজার দর ও পরিবর্তন
              </p>
            </div>
          </div>
        </div>

        {/* Sort Bar (Requirement C1) */}
        <div className="bg-white rounded-2xl p-3 sm:px-6 sm:py-3.5 border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <p className="text-xs sm:text-sm text-gray-500 font-normal">
            মোট {toBengaliNumber(sortedProducts.length)}টি পণ্য
          </p>

          <div className="flex items-center gap-2.5">
            <label htmlFor="cat-sort-select" className="text-xs sm:text-sm text-gray-600 font-semibold select-none">
              সাজান:
            </label>
            <div className="relative">
              <select
                id="cat-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'default' | 'price-asc' | 'price-desc')}
                className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-xs sm:text-sm font-medium rounded-xl px-3.5 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#168941]/25 focus:border-[#168941] cursor-pointer shadow-2xs"
              >
                <option value="default">ডিফল্ট</option>
                <option value="price-asc">দাম: কম থেকে বেশি</option>
                <option value="price-desc">দাম: বেশি থেকে কম</option>
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                ▼
              </span>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {sortedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm max-w-lg mx-auto">
            <span className="text-4xl select-none mb-3 block">🛍️</span>
            <h2 className="text-lg font-bold text-gray-800 mb-2">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি</h2>
            <p className="text-sm text-gray-500 mb-6">অন্যান্য বিভাগের নিত্যপণ্যের দরদাম দেখতে হোমপেজে ফিরে যান।</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#168941] hover:bg-[#137437] text-white text-sm font-semibold transition-colors"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5">
            {sortedProducts.map((product) => (
              <ProductCard key={`cat-page-${product.id}`} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
