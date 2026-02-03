#!/usr/bin/env node
/**
 * PHEpoxyWorld - Square Catalog Sync Script
 * 
 * Fetches products from Square, downloads images to S3,
 * and updates website product data automatically.
 * 
 * Usage:
 *   npm run sync-square              # Full sync
 *   npm run sync-square -- --dry-run # Preview changes only
 *   npm run sync-square -- --product="Crystal Dragon"  # Sync one product
 */

require('dotenv').config();
const { Client, Environment } = require('square');
const AWS = require('aws-sdk');
const fs = require('fs').promises;
const path = require('path');
const https = require('https');

// Configuration
const config = {
  square: {
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: process.env.SQUARE_ENVIRONMENT === 'production' 
      ? Environment.Production 
      : Environment.Sandbox,
    locationId: process.env.SQUARE_LOCATION_ID,
  },
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    s3Bucket: process.env.S3_BUCKET_NAME || 'phepros-product-images',
  },
  paths: {
    productsFile: path.join(__dirname, '../src/data/products.js'),
    backupFile: path.join(__dirname, '../src/data/products.backup.js'),
    imagesDir: 'products/',
  },
};

// Initialize clients
const squareClient = new Client({
  accessToken: config.square.accessToken,
  environment: config.square.environment,
});

const s3 = new AWS.S3({ region: config.aws.region });

// Category mapping: Square → Website
const categoryMap = {
  'Fantasy & Sci-Fi': 'fantasy',
  'Animals & Creatures': 'animals',
  'Resin Art': 'resin-art',
  'Functional Parts': 'functional',
  'Seasonal': 'seasonal',
  'Figurines & Sculptures': 'figurines',
  'Custom Orders': 'custom',
};

// Material mapping: Extract from variation names
const materialPatterns = {
  'PLA Standard': 'pla',
  'PLA Silk': 'pla-silk',
  'PLA Matte': 'pla-matte',
  'ABS': 'abs',
  'PETG': 'petg',
  'TPU': 'tpu',
  'Nylon': 'nylon',
  'Carbon Fiber': 'carbon-fiber',
  'Epoxy Clear': 'epoxy-clear',
  'Epoxy Colored': 'epoxy-colored',
  'Epoxy Glow': 'epoxy-glow',
  'Polyurethane': 'polyurethane',
  'Print.*Epoxy': 'print-epoxy',
  'Embedded': 'embedded',
};

// Size mapping: Extract from variation names
const sizePatterns = {
  '3\\s*(?:in|inch)': '3in',
  '6\\s*(?:in|inch)': '6in',
  '9\\s*(?:in|inch)': '9in',
  '12\\s*(?:in|inch)': '12in',
  '18\\s*(?:in|inch)': '18in',
  '1\\.5\\s*(?:ft|feet)': '1.5ft',
  '2\\s*(?:ft|feet)': '2ft',
  'life\\s*size': 'life-size',
};

/**
 * Main sync function
 */
async function syncSquareCatalog(options = {}) {
  const { dryRun = false, productFilter = null } = options;
  
  console.log('🚀 Starting Square Catalog Sync...\n');
  
  try {
    // Step 1: Fetch Square catalog
    console.log('📦 Fetching products from Square...');
    const squareProducts = await fetchSquareCatalog();
    console.log(`   Found ${squareProducts.length} products\n`);
    
    // Filter if specified
    let productsToSync = squareProducts;
    if (productFilter) {
      productsToSync = squareProducts.filter(p => 
        p.name.toLowerCase().includes(productFilter.toLowerCase())
      );
      console.log(`   Filtered to ${productsToSync.length} products matching "${productFilter}"\n`);
    }
    
    // Step 2: Load existing product data
    console.log('📖 Loading existing product data...');
    const existingProducts = await loadExistingProducts();
    console.log(`   Loaded ${existingProducts.length} existing products\n`);
    
    // Step 3: Process products
    console.log('🔄 Processing products...');
    const processedProducts = [];
    
    for (const squareProduct of productsToSync) {
      console.log(`   Processing: ${squareProduct.name}`);
      
      try {
        // Find existing product to preserve custom data
        const existing = existingProducts.find(p => 
          p.name === squareProduct.name || 
          p.squareId === squareProduct.id
        );
        
        // Download and upload image
        let imageUrl = null;
        if (squareProduct.imageUrl && !dryRun) {
          imageUrl = await downloadAndUploadImage(
            squareProduct.imageUrl,
            squareProduct.id
          );
          console.log(`      ✓ Image uploaded to S3`);
        } else if (squareProduct.imageUrl) {
          console.log(`      (dry-run) Would upload image`);
        }
        
        // Transform to website format
        const websiteProduct = transformProduct(squareProduct, existing, imageUrl);
        processedProducts.push(websiteProduct);
        
        console.log(`      ✓ Processed with ${websiteProduct.availableSizes?.length || 0} sizes, ${websiteProduct.availableMaterials?.length || 0} materials`);
        
      } catch (error) {
        console.error(`      ✗ Error processing ${squareProduct.name}:`, error.message);
      }
    }
    
    console.log(`\n✅ Processed ${processedProducts.length} products\n`);
    
    // Step 4: Merge with existing products (keep non-Square products)
    const finalProducts = mergeProducts(existingProducts, processedProducts);
    console.log(`📊 Final catalog: ${finalProducts.length} products\n`);
    
    // Step 5: Preview changes
    showChanges(existingProducts, finalProducts);
    
    // Step 6: Save if not dry run
    if (!dryRun) {
      console.log('\n💾 Saving changes...');
      await backupProducts();
      await saveProducts(finalProducts);
      console.log('   ✓ Products saved to src/data/products.js');
      console.log('   ✓ Backup saved to src/data/products.backup.js\n');
    } else {
      console.log('\n⚠️  DRY RUN - No changes saved\n');
    }
    
    console.log('✨ Sync complete!\n');
    
    // Summary
    console.log('📋 Summary:');
    console.log(`   Products synced: ${processedProducts.length}`);
    console.log(`   Total products: ${finalProducts.length}`);
    console.log(`   Dry run: ${dryRun ? 'Yes' : 'No'}\n`);
    
  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  }
}

/**
 * Fetch all catalog items from Square
 */
async function fetchSquareCatalog() {
  const products = [];
  let cursor = null;
  
  do {
    const response = await squareClient.catalogApi.listCatalog(cursor, 'ITEM');
    
    if (response.result.objects) {
      for (const item of response.result.objects) {
        if (item.type === 'ITEM' && item.itemData) {
          products.push({
            id: item.id,
            name: item.itemData.name,
            description: item.itemData.description || '',
            categoryId: item.itemData.categoryId,
            variations: item.itemData.variations || [],
            imageIds: item.itemData.imageIds || [],
            productType: item.itemData.productType,
          });
        }
      }
    }
    
    cursor = response.result.cursor;
  } while (cursor);
  
  // Fetch category and image data
  await enrichProducts(products);
  
  return products;
}

/**
 * Enrich products with category names and image URLs
 */
async function enrichProducts(products) {
  // Fetch all categories
  const categoriesResponse = await squareClient.catalogApi.listCatalog(null, 'CATEGORY');
  const categories = {};
  
  if (categoriesResponse.result.objects) {
    for (const cat of categoriesResponse.result.objects) {
      if (cat.type === 'CATEGORY') {
        categories[cat.id] = cat.categoryData.name;
      }
    }
  }
  
  // Fetch all images
  const imagesResponse = await squareClient.catalogApi.listCatalog(null, 'IMAGE');
  const images = {};
  
  if (imagesResponse.result.objects) {
    for (const img of imagesResponse.result.objects) {
      if (img.type === 'IMAGE' && img.imageData) {
        images[img.id] = img.imageData.url;
      }
    }
  }
  
  // Enrich products
  for (const product of products) {
    product.categoryName = categories[product.categoryId] || 'Uncategorized';
    product.imageUrl = product.imageIds[0] ? images[product.imageIds[0]] : null;
  }
}

/**
 * Transform Square product to website format
 */
function transformProduct(squareProduct, existingProduct, imageUrl) {
  // Parse variations to extract sizes and materials
  const { sizes, materials, basePrice } = parseVariations(squareProduct.variations);
  
  // Map category
  const category = categoryMap[squareProduct.categoryName] || 'figurines';
  
  // Create slug from name
  const id = existingProduct?.id || createSlug(squareProduct.name);
  
  return {
    id,
    name: squareProduct.name,
    category,
    basePrice: existingProduct?.basePrice || basePrice,
    description: existingProduct?.description || squareProduct.description || '',
    shortDescription: existingProduct?.shortDescription || truncate(squareProduct.description, 100),
    
    // Preserve custom fields from existing
    printTime: existingProduct?.printTime || 'Contact for estimate',
    cureTime: existingProduct?.cureTime,
    finishTime: existingProduct?.finishTime,
    featured: existingProduct?.featured || false,
    
    // Parsed from Square variations
    availableSizes: sizes,
    availableMaterials: materials,
    
    // Pricing and inventory
    squareId: squareProduct.id,
    squareLink: `https://square.link/u/${squareProduct.id}`,
    
    // Image
    imageUrl: imageUrl || existingProduct?.imageUrl || '',
    
    // Colors (preserve from existing or default)
    colors: existingProduct?.colors || ['Natural', 'Custom'],
    
    // Metadata
    customizationRequired: category === 'custom',
    lastSyncedAt: new Date().toISOString(),
  };
}

/**
 * Parse Square variations to extract sizes and materials
 */
function parseVariations(variations) {
  const sizes = new Set();
  const materials = new Set();
  let minPrice = Infinity;
  
  for (const variation of variations) {
    const name = variation.itemVariationData?.name || '';
    const price = variation.itemVariationData?.priceMoney?.amount || 0;
    
    // Update min price
    if (price > 0 && price < minPrice) {
      minPrice = price;
    }
    
    // Extract size
    for (const [pattern, size] of Object.entries(sizePatterns)) {
      if (new RegExp(pattern, 'i').test(name)) {
        sizes.add(size);
        break;
      }
    }
    
    // Extract material
    for (const [pattern, material] of Object.entries(materialPatterns)) {
      if (new RegExp(pattern, 'i').test(name)) {
        materials.add(material);
        break;
      }
    }
  }
  
  // Convert cents to dollars for base price
  const basePrice = minPrice < Infinity ? Math.round(minPrice / 100) : 50;
  
  return {
    sizes: Array.from(sizes),
    materials: Array.from(materials),
    basePrice,
  };
}

/**
 * Download image from Square and upload to S3
 */
async function downloadAndUploadImage(imageUrl, productId) {
  return new Promise((resolve, reject) => {
    https.get(imageUrl, (response) => {
      const chunks = [];
      
      response.on('data', (chunk) => chunks.push(chunk));
      
      response.on('end', async () => {
        const buffer = Buffer.concat(chunks);
        
        // Determine file extension
        const ext = imageUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i)?.[1] || 'jpg';
        const filename = `${config.paths.imagesDir}${createSlug(productId)}.${ext}`;
        
        // Upload to S3
        try {
          await s3.putObject({
            Bucket: config.aws.s3Bucket,
            Key: filename,
            Body: buffer,
            ContentType: `image/${ext}`,
            ACL: 'public-read',
          }).promise();
          
          const s3Url = `https://${config.aws.s3Bucket}.s3.${config.aws.region}.amazonaws.com/${filename}`;
          resolve(s3Url);
        } catch (error) {
          reject(error);
        }
      });
      
      response.on('error', reject);
    });
  });
}

/**
 * Load existing products from file
 */
async function loadExistingProducts() {
  try {
    const content = await fs.readFile(config.paths.productsFile, 'utf8');
    
    // Extract products array from JS file
    const match = content.match(/export const products = (\[[\s\S]*?\]);/);
    if (match) {
      // Use eval carefully - only on our own file
      return eval(match[1]);
    }
    
    return [];
  } catch (error) {
    console.warn('Could not load existing products:', error.message);
    return [];
  }
}

/**
 * Merge existing and new products
 */
function mergeProducts(existing, synced) {
  const syncedIds = new Set(synced.map(p => p.squareId).filter(Boolean));
  
  // Keep existing products that aren't from Square
  const nonSquareProducts = existing.filter(p => !p.squareId || !syncedIds.has(p.squareId));
  
  // Combine
  return [...synced, ...nonSquareProducts];
}

/**
 * Show changes between old and new
 */
function showChanges(oldProducts, newProducts) {
  console.log('📊 Changes Preview:\n');
  
  const oldMap = new Map(oldProducts.map(p => [p.id, p]));
  const newMap = new Map(newProducts.map(p => [p.id, p]));
  
  // New products
  const added = newProducts.filter(p => !oldMap.has(p.id));
  if (added.length > 0) {
    console.log(`   ➕ Added (${added.length}):`);
    added.forEach(p => console.log(`      - ${p.name}`));
    console.log();
  }
  
  // Removed products
  const removed = oldProducts.filter(p => !newMap.has(p.id));
  if (removed.length > 0) {
    console.log(`   ➖ Removed (${removed.length}):`);
    removed.forEach(p => console.log(`      - ${p.name}`));
    console.log();
  }
  
  // Updated products
  const updated = newProducts.filter(p => {
    const old = oldMap.get(p.id);
    return old && (
      old.name !== p.name ||
      old.basePrice !== p.basePrice ||
      JSON.stringify(old.availableSizes) !== JSON.stringify(p.availableSizes)
    );
  });
  
  if (updated.length > 0) {
    console.log(`   ✏️  Updated (${updated.length}):`);
    updated.forEach(p => {
      const old = oldMap.get(p.id);
      console.log(`      - ${p.name}`);
      if (old.basePrice !== p.basePrice) {
        console.log(`          Price: $${old.basePrice} → $${p.basePrice}`);
      }
    });
    console.log();
  }
  
  if (added.length === 0 && removed.length === 0 && updated.length === 0) {
    console.log('   No changes detected\n');
  }
}

/**
 * Backup current products file
 */
async function backupProducts() {
  try {
    await fs.copyFile(config.paths.productsFile, config.paths.backupFile);
  } catch (error) {
    // File might not exist yet
  }
}

/**
 * Save products to file
 */
async function saveProducts(products) {
  const content = `// Auto-generated by Square sync - Last updated: ${new Date().toISOString()}
// DO NOT EDIT MANUALLY - Changes will be overwritten on next sync

export const products = ${JSON.stringify(products, null, 2)};

// Helper functions
export function calculatePrice(basePrice, size, material) {
  const sizeMultipliers = {
    '3in': 1.0, '6in': 1.8, '9in': 2.5, '12in': 3.2,
    '18in': 4.5, '1.5ft': 6.0, '2ft': 8.0, 'life-size': 15.0
  };
  
  const materialMultipliers = {
    'pla': 1.0, 'pla-silk': 1.2, 'pla-matte': 1.15,
    'abs': 1.3, 'petg': 1.4, 'tpu': 1.8, 'nylon': 2.0,
    'carbon-fiber': 2.2, 'epoxy-clear': 1.6, 'epoxy-colored': 1.8,
    'epoxy-glow': 2.5, 'polyurethane': 2.0, 'print-epoxy': 2.3, 'embedded': 2.8
  };
  
  return Math.round(basePrice * (sizeMultipliers[size] || 1) * (materialMultipliers[material] || 1) * 100) / 100;
}

export function getFeaturedProducts() {
  return products.filter(p => p.featured);
}

export function getProductById(id) {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(categoryId) {
  return products.filter(p => p.category === categoryId);
}

// Export all products as default
export default products;
`;

  await fs.writeFile(config.paths.productsFile, content, 'utf8');
}

/**
 * Helper: Create slug from string
 */
function createSlug(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);
}

/**
 * Helper: Truncate string
 */
function truncate(str, length) {
  if (!str) return '';
  return str.length > length ? str.substring(0, length) + '...' : str;
}

// Parse command line arguments
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const productArg = args.find(arg => arg.startsWith('--product='));
const productFilter = productArg ? productArg.split('=')[1] : null;

// Run sync
syncSquareCatalog({ dryRun, productFilter });
