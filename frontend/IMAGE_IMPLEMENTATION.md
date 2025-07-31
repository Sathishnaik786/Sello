# 📸 Product Image Implementation Guide

## Overview

This document explains how product images are implemented in the Sello mobile app using Supabase storage and the `image_url` field.

## 🏗️ Architecture

### 1. Product Type Definition

```typescript
export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  image_url: string; // image stored as public URL from Supabase or other host
};
```

### 2. Database Schema

The Product model in `backend/prisma/schema.prisma` includes:

```prisma
model Product {
  id          String   @id @default(uuid())
  name        String
  description String?
  price       Float
  stock       Int
  storeId     String
  store       Store    @relation(fields: [storeId], references: [id])
  barcode     String?
  image_url   String?  // URL to product image stored in Supabase Storage or external host
}
```

### 3. ProductCard Component

The `ProductCard` component (`frontend/src/components/ProductCard.tsx`) handles:

- **Image Display**: Uses React Native's `Image` component with `image_url`
- **Fallback Image**: Shows placeholder when image fails to load
- **Responsive Design**: Optimized for mobile viewing
- **Add to Cart**: Integrated cart functionality

```typescript
<Image
  source={{ uri: product.image_url }}
  style={styles.image}
  defaultSource={require('../../assets/placeholder.png')}
  resizeMode="cover"
/>
```

## 🎨 Styling

### ProductCard Styles

```typescript
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  // ... other styles
});
```

## 📱 Usage Examples

### 1. In StoreDetailsScreen

```typescript
import ProductCard, { Product } from '../components/ProductCard';

// Render products with images
{products.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
    onAddToCart={addToCart}
  />
))}
```

### 2. In ProductsScreen with FlatList

```typescript
import { FlatList } from 'react-native';
import ProductCard from './ProductCard';

const ProductsScreen = () => {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductCard product={item} onAddToCart={handleAddToCart} />
      )}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};
```

## 🔧 Backend API

### Product Creation with Image

```typescript
// POST /api/products
{
  "name": "Fresh Apples",
  "description": "Fresh, crisp apples from local orchards",
  "price": 2.99,
  "stock": 50,
  "store_id": "store-uuid",
  "image_url": "https://your-supabase-storage-url.com/apples.jpg"
}
```

### Product Response

```json
{
  "id": "product-uuid",
  "name": "Fresh Apples",
  "description": "Fresh, crisp apples from local orchards",
  "price": 2.99,
  "stock": 50,
  "image_url": "https://your-supabase-storage-url.com/apples.jpg",
  "store_id": "store-uuid"
}
```

## 🖼️ Image Sources

### 1. Supabase Storage
- Upload images to Supabase Storage bucket
- Get public URL for `image_url` field
- Recommended bucket: `product-images`

### 2. External URLs
- Use any public image URL
- Ensure CORS is properly configured
- Recommended: Unsplash, Cloudinary, or similar services

### 3. Placeholder Images
- Fallback image: `assets/placeholder.png`
- Shows when `image_url` is invalid or fails to load

## 🚀 Implementation Steps

### 1. Update Database Schema
```bash
cd backend
npx prisma db push
```

### 2. Add ProductCard Component
```bash
# Component is already created at:
frontend/src/components/ProductCard.tsx
```

### 3. Update Existing Screens
- Import ProductCard component
- Replace old product rendering with ProductCard
- Update Product type usage

### 4. Test Image Loading
- Test with valid image URLs
- Test with invalid URLs (should show placeholder)
- Test with slow network connections

## 🛠️ Troubleshooting

### Common Issues

1. **Images not loading**
   - Check if `image_url` is valid
   - Verify CORS settings for external URLs
   - Ensure network connectivity

2. **Placeholder not showing**
   - Verify `assets/placeholder.png` exists
   - Check import path in ProductCard

3. **Performance issues**
   - Consider image optimization
   - Implement lazy loading for large lists
   - Use appropriate image sizes

### Debug Commands

```bash
# Check if placeholder exists
ls frontend/assets/placeholder.png

# Test API endpoint
curl http://localhost:5000/api/products

# Check database schema
npx prisma studio
```

## 📋 Best Practices

1. **Image Optimization**
   - Use appropriate image sizes (400x400 recommended)
   - Compress images before upload
   - Consider WebP format for better compression

2. **Error Handling**
   - Always provide fallback images
   - Handle network errors gracefully
   - Show loading states

3. **Performance**
   - Cache images when possible
   - Use lazy loading for large lists
   - Optimize image loading in FlatList

4. **Accessibility**
   - Provide alt text for screen readers
   - Ensure sufficient color contrast
   - Test with accessibility tools

## 🔄 Future Enhancements

1. **Image Upload**
   - Add image upload functionality
   - Integrate with Supabase Storage
   - Add image compression

2. **Advanced Features**
   - Image zoom on tap
   - Multiple product images
   - Image carousel for product details

3. **Caching**
   - Implement image caching
   - Offline image support
   - Progressive image loading

---

**This implementation provides a robust foundation for displaying product images in the Sello mobile app.** 