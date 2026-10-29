/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfigService } from '../env/env-config.service.js';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [EnvConfigService],
      useFactory: ({ database }: EnvConfigService) => ({
        type: 'postgres',
        host: database.host,
        port: database.port,
        username: database.username,
        password: database.password,
        database: database.name,
        synchronize: database.synchronize,
        autoLoadEntities: true,
        logging: false,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class TypeOrmConfigModule {}
