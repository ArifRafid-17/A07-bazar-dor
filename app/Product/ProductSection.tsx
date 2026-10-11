'use client';

import React, { useMemo } from 'react';
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

  // All Products (or filtered by category if selected from category bar)
  const displayedProducts = useMemo(() => {
    if (!activeCategory || activeCategory === 'all') {
      return products;
    }
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

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
        <section id="products" aria-labelledby="heading-all-products">
          <div className="mb-4">
            <h2
              id="heading-all-products"
              className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight"
            >
              সব পণ্য
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              মোট {toBengaliNumber(displayedProducts.length)}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>

          {displayedProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-500 border border-gray-100">
              কোনো পণ্য পাওয়া যায়নি।
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5">
              {displayedProducts.map((product) => (
                <ProductCard key={`all-${product.id}`} product={product} />
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default ProductSection;
