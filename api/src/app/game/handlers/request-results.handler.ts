import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { GameService } from '../game.service';

@Injectable()
export class RequestResultsHandler {
  constructor(private readonly gameService: GameService) {}

  execute(server: Server, client: Socket, payload: { pin: string }) {
    try {
      const stats = this.gameService.getRoundStats(payload.pin);
      
      // Enviamos estadísticas a la sala (La web mostrará el gráfico)
      server.to(payload.pin).emit('show_results_screen', stats);
      
      console.log(`📊 Estadísticas enviadas a sala ${payload.pin}`);
    } catch (error) {
      client.emit('error_msg', { message: (error as Error).message });
    }
  }
}