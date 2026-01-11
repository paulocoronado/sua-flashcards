import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Question, AnswerResultPayload } from '@sua-flashcards/shared';

const COLORS = ['#e21b3c', '#1368ce', '#d89e00', '#26890c'];
const SHAPES = ['▲', '◆', '●', '■'];

interface Props {
  question: Question;
  onAnswer: (index: number) => void;
  result: AnswerResultPayload | null; // 👇 Recibimos el resultado (puede ser null)
}

export const GameScreen = ({ question, onAnswer, result }: Props) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Resetear estado local cuando cambia la pregunta
  useEffect(() => {
    setHasSubmitted(false);
  }, [question.id]);

  const handlePress = (index: number) => {
    if (hasSubmitted) return;
    setHasSubmitted(true); // Bloqueo local inmediato
    onAnswer(index);
  };

  // -----------------------------------------------------------
  // ESTADO 3: YA TENEMOS VEREDICTO (Feedback Final)
  // -----------------------------------------------------------
  if (result) {
    const bgColor = result.correct ? '#66bf39' : '#ff3355'; // Verde o Rojo
    const message = result.correct ? '¡Correcto!' : 'Incorrecto';
    const icon = result.correct ? '🎉' : '😢';

    return (
      <View style={[styles.container, { backgroundColor: bgColor, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontSize: 80 }}>{icon}</Text>
        <Text style={{ fontSize: 40, color: 'white', fontWeight: 'bold', marginVertical: 20 }}>{message}</Text>
        
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Puntos ganados</Text>
          <Text style={styles.scoreValue}>+{result.pointsEarned}</Text>
        </View>

        <View style={styles.totalScore}>
          <Text style={{ color: 'white', fontSize: 18 }}>Puntaje Total: {result.score}</Text>
        </View>
      </View>
    );
  }

  // -----------------------------------------------------------
  // ESTADO 2: ESPERANDO AL SERVIDOR (Candado)
  // -----------------------------------------------------------
  if (hasSubmitted) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 60 }}>🔒</Text>
        <Text style={styles.text}>Respuesta enviada</Text>
        <Text style={{ marginTop: 10, color: '#666' }}>Esperando resultado...</Text>
      </View>
    );
  }

  // -----------------------------------------------------------
  // ESTADO 1: JUGANDO (Botones)
  // -----------------------------------------------------------
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>¡Elige rápido!</Text>
      </View>
      <View style={styles.grid}>
        {question.options.map((_, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.btn, { backgroundColor: COLORS[i % 4] }]}
            onPress={() => handlePress(i)}
            activeOpacity={0.8}
          >
            <Text style={styles.shape}>{SHAPES[i]}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f2f2' },
  text: { fontSize: 24, fontWeight: 'bold', marginTop: 10, color: '#333' },
  header: { padding: 20, alignItems: 'center', backgroundColor: 'white', elevation: 2 },
  title: { fontSize: 20, fontWeight: 'bold' },
  grid: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', padding: 10 },
  btn: { width: '46%', height: '45%', margin: '2%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  shape: { fontSize: 50, color: 'white' },
  
  // Estilos de resultado
  scoreBox: { backgroundColor: 'rgba(0,0,0,0.2)', padding: 20, borderRadius: 10, alignItems: 'center', minWidth: 200 },
  scoreLabel: { color: 'white', fontSize: 16 },
  scoreValue: { color: 'white', fontSize: 40, fontWeight: 'bold' },
  totalScore: { marginTop: 30, opacity: 0.9 }
});