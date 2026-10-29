import { VoteVO } from '#/polls/domain/models/vote.value-object.js';
import { VoteEntity } from '../entities/vote.entity.js';

export class VoteMapper {
  static toDomain(ormEntity: VoteEntity): VoteVO {
    return new VoteVO(
      ormEntity.id,
      ormEntity.userId,
      ormEntity.pollId,
      ormEntity.optionId,
      ormEntity.createdAt,
    );
  }

  static toPersistence(domainAggregate: VoteVO): VoteEntity {
    const ormEntity = new VoteEntity();

    ormEntity.id = domainAggregate.id;
    ormEntity.optionId = domainAggregate.optionId;
    ormEntity.pollId = domainAggregate.pollId;
    ormEntity.userId = domainAggregate.userId;

    return ormEntity;
  }
}
