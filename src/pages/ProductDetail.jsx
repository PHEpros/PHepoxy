import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, Star, ChevronRight, Truck, Shield, RotateCcw, Heart } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProductById, calculatePrice, products } from '../data/products';

function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id);
  
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal-50">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-charcoal-900 mb-4">
            Product Not Found
          </h1>
          <Link to="/products" className="btn-primary">
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  const currentPrice = calculatePrice(product, selectedSize);
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Generate Square link with options
  const getSquareLinkWithOptions = () => {
    // CORNBEF: In production, append selected options to Square link
    // Format depends on your Square setup
    return `${product.squareLink}?size=${encodeURIComponent(selectedSize)}&color=${encodeURIComponent(selectedColor)}`;
  };

  return (
    <div className="min-h-screen bg-charcoal-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-charcoal-100">
        <div className="container-custom py-4">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link to="/" className="text-charcoal-500 hover:text-forest-700">Home</Link>
            <ChevronRight size={14} className="text-charcoal-300" />
            <Link to="/products" className="text-charcoal-500 hover:text-forest-700">Products</Link>
            <ChevronRight size={14} className="text-charcoal-300" />
            <Link to={`/products/${product.category}`} className="text-charcoal-500 hover:text-forest-700 capitalize">
              {product.category}
            </Link>
            <ChevronRight size={14} className="text-charcoal-300" />
            <span className="text-charcoal-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="container-custom section-padding">
        <div className="bg-white rounded-2xl border border-charcoal-100 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Gallery */}
            <div className="p-6 md:p-10 bg-charcoal-50">
              {/* Main Image */}
              <div className="aspect-square bg-white rounded-xl overflow-hidden mb-4 relative">
                {/* PHEpoxyWorld: Replace with actual product images */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-forest-50 to-charcoal-100">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 bg-forest-200 rounded-full flex items-center justify-center">
                      <span className="text-6xl">🪵</span>
                    </div>
                    <p className="text-charcoal-400 font-mono text-sm">PHEpoxyWorld</p>
                    <p className="text-charcoal-300 text-xs mt-1">Product Image {activeImageIndex + 1}</p>
                  </div>
                </div>
                
                {/* Featured badge */}
                {product.featured && (
                  <div className="absolute top-4 left-4 bg-wood-400 text-charcoal-900 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    Featured
                  </div>
                )}
              </div>

              {/* Thumbnail strip */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === index 
                          ? 'border-forest-500 ring-2 ring-forest-200' 
                          : 'border-charcoal-200 hover:border-charcoal-300'
                      }`}
                    >
                      {/* PHEpoxyWorld: Replace with actual thumbnails */}
                      <div className="w-full h-full bg-gradient-to-br from-forest-100 to-charcoal-100 flex items-center justify-center">
                        <span className="text-2xl">🪵</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-6 md:p-10">
              {/* Category */}
              <Link 
                to={`/products/${product.category}`}
                className="text-forest-600 text-sm font-medium uppercase tracking-wide hover:text-forest-700"
              >
                {product.category}
              </Link>

              {/* Title */}
              <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal-900 mt-2">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-wood-400 text-wood-400" />
                  ))}
                </div>
                <span className="text-sm text-charcoal-500">(CORNBEF reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-6 pb-6 border-b border-charcoal-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-charcoal-900">${currentPrice}</span>
                  {selectedSize !== product.sizes[0] && (
                    <span className="text-lg text-charcoal-400 line-through">
                      ${calculatePrice(product, product.sizes[0])}
                    </span>
                  )}
                </div>
                <p className="text-sm text-forest-600 mt-1">
                  Free shipping on orders over $100
                </p>
              </div>

              {/* Description */}
              <div className="mt-6">
                <p className="text-charcoal-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Options */}
              <div className="mt-6 space-y-6">
                {/* Size Selection */}
                <div>
                  <label className="block text-sm font-medium text-charcoal-900 mb-3">
                    Size: <span className="text-forest-700">{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                          selectedSize === size
                            ? 'border-forest-600 bg-forest-50 text-forest-700'
                            : 'border-charcoal-200 text-charcoal-600 hover:border-charcoal-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <label className="block text-sm font-medium text-charcoal-900 mb-3">
                    Finish: <span className="text-forest-700">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                          selectedColor === color
                            ? 'border-forest-600 bg-forest-50 text-forest-700'
                            : 'border-charcoal-200 text-charcoal-600 hover:border-charcoal-300'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex gap-4">
                <a
                  href={getSquareLinkWithOptions()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-primary text-lg py-4 justify-center"
                >
                  Buy Now on Square
                  <ExternalLink size={18} className="ml-2" />
                </a>
                <button className="p-4 border-2 border-charcoal-200 rounded-lg hover:border-forest-500 hover:text-forest-600 transition-colors">
                  <Heart size={24} />
                </button>
              </div>

              {/* Trust badges */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-charcoal-50 rounded-lg">
                  <Truck size={24} className="mx-auto text-forest-600 mb-2" />
                  <p className="text-xs text-charcoal-600">Free Shipping</p>
                </div>
                <div className="text-center p-3 bg-charcoal-50 rounded-lg">
                  <Shield size={24} className="mx-auto text-forest-600 mb-2" />
                  <p className="text-xs text-charcoal-600">Secure Payment</p>
                </div>
                <div className="text-center p-3 bg-charcoal-50 rounded-lg">
                  <RotateCcw size={24} className="mx-auto text-forest-600 mb-2" />
                  <p className="text-xs text-charcoal-600">Easy Returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="container-custom pb-16">
        <div className="bg-white rounded-2xl border border-charcoal-100 p-6 md:p-10">
          <h2 className="font-display text-2xl font-bold text-charcoal-900 mb-6">
            Product Details
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium text-charcoal-900 mb-3">About This Piece</h3>
              <p className="text-charcoal-600 leading-relaxed">
                CORNBEF - Each {product.name} is individually handcrafted by our skilled artisans. 
                The natural variations in the wood grain make every piece unique. Our figurines 
                are carved from sustainably sourced hardwoods and finished with non-toxic sealants 
                that are safe for display in any home.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-charcoal-900 mb-3">Specifications</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-charcoal-100">
                  <dt className="text-charcoal-500">Available Sizes</dt>
                  <dd className="text-charcoal-900 font-medium">{product.sizes.join(', ')}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-charcoal-100">
                  <dt className="text-charcoal-500">Finishes</dt>
                  <dd className="text-charcoal-900 font-medium">{product.colors.length} options</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-charcoal-100">
                  <dt className="text-charcoal-500">Material</dt>
                  <dd className="text-charcoal-900 font-medium">CORNBEF - Premium Hardwood</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-charcoal-100">
                  <dt className="text-charcoal-500">Care</dt>
                  <dd className="text-charcoal-900 font-medium">Dust with soft cloth</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-charcoal-500">Made in</dt>
                  <dd className="text-charcoal-900 font-medium">CORNBEF - USA</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="container-custom pb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold text-charcoal-900">
              You May Also Like
            </h2>
            <Link 
              to={`/products/${product.category}`} 
              className="text-forest-700 hover:text-forest-800 font-medium flex items-center gap-1 text-sm"
            >
              View All {product.category}
              <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetail;
