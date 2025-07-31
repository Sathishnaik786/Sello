import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import ProductCard, { Product } from '../components/ProductCard';

interface Store {
  id: string;
  name: string;
  address?: string;
  lat?: number;
  lng?: number;
  owner_id?: string | null;
  // Optional owner object for backward compatibility
  owner?: {
    name: string;
    phone: string;
  };
  isApproved?: boolean;
}

const StoreDetailsScreen = ({ route, navigation }: any) => {
  const { store } = route.params;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Add safety check for store parameter
  if (!store) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Store Not Found</Text>
          <View style={{ width: 50 }} />
        </View>
        <View style={styles.content}>
          <Text style={styles.errorText}>Store information not available</Text>
        </View>
      </SafeAreaView>
    );
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Try multiple IP addresses for better connectivity
      const apiUrls = [
        `http://192.168.1.23:5000/api/products?storeId=${store.id}`,  // Same network as Expo server
        `http://192.168.1.22:5000/api/products?storeId=${store.id}`,
        `http://localhost:5000/api/products?storeId=${store.id}`,
        `http://127.0.0.1:5000/api/products?storeId=${store.id}`
      ];
      
      let response = null;
      for (const url of apiUrls) {
        try {
          response = await axios.get(url);
          break;
        } catch (err) {
          console.log(`Failed to connect to ${url}`);
        }
      }
      
      if (response) {
        setProducts(response.data);
      } else {
        throw new Error('Could not connect to any API endpoint');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Show mock data for development
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

  const addToCart = (product: Product) => {
    Alert.alert('Success', `${product.name} added to cart!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{store.name}</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>{store.name}</Text>
          {store.address && (
            <Text style={styles.storeAddress}>Address: {store.address}</Text>
          )}
          {store.owner ? (
            <>
              <Text style={styles.storeOwner}>Owner: {store.owner.name}</Text>
              <Text style={styles.storePhone}>Phone: {store.owner.phone}</Text>
            </>
          ) : (
            <Text style={styles.storeOwner}>Owner: Not specified</Text>
          )}
          {store.isApproved !== undefined && (
            <View style={styles.statusContainer}>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: store.isApproved ? '#4CAF50' : '#FF9800' },
                ]}
              >
                <Text style={styles.statusText}>
                  {store.isApproved ? 'Approved' : 'Pending Approval'}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>Products</Text>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading products...</Text>
            </View>
          ) : (
            <View style={styles.productsContainer}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.primaryButtonText}>View Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Orders')}
        >
          <Text style={styles.secondaryButtonText}>My Orders</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  storeInfo: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  storeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  storeAddress: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  storeOwner: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  storePhone: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  statusContainer: {
    flexDirection: 'row',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  productsContainer: {
    gap: 15,
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 15,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default StoreDetailsScreen; 