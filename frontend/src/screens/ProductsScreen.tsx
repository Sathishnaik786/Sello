import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import ProductCard, { Product } from '../components/ProductCard';

const ProductsScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Fetch from your API
      const response = await axios.get('http://192.168.1.22:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to mock data for development
      setProducts([
        {
          id: '1',
          name: 'Fresh Apples',
          price: 2.99,
          stock: 50,
          image_url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop',
          description: 'Fresh, crisp apples from local orchards',
        },
        {
          id: '2',
          name: 'Organic Bananas',
          price: 1.99,
          stock: 30,
          image_url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop',
          description: 'Organic bananas, perfect for smoothies',
        },
        {
          id: '3',
          name: 'Whole Grain Bread',
          price: 3.49,
          stock: 20,
          image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
          description: 'Freshly baked whole grain bread',
        },
        {
          id: '4',
          name: 'Fresh Milk',
          price: 4.99,
          stock: 15,
          image_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop',
          description: 'Farm fresh milk, delivered daily',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    // Handle add to cart logic here
    console.log('Added to cart:', product.name);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard product={item} onAddToCart={handleAddToCart} />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
});

export default ProductsScreen; 