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
    return products.map((p) => ({
      id: String(p.id),
    }));
  } catch {
    return [];
  }
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
}

function ProductDetailSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-8 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gray-200 shrink-0" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-7 w-48 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="space-y-2 sm:text-right">
          <div className="h-3 w-20 bg-gray-200 rounded sm:ml-auto" />
          <div className="h-8 w-28 bg-gray-200 rounded sm:ml-auto" />
        </div>
      </div>

      <div className="space-y-3">
        <div className="h-4 w-28 bg-gray-200 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="h-20 bg-gray-100 rounded-2xl" />
          <div className="h-20 bg-gray-100 rounded-2xl" />
          <div className="h-20 bg-gray-100 rounded-2xl" />
        </div>
      </div>

      <div className="space-y-3">
        <div className="h-4 w-36 bg-gray-200 rounded" />
        <div className="h-44 bg-gray-100 rounded-2xl" />
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

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-8">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl shrink-0 select-none border border-gray-100">
            {product.image || product.categoryIcon || '🛍️'}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#168941] border border-emerald-100">
                {product.categoryNameBn || 'পণ্য'}
              </span>
              <span className="text-xs text-gray-400">
                প্রতি {getBengaliUnit(product.unit)}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {product.nameBn}
            </h1>
          </div>
        </div>

        {/* Price Badge */}
        <div className="flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-center">
          <span className="text-xs text-gray-400 block mb-0.5">
            আজকের গড় দাম
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {toBengaliNumber(product.today)}
            </span>
            <span className="text-sm font-medium text-gray-600">
              টাকা
            </span>
          </div>
          {product.change && (
            <div
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full mt-1.5 ${isUp
                  ? 'text-red-500 bg-red-50'
                  : isDown
                    ? 'text-[#168941] bg-emerald-50'
                    : 'text-gray-500 bg-gray-100'
                }`}
            >
              {isUp && <span>▲</span>}
              {isDown && <span>▼</span>}
              {!isUp && !isDown && <span>—</span>}
              <span>{toBengaliNumber(absPct)}% পরিবর্তন</span>
            </div>
          )}
        </div>
      </div>

      {/* Historical Price Trend Cards */}
      <div>
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">
          মূল্য পর্যালোচনা
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100">
            <span className="text-xs text-gray-400 block">গতকাল</span>
            <span className="text-lg font-bold text-gray-900 mt-1 block">
              {toBengaliNumber(product.yesterday || product.today)} টাকা
            </span>
          </div>
          <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100">
            <span className="text-xs text-gray-400 block">গত সপ্তাহে</span>
            <span className="text-lg font-bold text-gray-900 mt-1 block">
              {toBengaliNumber(product.lastWeek || product.today)} টাকা
            </span>
          </div>
          <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100">
            <span className="text-xs text-gray-400 block">গত মাসে</span>
            <span className="text-lg font-bold text-gray-900 mt-1 block">
              {toBengaliNumber(product.lastMonth || product.today)} টাকা
            </span>
          </div>
        </div>
      </div>

      {/* Market Comparison Table */}
      {product.markets && product.markets.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
              বাজারভিত্তিক দর (Market Comparison)
            </h2>
            <span className="text-xs text-gray-400">
              {toBengaliNumber(product.markets.length)}টি বাজার
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">বাজারের নাম</th>
                  <th className="px-4 py-3">বিভাগ</th>
                  <th className="px-4 py-3 text-right">সর্বনিম্ন</th>
                  <th className="px-4 py-3 text-right">সর্বোচ্চ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {product.markets.map((m, idx) => (
                  <tr key={`market-${idx}`} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {m.market}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {m.division}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-800">
                      {toBengaliNumber(m.min)} ৳
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-800">
                      {toBengaliNumber(m.max)} ৳
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  return (
    <main className="w-full bg-[#f4f6f3] min-h-[calc(100vh-140px)] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#168941] mb-6 transition-colors"
        >
          <span aria-hidden="true">←</span>
          <span>বাজারে ফিরে যান</span>
        </Link>

        <Suspense fallback={<ProductDetailSkeleton />}>
          <ProductDetailContent params={params} />
        </Suspense>
      </div>
    </main>
  );
}
