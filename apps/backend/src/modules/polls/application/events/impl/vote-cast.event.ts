import { OptionId, PollId, VoteId } from '#/types/poll.types.js';
import { UserId } from '#/types/user.types.js';

export class VoteCastEvent {
  constructor(
    public readonly voteId: VoteId,
    public readonly pollId: PollId,
    public readonly userId: UserId,
    public readonly optionId: OptionId,
    public readonly createdAt: Date,
  ) {}
}
