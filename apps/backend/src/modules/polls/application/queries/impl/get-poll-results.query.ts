import { PollId } from '#/types/poll.types.js';
import { Query } from '@nestjs/cqrs';
import { PollResultsDto } from '../dto/poll-results.dto.js';

export class GetPollResultsQuery extends Query<PollResultsDto> {
  constructor(public readonly pollId: PollId) {
    super();
  }
}
