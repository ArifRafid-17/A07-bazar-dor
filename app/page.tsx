import { Suspense } from "react";
import Banner from "./Banner/Banner";
import Product from "./Product/Product";
import { ProductSkeleton } from "./Product/ProductSkeleton";

export default function Home() {
  return (
    <main className="w-full flex-1">
      <Suspense fallback={null}>
        <Banner />
      </Suspense>
      <Suspense fallback={<ProductSkeleton />}>
        <Product />
      </Suspense>
    </main>
  );
}
