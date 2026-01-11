import React from 'react';
import { Player } from '@sua-flashcards/shared';

interface Props {
  podium: Player[];
  onRestart: () => void;
}

export const PodiumScreen = ({ podium, onRestart }: Props) => {
  // Asignamos medallas
  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏆 Podio Final 🏆</h1>
      
      <div style={styles.podiumContainer}>
        {podium.map((player, index) => (
          <div key={player.id} style={{...styles.podiumStep, height: index === 0 ? '300px' : index === 1 ? '250px' : '200px'}}>
            <div style={styles.medal}>{medals[index]}</div>
            <div style={styles.playerName}>{player.name}</div>
            <div style={styles.playerScore}>{player.score} pts</div>
          </div>
        ))}
      </div>

      <button onClick={onRestart} style={styles.restartBtn}>
        Jugar Otra Vez 🔄
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#46178f', color: 'white', fontFamily: 'Segoe UI, sans-serif' },
  title: { fontSize: '4rem', marginTop: '50px' },
  podiumContainer: { display: 'flex', alignItems: 'flex-end', gap: '20px', marginTop: '50px' },
  podiumStep: { width: '200px', backgroundColor: 'white', borderRadius: '10px 10px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#333', boxShadow: '0 0 20px rgba(255,255,255,0.2)' },
  medal: { fontSize: '4rem', marginBottom: '10px' },
  playerName: { fontSize: '2rem', fontWeight: 'bold' },
  playerScore: { fontSize: '1.5rem', color: '#666' },
  restartBtn: { marginTop: '50px', padding: '15px 40px', fontSize: '1.5rem', cursor: 'pointer', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: 5 }
};