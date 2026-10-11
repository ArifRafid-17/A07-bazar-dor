import React from 'react';

export default function SignUpLoading() {
  return (
    <main className="w-full flex-1 flex flex-col items-center justify-center bg-[#f4f6f3] py-10 sm:py-16 px-4 animate-pulse">
      <div className="text-center mb-6 sm:mb-8 max-w-md space-y-2">
        <div className="h-8 w-44 bg-gray-200 rounded-xl mx-auto" />
        <div className="h-4 w-60 bg-gray-200 rounded mx-auto" />
      </div>

      <div className="w-full max-w-[420px] bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-3.5">
        <div className="space-y-1.5">
          <div className="h-3.5 w-12 bg-gray-200 rounded" />
          <div className="h-10 w-full bg-gray-200 rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <div className="h-3.5 w-14 bg-gray-200 rounded" />
          <div className="h-10 w-full bg-gray-200 rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <div className="h-3.5 w-16 bg-gray-200 rounded" />
          <div className="h-10 w-full bg-gray-200 rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <div className="h-3.5 w-28 bg-gray-200 rounded" />
          <div className="h-10 w-full bg-gray-200 rounded-xl" />
        </div>
        <div className="h-11 w-full bg-gray-200 rounded-xl mt-3" />

        <div className="h-4 w-12 bg-gray-200 rounded mx-auto my-4" />

        <div className="grid grid-cols-2 gap-3">
          <div className="h-9 bg-gray-200 rounded-xl" />
          <div className="h-9 bg-gray-200 rounded-xl" />
        </div>

        <div className="h-3.5 w-44 bg-gray-200 rounded mx-auto mt-5" />
      </div>
    </main>
  );
}
