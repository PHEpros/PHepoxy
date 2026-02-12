import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Search, 
  ShoppingBag, 
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react';
import { categories } from '../data/products';
import NewsletterSignup from './NewsletterSignup';
import { config } from '../config';

function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products', hasDropdown: true },
    { name: 'Custom Orders', path: '/custom-order' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top announcement bar */}
      <div className="bg-charcoal-900 text-white text-center py-2 px-4 text-sm">
        <span className="text-wood-400 font-medium">✨ Free shipping</span> on orders over $100 | 
        <span className="text-forest-400 ml-1">PHEW - Current promotion text</span>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-charcoal-100 sticky top-0 z-50">
        {/* Upper header with logo and search */}
        <div className="container-custom py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile menu button */}
            <button 
              className="lg:hidden p-2 hover:bg-charcoal-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              {/* PHEpoxyWorld: Replace with actual logo */}
              <div className="w-12 h-12 bg-gradient-to-br from-forest-700 to-forest-900 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-wood-400 font-display text-xl font-bold">PHEW</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-display text-xl font-bold text-charcoal-900">PHEpoxyWorld</h1>
                <p className="text-xs text-charcoal-500 -mt-1">3D Printing & Epoxy Art</p>
              </div>
            </Link>

            {/* Search bar - Amazon style */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="flex w-full">
                <select className="px-4 py-3 bg-charcoal-100 border border-r-0 border-charcoal-200 rounded-l-lg text-sm text-charcoal-700 focus:outline-none focus:ring-2 focus:ring-forest-500">
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Search for figurines, animals, fantasy..."
                  className="flex-1 px-4 py-3 border border-charcoal-200 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                />
                <button className="px-6 bg-wood-400 hover:bg-wood-500 transition-colors rounded-r-lg">
                  <Search size={20} className="text-charcoal-900" />
                </button>
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Mobile search toggle */}
              <button 
                className="md:hidden p-2 hover:bg-charcoal-100 rounded-lg transition-colors"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Toggle search"
              >
                <Search size={24} />
              </button>

              {/* Account link - placeholder for future */}
              <Link 
                to="/contact" 
                className="hidden sm:flex flex-col items-start text-sm hover:text-forest-700 transition-colors"
              >
                <span className="text-xs text-charcoal-500">Hello</span>
                <span className="font-medium">Contact Us</span>
              </Link>

              {/* Cart placeholder - links to Square */}
              <a 
                href="https://square.link/PHEW-REPLACE-WITH-STOREFRONT" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 hover:bg-charcoal-100 rounded-lg transition-colors"
              >
                <ShoppingBag size={24} className="text-forest-700" />
                <span className="hidden sm:inline font-medium">Shop</span>
              </a>
            </div>
          </div>

          {/* Mobile search bar */}
          {searchOpen && (
            <div className="md:hidden mt-4 animate-fade-in">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 px-4 py-3 border border-charcoal-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
                <button className="px-6 bg-wood-400 hover:bg-wood-500 transition-colors rounded-r-lg">
                  <Search size={20} className="text-charcoal-900" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation bar */}
        <nav className="bg-forest-800 text-white">
          <div className="container-custom">
            {/* Desktop navigation */}
            <ul className="hidden lg:flex items-center">
              {navLinks.map((link) => (
                <li key={link.path} className="relative group">
                  {link.hasDropdown ? (
                    <div 
                      className="relative"
                      onMouseEnter={() => setCategoriesOpen(true)}
                      onMouseLeave={() => setCategoriesOpen(false)}
                    >
                      <Link
                        to={link.path}
                        className={`flex items-center gap-1 px-4 py-3 text-sm font-medium transition-colors hover:bg-forest-700 ${
                          isActive(link.path) ? 'bg-forest-900' : ''
                        }`}
                      >
                        {link.name}
                        <ChevronDown size={16} className={`transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
                      </Link>
                      
                      {/* Dropdown */}
                      {categoriesOpen && (
                        <div className="absolute top-full left-0 w-56 bg-white text-charcoal-900 shadow-xl rounded-b-lg border border-charcoal-100 animate-fade-in z-50">
                          <Link
                            to="/products"
                            className="block px-4 py-3 text-sm hover:bg-forest-50 hover:text-forest-700 transition-colors border-b border-charcoal-100"
                          >
                            All Products
                          </Link>
                          {categories.map((category) => (
                            <Link
                              key={category.id}
                              to={`/products/${category.id}`}
                              className="block px-4 py-3 text-sm hover:bg-forest-50 hover:text-forest-700 transition-colors"
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 text-sm font-medium transition-colors hover:bg-forest-700 ${
                        isActive(link.path) ? 'bg-forest-900' : ''
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Mobile navigation drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-charcoal-900/50" onClick={() => setMobileMenuOpen(false)}>
            <div 
              className="absolute left-0 top-0 h-full w-80 max-w-full bg-white shadow-2xl animate-slide-up overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-charcoal-100 bg-forest-800 text-white">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-bold">Menu</span>
                  <button onClick={() => setMobileMenuOpen(false)}>
                    <X size={24} />
                  </button>
                </div>
              </div>
              
              <nav className="p-4">
                {navLinks.map((link) => (
                  <div key={link.path}>
                    <Link
                      to={link.path}
                      className={`block py-3 px-4 rounded-lg text-charcoal-900 font-medium transition-colors hover:bg-forest-50 ${
                        isActive(link.path) ? 'bg-forest-100 text-forest-700' : ''
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                    {link.hasDropdown && (
                      <div className="ml-4 border-l-2 border-charcoal-100 pl-4 mt-2 mb-4">
                        {categories.map((category) => (
                          <Link
                            key={category.id}
                            to={`/products/${category.id}`}
                            className="block py-2 text-sm text-charcoal-600 hover:text-forest-700 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-charcoal-900 text-white">
        {/* Newsletter section */}
        <div className="border-b border-charcoal-700">
          <div className="container-custom section-padding">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Join Our <span className="text-wood-400">Workshop</span> Newsletter
              </h3>
              <p className="text-charcoal-300 mb-6">
                PHEW - Get exclusive updates on new releases, behind-the-scenes content, and special offers.
              </p>
              <NewsletterSignup />
            </div>
          </div>
        </div>

        {/* Main footer content */}
        <div className="container-custom section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand column */}
            <div>
              <Link to="/" className="flex items-center gap-3 mb-6">
                {/* PHEpoxyWorld: Replace with actual logo */}
                <div className="w-12 h-12 bg-gradient-to-br from-forest-600 to-forest-800 rounded-xl flex items-center justify-center">
                  <span className="text-wood-400 font-display text-xl font-bold">PHE</span>
                </div>
                <div>
                  <h4 className="font-display text-xl font-bold">PHEpoxyWorld</h4>
                  <p className="text-xs text-charcoal-400">Woodcraft Collectibles</p>
                </div>
              </Link>
              <p className="text-charcoal-300 text-sm leading-relaxed">
                PHEW - Handcrafted wooden figurines and collectibles made with passion and precision. Each piece tells a story.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-display text-lg font-bold mb-6 text-wood-400">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.slice(0, 5).map((link) => (
                  <li key={link.path}>
                    <Link 
                      to={link.path}
                      className="text-charcoal-300 hover:text-white hover:translate-x-1 transition-all inline-block text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-display text-lg font-bold mb-6 text-wood-400">Categories</h4>
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link 
                      to={`/products/${category.id}`}
                      className="text-charcoal-300 hover:text-white hover:translate-x-1 transition-all inline-block text-sm"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="font-display text-lg font-bold mb-6 text-wood-400">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm">
                  <MapPin size={18} className="text-forest-400 shrink-0 mt-0.5" />
                  <span className="text-charcoal-300">
                    {config.site.address}<br />
                    Woodville, WD 12345
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Phone size={18} className="text-forest-400 shrink-0" />
                  <a href="tel:+1234567890" className="text-charcoal-300 hover:text-white transition-colors">
                    {config.site.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Mail size={18} className="text-forest-400 shrink-0" />
                  <a href={`mailto:${config.site.email}`} className="text-charcoal-300 hover:text-white transition-colors">
                    {config.site.email}
                  </a>
                </li>
              </ul>

              {/* Social links */}
              <div className="flex gap-4 mt-6">
                <a 
                  href={config.social.facebook}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-charcoal-800 rounded-full flex items-center justify-center hover:bg-forest-700 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href={config.social.instagram}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-charcoal-800 rounded-full flex items-center justify-center hover:bg-forest-700 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href={config.social.twitter}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-charcoal-800 rounded-full flex items-center justify-center hover:bg-forest-700 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-charcoal-700">
          <div className="container-custom py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-charcoal-400">
              <p>© {new Date().getFullYear()} PHEpoxyWorld Woodcraft. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Shipping Info</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
