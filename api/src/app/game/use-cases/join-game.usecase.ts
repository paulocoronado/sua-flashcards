import { Injectable } from '@nestjs/common';
import { GameRepository } from '../game.repository';

@Injectable()
export class JoinGameUseCase {
  constructor(private gameRepo: GameRepository) {}

  execute(pin: string, playerId: string, name: string) {
    const game = this.gameRepo.getOrThrow(pin);
    game.addPlayer(playerId, name);
    
    return {
      pin,
      name,
      count: game.players.size,
      playersList: game.getAllPlayers()
    };
  }
}