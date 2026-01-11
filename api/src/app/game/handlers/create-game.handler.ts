import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { GameService } from '../game.service';
import { GameEvents } from '@sua-flashcards/shared';

@Injectable()
export class CreateGameHandler {
  constructor(private readonly gameService: GameService) {}

  execute(client: Socket) {
    try {
      const pin = this.gameService.createGame(client.id);
      
      client.join(pin);
      client.emit(GameEvents.GameCreated, { pin });
      
      console.log(`🎲 Partida creada: ${pin}`);
    } catch (error) {
      console.error(error);
      client.emit(GameEvents.Error, { message: 'Error creando partida' });
    }
  }
}