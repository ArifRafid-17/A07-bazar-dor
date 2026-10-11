import React from 'react';

export default function ProductDetailLoading() {
  return (
    <main className="w-full bg-[#f4f6f3] min-h-[calc(100vh-140px)] py-6 sm:py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 animate-pulse">
        {/* Breadcrumb skeleton */}
        <div className="h-4 w-48 bg-gray-200 rounded" />

        {/* Top card skeleton */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gray-200 shrink-0" />
            <div className="space-y-2">
              <div className="h-6 w-36 bg-gray-200 rounded" />
              <div className="h-3.5 w-24 bg-gray-200 rounded" />
              <div className="h-3 w-48 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="w-32 h-24 bg-gray-100 rounded-2xl" />
        </div>

        {/* Bottom card skeleton */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 space-y-8">
          <div>
            <div className="h-5 w-32 bg-gray-200 rounded mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="h-24 bg-gray-100 rounded-xl" />
              <div className="h-24 bg-gray-100 rounded-xl" />
              <div className="h-24 bg-gray-100 rounded-xl" />
            </div>
          </div>
          <div>
            <div className="h-5 w-44 bg-gray-200 rounded mb-4" />
            <div className="h-64 bg-gray-100 rounded-xl" />
          </div>
        </div>
      </div>
    </main>
  );
}
