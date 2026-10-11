'use client';

import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from './types';
import { ProductCard } from './ProductCard';
import { toBengaliNumber } from './utils';

interface ProductSectionProps {
  products: Product[];
}

export const ProductSection: React.FC<ProductSectionProps> = ({ products }) => {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const isCategoryView = Boolean(activeCategory && activeCategory !== 'all');

  // Top 6 Risers (দাম বেড়েছে)
  const topRisers = useMemo(() => {
    return products
      .filter((p) => p.change && p.change.dir === 'up')
      .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
      .slice(0, 6);
  }, [products]);

  // Top 6 Fallers (দাম কমেছে)
  const topFallers = useMemo(() => {
    return products
      .filter((p) => p.change && p.change.dir === 'down')
      .sort((a, b) => (a.change?.pct || 0) - (b.change?.pct || 0))
      .slice(0, 6);
  }, [products]);

  // Category products
  const categoryProducts = useMemo(() => {
    if (!isCategoryView) return [];
    let list = products.filter((p) => p.category === activeCategory);
    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.today - b.today);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.today - a.today);
    }
    return list;
  }, [products, activeCategory, isCategoryView, sortBy]);

  // First product of category to get category icon and name
  const currentCategoryInfo = useMemo(() => {
    if (!isCategoryView) return null;
    const first = products.find((p) => p.category === activeCategory);
    if (!first) return null;
    return {
      name: first.categoryNameBn,
      icon: first.categoryIcon,
    };
  }, [products, activeCategory, isCategoryView]);

  // If viewing a specific category, render the Category page matching Image 1
  if (isCategoryView) {
    return (
      <div className="w-full bg-[#f4f6f3] py-6 sm:py-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Category Header Card */}
          {currentCategoryInfo && (
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl shrink-0 select-none">
                {currentCategoryInfo.icon}
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  {currentCategoryInfo.name}
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
                  {toBengaliNumber(categoryProducts.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
                </p>
              </div>
            </div>
          )}

          {/* Sort Bar */}
          <div className="bg-white rounded-2xl p-3 sm:px-6 sm:py-3.5 border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center justify-end gap-3">
            <label htmlFor="sort-select" className="text-xs sm:text-sm text-gray-600 font-medium">
              সাজান
            </label>
            <div className="relative">
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'default' | 'price-asc' | 'price-desc')}
                className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-xs sm:text-sm font-medium rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:ring-1 focus:ring-[#168941] cursor-pointer"
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

          {/* Subtitle count */}
          <p className="text-xs sm:text-sm text-gray-500 font-normal">
            মোট {toBengaliNumber(categoryProducts.length)}টি পণ্য দেখানো হচ্ছে
          </p>

          {/* Product Cards Grid */}
          {categoryProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-500 border border-gray-100">
              কোনো পণ্য পাওয়া যায়নি।
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5">
              {categoryProducts.map((product) => (
                <ProductCard key={`cat-${product.id}`} product={product} />
              ))}
            </div>
          )}

        </div>
      </div>
    );
  }

  // Home view (All sections A, B, C)
  return (
    <div className="w-full bg-[#f4f6f3] pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section A: আজ দাম বেড়েছে */}
        {topRisers.length > 0 && (
          <section aria-labelledby="heading-risers">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-red-500 text-sm leading-none" aria-hidden="true">
                ▲
              </span>
              <h2
                id="heading-risers"
                className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight"
              >
                আজ দাম বেড়েছে
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5">
              {topRisers.map((product) => (
                <ProductCard key={`riser-${product.id}`} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Section B: আজ দাম কমেছে */}
        {topFallers.length > 0 && (
          <section aria-labelledby="heading-fallers">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#168941] text-sm leading-none" aria-hidden="true">
                ▼
              </span>
              <h2
                id="heading-fallers"
                className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight"
              >
                আজ দাম কমেছে
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5">
              {topFallers.map((product) => (
                <ProductCard key={`faller-${product.id}`} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Section C: সব পণ্য */}
        <section id="সব-পণ্য" aria-labelledby="heading-all-products" className="scroll-mt-6">
          <span id="products" className="sr-only" />
          <div className="mb-4">
            <h2
              id="heading-all-products"
              className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight"
            >
              সব পণ্য
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5">
            {products.map((product) => (
              <ProductCard key={`all-${product.id}`} product={product} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default ProductSection;
