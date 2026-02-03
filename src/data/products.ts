// Product data structure
// CORNBEF - Replace with actual product data

export interface ProductVariant {
  size: '3"' | '6"' | '9"' | '12"';
  color: string;
  price: number;
  squareItemId: string; // CORNBEF - Square item ID for checkout redirect
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
  // CORNBEF - Replace with actual Square store URL
  const storeUrl = process.env.SQUARE_STORE_URL || 'https://squareup.com/store/CORNBEF-store-id';
  return `${storeUrl}/item/${squareItemId}`;
}

// Sample products - CORNBEF replace with actual products
export const products: Product[] = [
  {
    id: '1',
    name: 'Forest Guardian Owl',
    slug: 'forest-guardian-owl',
    description: 'CORNBEF - Full product description. A majestic owl figurine handcrafted from premium walnut wood. Each feather detail is meticulously carved to capture the wise spirit of this forest guardian. Perfect for nature lovers and collectors alike.',
    shortDescription: 'CORNBEF - Handcrafted walnut owl with intricate feather details.',
    category: 'figurines',
    images: [
      '/images/products/CORNBEF-owl-1.jpg',
      '/images/products/CORNBEF-owl-2.jpg',
      '/images/products/CORNBEF-owl-3.jpg',
    ],
    variants: [
      { size: '3"', color: 'Natural Walnut', price: 45, squareItemId: 'CORNBEF-owl-3-natural', inStock: true },
      { size: '3"', color: 'Dark Stain', price: 49, squareItemId: 'CORNBEF-owl-3-dark', inStock: true },
      { size: '6"', color: 'Natural Walnut', price: 85, squareItemId: 'CORNBEF-owl-6-natural', inStock: true },
      { size: '6"', color: 'Dark Stain', price: 89, squareItemId: 'CORNBEF-owl-6-dark', inStock: false },
      { size: '9"', color: 'Natural Walnut', price: 145, squareItemId: 'CORNBEF-owl-9-natural', inStock: true },
      { size: '12"', color: 'Natural Walnut', price: 225, squareItemId: 'CORNBEF-owl-12-natural', inStock: true },
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
    description: 'CORNBEF - Full product description. This playful fox captures the curious spirit of the forest. Carved from cherry wood with a beautiful natural grain that brings warmth to any space.',
    shortDescription: 'CORNBEF - Cherry wood fox with expressive character.',
    category: 'figurines',
    images: [
      '/images/products/CORNBEF-fox-1.jpg',
      '/images/products/CORNBEF-fox-2.jpg',
    ],
    variants: [
      { size: '3"', color: 'Natural Cherry', price: 42, squareItemId: 'CORNBEF-fox-3-natural', inStock: true },
      { size: '6"', color: 'Natural Cherry', price: 78, squareItemId: 'CORNBEF-fox-6-natural', inStock: true },
      { size: '9"', color: 'Natural Cherry', price: 135, squareItemId: 'CORNBEF-fox-9-natural', inStock: true },
      { size: '12"', color: 'Natural Cherry', price: 210, squareItemId: 'CORNBEF-fox-12-natural', inStock: true },
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
    description: 'CORNBEF - Full product description. A powerful bear standing tall, representing strength and resilience. Hand-carved from oak with exceptional attention to fur texture.',
    shortDescription: 'CORNBEF - Oak bear figurine with detailed fur texture.',
    category: 'figurines',
    images: [
      '/images/products/CORNBEF-bear-1.jpg',
      '/images/products/CORNBEF-bear-2.jpg',
    ],
    variants: [
      { size: '6"', color: 'Natural Oak', price: 95, squareItemId: 'CORNBEF-bear-6-natural', inStock: true },
      { size: '6"', color: 'Honey Stain', price: 99, squareItemId: 'CORNBEF-bear-6-honey', inStock: true },
      { size: '9"', color: 'Natural Oak', price: 165, squareItemId: 'CORNBEF-bear-9-natural', inStock: true },
      { size: '12"', color: 'Natural Oak', price: 275, squareItemId: 'CORNBEF-bear-12-natural', inStock: false },
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
    description: 'CORNBEF - Full product description. A mystical wizard figure with flowing robes and a staff. Perfect for fantasy collectors and tabletop gaming enthusiasts.',
    shortDescription: 'CORNBEF - Fantasy wizard with intricate robe details.',
    category: 'collectibles',
    images: [
      '/images/products/CORNBEF-wizard-1.jpg',
    ],
    variants: [
      { size: '3"', color: 'Natural Maple', price: 55, squareItemId: 'CORNBEF-wizard-3-natural', inStock: true },
      { size: '6"', color: 'Natural Maple', price: 95, squareItemId: 'CORNBEF-wizard-6-natural', inStock: true },
      { size: '6"', color: 'Blue Accent', price: 105, squareItemId: 'CORNBEF-wizard-6-blue', inStock: true },
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
    description: 'CORNBEF - Full product description. A majestic dragon with spread wings, showcasing exceptional carving detail in scales and claws.',
    shortDescription: 'CORNBEF - Detailed dragon with spread wings.',
    category: 'collectibles',
    images: [
      '/images/products/CORNBEF-dragon-1.jpg',
    ],
    variants: [
      { size: '6"', color: 'Natural Walnut', price: 125, squareItemId: 'CORNBEF-dragon-6-natural', inStock: true },
      { size: '9"', color: 'Natural Walnut', price: 195, squareItemId: 'CORNBEF-dragon-9-natural', inStock: true },
      { size: '12"', color: 'Natural Walnut', price: 325, squareItemId: 'CORNBEF-dragon-12-natural', inStock: true },
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
    description: 'CORNBEF - Full product description. An elegant deer in a peaceful stance, capturing the grace of these woodland creatures.',
    shortDescription: 'CORNBEF - Graceful deer figurine in birch wood.',
    category: 'figurines',
    images: [
      '/images/products/CORNBEF-deer-1.jpg',
    ],
    variants: [
      { size: '3"', color: 'Natural Birch', price: 38, squareItemId: 'CORNBEF-deer-3-natural', inStock: true },
      { size: '6"', color: 'Natural Birch', price: 72, squareItemId: 'CORNBEF-deer-6-natural', inStock: true },
      { size: '9"', color: 'Natural Birch', price: 125, squareItemId: 'CORNBEF-deer-9-natural', inStock: true },
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
    description: 'CORNBEF - Full product description. An intricate Celtic tree design with intertwining branches and roots, symbolizing the connection between all living things.',
    shortDescription: 'CORNBEF - Celtic-inspired tree carving.',
    category: 'collectibles',
    images: [
      '/images/products/CORNBEF-tree-1.jpg',
    ],
    variants: [
      { size: '6"', color: 'Natural Oak', price: 85, squareItemId: 'CORNBEF-tree-6-natural', inStock: true },
      { size: '9"', color: 'Natural Oak', price: 145, squareItemId: 'CORNBEF-tree-9-natural', inStock: true },
      { size: '12"', color: 'Natural Oak', price: 225, squareItemId: 'CORNBEF-tree-12-natural', inStock: true },
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
    description: 'CORNBEF - Full product description. A charming rabbit with alert ears and a fluffy tail, perfect for spring decor or rabbit lovers.',
    shortDescription: 'CORNBEF - Adorable rabbit in cherry wood.',
    category: 'figurines',
    images: [
      '/images/products/CORNBEF-rabbit-1.jpg',
    ],
    variants: [
      { size: '3"', color: 'Natural Cherry', price: 35, squareItemId: 'CORNBEF-rabbit-3-natural', inStock: true },
      { size: '6"', color: 'Natural Cherry', price: 65, squareItemId: 'CORNBEF-rabbit-6-natural', inStock: true },
    ],
    basePrice: 35,
    featured: false,
    new: true,
    tags: ['rabbit', 'bunny', 'animal', 'cherry', 'cute'],
    createdAt: '2024-03-15',
  },
  // CORNBEF - Add more products (25 total to start, expanding to hundreds)
  // Products 9-25 follow similar structure...
  {
    id: '9',
    name: 'Mystic Phoenix',
    slug: 'mystic-phoenix',
    description: 'CORNBEF - Full product description. A magnificent phoenix rising from flames, symbolizing rebirth and renewal.',
    shortDescription: 'CORNBEF - Phoenix with detailed flame effects.',
    category: 'limited-edition',
    images: ['/images/products/CORNBEF-phoenix-1.jpg'],
    variants: [
      { size: '9"', color: 'Natural Mahogany', price: 285, squareItemId: 'CORNBEF-phoenix-9', inStock: true },
      { size: '12"', color: 'Natural Mahogany', price: 425, squareItemId: 'CORNBEF-phoenix-12', inStock: true },
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
    description: 'CORNBEF - Full product description. A wise elephant with raised trunk for good luck.',
    shortDescription: 'CORNBEF - Lucky elephant with raised trunk.',
    category: 'figurines',
    images: ['/images/products/CORNBEF-elephant-1.jpg'],
    variants: [
      { size: '3"', color: 'Natural Teak', price: 48, squareItemId: 'CORNBEF-elephant-3', inStock: true },
      { size: '6"', color: 'Natural Teak', price: 88, squareItemId: 'CORNBEF-elephant-6', inStock: true },
      { size: '9"', color: 'Natural Teak', price: 155, squareItemId: 'CORNBEF-elephant-9', inStock: true },
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
  { id: 'figurines', name: 'Figurines', description: 'CORNBEF - Animal and nature figurines' },
  { id: 'collectibles', name: 'Collectibles', description: 'CORNBEF - Fantasy and themed collectibles' },
  { id: 'custom', name: 'Custom Orders', description: 'CORNBEF - Personalized creations' },
  { id: 'limited-edition', name: 'Limited Edition', description: 'CORNBEF - Exclusive limited runs' },
];
