import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { GameService } from '../game.service';
import { GameEvents } from '@sua-flashcards/shared';

@Injectable()
export class StartGameHandler {
  constructor(private readonly gameService: GameService) {}

  execute(server: Server, client: Socket, payload: { pin: string }) {
    try {
      const question = this.gameService.startGame(payload.pin);
      
      // Enviamos la pregunta a todos en la sala
      server.to(payload.pin).emit(GameEvents.QuestionStart, question);
      
      console.log(`🚀 Pregunta iniciada en sala ${payload.pin}`);
    } catch (error) {
      client.emit(GameEvents.Error, { message: (error as Error).message });
    }
  }
}