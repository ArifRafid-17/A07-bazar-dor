import React, { Suspense } from 'react';
import Banner from './Banner';

export default function BannerPage() {
  return (
    <main className="w-full">
      <Suspense fallback={null}>
        <Banner />
      </Suspense>
    </main>
  );
}