# 🚀 Supabase Integration Setup Guide

## 📋 Prerequisites
- Supabase account (sign up at https://supabase.com)
- Node.js and npm installed

## 🔧 Step 1: Create Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `hyperlocal-app`
   - **Database Password**: Choose a strong password
   - **Region**: Select closest to your users
5. Click "Create new project"

## 🔑 Step 2: Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

## 📱 Step 3: Configure Mobile App

1. Create `.env` file in `frontend/`:
```bash
EXPO_PUBLIC_SUPABASE_URL=your_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

2. Example:
```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🔧 Step 4: Configure Backend

1. Create `.env` file in `backend/`:
```bash
SUPABASE_URL=your_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PORT=5000
```

## 🗄️ Step 5: Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `frontend/supabase_schema.sql`
3. Click "Run" to create all tables

## 🧪 Step 6: Test the Integration

### Test Mobile App:
```bash
cd frontend
npm start
```

### Test Backend:
```bash
cd backend
npm start
```

### Test Admin Dashboard:
```bash
cd hyperlocal-admin
npm start
```

## 🔐 Step 7: Create Test User

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click "Add User"
3. Enter email and password
4. Use these credentials to test login in your mobile app

## 📊 Step 8: Add Sample Data

Run this SQL in Supabase SQL Editor to add sample data:

```sql
-- Insert sample stores
INSERT INTO stores (name, address, lat, lng) VALUES
('Fresh Market', '123 Main St, Downtown', 40.7128, -74.0060),
('Corner Shop', '456 Oak Ave, Uptown', 40.7589, -73.9851),
('Local Grocery', '789 Pine St, Midtown', 40.7505, -73.9934);

-- Insert sample products
INSERT INTO products (store_id, name, price, stock) VALUES
((SELECT id FROM stores WHERE name = 'Fresh Market'), 'Organic Bananas', 1.99, 50),
((SELECT id FROM stores WHERE name = 'Fresh Market'), 'Whole Grain Bread', 3.49, 25),
((SELECT id FROM stores WHERE name = 'Corner Shop'), 'Fresh Milk', 4.99, 30),
((SELECT id FROM stores WHERE name = 'Local Grocery'), 'Fresh Apples', 2.99, 40);
```

## 🎯 Next Steps

1. **Test Authentication**: Try logging in with the test user
2. **Add Real Data**: Connect your app to real stores and products
3. **Customize UI**: Update the mobile app UI to match your brand
4. **Add Features**: Implement order management, notifications, etc.

## 🆘 Troubleshooting

### Common Issues:

1. **Environment Variables Not Loading**
   - Restart your development server
   - Check that `.env` files are in the correct directories

2. **Authentication Errors**
   - Verify your Supabase URL and keys are correct
   - Check that the user exists in Supabase

3. **Database Connection Issues**
   - Ensure your Supabase project is active
   - Check that the schema has been created

4. **CORS Errors**
   - Add your localhost URLs to Supabase CORS settings
   - Go to Settings → API → CORS

## 📞 Support

If you encounter issues:
1. Check the Supabase documentation
2. Review the console logs for error messages
3. Verify all environment variables are set correctly

---

**🎉 Congratulations!** Your Supabase integration is now complete and ready for development! 