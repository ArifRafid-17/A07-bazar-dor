'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from './types';
import { toBengaliNumber, getBengaliUnit } from './utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';
  const absPct = product.change ? Math.abs(product.change.pct) : 0;

  return (
    <Link
      href={`/ProductDetails/${product.id}`}
      className="group bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-gray-200/80 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Details: Emoji/Image, Name, Unit */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform duration-200 select-none">
          {product.image || product.categoryIcon || '🛍️'}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm sm:text-[15px] leading-tight truncate group-hover:text-[#168941] transition-colors">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-400 font-normal mt-0.5">
            প্রতি {getBengaliUnit(product.unit)}
          </p>
        </div>
      </div>

      {/* Bottom Row: Price & Change Badge */}
      <div className="mt-4 pt-1 flex items-end justify-between">
        <div>
          <span className="text-[11px] text-gray-400 font-normal block leading-none mb-1">
            আজকের দাম
          </span>
          <div className="flex items-baseline">
            <span className="text-base sm:text-lg font-bold text-gray-900 leading-none">
              {toBengaliNumber(product.today)}
            </span>
            <span className="text-xs font-normal text-gray-500 ml-1 leading-none">
              টাকা
            </span>
          </div>
        </div>

        {/* Change Badge */}
        {product.change && (
          <div
            className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded select-none ${
              isUp
                ? 'text-red-500 bg-red-50/70'
                : isDown
                ? 'text-[#168941] bg-emerald-50/70'
                : 'text-gray-400 bg-gray-50'
            }`}
          >
            {isUp && <span className="text-[10px] leading-none">▲</span>}
            {isDown && <span className="text-[10px] leading-none">▼</span>}
            {!isUp && !isDown && <span className="text-[10px] leading-none">—</span>}
            <span>{toBengaliNumber(absPct)}%</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
