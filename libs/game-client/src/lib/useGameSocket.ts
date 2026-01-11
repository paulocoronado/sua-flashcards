import { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { GameEvents, Question, AnswerResultPayload, Player } from '@sua-flashcards/shared';

export const useGameSocket = (serverUrl: string) => {
  const socketRef = useRef<Socket | null>(null);
  
  // --- ESTADOS DE CONEXIÓN ---
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- ESTADOS DE LOBBY ---
  const [pin, setPin] = useState<string | null>(null);
  const [players, setPlayers] = useState<string[]>([]);

  // --- ESTADOS DE JUEGO (Comunes) ---
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answersCount, setAnswersCount] = useState(0);

  // --- ESTADOS DE RESULTADOS (Móvil) ---
  const [lastResult, setLastResult] = useState<AnswerResultPayload | null>(null);

  // --- ESTADOS DE RESULTADOS (Web/Host) ---
  const [roundStats, setRoundStats] = useState<{ votes: number[], correctOptionIndex: number } | null>(null);
  const [podium, setPodium] = useState<Player[] | null>(null);

  useEffect(() => {
    // 1. Conexión
    socketRef.current = io(serverUrl, { 
        transports: ['websocket'], 
        autoConnect: true 
    });

    const socket = socketRef.current;

    // 2. Listeners Base
    socket.on('connect', () => {
        console.log('✅ Conectado al Socket');
        setIsConnected(true);
    });
    
    socket.on('disconnect', () => setIsConnected(false));
    
    socket.on(GameEvents.Error, (data) => {
        setError(data.message);
        setTimeout(() => setError(null), 3000);
    });

    // 3. Listeners de Lobby
    socket.on(GameEvents.GameCreated, (data) => {
      setPin(data.pin);
      setPlayers([]);     // Resetear jugadores al crear
      setPodium(null);    // Resetear podio
      setRoundStats(null);
    });
    
    socket.on(GameEvents.PlayerJoined, (data) => {
      setPlayers((prev) => {
        if (!prev.includes(data.name)) return [...prev, data.name];
        return prev;
      });
    });

    // 4. Listeners de Juego
    socket.on(GameEvents.QuestionStart, (question: Question) => {
      setCurrentQuestion(question);
      setAnswersCount(0);       // Resetear contador
      setLastResult(null);      // Resetear feedback móvil
      setRoundStats(null);      // Quitar pantalla de resultados web
      setPodium(null);          // Asegurar que no hay podio
    });

    socket.on('player_answered_notification', () => {
      setAnswersCount((prev) => prev + 1);
    });

    // 5. Listeners de Resultados (Móvil)
    socket.on(GameEvents.AnswerResult, (result: AnswerResultPayload) => {
      setLastResult(result);
    });

    // 6. Listeners de Resultados (Web)
    socket.on('show_results_screen', (stats) => {
      setRoundStats(stats);
      setCurrentQuestion(null); // Ocultar pregunta para mostrar gráfico
    });

    // 7. Listener de Fin de Juego (Web)
    socket.on('game_over', (top3: Player[]) => {
      setPodium(top3);
      setCurrentQuestion(null);
      setRoundStats(null);
    });

    return () => { socket.disconnect(); };
  }, [serverUrl]);

  // --- ACCIONES (Emitters) ---
  const createGame = () => socketRef.current?.emit(GameEvents.CreateGame);
  
  const joinGame = (pin: string, name: string) => {
    socketRef.current?.emit(GameEvents.JoinGame, { pin, name });
  };

  const startGame = (pin: string) => {
    socketRef.current?.emit(GameEvents.RequestStart, { pin });
  };
  
  const submitAnswer = (pin: string, answerIndex: number) => {
    socketRef.current?.emit(GameEvents.SubmitAnswer, { pin, answerIndex });
  };

  const requestShowResults = (pin: string) => {
    socketRef.current?.emit('request_show_results', { pin });
  };

  // --- EXPORTAR TODO ---
  return { 
    // Estado
    isConnected, 
    error, 
    pin, 
    players, 
    currentQuestion, 
    answersCount, 
    lastResult, 
    roundStats, 
    podium,

    // Funciones
    createGame, 
    joinGame, 
    startGame, 
    submitAnswer,
    requestShowResults
  };
};