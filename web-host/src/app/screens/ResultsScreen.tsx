import React from 'react';

const COLORS = ['#e21b3c', '#1368ce', '#d89e00', '#26890c'];

interface Props {
  votes: number[];
  correctIndex: number;
  onNextQuestion: () => void;
}

export const ResultsScreen = ({ votes, correctIndex, onNextQuestion }: Props) => {
  // Calculamos la altura máxima para que las barras se vean bien (evitando división por 0)
  const maxVotes = Math.max(...votes, 1);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Resultados de la Ronda</h1>
      
      <div style={styles.chartArea}>
        {votes.map((voteCount, index) => {
          // Calculamos el porcentaje de altura respecto al más votado
          const heightPercent = (voteCount / maxVotes) * 100;
          const isCorrect = index === correctIndex;

          return (
            <div key={index} style={styles.barColumn}>
              {/* Número de votos arriba */}
              <div style={styles.voteCount}>{voteCount}</div>
              
              {/* La barra de color */}
              <div 
                style={{
                  ...styles.bar,
                  height: `${heightPercent}%`,
                  backgroundColor: COLORS[index % COLORS.length],
                  opacity: isCorrect ? 1 : 0.3, // Opacamos las incorrectas para resaltar la ganadora
                  border: isCorrect ? '4px solid white' : 'none'
                }}
              />
              
              {/* Icono de check si es correcta */}
              <div style={styles.barLabel}>
                {isCorrect ? '✅' : ''} 
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={onNextQuestion} style={styles.nextBtn}>
        Siguiente Pregunta ➡️
      </button>
    </div>
  );
};

// Estilos CSS-in-JS
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#46178f',
    padding: '20px',
    fontFamily: 'Segoe UI, sans-serif',
    color: 'white'
  },
  title: {
    fontSize: '3rem',
    marginBottom: '50px',
    textAlign: 'center'
  },
  chartArea: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '400px',
    width: '80%',
    maxWidth: '800px',
    gap: '20px',
    marginBottom: '50px'
  },
  barColumn: {
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  bar: {
    width: '80%',
    borderRadius: '5px 5px 0 0',
    transition: 'height 0.5s ease-out',
    minHeight: '10px' // Para que siempre se vea una rayita aunque sea 0
  },
  voteCount: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  barLabel: {
    marginTop: '10px',
    fontSize: '2rem',
    height: '40px'
  },
  nextBtn: {
    padding: '15px 40px',
    fontSize: '1.5rem',
    cursor: 'pointer',
    backgroundColor: 'white',
    color: '#333',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    boxShadow: '0 4px 0 #ccc'
  }
};