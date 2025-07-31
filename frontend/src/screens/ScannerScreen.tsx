import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const ScannerScreen = ({ navigation }: any) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    // Simulate permission check for now
    setHasPermission(true);
  }, []);

  const handleManualScan = () => {
    setScanned(true);
    Alert.alert(
      'QR Code Scanned!',
      'Demo: Product found - Fresh Apples\nPrice: $2.99\nStore: Local Grocery',
      [
        {
          text: 'Scan Again',
          onPress: () => setScanned(false),
        },
        {
          text: 'Add to Cart',
          onPress: () => {
            Alert.alert('Success', 'Product added to cart!');
            navigation.navigate('MainTabs');
          },
        },
      ]
    );
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.text}>Initializing scanner...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Ionicons name="camera-off" size={64} color="#666" />
          <Text style={styles.text}>Camera access required</Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={() => navigation.navigate('MainTabs')}
          >
            <Text style={styles.permissionButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>QR Scanner</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.scannerContainer}>
        <View style={styles.cameraPlaceholder}>
          <MaterialIcons name="qr-code-scanner" size={120} color="#fff" />
          <Text style={styles.placeholderText}>Camera Preview</Text>
        </View>
        
        <View style={styles.overlay}>
          <View style={styles.scanFrame} />
          <Text style={styles.scanText}>Position QR code within frame</Text>
        </View>

        <TouchableOpacity
          style={styles.scanButton}
          onPress={handleManualScan}
        >
          <MaterialIcons name="qr-code-scanner" size={24} color="#fff" />
          <Text style={styles.scanButtonText}>Tap to Scan Demo</Text>
        </TouchableOpacity>

        {scanned && (
          <TouchableOpacity
            style={styles.scanAgainButton}
            onPress={() => setScanned(false)}
          >
            <MaterialIcons name="refresh" size={24} color="#fff" />
            <Text style={styles.scanAgainText}>Scan Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  permissionButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  scannerContainer: {
    flex: 1,
    position: 'relative',
  },
  cameraPlaceholder: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
    opacity: 0.7,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'transparent',
    borderRadius: 20,
  },
  scanText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 30,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  scanButton: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  scanAgainButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: '#28a745',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  scanAgainText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ScannerScreen; 