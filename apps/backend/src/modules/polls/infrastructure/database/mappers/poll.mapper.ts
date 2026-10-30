import { PollAggregate } from '#/polls/domain/models/poll.aggregate.js';
import { PollEntity } from '../entities/poll.entity.js';
import { PollOptionMapper } from './poll-option.mapper.js';
import { VoteMapper } from './vote.mapper.js';

export class PollMapper {
  static toDomain(ormEntity: PollEntity): PollAggregate {
    return PollAggregate.reconstitute(
      ormEntity.id,
      ormEntity.question,
      ormEntity.options,
      ormEntity.status,
      ormEntity.authorId,
      ormEntity.expiresAt,
      ormEntity.votes,
    );
  }

  static toPersistence(domainAggregate: PollAggregate): PollEntity {
    const ormEntity = new PollEntity();

    ormEntity.id = domainAggregate.id;
    ormEntity.question = domainAggregate.question;
    ormEntity.status = domainAggregate.getStatus(); // через геттер
    ormEntity.expiresAt = domainAggregate.expiresAt;

    // Превращаем Map домена обратно в массив/JSON для БД TypeORM
    ormEntity.votes = Array.from(domainAggregate.getVotes().values()).map((v) =>
      VoteMapper.toPersistence(v),
    );

    ormEntity.options = domainAggregate.options.map((o) =>
      PollOptionMapper.toPersistence(o),
    );

    return ormEntity;
  }
}
