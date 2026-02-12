// Product data structure
// PHEW - Replace with actual product data

export interface ProductVariant {
  size: '3"' | '6"' | '9"' | '12"';
  color: string;
  price: number;
  squareItemId: string; // PHEW - Square item ID for checkout redirect
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: 'figurines' | 'collectibles' | 'custom' | 'limited-edition';
  images: string[];
  variants: ProductVariant[];
  basePrice: number;
  featured: boolean;
  new: boolean;
  tags: string[];
  createdAt: string;
}

// Helper to generate Square checkout URL
export function getSquareCheckoutUrl(squareItemId: string): string {
  // PHEW - Replace with actual Square store URL
  const storeUrl = process.env.SQUARE_STORE_URL || 'https://squareup.com/store/PHEW-store-id';
  return `${storeUrl}/item/${squareItemId}`;
}

// Sample products - PHEW replace with actual products
export const products: Product[] = [
  {
    id: '1',
    name: 'Forest Guardian Owl',
    slug: 'forest-guardian-owl',
    description: 'PHEW - Full product description. A majestic owl figurine handcrafted from premium walnut wood. Each feather detail is meticulously carved to capture the wise spirit of this forest guardian. Perfect for nature lovers and collectors alike.',
    shortDescription: 'PHEW - Handcrafted walnut owl with intricate feather details.',
    category: 'figurines',
    images: [
      '/images/products/PHEW-owl-1.jpg',
      '/images/products/PHEW-owl-2.jpg',
      '/images/products/PHEW-owl-3.jpg',
    ],
    variants: [
      { size: '3"', color: 'Natural Walnut', price: 45, squareItemId: 'PHEW-owl-3-natural', inStock: true },
      { size: '3"', color: 'Dark Stain', price: 49, squareItemId: 'PHEW-owl-3-dark', inStock: true },
      { size: '6"', color: 'Natural Walnut', price: 85, squareItemId: 'PHEW-owl-6-natural', inStock: true },
      { size: '6"', color: 'Dark Stain', price: 89, squareItemId: 'PHEW-owl-6-dark', inStock: false },
      { size: '9"', color: 'Natural Walnut', price: 145, squareItemId: 'PHEW-owl-9-natural', inStock: true },
      { size: '12"', color: 'Natural Walnut', price: 225, squareItemId: 'PHEW-owl-12-natural', inStock: true },
    ],
    basePrice: 45,
    featured: true,
    new: false,
    tags: ['owl', 'bird', 'nature', 'walnut'],
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Woodland Fox',
    slug: 'woodland-fox',
    description: 'PHEW - Full product description. This playful fox captures the curious spirit of the forest. Carved from cherry wood with a beautiful natural grain that brings warmth to any space.',
    shortDescription: 'PHEW - Cherry wood fox with expressive character.',
    category: 'figurines',
    images: [
      '/images/products/PHEW-fox-1.jpg',
      '/images/products/PHEW-fox-2.jpg',
    ],
    variants: [
      { size: '3"', color: 'Natural Cherry', price: 42, squareItemId: 'PHEW-fox-3-natural', inStock: true },
      { size: '6"', color: 'Natural Cherry', price: 78, squareItemId: 'PHEW-fox-6-natural', inStock: true },
      { size: '9"', color: 'Natural Cherry', price: 135, squareItemId: 'PHEW-fox-9-natural', inStock: true },
      { size: '12"', color: 'Natural Cherry', price: 210, squareItemId: 'PHEW-fox-12-natural', inStock: true },
    ],
    basePrice: 42,
    featured: true,
    new: true,
    tags: ['fox', 'animal', 'nature', 'cherry'],
    createdAt: '2024-03-01',
  },
  {
    id: '3',
    name: 'Mountain Bear',
    slug: 'mountain-bear',
    description: 'PHEW - Full product description. A powerful bear standing tall, representing strength and resilience. Hand-carved from oak with exceptional attention to fur texture.',
    shortDescription: 'PHEW - Oak bear figurine with detailed fur texture.',
    category: 'figurines',
    images: [
      '/images/products/PHEW-bear-1.jpg',
      '/images/products/PHEW-bear-2.jpg',
    ],
    variants: [
      { size: '6"', color: 'Natural Oak', price: 95, squareItemId: 'PHEW-bear-6-natural', inStock: true },
      { size: '6"', color: 'Honey Stain', price: 99, squareItemId: 'PHEW-bear-6-honey', inStock: true },
      { size: '9"', color: 'Natural Oak', price: 165, squareItemId: 'PHEW-bear-9-natural', inStock: true },
      { size: '12"', color: 'Natural Oak', price: 275, squareItemId: 'PHEW-bear-12-natural', inStock: false },
    ],
    basePrice: 95,
    featured: true,
    new: false,
    tags: ['bear', 'animal', 'nature', 'oak', 'strength'],
    createdAt: '2024-02-10',
  },
  {
    id: '4',
    name: 'Wise Wizard',
    slug: 'wise-wizard',
    description: 'PHEW - Full product description. A mystical wizard figure with flowing robes and a staff. Perfect for fantasy collectors and tabletop gaming enthusiasts.',
    shortDescription: 'PHEW - Fantasy wizard with intricate robe details.',
    category: 'collectibles',
    images: [
      '/images/products/PHEW-wizard-1.jpg',
    ],
    variants: [
      { size: '3"', color: 'Natural Maple', price: 55, squareItemId: 'PHEW-wizard-3-natural', inStock: true },
      { size: '6"', color: 'Natural Maple', price: 95, squareItemId: 'PHEW-wizard-6-natural', inStock: true },
      { size: '6"', color: 'Blue Accent', price: 105, squareItemId: 'PHEW-wizard-6-blue', inStock: true },
    ],
    basePrice: 55,
    featured: false,
    new: true,
    tags: ['wizard', 'fantasy', 'magic', 'maple'],
    createdAt: '2024-03-10',
  },
  {
    id: '5',
    name: 'Dragon Guardian',
    slug: 'dragon-guardian',
    description: 'PHEW - Full product description. A majestic dragon with spread wings, showcasing exceptional carving detail in scales and claws.',
    shortDescription: 'PHEW - Detailed dragon with spread wings.',
    category: 'collectibles',
    images: [
      '/images/products/PHEW-dragon-1.jpg',
    ],
    variants: [
      { size: '6"', color: 'Natural Walnut', price: 125, squareItemId: 'PHEW-dragon-6-natural', inStock: true },
      { size: '9"', color: 'Natural Walnut', price: 195, squareItemId: 'PHEW-dragon-9-natural', inStock: true },
      { size: '12"', color: 'Natural Walnut', price: 325, squareItemId: 'PHEW-dragon-12-natural', inStock: true },
    ],
    basePrice: 125,
    featured: true,
    new: false,
    tags: ['dragon', 'fantasy', 'mythical', 'walnut'],
    createdAt: '2024-01-20',
  },
  {
    id: '6',
    name: 'Serene Deer',
    slug: 'serene-deer',
    description: 'PHEW - Full product description. An elegant deer in a peaceful stance, capturing the grace of these woodland creatures.',
    shortDescription: 'PHEW - Graceful deer figurine in birch wood.',
    category: 'figurines',
    images: [
      '/images/products/PHEW-deer-1.jpg',
    ],
    variants: [
      { size: '3"', color: 'Natural Birch', price: 38, squareItemId: 'PHEW-deer-3-natural', inStock: true },
      { size: '6"', color: 'Natural Birch', price: 72, squareItemId: 'PHEW-deer-6-natural', inStock: true },
      { size: '9"', color: 'Natural Birch', price: 125, squareItemId: 'PHEW-deer-9-natural', inStock: true },
    ],
    basePrice: 38,
    featured: false,
    new: false,
    tags: ['deer', 'animal', 'nature', 'birch', 'elegant'],
    createdAt: '2024-02-05',
  },
  {
    id: '7',
    name: 'Celtic Tree of Life',
    slug: 'celtic-tree-of-life',
    description: 'PHEW - Full product description. An intricate Celtic tree design with intertwining branches and roots, symbolizing the connection between all living things.',
    shortDescription: 'PHEW - Celtic-inspired tree carving.',
    category: 'collectibles',
    images: [
      '/images/products/PHEW-tree-1.jpg',
    ],
    variants: [
      { size: '6"', color: 'Natural Oak', price: 85, squareItemId: 'PHEW-tree-6-natural', inStock: true },
      { size: '9"', color: 'Natural Oak', price: 145, squareItemId: 'PHEW-tree-9-natural', inStock: true },
      { size: '12"', color: 'Natural Oak', price: 225, squareItemId: 'PHEW-tree-12-natural', inStock: true },
    ],
    basePrice: 85,
    featured: false,
    new: false,
    tags: ['celtic', 'tree', 'spiritual', 'oak'],
    createdAt: '2024-01-25',
  },
  {
    id: '8',
    name: 'Playful Rabbit',
    slug: 'playful-rabbit',
    description: 'PHEW - Full product description. A charming rabbit with alert ears and a fluffy tail, perfect for spring decor or rabbit lovers.',
    shortDescription: 'PHEW - Adorable rabbit in cherry wood.',
    category: 'figurines',
    images: [
      '/images/products/PHEW-rabbit-1.jpg',
    ],
    variants: [
      { size: '3"', color: 'Natural Cherry', price: 35, squareItemId: 'PHEW-rabbit-3-natural', inStock: true },
      { size: '6"', color: 'Natural Cherry', price: 65, squareItemId: 'PHEW-rabbit-6-natural', inStock: true },
    ],
    basePrice: 35,
    featured: false,
    new: true,
    tags: ['rabbit', 'bunny', 'animal', 'cherry', 'cute'],
    createdAt: '2024-03-15',
  },
  // PHEW - Add more products (25 total to start, expanding to hundreds)
  // Products 9-25 follow similar structure...
  {
    id: '9',
    name: 'Mystic Phoenix',
    slug: 'mystic-phoenix',
    description: 'PHEW - Full product description. A magnificent phoenix rising from flames, symbolizing rebirth and renewal.',
    shortDescription: 'PHEW - Phoenix with detailed flame effects.',
    category: 'limited-edition',
    images: ['/images/products/PHEW-phoenix-1.jpg'],
    variants: [
      { size: '9"', color: 'Natural Mahogany', price: 285, squareItemId: 'PHEW-phoenix-9', inStock: true },
      { size: '12"', color: 'Natural Mahogany', price: 425, squareItemId: 'PHEW-phoenix-12', inStock: true },
    ],
    basePrice: 285,
    featured: true,
    new: true,
    tags: ['phoenix', 'mythical', 'bird', 'mahogany', 'limited'],
    createdAt: '2024-03-20',
  },
  {
    id: '10',
    name: 'Gentle Elephant',
    slug: 'gentle-elephant',
    description: 'PHEW - Full product description. A wise elephant with raised trunk for good luck.',
    shortDescription: 'PHEW - Lucky elephant with raised trunk.',
    category: 'figurines',
    images: ['/images/products/PHEW-elephant-1.jpg'],
    variants: [
      { size: '3"', color: 'Natural Teak', price: 48, squareItemId: 'PHEW-elephant-3', inStock: true },
      { size: '6"', color: 'Natural Teak', price: 88, squareItemId: 'PHEW-elephant-6', inStock: true },
      { size: '9"', color: 'Natural Teak', price: 155, squareItemId: 'PHEW-elephant-9', inStock: true },
    ],
    basePrice: 48,
    featured: false,
    new: false,
    tags: ['elephant', 'animal', 'lucky', 'teak'],
    createdAt: '2024-02-20',
  },
];

// Get featured products
export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}

// Get new products
export function getNewProducts(): Product[] {
  return products.filter(p => p.new);
}

// Get products by category
export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter(p => p.category === category);
}

// Get single product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

// Categories for filtering
export const categories = [
  { id: 'figurines', name: 'Figurines', description: 'PHEW - Animal and nature figurines' },
  { id: 'collectibles', name: 'Collectibles', description: 'PHEW - Fantasy and themed collectibles' },
  { id: 'custom', name: 'Custom Orders', description: 'PHEW - Personalized creations' },
  { id: 'limited-edition', name: 'Limited Edition', description: 'PHEW - Exclusive limited runs' },
];
