import React from 'react';

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="w-full bg-[#f4f6f3] pb-16 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section A Skeleton */}
        <div>
          <div className="h-6 w-36 bg-gray-200 rounded mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={`skel-a-${i}`}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 flex flex-col justify-between h-[116px]"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-4 bg-gray-200 rounded w-28" />
                    <div className="h-3 bg-gray-200 rounded w-16" />
                  </div>
                </div>
                <div className="flex items-end justify-between mt-4">
                  <div className="space-y-1">
                    <div className="h-2.5 bg-gray-200 rounded w-12" />
                    <div className="h-4 bg-gray-200 rounded w-20" />
                  </div>
                  <div className="h-5 w-14 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section B Skeleton */}
        <div>
          <div className="h-6 w-36 bg-gray-200 rounded mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={`skel-b-${i}`}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 flex flex-col justify-between h-[116px]"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-4 bg-gray-200 rounded w-28" />
                    <div className="h-3 bg-gray-200 rounded w-16" />
                  </div>
                </div>
                <div className="flex items-end justify-between mt-4">
                  <div className="space-y-1">
                    <div className="h-2.5 bg-gray-200 rounded w-12" />
                    <div className="h-4 bg-gray-200 rounded w-20" />
                  </div>
                  <div className="h-5 w-14 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductSkeleton;
