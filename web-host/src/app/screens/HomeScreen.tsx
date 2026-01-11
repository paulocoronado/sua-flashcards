import React from 'react';

interface Props {
  isConnected: boolean;
  onCreateGame: () => void;
}

export const HomeScreen = ({ isConnected, onCreateGame }: Props) => {
  return (
    <div style={styles.container}>
      <div style={styles.status}>
        {isConnected ? '🟢 Conectado' : '🔴 Conectando...'}
      </div>

      <div style={styles.card}>
        <h1 style={styles.title}>Kahoot Clone</h1>
        <p style={styles.subtitle}>Panel del Profesor</p>
        
        <button 
          onClick={onCreateGame}
          style={styles.button}
          disabled={!isConnected}
        >
          Crear Nueva Sala
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#46178f', color: 'white', fontFamily: 'Segoe UI, sans-serif' },
  card: { backgroundColor: 'white', padding: '40px 60px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', color: '#333' },
  title: { fontSize: '3rem', margin: '0 0 10px 0', color: '#46178f' },
  subtitle: { fontSize: '1.5rem', margin: '0 0 30px 0', color: '#666' },
  button: { padding: '15px 40px', fontSize: '1.2rem', backgroundColor: '#46178f', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
  status: { position: 'absolute', top: 20, right: 20, fontWeight: 'bold' },
};