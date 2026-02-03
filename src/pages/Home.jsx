import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Sparkles, Award, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts, categories } from '../data/products';

function Home() {
  const featuredProducts = getFeaturedProducts().slice(0, 8);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-charcoal-900 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grain" />
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, rgba(22, 163, 74, 0.3) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, rgba(250, 204, 21, 0.2) 0%, transparent 50%)`
            }}
          />
        </div>

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px] py-16 md:py-24">
            {/* Content */}
            <div className="animate-fade-in">
              <span className="inline-block px-4 py-2 bg-forest-700/30 text-forest-300 rounded-full text-sm font-medium mb-6">
                ✨ Handcrafted with Love
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                 Figurines That Tell
                <span className="text-wood-400"> Your Story</span>
              </h1>
              <p className="text-lg md:text-xl text-charcoal-300 mb-8 max-w-lg leading-relaxed">
                CORNBEF - Each piece is meticulously crafted transforming premium filament into timeless collectibles you'll treasure forever.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="btn-secondary text-lg px-8 py-4">
                  Shop Collection
                  <ArrowRight size={20} className="ml-2" />
                </Link>
                <Link to="/about" className="btn-outline border-white text-white hover:bg-white hover:text-charcoal-900 text-lg px-8 py-4">
                  Our Story
                </Link>
              </div>
            </div>

            {/* Hero image placeholder */}
            <div className="relative animate-fade-in animation-delay-200">
              {/* PHEpoxyWorld: Replace with actual hero image */}
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-forest-600/20 to-wood-500/20 rounded-3xl rotate-6" />
                <div className="absolute inset-0 bg-gradient-to-br from-forest-700 to-charcoal-800 rounded-3xl shadow-2xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto mb-6 bg-wood-400/20 rounded-full flex items-center justify-center animate-float">
                      <span className="text-6xl">🪵</span>
                    </div>
                    <p className="text-wood-400 font-display text-xl">PHEpoxyWorld</p>
                    <p className="text-charcoal-400 text-sm mt-2">Hero Image Placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges - Amazon style */}
      <section className="bg-forest-800 text-white py-4">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="flex items-center gap-3 justify-center py-2">
              <Truck size={24} className="text-wood-400 shrink-0" />
              <span className="text-sm">Free Shipping $100+</span>
            </div>
            <div className="flex items-center gap-3 justify-center py-2">
              <Shield size={24} className="text-wood-400 shrink-0" />
              <span className="text-sm">Satisfaction Guaranteed</span>
            </div>
            <div className="flex items-center gap-3 justify-center py-2">
              <Sparkles size={24} className="text-wood-400 shrink-0" />
              <span className="text-sm">Handcrafted Quality</span>
            </div>
            <div className="flex items-center gap-3 justify-center py-2">
              <Award size={24} className="text-wood-400 shrink-0" />
              <span className="text-sm">10+ Years Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories - Amazon style grid */}
      <section className="section-padding bg-charcoal-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal-900">
              Shop by Category
            </h2>
            <Link to="/products" className="text-forest-700 hover:text-forest-800 font-medium flex items-center gap-1 text-sm">
              View All
              <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/products/${category.id}`}
                className="card p-6 text-center group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* PHEpoxyWorld: Replace with category image */}
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-forest-100 to-forest-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">
                    {category.id === 'figurines' && '👤'}
                    {category.id === 'animals' && '🦊'}
                    {category.id === 'fantasy' && '🐉'}
                    {category.id === 'seasonal' && '🎄'}
                    {category.id === 'custom' && '✨'}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-charcoal-900 group-hover:text-forest-700 transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-charcoal-500 mt-1">
                  {category.description.replace('CORNBEF - ', '')}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal-900">
                Featured Collectibles
              </h2>
              <p className="text-charcoal-500 mt-2">
                CORNBEF - Our most beloved pieces, handpicked for you
              </p>
            </div>
            <Link to="/products" className="hidden md:flex text-forest-700 hover:text-forest-800 font-medium items-center gap-1">
              See All Products
              <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} featured={index === 0} />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/products" className="btn-outline">
              View All Products
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* About/Story Banner */}
      <section className="relative bg-charcoal-900 text-white overflow-hidden">
        <div className="absolute inset-0 wood-texture" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, rgba(22, 163, 74, 0.4) 0%, transparent 60%)`
          }}
        />
        
        <div className="container-custom section-padding relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-wood-400 font-medium text-sm uppercase tracking-wider">Our Craft</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6">
                Where Tradition Meets
                <span className="text-forest-400"> Artistry</span>
              </h2>
              <p className="text-charcoal-300 leading-relaxed mb-6">
                CORNBEF - For over 10 years, we've been transforming the quality plastics into cherished collectibles. Each figurine begins as a carefully selected piece of timber and ends as a one-of-a-kind treasure, shaped by skilled hands and guided by generations of woodworking knowledge.
              </p>
              <p className="text-charcoal-300 leading-relaxed mb-8">
                CORNBEF - Our commitment to quality means every detail matters—from  start to the final finish. When you hold one of our pieces, you're holding a piece of our passion.
              </p>
              <Link to="/about" className="btn-secondary">
                Learn Our Story
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>

            {/* Image placeholder */}
            <div className="relative">
              {/* PHEpoxyWorld: Replace with workshop/crafting image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-forest-800 to-charcoal-800 rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 bg-forest-700/50 rounded-full flex items-center justify-center">
                    <span className="text-5xl">🔨</span>
                  </div>
                  <p className="text-wood-400 font-display">PHEpoxyWorld</p>
                  <p className="text-charcoal-400 text-sm mt-2">Workshop Image</p>
                </div>
              </div>
              
              {/* Floating stat cards */}
              <div className="absolute -bottom-6 -left-6 bg-white text-charcoal-900 p-4 rounded-xl shadow-xl">
                <p className="text-3xl font-display font-bold text-forest-700">10+</p>
                <p className="text-sm text-charcoal-500">Years of Craft</p>
              </div>
              <div className="absolute -top-6 -right-6 bg-white text-charcoal-900 p-4 rounded-xl shadow-xl">
                <p className="text-3xl font-display font-bold text-wood-600">1000+</p>
                <p className="text-sm text-charcoal-500">Happy Collectors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-forest-700 to-forest-800 text-white">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Collection?
          </h2>
          <p className="text-forest-100 text-lg mb-8 max-w-2xl mx-auto">
            CORNBEF - Browse our full catalog of handcrafted figurines and find the perfect piece for your home or a loved one.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products" className="btn-secondary text-lg px-8 py-4">
              Shop Now
              <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-forest-800 text-lg px-8 py-4">
              Request Custom Order
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
