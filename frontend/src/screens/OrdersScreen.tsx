import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

interface Order {
  id: string;
  store: {
    name: string;
  };
  items: any[];
  total: number;
  status: 'PENDING' | 'READY' | 'PICKED_UP' | 'CANCELLED';
  createdAt: string;
}

const OrdersScreen = ({ navigation }: any) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Try multiple API URLs for better connectivity
      const apiUrls = [
        'http://192.168.1.23:5000/api/orders',
        'http://192.168.1.22:5000/api/orders',
        'http://localhost:5000/api/orders',
        'http://127.0.0.1:5000/api/orders',
      ];

      let response = null;
      for (const url of apiUrls) {
        try {
          response = await axios.get(url);
          console.log('✅ Orders API Response from:', url);
          break;
        } catch (error) {
          console.log('❌ Failed to fetch from:', url);
        }
      }

      if (response) {
        setOrders(response.data);
      } else {
        throw new Error('All API endpoints failed');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Show mock data for development
      setOrders([
        {
          id: '1',
          store: { name: 'Balaji Grocery' },
          items: [{ name: 'Fresh Apples', quantity: 2, price: 2.99 }],
          total: 5.98,
          status: 'READY',
          createdAt: '2025-07-30T18:00:00Z',
        },
        {
          id: '2',
          store: { name: 'Corner Shop' },
          items: [
            { name: 'Organic Bananas', quantity: 1, price: 1.99 },
            { name: 'Whole Grain Bread', quantity: 1, price: 3.49 },
          ],
          total: 5.48,
          status: 'PENDING',
          createdAt: '2025-07-30T17:30:00Z',
        },
        {
          id: '3',
          store: { name: 'Sathish Market' },
          items: [{ name: 'Fresh Milk', quantity: 1, price: 4.99 }],
          total: 4.99,
          status: 'PICKED_UP',
          createdAt: '2025-07-30T16:00:00Z',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return '#FF9800';
      case 'READY':
        return '#4CAF50';
      case 'PICKED_UP':
        return '#2196F3';
      case 'CANCELLED':
        return '#F44336';
      default:
        return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Preparing';
      case 'READY':
        return 'Ready for Pickup';
      case 'PICKED_UP':
        return 'Completed';
      case 'CANCELLED':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading orders...</Text>
          </View>
        ) : (
          <View style={styles.ordersContainer}>
            {orders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <Text style={styles.storeName}>{order.store.name}</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(order.status) },
                    ]}
                  >
                    <Text style={styles.statusText}>
                      {getStatusText(order.status)}
                    </Text>
                  </View>
                </View>

                <View style={styles.orderItems}>
                  {order.items.map((item, index) => (
                    <Text key={index} style={styles.orderItem}>
                      {item.quantity}x {item.name} - ${item.price.toFixed(2)}
                    </Text>
                  ))}
                </View>

                <View style={styles.orderFooter}>
                  <Text style={styles.orderDate}>
                    {formatDate(order.createdAt)}
                  </Text>
                  <Text style={styles.orderTotal}>
                    Total: ${order.total.toFixed(2)}
                  </Text>
                </View>

                {order.status === 'READY' && (
                  <TouchableOpacity style={styles.pickupButton}>
                    <Text style={styles.pickupButtonText}>Mark as Picked Up</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  ordersContainer: {
    padding: 20,
  },
  orderCard: {
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
  orderItems: {
    marginBottom: 15,
  },
  orderItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  orderDate: {
    fontSize: 12,
    color: '#999',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  pickupButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  pickupButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default OrdersScreen; 