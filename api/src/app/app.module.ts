import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 1. Gateway
import { GameGateway } from './game.gateway';

// 2. Service & Repository
import { GameService } from './game/game.service';
import { GameRepository } from './game/game.repository';

// 3. Use Cases (Lógica de Negocio)
import { CreateGameUseCase } from './game/use-cases/create-game.usecase';
import { JoinGameUseCase } from './game/use-cases/join-game.usecase';
import { StartGameUseCase } from './game/use-cases/start-game.usecase';
import { SubmitAnswerUseCase } from './game/use-cases/submit-answer.usecase';
import { GetStatsUseCase } from './game/use-cases/get-stats.usecase';

// 4. Handlers (Lógica de Sockets)
import { CreateGameHandler } from './game/handlers/create-game.handler';
import { JoinGameHandler } from './game/handlers/join-game.handler';
import { StartGameHandler } from './game/handlers/start-game.handler';
import { SubmitAnswerHandler } from './game/handlers/submit-answer.handler';
import { RequestResultsHandler } from './game/handlers/request-results.handler';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    GameGateway,
    
    // Capa de Aplicación
    GameService,
    GameRepository,

    // Capa de Dominio (Use Cases)
    CreateGameUseCase,
    JoinGameUseCase,
    StartGameUseCase,
    SubmitAnswerUseCase,
    GetStatsUseCase,

    // Capa de Transporte (Handlers)
    CreateGameHandler,
    JoinGameHandler,
    StartGameHandler,
    SubmitAnswerHandler,
    RequestResultsHandler,
  ],
})
export class AppModule {}