const axios = require('axios');

const testOrdersAPI = async () => {
  const apiUrls = [
    'http://localhost:5000/api/orders',
    'http://127.0.0.1:5000/api/orders',
    'http://192.168.1.23:5000/api/orders',
    'http://192.168.1.22:5000/api/orders',
  ];

  console.log('🧪 Testing Orders API endpoints...\n');

  for (const url of apiUrls) {
    try {
      console.log(`📡 Testing: ${url}`);
      const response = await axios.get(url);
      console.log(`✅ SUCCESS: ${url}`);
      console.log(`📊 Response:`, response.data);
      console.log('---\n');
      return; // Exit on first success
    } catch (error) {
      console.log(`❌ FAILED: ${url}`);
      console.log(`   Error: ${error.message}`);
      console.log('---\n');
    }
  }

  console.log('❌ All endpoints failed!');
};

testOrdersAPI(); 