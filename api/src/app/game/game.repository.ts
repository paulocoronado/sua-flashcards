import { Injectable } from '@nestjs/common';
import { GameSession } from './game.session';

@Injectable()
export class GameRepository {
  private games = new Map<string, GameSession>();

  save(session: GameSession): void {
    this.games.set(session.pin, session);
  }

  findById(pin: string): GameSession | undefined {
    return this.games.get(pin);
  }

  // Método helper para buscar o fallar (muy usado)
  getOrThrow(pin: string): GameSession {
    const game = this.findById(pin);
    if (!game) throw new Error('Juego no encontrado o PIN inválido');
    return game;
  }

  delete(pin: string): void {
    this.games.delete(pin);
  }
}