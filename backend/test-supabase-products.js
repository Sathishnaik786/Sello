const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function testSupabaseConnection() {
  console.log('🔍 Testing Supabase connection...');
  
  try {
    // Test connection by fetching products
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .limit(5);

    if (error) {
      console.error('❌ Error connecting to Supabase:', error.message);
      return;
    }

    console.log('✅ Successfully connected to Supabase!');
    console.log(`📊 Found ${data.length} products in database`);
    
    if (data.length > 0) {
      console.log('\n📋 Sample products:');
      data.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name} - $${product.price} (Stock: ${product.stock})`);
        if (product.image_url) {
          console.log(`   Image: ${product.image_url}`);
        }
      });
    } else {
      console.log('\n📝 No products found. Would you like to add some test products?');
      await addTestProducts();
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function addTestProducts() {
  console.log('\n🛍️ Adding test products with images...');
  
  const testProducts = [
    {
      name: 'Fresh Organic Apples',
      price: 2.99,
      stock: 50,
      image_url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop',
      store_id: null // You can set this to an actual store ID
    },
    {
      name: 'Organic Bananas',
      price: 1.99,
      stock: 30,
      image_url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop',
      store_id: null
    },
    {
      name: 'Whole Grain Bread',
      price: 3.49,
      stock: 20,
      image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
      store_id: null
    },
    {
      name: 'Fresh Milk',
      price: 4.99,
      stock: 15,
      image_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop',
      store_id: null
    },
    {
      name: 'Organic Tomatoes',
      price: 3.99,
      stock: 25,
      image_url: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=400&fit=crop',
      store_id: null
    }
  ];

  try {
    const { data, error } = await supabase
      .from('products')
      .insert(testProducts)
      .select();

    if (error) {
      console.error('❌ Error adding test products:', error.message);
      return;
    }

    console.log('✅ Successfully added test products!');
    console.log(`📦 Added ${data.length} products with images`);
    
    console.log('\n📋 Added products:');
    data.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price}`);
      console.log(`   Image: ${product.image_url}`);
    });

    console.log('\n🎉 Your mobile app should now display these products with images!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function getStores() {
  console.log('\n🏪 Available stores:');
  
  try {
    const { data, error } = await supabase
      .from('stores')
      .select('id, name')
      .limit(10);

    if (error) {
      console.error('❌ Error fetching stores:', error.message);
      return;
    }

    if (data.length > 0) {
      data.forEach((store, index) => {
        console.log(`${index + 1}. ${store.name} (ID: ${store.id})`);
      });
      console.log('\n💡 You can update products with store_id to associate them with stores');
    } else {
      console.log('No stores found in database');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the test
async function main() {
  await testSupabaseConnection();
  await getStores();
}

main().catch(console.error); 