import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import type { Request, Response } from 'express';
import type { GraphQLFormattedError } from 'graphql';
import { EnvConfigModule } from '../config/env-config.module.js';
import { EnvConfigService } from '../config/env-config.service.js';
import { ErrorResponseBody } from '../http/filters/core-exception.type.js';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      // TODO: Use schema first
      useFactory: (env: EnvConfigService): ApolloDriverConfig => ({
        autoSchemaFile: true,
        sortSchema: true,
        // plugins: graphQlPlugins(env),
        introspection: env.isDevelopment,
        context: ({ req, res }: { req: Request; res: Response }) => ({
          req,
          res,
        }),
        formatError: (formattedError: GraphQLFormattedError) => {
          const originalError = formattedError.extensions?.originalError as
            ErrorResponseBody | undefined;

          if (!originalError) {
            return formattedError;
          }
          return {
            ...formattedError,
            message: originalError.message,
            extensions: originalError,
          };
        },
      }),
    }),
  ],
})
export class GraphqlPresentationModule {}

// const graphQlPlugins = (env: EnvConfigService) => {
//   if (env.isDevelopment) {
//     return [ApolloServerPluginLandingPageLocalDefault()];
//   }
//   return [];
// };
