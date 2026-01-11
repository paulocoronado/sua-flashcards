import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { GameService } from '../game.service';
import { GameEvents } from '@sua-flashcards/shared';

@Injectable()
export class StartGameHandler {
  constructor(private readonly gameService: GameService) {}

  execute(server: Server, client: Socket, payload: { pin: string }) {
    try {
      const result = this.gameService.startGame(payload.pin);
      
      if (result.status === 'playing') {
        // CASO A: Seguimos jugando
        server.to(payload.pin).emit(GameEvents.QuestionStart, result.question);
        console.log(`🚀 Siguiente pregunta en sala ${payload.pin}`);
      
      } else {
        // CASO B: Fin del juego (Podio)
        server.to(payload.pin).emit('game_over', result.podium);
        console.log(`🏆 Juego terminado en sala ${payload.pin}`);
      }

    } catch (error) {
      client.emit(GameEvents.Error, { message: (error as Error).message });
    }
  }
}