/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CommandHandlers } from './application/commands/handlers/index.js';
import { EventHandlers } from './application/events/handlers/index.js';
import { QueryHandlers } from './application/queries/handlers/index.js';
import { PollReadRepository } from './domain/repositories/poll-read.repository.js';
import { PollRepository } from './domain/repositories/poll.repository.js';
import { InMemoryDataStore } from './infrastructure/database/repositories/in-memory/in-memory-data.store.js';
import { InMemoryPollReadRepository } from './infrastructure/database/repositories/in-memory/in-memory-poll-read.repository.js';
import { InMemoryPollRepository } from './infrastructure/database/repositories/in-memory/in-memory-poll.repository.js';
import { PollResolver } from './presenters/graphql/polls.resolver.js';
import { PollsController } from './presenters/http/polls.controller.js';

@Module({
  imports: [],
  controllers: [PollsController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    PollResolver,
    InMemoryDataStore,
    {
      provide: PollRepository,
      useClass: InMemoryPollRepository,
    },
    {
      provide: PollReadRepository,
      useClass: InMemoryPollReadRepository,
    },
  ],
})
export class PollsModule {}
