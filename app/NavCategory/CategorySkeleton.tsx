import React from 'react';

export const CategorySkeleton = () => {
  return (
    <div className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-2 sm:gap-2.5 overflow-hidden">
          {/* Skeleton Pills */}
          <div className="h-8.5 w-18 bg-gray-100 rounded-full animate-pulse shrink-0" />
          <div className="h-8.5 w-18 bg-gray-100 rounded-full animate-pulse shrink-0" />
          <div className="h-8.5 w-18 bg-gray-100 rounded-full animate-pulse shrink-0" />
          <div className="h-8.5 w-18 bg-gray-100 rounded-full animate-pulse shrink-0" />
          <div className="h-8.5 w-20 bg-gray-100 rounded-full animate-pulse shrink-0" />
          <div className="h-8.5 w-18 bg-gray-100 rounded-full animate-pulse shrink-0" />
          <div className="h-8.5 w-22 bg-gray-100 rounded-full animate-pulse shrink-0" />
          <div className="h-8.5 w-24 bg-gray-100 rounded-full animate-pulse shrink-0" />
        </div>
      </div>
    </div>
  );
};
