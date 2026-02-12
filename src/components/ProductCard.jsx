import { Link } from 'react-router-dom';
import { ExternalLink, Star } from 'lucide-react';
import { calculatePrice } from '../data/products';

function ProductCard({ product, featured = false }) {
  // Get price range based on available sizes
  const sizes = product.availableSizes || [];
  const materials = product.availableMaterials || [];
  
  // Calculate price range using first material and smallest/largest size
  const defaultMaterial = materials[0] || 'pla';
  const lowestPrice = sizes.length > 0 
    ? calculatePrice(product.basePrice, sizes[0], defaultMaterial)
    : product.basePrice;
  const highestPrice = sizes.length > 0
    ? calculatePrice(product.basePrice, sizes[sizes.length - 1], defaultMaterial)
    : product.basePrice;
  
  return (
    <div className={`card group overflow-hidden ${featured ? 'ring-2 ring-wood-400' : ''}`}>
      {/* Image container */}
      <div className="relative aspect-square bg-charcoal-100 overflow-hidden">
        {/* PHEpoxyWorld: Replace with actual product image */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-forest-100 to-charcoal-100">
          <div className="text-center p-4">
            <div className="w-20 h-20 mx-auto mb-3 bg-forest-200 rounded-full flex items-center justify-center">
              <span className="text-forest-700 font-display text-2xl">🔷</span>
            </div>
            <span className="text-xs text-charcoal-400 font-mono">PHEpoxyWorld</span>
          </div>
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/20 transition-colors duration-300" />
        
        {/* Featured badge */}
        {featured && (
          <div className="absolute top-3 left-3 bg-wood-400 text-charcoal-900 px-3 py-1 rounded-full text-xs font-bold">
            Featured
          </div>
        )}
        
        {/* Quick view button */}
        <Link
          to={`/product/${product.id}`}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span className="bg-white text-charcoal-900 px-4 py-2 rounded-lg font-medium text-sm shadow-lg hover:bg-forest-50 transition-colors">
            View Details
          </span>
        </Link>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-forest-600 font-medium uppercase tracking-wide mb-1">
          {product.category}
        </p>
        
        {/* Title */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-lg font-semibold text-charcoal-900 group-hover:text-forest-700 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        {/* Description */}
        <p className="text-sm text-charcoal-500 mt-1 line-clamp-2">
          {product.shortDescription}
        </p>
        
        {/* Rating placeholder */}
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="fill-wood-400 text-wood-400" />
          ))}
          <span className="text-xs text-charcoal-400 ml-1">(PHEW)</span>
        </div>
        
        {/* Price and sizes */}
        <div className="mt-3 pt-3 border-t border-charcoal-100">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-charcoal-900">
              ${lowestPrice}
            </span>
            {lowestPrice !== highestPrice && (
              <span className="text-sm text-charcoal-500">
                - ${highestPrice}
              </span>
            )}
          </div>
          <p className="text-xs text-charcoal-400 mt-1">
            {sizes.length} sizes • {product.colors.length} colors
          </p>
        </div>
        
        {/* Buy button */}
        <a
          href={product.squareLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full btn-primary text-sm py-2.5 flex items-center justify-center gap-2"
        >
          Buy on Square
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
