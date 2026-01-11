import { Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { GameService } from '../game.service';
import { GameEvents } from '@sua-flashcards/shared';

@Injectable()
export class JoinGameHandler {
  constructor(private readonly gameService: GameService) {}

  execute(server: Server, client: Socket, payload: { pin: string, name: string }) {
    try {
      // 1. Llamamos a la lógica de negocio (que a su vez llama al UseCase)
      const result = this.gameService.joinGame(payload.pin, client.id, payload.name);
      
      // 2. Lógica de Transporte (Sockets)
      client.join(result.pin);
      
      // 3. Broadcast a la sala
      server.to(result.pin).emit(GameEvents.PlayerJoined, { 
        name: result.name,
        totalPlayers: result.count
      });
      
      console.log(`👤 ${result.name} entró a la sala ${result.pin}`);
    } catch (error) {
      client.emit(GameEvents.Error, { message: (error as Error).message });
    }
  }
}