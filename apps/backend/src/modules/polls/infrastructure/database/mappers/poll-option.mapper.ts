import { PollOptionVO } from '#/polls/domain/models/poll-option.value-object.js';
import { PollOptionEntity } from '../entities/poll-option.entity.js';
import { VoteMapper } from './vote.mapper.js';

export class PollOptionMapper {
  static toDomain(ormEntity: PollOptionEntity): PollOptionVO {
    const votes = ormEntity.votes.map((v) => VoteMapper.toDomain(v));
    return new PollOptionVO(
      ormEntity.id,
      ormEntity.answer,
      ormEntity.pollId,
      votes,
    );
  }

  static toPersistence(domainAggregate: PollOptionVO): PollOptionEntity {
    const ormEntity = new PollOptionEntity();

    ormEntity.id = domainAggregate.id;
    ormEntity.answer = domainAggregate.answer;
    ormEntity.pollId = domainAggregate.pollId;
    ormEntity.votes = domainAggregate.votes.map((v) =>
      VoteMapper.toPersistence(v),
    );

    return ormEntity;
  }
}
