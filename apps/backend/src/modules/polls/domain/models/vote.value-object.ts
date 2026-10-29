import { OptionId, PollId, VoteId } from '#/types/poll.types.js';
import { UserId } from '#/types/user.types.js';

export class VoteVO {
  constructor(
    public readonly id: VoteId,
    public readonly userId: UserId,
    public readonly pollId: PollId,
    public readonly optionId: OptionId,
    public readonly createdAt: Date,
  ) {}
}
