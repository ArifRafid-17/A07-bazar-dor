import React, { Suspense } from 'react';
import Marquee from './Marquee';
import { MarqueeSkeleton } from './MarqueeSkeleton';

export default function MarqueePage() {
  return (
    <main className="w-full">
      <Suspense fallback={<MarqueeSkeleton />}>
        <Marquee />
      </Suspense>
    </main>
  );
}