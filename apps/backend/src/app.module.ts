import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { EnvConfigModule } from './common/config/env-config.module.js';
import { EnvConfigService } from './common/config/env-config.service.js';
import { NodeEnv } from './common/config/env.types.js';
import { GraphqlPresentationModule } from './common/graphql/graphql.module.js';
import { PollsModule } from './modules/polls/polls.module.js';

// export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    PollsModule,
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    // ObserveModule.forRoot({
    //   appKey: 'YOUR_APP_KEY',
    //   appSecret: 'YOUR_APP_SECRET',
    //   serviceId: 'nestjs-prisma-rest-graphql-cqrs',
    // }),
    ThrottlerModule.forRootAsync({
      inject: [EnvConfigService],
      useFactory: (env: EnvConfigService) => ({
        skipIf: () => env.nodeEnv === NodeEnv.Test,
        throttlers: [
          {
            name: 'default',
            ttl: env.throttleTtlMs,
            limit: env.throttleLimit,
          },
        ],
      }),
    }),
    EnvConfigModule,
    GraphqlPresentationModule,
    CqrsModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
