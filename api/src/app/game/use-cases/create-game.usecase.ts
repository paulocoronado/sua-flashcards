import { Injectable } from '@nestjs/common';
import { GameRepository } from '../game.repository';
import { GameSession } from '../game.session';
import { Question } from '@sua-flashcards/shared';

@Injectable()
export class CreateGameUseCase {
  // Hardcoded por ahora, luego vendría de una DB
  private readonly defaultQuestions = [
    { id: '1', text: '¿Capital de Francia?', options: ['Madrid', 'París', 'Berlín'], correctAnswerIndex: 1 },
    { id: '2', text: '¿2 + 2?', options: ['3', '4', '5'], correctAnswerIndex: 1 },
  ] as any; 

  constructor(private gameRepo: GameRepository) {}

  execute(hostId: string): string {
    const pin = Math.floor(1000 + Math.random() * 9000).toString();
    const session = new GameSession(pin, this.defaultQuestions);
    
    this.gameRepo.save(session);
    return pin;
  }
}