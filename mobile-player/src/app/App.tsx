import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useGameSocket } from '@sua-flashcards/game-client';

// Importamos las pantallas modulares
import { LoginScreen } from './screens/LoginScreen';
import { LobbyScreen } from './screens/LobbyScreen';
import { GameScreen } from './screens/GameScreen';

const API_URL = 'http://192.168.1.14:3000'; 

export default function App() {
  // 1. Obtenemos lógica del Hook
  const { 
    isConnected, 
    error, 
    joinGame, 
    players, 
    currentQuestion, 
    submitAnswer,
    lastResult // <--- Necesario para mostrar si ganó/perdió
  } = useGameSocket(API_URL);

  // 2. Estado Global de la Sesión (Memoria del App)
  const [session, setSession] = useState<{ pin: string; name: string } | null>(null);
  const [isJoined, setIsJoined] = useState(false);

  // Efecto: Sincronizar estado "Unido" con la lista de jugadores del servidor
  useEffect(() => {
    if (session && players.includes(session.name)) {
      setIsJoined(true);
    }
  }, [players, session]);

  // Efecto: Manejo de errores globales
  useEffect(() => {
    if (error) {
      Alert.alert('Error del Servidor', error);
      // Si el servidor nos patea, reseteamos el estado de "unido"
      setIsJoined(false); 
    }
  }, [error]);

  // Handler: Enviar respuesta
  const handleAnswerSubmit = (index: number) => {
    if (session?.pin) {
      console.log(`📱 Enviando respuesta: PIN=${session.pin}, Opción=${index}`);
      submitAnswer(session.pin, index);
    } else {
      Alert.alert('Error Crítico', 'Se perdió la información de la sesión (PIN).');
    }
  };

  // Handler: Unirse al juego
  const handleJoin = (pin: string, name: string) => {
    setSession({ pin, name }); // Guardamos en memoria para no perderlo
    joinGame(pin, name);       // Enviamos al socket
  };

  // 3. ROUTER (Decide qué pantalla mostrar)
  let content;

  if (currentQuestion) {
    // PRIORIDAD 1: Hay una pregunta en curso -> Pantalla de Juego
    content = (
      <GameScreen 
        question={currentQuestion} 
        onAnswer={handleAnswerSubmit} 
        result={lastResult} // Pasamos el veredicto (Verde/Rojo)
      />
    );
  } else if (isJoined && session) {
    // PRIORIDAD 2: Estamos unidos pero no hay pregunta -> Lobby
    content = <LobbyScreen nickname={session.name} />;
  } else {
    // PRIORIDAD 3: No estamos unidos -> Login
    content = (
      <LoginScreen 
        isConnected={isConnected} 
        onJoin={handleJoin} 
      />
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {content}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#46178f', // Fondo morado Kahoot
    justifyContent: 'center', 
    padding: 20 
  }
});