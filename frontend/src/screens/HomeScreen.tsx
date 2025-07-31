import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import TopBar from '../components/TopBar';

interface Store {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export default function HomeScreen({ navigation }: any) {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStores = async () => {
    try {
      // Try multiple IP addresses for better connectivity
      const apiUrls = [
        'http://192.168.1.23:5000/api/stores',  // Same network as Expo server
        'http://192.168.1.22:5000/api/stores',
        'http://localhost:5000/api/stores',
        'http://127.0.0.1:5000/api/stores'
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
        console.log('✅ API Response:', response.data);
        setStores(response.data || []);
        setError(null);
      } else {
        throw new Error('Could not connect to any API endpoint');
      }
    } catch (error) {
      console.error('Error fetching stores:', error);
      setError('Failed to load stores from API');
      // Fallback to mock data for development
      const mockStores = [
        {
          id: '1',
          name: 'Corner Shop',
          address: '123 Main St, City',
          lat: 40.7128,
          lng: -74.0060,
        },
        {
          id: '2',
          name: 'Sathish Market',
          address: '456 Oak Ave, Town',
          lat: 40.7589,
          lng: -73.9851,
        },
        {
          id: '3',
          name: 'Balaji Grocery',
          address: '789 Pine Rd, Village',
          lat: 40.7505,
          lng: -73.9934,
        },
      ];
      console.log('📱 Using mock data:', mockStores);
      setStores(mockStores);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStores();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const renderStore = ({ item }: { item: Store }) => {
    // Add comprehensive safety check for undefined item
    if (!item) {
      console.log('❌ renderStore: item is null/undefined');
      return null;
    }
    
    if (!item.name) {
      console.log('❌ renderStore: item.name is missing:', item);
      return null;
    }
    
    return (
      <TouchableOpacity
        style={styles.storeCard}
        onPress={() => navigation.navigate('StoreDetails', { store: item })}
      >
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>{item.name}</Text>
          <Text style={styles.storeAddress}>{item.address || 'No address available'}</Text>
        </View>
        <View style={styles.storeActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('StoreDetails', { store: item })}
          >
            <Text style={styles.actionButtonText}>View</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading stores...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      
      <FlatList
        data={(stores || []).filter(store => store && store.name)} // Ensure stores is never undefined
        renderItem={renderStore}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {error ? 'Failed to load stores' : 'No stores found'}
            </Text>
            <Text style={styles.emptySubtext}>
              {error ? 'Using demo data' : 'Check back later for new stores'}
            </Text>
          </View>
        }
      />


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 20,
  },
  storeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  storeAddress: {
    fontSize: 14,
    color: '#666',
  },
  storeActions: {
    marginTop: 15,
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },

}); 