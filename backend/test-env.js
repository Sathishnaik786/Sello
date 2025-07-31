require('dotenv').config();

console.log('Testing environment variables:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Found' : '❌ Missing');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Found' : '❌ Missing');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Found' : '❌ Missing');
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.log('❌ Missing required environment variables');
  process.exit(1);
} else {
  console.log('✅ All required environment variables are present');
} 