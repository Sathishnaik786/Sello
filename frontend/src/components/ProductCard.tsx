import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  image_url?: string; // image stored as public URL from Supabase or other host (can be null)
  store_id?: string; // matches your Supabase schema
};

type Props = {
  product: Product;
  onAddToCart?: (product: Product) => void;
};

const ProductCard = ({ product, onAddToCart }: Props) => {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      Alert.alert('Success', `${product.name} added to cart!`);
    }
  };

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: product.image_url || 'https://via.placeholder.com/80x80' }}
        style={styles.image}
        defaultSource={require('../../assets/placeholder.png')} // fallback image
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        {product.description && (
          <Text style={styles.description} numberOfLines={2}>
            {product.description}
          </Text>
        )}
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.stock}>Stock: {product.stock} available</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 18,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  stock: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProductCard; 