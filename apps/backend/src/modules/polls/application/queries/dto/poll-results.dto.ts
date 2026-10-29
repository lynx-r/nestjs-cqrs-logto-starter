import { PollStatus } from '#/types/poll.enums.js';
import { OptionId, PollId } from '#/types/poll.types.js';

export interface PollResultsDto {
  id: PollId;
  question: string;
  status: PollStatus;
  totalVotes: number;
  expiresAt: Date;
  options: PollOptionDto[];
}

export class PollOptionDto {
  id: OptionId;
  answer: string;
  votesCount: number;
  percentage: number;
}
