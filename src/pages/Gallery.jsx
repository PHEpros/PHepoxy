import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages, galleryCategories } from '../data/gallery';

function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <div className="min-h-screen bg-charcoal-50">
      {/* Hero Section */}
      <section className="bg-charcoal-900 text-white">
        <div className="container-custom section-padding py-16">
          <div className="max-w-3xl">
            <span className="text-forest-400 font-medium text-sm uppercase tracking-wider">Behind the Scenes</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
              Our <span className="text-wood-400">Gallery</span>
            </h1>
            <p className="text-xl text-charcoal-300">
              PHEW - Step inside our workshop and see the passion, precision, and artistry that goes into every piece we create.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white border-b border-charcoal-100 sticky top-[64px] z-40">
        <div className="container-custom py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {galleryCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? 'bg-forest-700 text-white'
                    : 'bg-charcoal-100 text-charcoal-600 hover:bg-charcoal-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => openLightbox(index)}
                className="group relative aspect-square overflow-hidden rounded-xl bg-charcoal-100 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* PHEpoxyWorld: Replace with actual gallery images */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-forest-100 to-charcoal-100">
                  <div className="text-center p-4">
                    <div className="w-16 h-16 mx-auto mb-2 bg-forest-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-3xl">
                        {image.category === 'workshop' && '🔧'}
                        {image.category === 'process' && '✂️'}
                        {image.category === 'products' && '🪵'}
                        {image.category === 'materials' && '🌲'}
                        {image.category === 'custom' && '✨'}
                        {image.category === 'community' && '👥'}
                        {image.category === 'shipping' && '📦'}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-400 font-mono">PHEpoxyWorld</p>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-display font-semibold">{image.title}</h3>
                    <p className="text-charcoal-300 text-sm mt-1 line-clamp-2">{image.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-charcoal-500">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/95 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white hover:text-wood-400 transition-colors"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          {/* Navigation */}
          <button
            onClick={prevImage}
            className="absolute left-4 p-3 text-white hover:text-wood-400 transition-colors bg-charcoal-800/50 rounded-full"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 p-3 text-white hover:text-wood-400 transition-colors bg-charcoal-800/50 rounded-full"
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>

          {/* Image */}
          <div className="max-w-4xl max-h-[80vh] mx-auto px-16">
            {/* PHEpoxyWorld: Replace with actual image display */}
            <div className="aspect-[4/3] bg-gradient-to-br from-forest-800 to-charcoal-800 rounded-2xl flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto mb-4 bg-forest-700/50 rounded-full flex items-center justify-center">
                  <span className="text-6xl">
                    {filteredImages[activeImageIndex]?.category === 'workshop' && '🔧'}
                    {filteredImages[activeImageIndex]?.category === 'process' && '✂️'}
                    {filteredImages[activeImageIndex]?.category === 'products' && '🪵'}
                    {filteredImages[activeImageIndex]?.category === 'materials' && '🌲'}
                    {filteredImages[activeImageIndex]?.category === 'custom' && '✨'}
                    {filteredImages[activeImageIndex]?.category === 'community' && '👥'}
                    {filteredImages[activeImageIndex]?.category === 'shipping' && '📦'}
                  </span>
                </div>
                <p className="text-wood-400 font-display text-xl">PHEpoxyWorld</p>
                <p className="text-charcoal-400 mt-2">{filteredImages[activeImageIndex]?.image}</p>
              </div>
            </div>
            
            {/* Caption */}
            <div className="mt-6 text-center">
              <h3 className="text-white font-display text-xl font-semibold">
                {filteredImages[activeImageIndex]?.title}
              </h3>
              <p className="text-charcoal-300 mt-2">
                {filteredImages[activeImageIndex]?.description}
              </p>
              <p className="text-charcoal-500 text-sm mt-4">
                {activeImageIndex + 1} / {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
