import React from 'react';
import { Question } from '@sua-flashcards/shared';

const COLORS = ['#e21b3c', '#1368ce', '#d89e00', '#26890c'];

interface Props {
  question: Question;
  pin: string;
  answersCount: number;
  totalPlayers: number;
}

export const GameScreen = ({ question, pin, answersCount, totalPlayers }: Props) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.question}>{question.text}</h1>
        <div style={styles.timer}>30</div> 
      </div>

      <div style={styles.grid}>
        {question.options.map((opt, i) => (
          <div key={i} style={{...styles.card, backgroundColor: COLORS[i % 4]}}>
            <span style={styles.shape}>{['▲', '◆', '●', '■'][i]}</span>
            <span>{opt}</span>
          </div>
        ))}
      </div>
      
      <div style={styles.footer}>
        <span>PIN: {pin}</span>
        <span style={{fontSize: 24, fontWeight: 'bold'}}>
          Respuestas: {answersCount} / {totalPlayers}
        </span>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f2f2f2', fontFamily: 'Segoe UI, sans-serif' },
  header: { backgroundColor: 'white', padding: '30px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', height: '20vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  question: { fontSize: '2.5rem', color: '#333', margin: 0 },
  timer: { position: 'absolute', left: 20, width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#46178f', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold' },
  grid: { flex: 1, padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  card: { display: 'flex', alignItems: 'center', padding: '0 40px', borderRadius: '5px', color: 'white', fontSize: '2rem', fontWeight: 'bold', boxShadow: '0 4px 0 rgba(0,0,0,0.2)' },
  shape: { marginRight: '20px', fontSize: '3rem' },
  footer: { padding: '10px 20px', backgroundColor: '#333', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.2rem' }
};