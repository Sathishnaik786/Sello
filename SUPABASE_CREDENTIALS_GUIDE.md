# 🔑 Supabase Credentials Setup Guide

## ❌ **Current Issue**
Your mobile app is failing because it's using placeholder Supabase credentials:
- `https://your-project.supabase.co` (placeholder URL)
- `your-anon-key` (placeholder key)

## ✅ **Solution: Get Your Real Supabase Credentials**

### **Step 1: Access Your Supabase Project**
1. Go to [https://supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your project (or create a new one)

### **Step 2: Get Your Project URL**
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the **Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)

### **Step 3: Get Your Anon Key**
1. In the same **Settings** → **API** page
2. Copy the **anon public** key (starts with `eyJ...`)

### **Step 4: Update Your Environment Files**

#### **For Mobile App** (`frontend/.env`):
```env
EXPO_PUBLIC_SUPABASE_URL=https://YOUR_ACTUAL_PROJECT_URL.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR_ACTUAL_ANON_KEY
```

#### **For Backend** (`backend/.env`):
```env
SUPABASE_URL=https://YOUR_ACTUAL_PROJECT_URL.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

### **Step 5: Get Service Role Key (for Backend)**
1. In Supabase dashboard → **Settings** → **API**
2. Copy the **service_role** key (keep this secret!)

## 🔧 **Quick Fix Commands**

Run these commands to update your files:

### **Mobile App**:
```powershell
cd frontend
# Replace with your actual values
echo "EXPO_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_URL.supabase.co" > .env
echo "EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY" >> .env
```

### **Backend**:
```powershell
cd backend
# Replace with your actual values
echo "SUPABASE_URL=https://YOUR_PROJECT_URL.supabase.co" > .env
echo "SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY" >> .env
echo "PORT=5000" >> .env
```

## 🧪 **Test After Update**
1. Restart your Expo development server
2. The mobile app should now connect to your Supabase database
3. You should see the stores data (after adding sample data)

## 📱 **Expected Result**
After updating with real credentials, your mobile app should:
- ✅ Connect to Supabase without errors
- ✅ Show stores from your database
- ✅ Allow user authentication

---
**⚠️ Important**: Never commit your `.env` files to version control! 