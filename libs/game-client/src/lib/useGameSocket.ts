import { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { GameEvents, Question, AnswerResultPayload } from '@sua-flashcards/shared';

export const useGameSocket = (serverUrl: string) => {
  const socketRef = useRef<Socket | null>(null);
  
  // Estados existentes...
  const [isConnected, setIsConnected] = useState(false);
  const [pin, setPin] = useState<string | null>(null);
  const [players, setPlayers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answersCount, setAnswersCount] = useState(0);

  // 👇 NUEVO ESTADO: El resultado de la última respuesta
  const [lastResult, setLastResult] = useState<AnswerResultPayload | null>(null);

  useEffect(() => {
    socketRef.current = io(serverUrl, { transports: ['websocket'], autoConnect: true });
    const socket = socketRef.current;

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
    
    socket.on(GameEvents.GameCreated, (data) => setPin(data.pin));
    socket.on(GameEvents.PlayerJoined, (data) => setPlayers((prev) => [...prev, data.name]));
    socket.on('player_answered_notification', () => setAnswersCount(prev => prev + 1));
    
    socket.on(GameEvents.Error, (data) => {
        setError(data.message);
        setTimeout(() => setError(null), 3000);
    });

    // 👇 ESCUCHAR EL VEREDICTO
    socket.on(GameEvents.AnswerResult, (result: AnswerResultPayload) => {
      setLastResult(result); // Guardamos el resultado para mostrarlo
    });

    // Cuando empieza una nueva pregunta, limpiamos el resultado anterior
    socket.on(GameEvents.QuestionStart, (question: Question) => {
      setCurrentQuestion(question);
      setAnswersCount(0);
      setLastResult(null); // <--- Resetear feedback
    });

    return () => { socket.disconnect(); };
  }, [serverUrl]);

  const createGame = () => socketRef.current?.emit(GameEvents.CreateGame);
  const joinGame = (pin: string, name: string) => socketRef.current?.emit(GameEvents.JoinGame, { pin, name });
  const startGame = (pin: string) => socketRef.current?.emit(GameEvents.RequestStart, { pin });
  const submitAnswer = (pin: string, answerIndex: number) => socketRef.current?.emit(GameEvents.SubmitAnswer, { pin, answerIndex });

  return { 
    isConnected, pin, players, error, currentQuestion, answersCount,
    createGame, joinGame, startGame, submitAnswer,
    lastResult // <--- Exportamos esto
  };
};