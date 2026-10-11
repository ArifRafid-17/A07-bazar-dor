import React from 'react';
import { ProductSkeleton } from './Product/ProductSkeleton';

export default function RootLoading() {
  return (
    <main className="w-full flex-1 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="w-full bg-[#f4f6f3] pt-6 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full h-36 sm:h-48 md:h-56 bg-gray-200/80 rounded-2xl" />
        </div>
      </div>

      {/* Product Section Skeleton */}
      <div className="pt-6">
        <ProductSkeleton />
      </div>
    </main>
  );
}
