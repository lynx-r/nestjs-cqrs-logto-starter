import { OptionId, PollId } from '#/types/poll.types.js';
import { VoteVO } from './vote.value-object.js';

export class PollOptionVO {
  constructor(
    public readonly id: OptionId,
    public readonly answer: string,
    public readonly pollId: PollId,
    public readonly votes: VoteVO[],
  ) {}
}
