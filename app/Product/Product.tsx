import React from 'react';
import { Product as ProductType } from './types';
import { ProductSection } from './ProductSection';

async function getProducts(): Promise<ProductType[]> {
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products', {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

const Product = async () => {
  const products = await getProducts();
  if (!products || products.length === 0) {
    return null;
  }

  return <ProductSection products={products} />;
};

export default Product;
