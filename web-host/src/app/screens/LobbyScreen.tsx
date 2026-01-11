import React from 'react';

interface Props {
  pin: string;
  players: string[];
  onStartGame: () => void;
}

export const LobbyScreen = ({ pin, players, onStartGame }: Props) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.pinBox}>
          <span style={styles.pinLabel}>PIN DEL JUEGO:</span>
          <strong style={styles.pinNumber}>{pin}</strong>
        </div>
      </div>

      <div style={styles.content}>
        <h3 style={{color: 'white'}}>👤 Jugadores ({players.length}):</h3>
        
        <div style={styles.playerList}>
          {players.length === 0 ? (
            <p style={{color: '#ddd', fontSize: 20}}>Esperando alumnos...</p>
          ) : (
            players.map((p, i) => (
              <div key={i} style={styles.playerTag}>{p}</div>
            ))
          )}
        </div>
      </div>

      <div style={styles.footer}>
        <button 
          onClick={onStartGame}
          style={players.length > 0 ? styles.button : styles.buttonDisabled}
          disabled={players.length === 0}
        >
          {players.length === 0 ? 'Esperando jugadores...' : 'COMENZAR JUEGO 🚀'}
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#46178f', fontFamily: 'Segoe UI, sans-serif' },
  header: { padding: '20px', textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.1)' },
  pinBox: { backgroundColor: 'white', display: 'inline-block', padding: '10px 40px', borderRadius: '50px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' },
  pinLabel: { display: 'block', fontSize: '14px', color: '#666', fontWeight: 'bold' },
  pinNumber: { fontSize: '60px', lineHeight: '1', color: '#333' },
  content: { flex: 1, padding: '40px', textAlign: 'center' },
  playerList: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', marginTop: 20 },
  playerTag: { backgroundColor: '#333', color: 'white', padding: '15px 30px', fontSize: '24px', borderRadius: '5px', fontWeight: 'bold' },
  footer: { padding: '20px', textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.2)' },
  button: { padding: '15px 50px', fontSize: '24px', backgroundColor: '#fff', color: '#333', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 5px 0 #ccc' },
  buttonDisabled: { padding: '15px 50px', fontSize: '24px', backgroundColor: '#ccc', color: '#666', border: 'none', borderRadius: '5px', cursor: 'not-allowed' },
};