import { UserId } from '#/types/user.types.js';
import { PollAggregate } from './poll.aggregate.js';
import { VoteVO } from './vote.value-object.js';

export class UserVO {
  constructor(
    public readonly userId: UserId,
    public readonly polls: PollAggregate[],
    public readonly votes: VoteVO[],
  ) {}
}
