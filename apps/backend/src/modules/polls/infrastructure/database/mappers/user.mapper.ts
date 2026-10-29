import { UserVO } from '#/polls/domain/models/user.value-object.js';
import { UserEntity } from '../entities/user.entity.js';
import { PollMapper } from './poll.mapper.js';
import { VoteMapper } from './vote.mapper.js';

export class UserMapper {
  static toDomain(ormEntity: UserEntity): UserVO {
    const polls = ormEntity.polls.map((p) => PollMapper.toDomain(p));
    const votes = ormEntity.votes.map((v) => VoteMapper.toDomain(v));
    return new UserVO(ormEntity.id, polls, votes);
  }

  static toPersistence(domainAggregate: UserVO): UserEntity {
    const userEntity = new UserEntity();

    userEntity.id = domainAggregate.userId;
    userEntity.polls = domainAggregate.polls.map((p) =>
      PollMapper.toPersistence(p),
    );
    userEntity.votes = domainAggregate.votes.map((v) =>
      VoteMapper.toPersistence(v),
    );

    return userEntity;
  }
}
