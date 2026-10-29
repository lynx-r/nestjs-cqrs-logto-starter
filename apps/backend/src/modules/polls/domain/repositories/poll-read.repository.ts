import { PollResultsDto } from '#/polls/application/queries/dto/poll-results.dto.js';
import { PollId } from '#/types/poll.types.js';

export abstract class PollReadRepository {
  abstract getResults(pollId: PollId): Promise<PollResultsDto | null>;
}
