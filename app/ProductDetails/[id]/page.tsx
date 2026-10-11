import React, { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Product } from '../../Product/types';
import { toBengaliNumber, getBengaliUnit } from '../../Product/utils';

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products');
    if (!res.ok) return [];
    const products: Product[] = await res.json();
    const list: { id: string }[] = [];
    products.forEach((p) => {
      list.push({ id: String(p.id) });
      if (p.slug) {
        list.push({ id: String(p.slug) });
      }
    });
    return list;
  } catch {
    return [];
  }
}

async function getProduct(idOrSlug: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${idOrSlug}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      return await res.json();
    }

    const allRes = await fetch('https://openapi.programming-hero.com/api/bazardor/products', {
      next: { revalidate: 3600 },
    });
    if (!allRes.ok) return null;
    const allProducts: Product[] = await allRes.json();
    const matched = allProducts.find(
      (p) => String(p.slug) === idOrSlug || String(p.id) === idOrSlug
    );
    if (!matched) return null;

    const detailRes = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${matched.id}`, {
      next: { revalidate: 3600 },
    });
    if (!detailRes.ok) return null;
    return await detailRes.json();
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
}

const formatPriceWithUnit = (val: number): string => {
  if (Number.isInteger(val)) {
    return `${toBengaliNumber(val)} টাকা`;
  }
  return `${toBengaliNumber(val.toFixed(2))} টাকা`;
};

function ProductDetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="h-4 w-48 bg-gray-200 rounded" />

      {/* Top card skeleton */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gray-200 shrink-0" />
          <div className="space-y-2">
            <div className="h-6 w-36 bg-gray-200 rounded" />
            <div className="h-3.5 w-24 bg-gray-200 rounded" />
            <div className="h-3 w-48 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="w-32 h-24 bg-gray-100 rounded-2xl" />
      </div>

      {/* Bottom card skeleton */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 space-y-8">
        <div>
          <div className="h-5 w-32 bg-gray-200 rounded mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="h-24 bg-gray-100 rounded-xl" />
            <div className="h-24 bg-gray-100 rounded-xl" />
            <div className="h-24 bg-gray-100 rounded-xl" />
          </div>
        </div>
        <div>
          <div className="h-5 w-44 bg-gray-200 rounded mb-4" />
          <div className="h-64 bg-gray-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

async function ProductDetailContent({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';
  const absPct = product.change ? Math.abs(product.change.pct) : 0;

  const yesterdayPrice = product.yesterday ?? product.today;
  const priceDiff = product.today - yesterdayPrice;

  const allMins = (product.markets || []).map((m) => m.min);
  const allMaxs = (product.markets || []).map((m) => m.max);
  const minPrice = allMins.length ? Math.min(...allMins) : product.today;
  const maxPrice = allMaxs.length ? Math.max(...allMaxs) : product.today;

  const sortedMarkets = [...(product.markets || [])].sort(
    (a, b) => a.min - b.min || a.max - b.max
  );

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center text-xs sm:text-sm text-gray-500 select-none">
        <Link href="/" className="hover:text-[#168941] transition-colors">
          হোম
        </Link>
        <span className="mx-2 text-gray-400">›</span>
        {product.categoryNameBn && (
          <>
            <Link
              href={`/?category=${product.category}`}
              className="hover:text-[#168941] transition-colors"
            >
              {product.categoryNameBn}
            </Link>
            <span className="mx-2 text-gray-400">›</span>
          </>
        )}
        <span className="text-gray-700 font-medium">
          {product.nameBn}
        </span>
      </nav>

      {/* Card 1: Product Header & Price Box */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        {/* Left: Avatar, Title, Unit, Change Statement */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl select-none shrink-0 shadow-xs">
            {product.image || product.categoryIcon || '🍚'}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight leading-snug">
              {product.nameBn}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 font-medium mt-1">
              প্রতি {getBengaliUnit(product.unit)} • {product.categoryNameBn}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 font-normal mt-2">
              {priceDiff > 0 && (
                <>গতকালকের তুলনায় আজ দাম বেড়েছে {toBengaliNumber(priceDiff)} টাকা</>
              )}
              {priceDiff < 0 && (
                <>গতকালকের তুলনায় আজ দাম কমেছে {toBengaliNumber(Math.abs(priceDiff))} টাকা</>
              )}
              {priceDiff === 0 && <>গতকালকের তুলনায় আজ দাম অপরিবর্তিত</>}
            </p>
          </div>
        </div>

        {/* Right: Price Box */}
        <div className="bg-gray-50/80 border border-gray-100 rounded-2xl px-6 py-4 text-center shrink-0 min-w-[140px] select-none">
          <span className="text-sm sm:text-[15px] text-gray-600 font-semibold block leading-tight mb-1">
            আজকের দাম
          </span>
          <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight block">
            {toBengaliNumber(product.today)}
          </span>
          <span className="text-sm font-medium text-gray-600 block mt-1">
            টাকা / {getBengaliUnit(product.unit)}
          </span>
          {product.change && (
            <span
              className={`text-xs sm:text-[13px] font-semibold mt-1.5 inline-flex items-center justify-center gap-0.5 ${
                isUp
                  ? 'text-red-500'
                  : isDown
                  ? 'text-[#168941]'
                  : 'text-gray-400'
              }`}
            >
              {isUp && <span className="text-[10px]">▲</span>}
              {isDown && <span className="text-[10px]">▼</span>}
              {!isUp && !isDown && <span>—</span>}
              <span>{toBengaliNumber(absPct)}%</span>
            </span>
          )}
        </div>
      </div>

      {/* Card 2: Price Summary & Market Breakdown */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-8">
        
        {/* Section A: দামের সারসংক্ষেপ */}
        <section aria-labelledby="summary-heading">
          <h2 id="summary-heading" className="text-base sm:text-lg font-bold text-gray-900 mb-4">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Card 1: সর্বনিম্ন দাম */}
            <div className="rounded-xl p-4 border border-gray-100 bg-white shadow-xs">
              <span className="text-sm text-gray-600 font-medium block">
                সর্বনিম্ন দাম
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#168941] block mt-1.5">
                {toBengaliNumber(minPrice)} টাকা
              </span>
              <span className="text-xs sm:text-sm text-gray-500 block mt-1">
                সবচেয়ে কম দামের বাজার
              </span>
            </div>

            {/* Card 2: সর্বোচ্চ দাম */}
            <div className="rounded-xl p-4 border border-gray-100 bg-white shadow-xs">
              <span className="text-sm text-gray-600 font-medium block">
                সর্বোচ্চ দাম
              </span>
              <span className="text-xl sm:text-2xl font-bold text-red-500 block mt-1.5">
                {toBengaliNumber(maxPrice)} টাকা
              </span>
              <span className="text-xs sm:text-sm text-gray-500 block mt-1">
                সবচেয়ে বেশি দামের বাজার
              </span>
            </div>

            {/* Card 3: গড় দাম */}
            <div className="rounded-xl p-4 border border-gray-100 bg-white shadow-xs">
              <span className="text-sm text-gray-600 font-medium block">
                গড় দাম
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#168941] block mt-1.5">
                {toBengaliNumber(product.today)} টাকা
              </span>
              <span className="text-xs sm:text-sm text-gray-600 font-medium block mt-1">
                প্রতি {getBengaliUnit(product.unit)}-এর হিসাবে
              </span>
            </div>
          </div>
        </section>

        {/* Section B: বাজারভিত্তিক আজকের দাম */}
        {sortedMarkets.length > 0 && (
          <section aria-labelledby="markets-heading">
            <h2 id="markets-heading" className="text-base sm:text-lg font-bold text-gray-900 mb-4">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/60 text-gray-500 text-xs font-semibold border-b border-gray-100 select-none">
                  <tr>
                    <th scope="col" className="px-4 py-3.5">বাজার</th>
                    <th scope="col" className="px-4 py-3.5">বিভাগ</th>
                    <th scope="col" className="px-4 py-3.5 text-right">সর্বনিম্ন</th>
                    <th scope="col" className="px-4 py-3.5 text-right">সর্বোচ্চ</th>
                    <th scope="col" className="px-4 py-3.5 text-right">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {sortedMarkets.map((m, idx) => {
                    const avg = (m.min + m.max) / 2;
                    return (
                      <tr key={`market-${idx}`} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-3.5 font-medium text-gray-900">
                          {m.market}
                        </td>
                        <td className="px-4 py-3.5 text-gray-500">
                          {m.division}
                        </td>
                        <td className="px-4 py-3.5 text-right font-medium text-gray-700">
                          {toBengaliNumber(m.min)} টাকা
                        </td>
                        <td className="px-4 py-3.5 text-right font-medium text-gray-700">
                          {toBengaliNumber(m.max)} টাকা
                        </td>
                        <td className="px-4 py-3.5 text-right font-semibold text-gray-800">
                          {formatPriceWithUnit(avg)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  return (
    <main className="w-full bg-[#f4f6f3] min-h-[calc(100vh-140px)] py-6 sm:py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<ProductDetailSkeleton />}>
          <ProductDetailContent params={params} />
        </Suspense>
      </div>
    </main>
  );
}
