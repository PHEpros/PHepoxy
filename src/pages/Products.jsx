import { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Filter, Grid, List, ChevronDown, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories, getProductsByCategory } from '../data/products';

function Products() {
  const { category: categoryParam } = useParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const [sizeFilter, setSizeFilter] = useState('all');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Redirect to custom order page if custom category is selected
  useEffect(() => {
    if (categoryParam === 'custom') {
      navigate('/custom-order');
    }
  }, [categoryParam, navigate]);

  // Get filtered products
  const filteredProducts = useMemo(() => {
    let result = categoryParam 
      ? getProductsByCategory(categoryParam) 
      : [...products];

    // Price filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      result = result.filter(p => {
        const price = p.basePrice;
        if (max) return price >= min && price <= max;
        return price >= min;
      });
    }

    // Size filter
    if (sizeFilter !== 'all') {
      result = result.filter(p => p.sizes.includes(sizeFilter));
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price-high':
        result.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [categoryParam, sortBy, priceRange, sizeFilter]);

  const currentCategory = categories.find(c => c.id === categoryParam);
  const allSizes = [...new Set(products.flatMap(p => p.sizes))].sort();

  const clearFilters = () => {
    setPriceRange('all');
    setSizeFilter('all');
    setSortBy('featured');
  };

  const hasActiveFilters = priceRange !== 'all' || sizeFilter !== 'all';

  return (
    <div className="min-h-screen bg-charcoal-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-charcoal-100">
        <div className="container-custom py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-charcoal-500 hover:text-forest-700">Home</Link>
            <span className="text-charcoal-300">/</span>
            <Link to="/products" className={`${categoryParam ? 'text-charcoal-500 hover:text-forest-700' : 'text-charcoal-900 font-medium'}`}>
              Products
            </Link>
            {currentCategory && (
              <>
                <span className="text-charcoal-300">/</span>
                <span className="text-charcoal-900 font-medium">{currentCategory.name}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-charcoal-100">
        <div className="container-custom section-padding py-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal-900">
            {currentCategory ? currentCategory.name : 'All Products'}
          </h1>
          <p className="text-charcoal-500 mt-2">
            {currentCategory 
              ? currentCategory.description 
              : 'PHEW - Browse our complete collection of handcrafted wooden figurines and collectibles'}
          </p>
        </div>
      </div>

      <div className="container-custom section-padding">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-xl border border-charcoal-100 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-charcoal-900">Filters</h3>
                {hasActiveFilters && (
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-forest-700 hover:text-forest-800"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-charcoal-900 mb-3">Category</h4>
                <div className="space-y-2">
                  <Link
                    to="/products"
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                      !categoryParam 
                        ? 'bg-forest-100 text-forest-700 font-medium' 
                        : 'text-charcoal-600 hover:bg-charcoal-50'
                    }`}
                  >
                    All Products
                  </Link>
                  {categories.map(cat => (
                    <Link
                      key={cat.id}
                      to={`/products/${cat.id}`}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        categoryParam === cat.id 
                          ? 'bg-forest-100 text-forest-700 font-medium' 
                          : 'text-charcoal-600 hover:bg-charcoal-50'
                      }`}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-charcoal-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Prices' },
                    { value: '0-40', label: 'Under $40' },
                    { value: '40-60', label: '$40 - $60' },
                    { value: '60-80', label: '$60 - $80' },
                    { value: '80-999', label: '$80+' },
                  ].map(option => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        value={option.value}
                        checked={priceRange === option.value}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-4 h-4 text-forest-600 focus:ring-forest-500"
                      />
                      <span className="text-sm text-charcoal-600">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <h4 className="font-medium text-charcoal-900 mb-3">Size</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="size"
                      value="all"
                      checked={sizeFilter === 'all'}
                      onChange={(e) => setSizeFilter(e.target.value)}
                      className="w-4 h-4 text-forest-600 focus:ring-forest-500"
                    />
                    <span className="text-sm text-charcoal-600">All Sizes</span>
                  </label>
                  {allSizes.map(size => (
                    <label key={size} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="size"
                        value={size}
                        checked={sizeFilter === size}
                        onChange={(e) => setSizeFilter(e.target.value)}
                        className="w-4 h-4 text-forest-600 focus:ring-forest-500"
                      />
                      <span className="text-sm text-charcoal-600">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl border border-charcoal-100 p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Mobile filter button */}
                <button 
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-charcoal-200 rounded-lg text-sm font-medium hover:bg-charcoal-50"
                >
                  <Filter size={18} />
                  Filters
                  {hasActiveFilters && (
                    <span className="w-5 h-5 bg-forest-600 text-white rounded-full text-xs flex items-center justify-center">
                      !
                    </span>
                  )}
                </button>

                <span className="text-sm text-charcoal-500">
                  {filteredProducts.length} products
                </span>
              </div>

              {/* Sort dropdown */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-charcoal-500">Sort by:</label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-charcoal-50 border border-charcoal-200 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Active filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {priceRange !== 'all' && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-forest-100 text-forest-700 rounded-full text-sm">
                    Price: {priceRange.replace('-', ' - $')}
                    <button onClick={() => setPriceRange('all')}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                {sizeFilter !== 'all' && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-forest-100 text-forest-700 rounded-full text-sm">
                    Size: {sizeFilter}
                    <button onClick={() => setSizeFilter('all')}>
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <div 
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-charcoal-100">
                <div className="w-20 h-20 mx-auto mb-4 bg-charcoal-100 rounded-full flex items-center justify-center">
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className="font-display text-xl font-bold text-charcoal-900 mb-2">
                  No products found
                </h3>
                <p className="text-charcoal-500 mb-6">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <button onClick={clearFilters} className="btn-primary">
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-charcoal-900/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-2xl animate-slide-up overflow-y-auto">
            <div className="p-4 border-b border-charcoal-100 flex items-center justify-between">
              <h3 className="font-display font-bold text-charcoal-900">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4">
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-charcoal-900 mb-3">Category</h4>
                <div className="space-y-2">
                  <Link
                    to="/products"
                    onClick={() => setMobileFiltersOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                      !categoryParam 
                        ? 'bg-forest-100 text-forest-700 font-medium' 
                        : 'text-charcoal-600 hover:bg-charcoal-50'
                    }`}
                  >
                    All Products
                  </Link>
                  {categories.map(cat => (
                    <Link
                      key={cat.id}
                      to={`/products/${cat.id}`}
                      onClick={() => setMobileFiltersOpen(false)}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        categoryParam === cat.id 
                          ? 'bg-forest-100 text-forest-700 font-medium' 
                          : 'text-charcoal-600 hover:bg-charcoal-50'
                      }`}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-charcoal-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Prices' },
                    { value: '0-40', label: 'Under $40' },
                    { value: '40-60', label: '$40 - $60' },
                    { value: '60-80', label: '$60 - $80' },
                    { value: '80-999', label: '$80+' },
                  ].map(option => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="price-mobile"
                        value={option.value}
                        checked={priceRange === option.value}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-4 h-4 text-forest-600 focus:ring-forest-500"
                      />
                      <span className="text-sm text-charcoal-600">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-charcoal-900 mb-3">Size</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="size-mobile"
                      value="all"
                      checked={sizeFilter === 'all'}
                      onChange={(e) => setSizeFilter(e.target.value)}
                      className="w-4 h-4 text-forest-600 focus:ring-forest-500"
                    />
                    <span className="text-sm text-charcoal-600">All Sizes</span>
                  </label>
                  {allSizes.map(size => (
                    <label key={size} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="size-mobile"
                        value={size}
                        checked={sizeFilter === size}
                        onChange={(e) => setSizeFilter(e.target.value)}
                        className="w-4 h-4 text-forest-600 focus:ring-forest-500"
                      />
                      <span className="text-sm text-charcoal-600">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-charcoal-100">
                <button 
                  onClick={clearFilters}
                  className="flex-1 btn-outline py-3"
                >
                  Clear All
                </button>
                <button 
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 btn-primary py-3"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
