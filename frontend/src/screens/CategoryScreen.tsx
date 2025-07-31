import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';

const categories = [
  { id: '1', name: 'Bakery', icon: 'bread-slice', color: '#FF6B6B' },
  { id: '2', name: 'Kirana', icon: 'store', color: '#4ECDC4' },
  { id: '3', name: 'Supermarket', icon: 'shopping-cart', color: '#45B7D1' },
  { id: '4', name: 'Fruit Shop', icon: 'apple-alt', color: '#96CEB4' },
  { id: '5', name: 'Pharmacy', icon: 'capsules', color: '#FFEAA7' },
  { id: '6', name: 'Cafe', icon: 'coffee', color: '#DDA0DD' },
  { id: '7', name: 'Butcher', icon: 'drumstick-bite', color: '#F8BBD9' },
  { id: '8', name: 'Dairy', icon: 'cheese', color: '#FFF9C4' },
];

const CategoryScreen = ({ navigation }: any) => {
  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate('MainTabs', { category: item.name })}
    >
      <FontAwesome5 name={item.icon as any} size={32} color="#fff" />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <Text style={styles.subtitle}>Browse by store type</Text>
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
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
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  gridContainer: {
    padding: 16,
  },
  categoryCard: {
    flex: 1,
    margin: 8,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});

export default CategoryScreen; 