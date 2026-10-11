import React from 'react';

export default function ProfileLoading() {
  return (
    <main className="w-full flex-1 flex flex-col items-center bg-[#f4f6f3] py-10 sm:py-14 px-4 sm:px-6 animate-pulse">
      <div className="w-full max-w-[620px]">
        {/* Page Title & Subtitle skeleton */}
        <div className="mb-6 sm:mb-7 space-y-2">
          <div className="h-7 w-36 bg-gray-200 rounded-lg" />
          <div className="h-4 w-52 bg-gray-200 rounded" />
        </div>

        {/* Card 1: User Overview Card skeleton */}
        <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-gray-100 mb-5 sm:mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-200 shrink-0" />
              <div className="space-y-2">
                <div className="h-5 w-32 bg-gray-200 rounded" />
                <div className="h-4 w-44 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="h-9 w-24 bg-gray-200 rounded-xl" />
          </div>
        </div>

        {/* Card 2: Edit Information Form skeleton */}
        <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-gray-100 space-y-4">
          <div className="h-5 w-20 bg-gray-200 rounded mb-4" />
          <div className="space-y-2">
            <div className="h-4 w-12 bg-gray-200 rounded" />
            <div className="h-11 w-full bg-gray-200 rounded-xl" />
          </div>
          <div className="h-11 w-full bg-gray-200 rounded-xl mt-5" />
        </div>
      </div>
    </main>
  );
}
