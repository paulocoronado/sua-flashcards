import { Injectable } from '@nestjs/common';
import { GameRepository } from '../game.repository';

@Injectable()
export class StartGameUseCase {
  constructor(private gameRepo: GameRepository) {}

  execute(pin: string) {
    const game = this.gameRepo.getOrThrow(pin);
    const nextQuestion = game.nextQuestion();

    // Si hay pregunta, la devolvemos
    if (nextQuestion) {
      return { status: 'playing', question: nextQuestion };
    }

    // Si NO hay pregunta, devolvemos el Podio
    return { status: 'game_over', podium: game.getPodium() };
  }
}