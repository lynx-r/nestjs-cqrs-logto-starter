import { PollResultsDto } from '#/polls/application/queries/dto/poll-results.dto.js';
import { VoteVO } from '#/polls/domain/models/vote.value-object.js';
import { PollStatus } from '#/types/poll.enums.js';
import { PollOptionEntity } from '../../entities/poll-option.entity.js';
import { PollEntity } from '../../entities/poll.entity.js';

export class InMemoryDataStore {
  // База данных Записи (Write DB) - хранит сырые сущности и историю
  public readonly writePolls: Map<string, PollEntity> = new Map();
  public readonly writeVotes: VoteVO[] = [];

  // База данных Чтения (Read DB) - хранит плоские DTO, готовые для выдачи
  public readonly readPollResults: Map<string, PollResultsDto> = new Map();

  // Добавьте этот конструктор внутрь InMemoryDataStore
  constructor() {
    const pollId = 'test-poll-123';
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // Опрос закроется через сутки

    // 1. Заполняем Write Side (Агрегат)
    // Используем фабричный метод из Шага 1
    const options: PollOptionEntity[] = [
      {
        id: 'opt-1',
        answer: 'TypeScript',
        pollId: pollId,
        poll: null,
        votes: [],
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: 'opt-2',
        answer: 'Go',
        pollId: pollId,
        poll: null,
        votes: [],
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: 'opt-3',
        answer: 'Rust',
        pollId: pollId,
        poll: null,
        votes: [],
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ];

    const pollEntity: PollEntity = {
      id: pollId,
      question: 'Какой язык программирования вы предпочитаете?',
      options,
      status: PollStatus.OPEN,
      expiresAt,
      votes: [],
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    this.writePolls.set(pollId, pollEntity);

    // 2. Заполняем Read Side (Предрассчитанное DTO для UI)
    const pollResultsDto: PollResultsDto = {
      id: pollId,
      question: 'Какой язык программирования вы предпочитаете?',
      status: PollStatus.OPEN,
      totalVotes: 0,
      expiresAt: expiresAt,
      options: [
        { id: 'opt-1', answer: 'TypeScript', votesCount: 0, percentage: 0 },
        { id: 'opt-2', answer: 'Go', votesCount: 0, percentage: 0 },
        { id: 'opt-3', answer: 'Rust', votesCount: 0, percentage: 0 },
      ],
    };
    this.readPollResults.set(pollId, pollResultsDto);
  }
}
