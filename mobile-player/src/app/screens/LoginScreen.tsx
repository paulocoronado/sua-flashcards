import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

interface Props {
  isConnected: boolean;
  onJoin: (pin: string, name: string) => void;
}

export const LoginScreen = ({ isConnected, onJoin }: Props) => {
  const [pin, setPin] = useState('');
  const [name, setName] = useState('');

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Unirse a Kahoot</Text>
      
      {/* Indicador de estado */}
      <View style={styles.statusRow}>
        <View style={[styles.dot, { backgroundColor: isConnected ? '#4CAF50' : '#F44336' }]} />
        <Text style={{ color: isConnected ? 'green' : 'red' }}>
          {isConnected ? 'Servidor Online' : 'Desconectado'}
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="PIN"
        keyboardType="numeric"
        onChangeText={setPin}
        maxLength={4}
      />
      <TextInput
        style={styles.input}
        placeholder="Apodo"
        onChangeText={setName}
      />

      <TouchableOpacity
        style={[styles.btn, !isConnected && styles.btnDisabled]}
        onPress={() => {
          if (!pin || !name) return Alert.alert('Faltan datos');
          onJoin(pin, name);
        }}
        disabled={!isConnected}
      >
        <Text style={styles.btnText}>ENTRAR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', padding: 30, borderRadius: 15, width: '100%', alignItems: 'center', elevation: 5 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  input: { width: '100%', height: 50, backgroundColor: '#f0f0f0', borderRadius: 8, marginBottom: 15, paddingHorizontal: 15, borderWidth: 1, borderColor: '#ddd' },
  btn: { backgroundColor: '#333', padding: 15, width: '100%', borderRadius: 8, alignItems: 'center' },
  btnDisabled: { backgroundColor: '#ccc' },
  btnText: { color: 'white', fontWeight: 'bold' }
});