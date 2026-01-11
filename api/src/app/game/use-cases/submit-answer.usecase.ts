import { Injectable } from '@nestjs/common';
import { GameRepository } from '../game.repository';

@Injectable()
export class SubmitAnswerUseCase {
  constructor(private gameRepo: GameRepository) {}

  execute(pin: string, playerId: string, answerIndex: number) {
    const game = this.gameRepo.getOrThrow(pin);
    return game.processAnswer(playerId, answerIndex);
  }
}