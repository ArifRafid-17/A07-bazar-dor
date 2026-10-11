import React from 'react';
import { MarqueeBar, Product } from './MarqueeBar';

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products', {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching products for marquee:', error);
    return [];
  }
}

const Marquee = async () => {
  const products = await getProducts();
  if (!products || products.length === 0) {
    return null;
  }
  return <MarqueeBar products={products} />;
};

export default Marquee;
