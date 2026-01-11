import { SubscribeMessage, WebSocketGateway, WebSocketServer, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameEvents } from '@sua-flashcards/shared';

// Importamos los Handlers
import { CreateGameHandler } from './game/handlers/create-game.handler';
import { JoinGameHandler } from './game/handlers/join-game.handler';
import { StartGameHandler } from './game/handlers/start-game.handler';
import { SubmitAnswerHandler } from './game/handlers/submit-answer.handler';
import { RequestResultsHandler } from './game/handlers/request-results.handler';

@WebSocketGateway({ cors: { origin: '*' } })
export class GameGateway {
  @WebSocketServer() server: Server;

  constructor(
    private readonly createGameHandler: CreateGameHandler,
    private readonly joinGameHandler: JoinGameHandler,
    private readonly startGameHandler: StartGameHandler,
    private readonly submitAnswerHandler: SubmitAnswerHandler,
    private readonly requestResultsHandler: RequestResultsHandler,
  ) {}

  @SubscribeMessage(GameEvents.CreateGame)
  handleCreateGame(@ConnectedSocket() client: Socket) {
    this.createGameHandler.execute(client);
  }

  @SubscribeMessage(GameEvents.JoinGame)
  handleJoinGame(@ConnectedSocket() client: Socket, @MessageBody() payload: { pin: string, name: string }) {
    this.joinGameHandler.execute(this.server, client, payload);
  }

  @SubscribeMessage(GameEvents.RequestStart)
  handleStartGame(@ConnectedSocket() client: Socket, @MessageBody() payload: { pin: string }) {
    this.startGameHandler.execute(this.server, client, payload);
  }

  @SubscribeMessage(GameEvents.SubmitAnswer)
  handleSubmitAnswer(@ConnectedSocket() client: Socket, @MessageBody() payload: { pin: string, answerIndex: number }) {
    this.submitAnswerHandler.execute(this.server, client, payload);
  }

  @SubscribeMessage('request_show_results')
  handleShowResults(@ConnectedSocket() client: Socket, @MessageBody() payload: { pin: string }) {
    this.requestResultsHandler.execute(this.server, client, payload);
  }
}