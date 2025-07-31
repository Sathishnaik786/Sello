import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    // Mock authentication for now
    if (email && password) {
      Alert.alert('Success', 'Login successful!');
      navigation.navigate('MainTabs');
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput 
        style={styles.input}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput 
        style={styles.input}
        secureTextEntry 
        onChangeText={setPassword}
        placeholder="Enter your password"
      />
      <Button title='Login' onPress={handleLogin} />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
}); 