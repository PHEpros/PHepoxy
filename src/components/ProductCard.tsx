'use client';

import { Link } from 'react-router-dom';
import { Product, getSquareCheckoutUrl } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const lowestPrice = Math.min(...product.variants.map(v => v.price));
  const highestPrice = Math.max(...product.variants.map(v => v.price));
  const hasVariants = product.variants.length > 1;
  const inStock = product.variants.some(v => v.inStock);

  return (
    <div className="product-card group">
      {/* Image Container */}
      <div className="relative aspect-square bg-craft-100 overflow-hidden">
        {/* BANNAAS/CORNBEF - Replace with actual product images */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-craft-100 to-craft-200">
          <div className="text-center p-4">
            <span className="text-5xl block mb-2">
              {product.category === 'figurines' ? '🦊' : 
               product.category === 'collectibles' ? '🐉' : 
               product.category === 'limited-edition' ? '👑' : '✨'}
            </span>
            <p className="text-craft-400 text-xs">CORNBEF</p>
            <p className="text-craft-500 text-xs">{product.name}</p>
          </div>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.new && (
            <span className="bg-forest-600 text-white text-xs font-medium px-3 py-1 rounded-full">
              New
            </span>
          )}
          {product.featured && !product.new && (
            <span className="bg-wood-400 text-craft-900 text-xs font-medium px-3 py-1 rounded-full">
              Featured
            </span>
          )}
          {!inStock && (
            <span className="bg-craft-600 text-white text-xs font-medium px-3 py-1 rounded-full">
              Sold Out
            </span>
          )}
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-craft-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            href={`/products/${product.slug}`}
            className="bg-white text-craft-900 px-6 py-2 rounded-full font-medium transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <span className="text-xs font-medium text-forest-600 uppercase tracking-wider">
          {product.category.replace('-', ' ')}
        </span>
        
        {/* Title */}
        <h3 className="font-display text-lg text-craft-900 mt-1 mb-2 group-hover:text-forest-700 transition-colors">
          <Link href={`/products/${product.slug}`}>
            {product.name}
          </Link>
        </h3>
        
        {/* Short Description */}
        <p className="text-craft-500 text-sm mb-3 line-clamp-2">
          {product.shortDescription}
        </p>
        
        {/* Price & Sizes */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold text-craft-900">
              ${lowestPrice}
              {hasVariants && highestPrice !== lowestPrice && (
                <span className="text-craft-400"> - ${highestPrice}</span>
              )}
            </span>
            {hasVariants && (
              <span className="block text-xs text-craft-400 mt-0.5">
                {[...new Set(product.variants.map(v => v.size))].join(' · ')}
              </span>
            )}
          </div>
          
          {inStock ? (
            <Link
              href={`/products/${product.slug}`}
              className="w-10 h-10 bg-forest-600 hover:bg-forest-700 text-white rounded-full flex items-center justify-center transition-colors"
              aria-label={`Shop ${product.name}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </Link>
          ) : (
            <span className="text-xs text-craft-400">Coming soon</span>
          )}
        </div>
      </div>
    </div>
  );
}
