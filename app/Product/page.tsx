import React, { Suspense } from 'react';
import Product from './Product';
import { ProductSkeleton } from './ProductSkeleton';

export default function ProductPage() {
  return (
    <main className="w-full">
      <Suspense fallback={<ProductSkeleton />}>
        <Product />
      </Suspense>
    </main>
  );
}
