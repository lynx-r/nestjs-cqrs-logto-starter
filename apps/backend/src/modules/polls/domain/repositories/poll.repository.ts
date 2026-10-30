import { PollId } from '#/types/poll.types.js';
import { PollAggregate } from '../models/poll.aggregate.js';
import { VoteVO } from '../models/vote.value-object.js';

export abstract class PollRepository {
  abstract findById(id: PollId): Promise<PollAggregate | null>;
  abstract saveVote(vote: VoteVO): Promise<void>;
}
