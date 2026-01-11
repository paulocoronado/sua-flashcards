import { useGameSocket } from '@sua-flashcards/game-client';
import { HomeScreen } from './screens/HomeScreen';
import { LobbyScreen } from './screens/LobbyScreen';
import { GameScreen } from './screens/GameScreen';

export function App() {
  const { 
    isConnected, 
    pin, 
    players, 
    createGame, 
    startGame, 
    currentQuestion,
    answersCount 
  } = useGameSocket('http://localhost:3000');

  // 1. Prioridad: ¿Hay una pregunta activa? -> Pantalla de Juego
  if (currentQuestion) {
    return (
      <GameScreen 
        question={currentQuestion} 
        pin={pin || ''}
        answersCount={answersCount}
        totalPlayers={players.length}
      />
    );
  }

  // 2. ¿Tenemos PIN? -> Pantalla de Lobby (Esperando)
  if (pin) {
    return (
      <LobbyScreen 
        pin={pin} 
        players={players} 
        onStartGame={() => startGame(pin)} 
      />
    );
  }

  // 3. Por defecto -> Pantalla de Inicio
  return (
    <HomeScreen 
      isConnected={isConnected} 
      onCreateGame={createGame} 
    />
  );
}

export default App;