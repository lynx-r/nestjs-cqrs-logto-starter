import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { EnvConfigService } from '../env/env-config.service.js';
import { NodeEnv } from '../env/env.types.js';

@Module({
  imports: [
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
  ],
})
export class ThrottlerConfigModule {}
