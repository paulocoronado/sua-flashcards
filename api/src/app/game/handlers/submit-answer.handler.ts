import { Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { GameService } from '../game.service';
import { GameEvents } from '@sua-flashcards/shared';

@Injectable()
export class SubmitAnswerHandler {
  constructor(private readonly gameService: GameService) {}

  execute(server: Server, client: Socket, payload: { pin: string, answerIndex: number }) {
    try {
      // 1. Lógica de Negocio
      const result = this.gameService.submitAnswer(payload.pin, client.id, payload.answerIndex);
      
      console.log(`📩 Respuesta de ${client.id}: ${result.correct ? '✅' : '❌'}`);

      // 2. Respuesta Privada (Al alumno)
      client.emit(GameEvents.AnswerResult, result);

      // 3. Respuesta Pública (Al Host - Solo notificación)
      server.to(payload.pin).emit('player_answered_notification', { clientId: client.id });

    } catch (error) {
      console.error('Error procesando respuesta:', error);
    }
  }
}