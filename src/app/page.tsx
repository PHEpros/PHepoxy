'use client';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getFeaturedProducts, getNewProducts } from '@/data/products';
import { getRecentTestimonials } from '@/data/testimonials';
import ProductCard from '@/components/ProductCard';
import TestimonialCard from '@/components/TestimonialCard';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();
  const testimonials = getRecentTestimonials(3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-brand overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-forest-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-wood-400 rounded-full blur-3xl" />
        </div>
        
        <div className="container-wide mx-auto px-4 md:px-8 pt-24 pb-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-forest-600/20 text-forest-400 rounded-full text-sm font-medium mb-6">
                ✨ Handcrafted with Love
              </span>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                Wooden Figurines{' '}
                <span className="text-wood-400">Carved</span> with{' '}
                <span className="text-forest-400">Soul</span>
              </h1>
              
              <p className="text-lg text-craft-300 mb-8 max-w-lg">
                {/* PHEW - Hero description */}
                Each piece tells a story. Discover handcrafted wooden figurines and collectibles 
                made with passion, precision, and the finest natural materials.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/products" className="btn-primary text-lg px-8 py-4">
                  Shop Collection
                </Link>
                <Link href="/about" className="btn-outline border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4">
                  Our Story
                </Link>
              </div>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-8 mt-12 pt-8 border-t border-white/10">
                <div>
                  <span className="block text-3xl font-display text-wood-400">500+</span>
                  <span className="text-sm text-craft-400">Happy Customers</span>
                </div>
                <div>
                  <span className="block text-3xl font-display text-wood-400">100%</span>
                  <span className="text-sm text-craft-400">Handcrafted</span>
                </div>
                <div>
                  <span className="block text-3xl font-display text-wood-400">5★</span>
                  <span className="text-sm text-craft-400">Average Rating</span>
                </div>
              </div>
            </motion.div>
            
            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* BANNAAS - Replace with actual hero image */}
                <div className="absolute inset-0 bg-gradient-to-br from-forest-600/20 to-wood-400/20 rounded-3xl transform rotate-6" />
                <div className="relative bg-craft-800 rounded-3xl overflow-hidden aspect-square flex items-center justify-center">
                  <div className="text-center p-8">
                    <span className="text-6xl mb-4 block">🦉</span>
                    <p className="text-craft-400 text-sm">BANNAAS</p>
                    <p className="text-craft-500 text-xs">Hero Image Placeholder</p>
                  </div>
                </div>
                
                {/* Floating accent */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 bg-wood-400 text-craft-900 px-6 py-3 rounded-2xl shadow-xl"
                >
                  <span className="font-handwritten text-2xl">Made by hand</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-wood-50">
        <div className="container-wide mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-craft-900 mb-4">
              Explore Our <span className="text-forest-600">Collections</span>
            </h2>
            <div className="decorative-line mx-auto" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Figurines', icon: '🦊', href: '/products?category=figurines', desc: 'Nature & wildlife' },
              { name: 'Collectibles', icon: '🐉', href: '/products?category=collectibles', desc: 'Fantasy & themed' },
              { name: 'Custom Orders', icon: '✨', href: '/contact', desc: 'Your vision, our craft' },
              { name: 'Limited Edition', icon: '👑', href: '/products?category=limited-edition', desc: 'Exclusive pieces' },
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={category.href}
                  className="block p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </span>
                  <h3 className="font-display text-xl text-craft-900 mb-2">{category.name}</h3>
                  <p className="text-craft-500 text-sm">{category.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-white">
        <div className="container-wide mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-craft-900 mb-2">
                Featured <span className="text-forest-600">Creations</span>
              </h2>
              <p className="text-craft-500">Our most beloved handcrafted pieces</p>
            </div>
            <Link href="/products" className="btn-outline self-start md:self-auto">
              View All Products →
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section-padding bg-craft-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-forest-500 rounded-full blur-3xl" />
        </div>
        
        <div className="container-wide mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* BANNAAS - Replace with actual workshop image */}
              <div className="aspect-video bg-craft-800 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl block mb-2">🪵</span>
                  <p className="text-craft-500 text-sm">BANNAAS - Workshop Image</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-wood-400 font-medium mb-4 block">Our Story</span>
              <h2 className="font-display text-3xl md:text-4xl mb-6">
                Crafted with Passion,{' '}
                <span className="text-forest-400">Built to Last</span>
              </h2>
              <p className="text-craft-300 mb-6 leading-relaxed">
                {/* PHEW - About preview text */}
                Every figurine that leaves our workshop carries a piece of our dedication. 
                Using traditional techniques passed down through generations, combined with 
                an eye for contemporary design, we create pieces that become treasured 
                heirlooms.
              </p>
              <p className="text-craft-300 mb-8 leading-relaxed">
                {/* PHEW - Additional about text */}
                From selecting the perfect wood grain to the final hand-applied finish, 
                each step is performed with meticulous care and attention to detail.
              </p>
              <Link href="/about" className="btn-secondary">
                Learn More About Us →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newProducts.length > 0 && (
        <section className="section-padding bg-wood-100">
          <div className="container-wide mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-forest-100 text-forest-700 rounded-full text-sm font-medium mb-4">
                ✨ Just Arrived
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-craft-900">
                New <span className="text-forest-600">Creations</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newProducts.slice(0, 3).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container-wide mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-craft-900 mb-4">
              What Our <span className="text-forest-600">Customers</span> Say
            </h2>
            <div className="decorative-line mx-auto" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/testimonials" className="btn-outline">
              Read More Reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-forest-700 to-forest-600 text-white">
        <div className="container-narrow mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-handwritten text-3xl text-wood-300 block mb-4">
              Have something special in mind?
            </span>
            <h2 className="font-display text-3xl md:text-4xl mb-6">
              Let's Create Something <span className="text-wood-400">Unique</span> Together
            </h2>
            <p className="text-forest-100 mb-8 max-w-2xl mx-auto">
              {/* PHEW - CTA description */}
              Custom orders are our specialty. Share your vision, and we'll bring it to life 
              in beautifully carved wood. From personalized gifts to one-of-a-kind collectibles.
            </p>
            <Link href="/contact" className="btn-secondary text-lg px-8 py-4">
              Request Custom Order
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
