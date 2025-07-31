import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const categories = [
  { name: 'Bakery', icon: 'bread-slice' },
  { name: 'Kirana', icon: 'store' },
  { name: 'Supermarket', icon: 'shopping-cart' },
  { name: 'Fruit Shop', icon: 'apple-alt' },
  { name: 'Pharmacy', icon: 'capsules' },
  { name: 'Cafe', icon: 'coffee' },
  { name: 'Butcher', icon: 'drumstick-bite' },
];

const TopBar = () => {
  return (
    <View style={styles.container}>
      {/* Top Row: Logo, Search, Scanner */}
      <View style={styles.topRow}>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" />
          <TextInput placeholder="Search stores, products..." style={styles.searchInput} />
        </View>
        <TouchableOpacity style={styles.scanIcon}>
          <MaterialIcons name="qr-code-scanner" size={24} color="#444" />
        </TouchableOpacity>
      </View>

      {/* Location Picker */}
      <View style={styles.locationRow}>
        <Ionicons name="location-sharp" size={18} color="#d00" />
        <Text style={styles.locationText}>Current Location: Mumbai, India</Text>
        <TouchableOpacity>
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {categories.map((cat) => (
          <TouchableOpacity key={cat.name} style={styles.categoryItem}>
            <FontAwesome5 name={cat.icon as any} size={20} color="#333" />
            <Text style={styles.categoryText}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  searchInput: {
    marginLeft: 6,
    flex: 1,
    fontSize: 14,
  },
  scanIcon: {
    marginLeft: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 10,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 13,
    color: '#444',
  },
  changeText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#007BFF',
  },
  categories: {
    flexDirection: 'row',
    marginTop: 4,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryText: {
    fontSize: 12,
    marginTop: 4,
    color: '#333',
  },
}); 