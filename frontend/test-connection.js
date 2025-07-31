const axios = require('axios');

async function testConnection() {
  console.log('🧪 Testing API connection...\n');

  const testUrls = [
    'http://localhost:5000/api/stores',
    'http://127.0.0.1:5000/api/stores',
    'http://192.168.1.22:5000/api/stores',
    'http://192.168.1.23:5000/api/stores'
  ];

  for (const url of testUrls) {
    try {
      console.log(`Testing: ${url}`);
      const response = await axios.get(url);
      console.log(`✅ SUCCESS: ${url} - Found ${response.data.length} stores`);
      
      if (response.data.length > 0) {
        console.log(`📋 Sample store: ${response.data[0].name}`);
      }
      
      // Test products endpoint
      const storeId = response.data[0]?.id;
      if (storeId) {
        const productsUrl = `http://localhost:5000/api/products?storeId=${storeId}`;
        const productsResponse = await axios.get(productsUrl);
        console.log(`📦 Products: Found ${productsResponse.data.length} products`);
      }
      
      break; // Use the first working URL
    } catch (error) {
      console.log(`❌ FAILED: ${url} - ${error.message}`);
    }
  }
}

testConnection().catch(console.error); 