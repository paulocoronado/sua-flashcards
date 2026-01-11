export enum GameEvents {
  CreateGame = 'create_game',
  JoinGame = 'join_game',
  GameCreated = 'game_created',
  PlayerJoined = 'player_joined',
  Error = 'error_msg',
  RequestStart = 'request_start',
  QuestionStart = 'question_start',
  SubmitAnswer = 'submit_answer',
  AnswerResult = 'answer_result', 
}

export interface Question {
  id: string;
  text: string;
  options: string[];
}

export interface AnswerResultPayload {
  correct: boolean;      // ¿Acertaste?
  score: number;         // Tu puntaje total acumulado
  pointsEarned: number;  // Cuánto ganaste en esta ronda
  correctAnswerIndex: number; // Para mostrar cuál era la correcta
}

export interface Player {
  id: string;
  name: string;
  score: number; // Agregamos el puntaje al jugador
}