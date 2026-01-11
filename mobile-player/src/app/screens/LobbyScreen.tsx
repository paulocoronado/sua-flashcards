import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const LobbyScreen = ({ nickname }: { nickname: string }) => (
  <View style={styles.card}>
    <Text style={styles.title}>¡Estás dentro!</Text>
    <Text style={{ fontSize: 60, marginVertical: 20 }}>🚀</Text>
    <Text>Esperando al profesor...</Text>
    <Text style={styles.name}>{nickname}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', padding: 40, borderRadius: 15, alignItems: 'center', elevation: 5 },
  title: { fontSize: 24, fontWeight: 'bold' },
  name: { fontSize: 20, fontWeight: 'bold', marginTop: 10, color: '#46178f' }
});