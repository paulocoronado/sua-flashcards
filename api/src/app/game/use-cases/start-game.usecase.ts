import { Injectable } from '@nestjs/common';
import { GameRepository } from '../game.repository';

@Injectable()
export class StartGameUseCase {
  constructor(private gameRepo: GameRepository) {}

  execute(pin: string) {
    const game = this.gameRepo.getOrThrow(pin);
    return game.nextQuestion();
  }
}