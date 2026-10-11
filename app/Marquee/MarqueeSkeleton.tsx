import React from 'react';

export const MarqueeSkeleton: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="w-full bg-[#fbfdfa] border-y border-gray-200/80 py-2 overflow-hidden animate-pulse select-none"
    >
      <div className="flex items-center gap-6 whitespace-nowrap px-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div
            key={item}
            className="inline-flex items-center gap-3 pr-6 border-r border-gray-200/80 shrink-0"
          >
            {/* Icon skeleton */}
            <div className="w-5 h-5 rounded-full bg-gray-200 shrink-0" />
            {/* Title skeleton */}
            <div className="w-20 h-4 bg-gray-200 rounded" />
            {/* Price skeleton */}
            <div className="w-16 h-4 bg-gray-200 rounded" />
            {/* Change pill skeleton */}
            <div className="w-10 h-3.5 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};
