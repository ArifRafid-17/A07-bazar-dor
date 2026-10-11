import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Product } from '../../Product/types';
import CategoryPageView from './CategoryPageView';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface CategoryItem {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export async function generateStaticParams() {
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/categories');
    if (!res.ok) return [];
    const categories: CategoryItem[] = await res.json();
    return categories.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `ক্যাটাগরি: ${slug} — বাজার দর`,
    description: `বাজার দরে ${slug} ক্যাটাগরির সকল পণ্যের আজকের দাম ও বিস্তারিত তথ্য।`,
  };
}

async function getCategoryData(slug: string) {
  try {
    const [categoriesRes, productsRes] = await Promise.all([
      fetch('https://openapi.programming-hero.com/api/bazardor/categories', {
        next: { revalidate: 3600 },
      }),
      fetch('https://openapi.programming-hero.com/api/bazardor/products', {
        next: { revalidate: 3600 },
      }),
    ]);

    const categories: CategoryItem[] = categoriesRes.ok ? await categoriesRes.json() : [];
    const products: Product[] = productsRes.ok ? await productsRes.json() : [];

    const matchedCategory = categories.find((c) => c.slug === slug);
    const categoryProducts = products.filter((p) => p.category === slug);

    return {
      category: matchedCategory || null,
      products: categoryProducts,
    };
  } catch (err) {
    console.error('Error fetching category data:', err);
    return { category: null, products: [] };
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const { category, products } = await getCategoryData(slug);

  // If category is invalid or not found, show friendly 404-style empty state with CTA button "হোম পেজে ফিরে যান"
  if (!category && products.length === 0) {
    return (
      <div className="w-full flex-1 bg-[#f4f6f3] py-16 px-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#168941] flex items-center justify-center text-3xl mx-auto mb-4">
            🔍
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider mb-3">
            ৪০৪ • বিভাগটি পাওয়া যায়নি
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            দুঃখিত! এই ক্যাটাগরিটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-sm text-gray-600 mb-8 leading-relaxed">
            আপনি যে ক্যাটাগরি খুঁজছেন সেটি সঠিক নয় অথবা কোনো পণ্য অন্তর্ভুক্ত নেই।
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#168941] hover:bg-[#137437] text-white text-sm sm:text-base font-semibold shadow-sm transition-all"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  const name = category?.nameBn || products[0]?.categoryNameBn || slug;
  const icon = category?.icon || products[0]?.categoryIcon || '🛍️';

  return (
    <CategoryPageView
      categoryName={name}
      categoryIcon={icon}
      products={products}
    />
  );
}
