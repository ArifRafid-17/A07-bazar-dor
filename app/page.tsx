import Banner from "./Banner/Banner";import Product from "./Product/Product";
import { ProductSkeleton } from "./Product/ProductSkeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="w-full flex-1">
      <Banner />
       <Suspense fallback={<ProductSkeleton />}>
        <Product />
      </Suspense>
    </main>
  );
}
