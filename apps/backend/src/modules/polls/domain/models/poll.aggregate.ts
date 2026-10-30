import { UserId } from '#/types/user.types.js';
import { BadRequestException } from '@nestjs/common';

import { PollOptionEntity } from '#/polls/infrastructure/database/entities/poll-option.entity.js';
import { VoteEntity } from '#/polls/infrastructure/database/entities/vote.entity.js';
import { VoteMapper } from '#/polls/infrastructure/database/mappers/vote.mapper.js';
import { PollStatus } from '#/types/poll.enums.js';
import { OptionId, PollId } from '#/types/poll.types.js';
import { AggregateRoot } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import { VoteCastEvent } from '../../application/events/impl/vote-cast.event.js';
import { PollOptionVO } from './poll-option.value-object.js';
import { VoteVO } from './vote.value-object.js';

export class PollAggregate extends AggregateRoot {
  constructor(
    readonly id: PollId,
    readonly question: string,
    private status: PollStatus,
    readonly options: PollOptionVO[],
    readonly authorId: UserId,
    readonly expiresAt: Date,
    private readonly votes: Map<UserId, VoteVO> = new Map(),
  ) {
    super();
  }

  // Фабричный метод для создания нового опроса с базовой валидацией
  static create(
    id: PollId,
    question: string,
    options: PollOptionVO[],
    authorId: UserId,
    expiresAt: Date,
  ): PollAggregate {
    if (!question || question.trim().length < 5) {
      throw new BadRequestException('Вопрос слишком короткий');
    }
    if (!options || options.length < 2) {
      throw new BadRequestException(
        'Опрос должен содержать минимум 2 варианта ответа',
      );
    }
    if (expiresAt <= new Date()) {
      throw new BadRequestException(
        'Дата окончания опроса должна быть в будущем',
      );
    }

    return new PollAggregate(
      id,
      question,
      PollStatus.OPEN,
      options,
      authorId,
      expiresAt,
    );
  }

  /**
   * Восстанавливает существующий агрегат из состояния базы данных.
   * Этот метод вызывается репозиторием и НЕ содержит валидаций,
   * так как данные в БД уже считаются валидными.
   */
  static reconstitute(
    id: string,
    question: string,
    options: PollOptionEntity[],
    status: PollStatus,
    authorId: UserId,
    expiresAt: Date,
    votesList: VoteEntity[] = [],
  ): PollAggregate {
    const votesMap = new Map<string, VoteVO>();
    votesList.forEach((vote) =>
      votesMap.set(vote.userId, VoteMapper.toDomain(vote)),
    );

    return new PollAggregate(
      id,
      question,
      status,
      options,
      authorId,
      expiresAt,
      votesMap,
    );
  }

  // Бизнес-метод (Команда): Оставить голос
  castVote(userId: UserId, optionId: OptionId): VoteVO {
    // Инвариант 1: Опрос должен быть открыт
    if (this.status === 'closed' || this.isExpired()) {
      throw new BadRequestException('Голосование в этом опросе уже завершено');
    }

    // Инвариант 2: Вариант ответа должен существовать в этом опросе
    const optionExists = this.options.some((opt) => opt.id === optionId);
    if (!optionExists) {
      throw new BadRequestException('Указанного варианта ответа не существует');
    }

    // Инвариант 3: Пользователь не должен голосовать повторно
    if (this.votes.has(userId)) {
      throw new BadRequestException('Вы уже проголосовали в этом опросе');
    }

    // Генерируем ID для нового голоса (можно доверить БД, но в DDD лучше делать в приложении)
    const voteId = randomUUID();

    const newVote = new VoteVO(voteId, userId, this.id, optionId, new Date());
    this.votes.set(userId, newVote);

    this.apply(
      new VoteCastEvent(
        newVote.id,
        newVote.pollId,
        newVote.userId,
        newVote.optionId,
        newVote.createdAt,
      ),
    );

    return newVote;
  }

  // Бизнес-метод (Команда): Принудительно закрыть опрос автором
  close(): void {
    this.status = PollStatus.CLOSED;
  }

  getStatus(): PollStatus {
    if (this.isExpired()) {
      return PollStatus.CLOSED;
    }
    return this.status;
  }

  getVotes() {
    return this.votes;
  }

  private isExpired(): boolean {
    return new Date() > this.expiresAt;
  }
}
