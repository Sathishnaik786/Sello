import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

// Import your screen components
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ScannerScreen from '../screens/ScannerScreen';
import OrdersScreen from '../screens/OrdersScreen';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }: any) => (
  <TouchableOpacity
    style={styles.customButton}
    onPress={onPress}
  >
    <View style={styles.scannerButton}>
      {children}
    </View>
  </TouchableOpacity>
);

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#fff',
          height: 70,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home" size={24} color={focused ? '#007bff' : '#aaa'} />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="grid" size={24} color={focused ? '#007bff' : '#aaa'} />
          ),
        }}
      />
      <Tab.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="qr-code-scanner" size={30} color="#fff" />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5 name="box" size={22} color={focused ? '#007bff' : '#aaa'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 6,
  },
  customButton: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
}); 