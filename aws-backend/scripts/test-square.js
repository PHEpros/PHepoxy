#!/usr/bin/env node
/**
 * Test Square API Connection
 * Verifies credentials and lists basic info
 */

require('dotenv').config();
const { Client, Environment } = require('square');

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.SQUARE_ENVIRONMENT === 'production' 
    ? Environment.Production 
    : Environment.Sandbox,
});

async function testConnection() {
  console.log('🔍 Testing Square API Connection...\n');
  
  try {
    // Test 1: List locations
    console.log('1️⃣  Fetching locations...');
    const locationsResponse = await client.locationsApi.listLocations();
    
    if (locationsResponse.result.locations) {
      console.log(`   ✅ Found ${locationsResponse.result.locations.length} location(s):\n`);
      
      locationsResponse.result.locations.forEach(loc => {
        console.log(`   📍 ${loc.name}`);
        console.log(`      ID: ${loc.id}`);
        console.log(`      Address: ${loc.address?.addressLine1 || 'N/A'}`);
        console.log(`      Status: ${loc.status}\n`);
      });
    }
    
    // Test 2: Count catalog items
    console.log('2️⃣  Counting catalog items...');
    const catalogResponse = await client.catalogApi.listCatalog(null, 'ITEM');
    const itemCount = catalogResponse.result.objects?.length || 0;
    console.log(`   ✅ Found ${itemCount} products in catalog\n`);
    
    // Test 3: List first few products
    if (itemCount > 0) {
      console.log('3️⃣  Sample products:');
      const items = catalogResponse.result.objects.slice(0, 5);
      items.forEach(item => {
        if (item.itemData) {
          console.log(`   📦 ${item.itemData.name}`);
          console.log(`      ID: ${item.id}`);
          console.log(`      Variations: ${item.itemData.variations?.length || 0}`);
        }
      });
      console.log();
    }
    
    console.log('✅ Connection successful!\n');
    console.log('Next steps:');
    console.log('  1. Add SQUARE_LOCATION_ID to .env file (use ID from above)');
    console.log('  2. Run: npm run sync-square -- --dry-run');
    console.log();
    
  } catch (error) {
    console.error('❌ Connection failed:\n');
    
    if (error.statusCode === 401) {
      console.error('   Unauthorized: Check your SQUARE_ACCESS_TOKEN');
      console.error('   Make sure you\'re using the PRODUCTION token, not sandbox\n');
    } else if (error.statusCode === 403) {
      console.error('   Forbidden: Check API permissions');
      console.error('   Required: ITEMS_READ, MERCHANT_PROFILE_READ\n');
    } else {
      console.error(`   Error: ${error.message}\n`);
      if (error.errors) {
        console.error('   Details:', JSON.stringify(error.errors, null, 2));
      }
    }
    
    process.exit(1);
  }
}

testConnection();
