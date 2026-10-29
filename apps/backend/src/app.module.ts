import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EnvConfigModule } from './config/env/env-config.module.js';
import { GraphQLConfigModule } from './config/graphql/graphql-config.module.js';
import { ThrottlerConfigModule } from './config/throttler/throttler-config.module.js';
import { TypeOrmConfigModule } from './config/typeorm/typeorm-config.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { PollsModule } from './modules/polls/polls.module.js';

// export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    HealthModule,
    PollsModule,
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    // ObserveModule.forRoot({
    //   appKey: 'YOUR_APP_KEY',
    //   appSecret: 'YOUR_APP_SECRET',
    //   serviceId: 'nestjs-prisma-rest-graphql-cqrs',
    // }),
    TypeOrmConfigModule,
    ThrottlerConfigModule,
    EnvConfigModule,
    GraphQLConfigModule,

    CqrsModule.forRoot(),
  ],
})
export class AppModule {}
