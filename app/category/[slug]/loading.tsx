import React from 'react';

export default function CategoryLoading() {
  return (
    <div className="w-full flex-1 bg-[#f4f6f3] py-6 sm:py-8 pb-16 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb skeleton */}
        <div className="h-4 w-36 bg-gray-200 rounded" />

        {/* Category Header Card skeleton */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gray-200 shrink-0" />
          <div className="space-y-2">
            <div className="h-6 w-40 bg-gray-200 rounded" />
            <div className="h-3.5 w-24 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Sort Bar skeleton */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
          <div className="h-4 w-28 bg-gray-200 rounded" />
          <div className="h-8 w-36 bg-gray-200 rounded-lg" />
        </div>

        {/* Cards Grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
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
  );
}
