import React from 'react';
import { useGameSocket } from '@sua-flashcards/game-client';

// Importamos todas las pantallas modulares
import { HomeScreen } from './screens/HomeScreen';
import { LobbyScreen } from './screens/LobbyScreen';
import { GameScreen } from './screens/GameScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { PodiumScreen } from './screens/PodiumScreen';

export function App() {
  // Obtenemos todo el estado del juego desde nuestro Hook
  const { 
    isConnected, 
    pin, 
    players, 
    currentQuestion, 
    answersCount,
    roundStats,       // Estadísticas para el gráfico de barras
    podium,           // Datos de los ganadores finales
    createGame, 
    startGame, 
    requestShowResults 
  } = useGameSocket('http://localhost:3000');

  // -----------------------------------------------------------------------
  // ROUTER: Decide qué pantalla mostrar según el estado del juego
  // -----------------------------------------------------------------------

  // 1. ¿Juego Terminado? -> Mostrar Podio
  if (podium) {
    return (
      <PodiumScreen 
        podium={podium} 
        onRestart={() => window.location.reload()} 
      />
    );
  }

  // 2. ¿Tenemos estadísticas de la ronda? -> Mostrar Gráfico de Barras
  if (roundStats) {
    return (
      <ResultsScreen 
        votes={roundStats.votes}
        correctIndex={roundStats.correctOptionIndex}
        // Al dar "Siguiente", reutilizamos startGame para pedir la próxima pregunta
        onNextQuestion={() => pin && startGame(pin)} 
      />
    );
  }

  // 3. ¿Hay una pregunta activa? -> Mostrar Pantalla de Juego
  if (currentQuestion) {
    return (
      <GameScreen 
        question={currentQuestion} 
        pin={pin || ''}
        answersCount={answersCount}
        totalPlayers={players.length}
        onShowResults={() => pin && requestShowResults(pin)}
      />
    );
  }

  // 4. ¿Tenemos PIN pero no ha empezado? -> Mostrar Lobby
  if (pin) {
    return (
      <LobbyScreen 
        pin={pin} 
        players={players} 
        onStartGame={() => startGame(pin)} 
      />
    );
  }

  // 5. Por defecto -> Mostrar Pantalla de Inicio (Crear Sala)
  return (
    <HomeScreen 
      isConnected={isConnected} 
      onCreateGame={createGame} 
    />
  );
}

export default App;