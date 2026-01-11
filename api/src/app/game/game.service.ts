import { Injectable } from '@nestjs/common';
import { CreateGameUseCase } from './use-cases/create-game.usecase';
import { JoinGameUseCase } from './use-cases/join-game.usecase';
import { StartGameUseCase } from './use-cases/start-game.usecase';
import { SubmitAnswerUseCase } from './use-cases/submit-answer.usecase';
import { GetStatsUseCase } from './use-cases/get-stats.usecase';

@Injectable()
export class GameService {
  constructor(
    private readonly createGameUC: CreateGameUseCase,
    private readonly joinGameUC: JoinGameUseCase,
    private readonly startGameUC: StartGameUseCase,
    private readonly submitAnswerUC: SubmitAnswerUseCase,
    private readonly getStatsUC: GetStatsUseCase
  ) {}

  createGame(clientId: string) {
    return this.createGameUC.execute(clientId);
  }

  joinGame(pin: string, clientId: string, name: string) {
    return this.joinGameUC.execute(pin, clientId, name);
  }

  startGame(pin: string) {
    return this.startGameUC.execute(pin);
  }

  submitAnswer(pin: string, clientId: string, index: number) {
    return this.submitAnswerUC.execute(pin, clientId, index);
  }

  getRoundStats(pin: string) {
    return this.getStatsUC.execute(pin);
  }
}