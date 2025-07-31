const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000';

async function testAPI() {
  console.log('🧪 Testing API endpoints...\n');

  try {
    // Test 1: Get all products
    console.log('1️⃣ Testing GET /api/products');
    const allProductsResponse = await axios.get(`${API_BASE_URL}/api/products`);
    console.log(`✅ Found ${allProductsResponse.data.length} products`);
    
    if (allProductsResponse.data.length > 0) {
      const product = allProductsResponse.data[0];
      console.log(`📦 Sample product: ${product.name} - $${product.price}`);
      console.log(`🖼️  Image URL: ${product.image_url}`);
    }

    // Test 2: Get products by store
    console.log('\n2️⃣ Testing GET /api/products?storeId=...');
    const storeProductsResponse = await axios.get(`${API_BASE_URL}/api/products?storeId=cc9895c1-caf4-4ed4-aaa9-b0ddaac51aef`);
    console.log(`✅ Found ${storeProductsResponse.data.length} products for store`);

    // Test 3: Test specific product
    if (allProductsResponse.data.length > 0) {
      const productId = allProductsResponse.data[0].id;
      console.log(`\n3️⃣ Testing GET /api/products/${productId}`);
      const singleProductResponse = await axios.get(`${API_BASE_URL}/api/products/${productId}`);
      console.log(`✅ Product details: ${singleProductResponse.data.name}`);
      console.log(`🖼️  Image: ${singleProductResponse.data.image_url}`);
    }

    console.log('\n🎉 All API tests passed! Your mobile app should work correctly.');
    console.log('\n📱 Next steps:');
    console.log('1. Start your mobile app: cd frontend && npx expo start');
    console.log('2. Navigate to a store details screen');
    console.log('3. You should see products with images from your Supabase database');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testAPI(); 