import { Player, Question, AnswerResultPayload } from '@sua-flashcards/shared';

// Definición de pregunta interna (con respuesta correcta)
export interface ServerQuestion extends Question {
  correctAnswerIndex: number;
}

export class GameSession {
  public players = new Map<string, Player>();
  public currentQuestionIndex = -1;
  public currentVotes: number[] = [0, 0, 0, 0];

  constructor(
    public readonly pin: string,
    private readonly questions: ServerQuestion[],
  ) {}

  addPlayer(clientId: string, name: string) {
    // Si ya existe, actualizamos el socket ID (reconexión) pero mantenemos puntaje
    if (!this.players.has(clientId)) {
      this.players.set(clientId, { id: clientId, name, score: 0 });
    }
  }

  getPlayer(clientId: string): Player {
    const player = this.players.get(clientId);
    if (!player) throw new Error('Jugador no encontrado en esta sesión');
    return player;
  }

  getAllPlayers(): Player[] {
    return Array.from(this.players.values());
  }

  nextQuestion() {
    let nextIndex = this.currentQuestionIndex + 1;

    // 👇 CAMBIO: Si se acaban las preguntas, devolvemos null (Fin del juego)
    if (nextIndex >= this.questions.length) {
      return null;
    }

    this.currentQuestionIndex = nextIndex;
    this.currentVotes = [0, 0, 0, 0];

    const q = this.questions[nextIndex];
    return { id: q.id, text: q.text, options: q.options };
  }

  processAnswer(clientId: string, answerIndex: number): AnswerResultPayload {
    const player = this.getPlayer(clientId);
    const currentQ = this.questions[this.currentQuestionIndex];
    const isCorrect = currentQ.correctAnswerIndex === answerIndex;

    // Registrar voto
    if (this.currentVotes[answerIndex] !== undefined) {
      this.currentVotes[answerIndex]++;
    }

    let pointsEarned = 0;
    if (isCorrect) {
      pointsEarned = 100;
      player.score += pointsEarned;
    }

    return {
      correct: isCorrect,
      score: player.score,
      pointsEarned,
      correctAnswerIndex: currentQ.correctAnswerIndex,
    };
  }

  getStats() {
    const currentQ = this.questions[this.currentQuestionIndex];
    return {
      votes: this.currentVotes,
      correctOptionIndex: currentQ.correctAnswerIndex,
    };
  }

  getPodium() {
    // Convertimos el mapa a array y ordenamos por puntaje descendente
    const sortedPlayers = Array.from(this.players.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, 3); // Tomamos solo los 3 primeros

    return sortedPlayers;
  }
}
