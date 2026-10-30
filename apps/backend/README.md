#### Description

The `apps/backend` directory contains the backend implementation of the NestJS-CQRS-Logto project. This includes all the models, services, repositories, and other components that make up the backend logic.

#### Directory Structure

- **`src/modules/**`: Contains the business logic modules.
  - **`polls/`**: Module for handling polls functionality.
    - **`application/`**: Application layer with commands, handlers, and queries.
      - **`commands/handlers/`**: Handlers for command execution.
        - `cast-vote.handler.ts`
      - **`commands/impl/`**: Implementation of commands.
        - `cast-vote.command.ts`
      - **`events/handlers/`**: Handlers for event execution.
        - `vote-cast-event.handler.ts`
      - **`events/impl/`**: Implementation of events.
        - `vote-cast.event.ts`
      - **`queries/handlers/`**: Handlers for query execution.
        - `get-poll-results.handler.ts`
      - **`queries/impl/`**: Implementation of queries.
        - `get-poll-results.query.ts`
    - **`domain/`**: Domain logic.
      - **`models/`**: Value objects and aggregate roots.
        - `poll.aggregate.ts`
        - `poll-option.value-object.ts`
        - `user.value-object.ts`
        - `vote.value-object.ts`
      - **`repositories/`**: Repositories for accessing domain data.
        - `poll.repository.ts`
        - `poll-read.repository.ts`
    - **`infrastructure/database/`**: Infrastructure layer for database operations.
      - **`entities/`**: Database entities.
        - `poll-option.entity.ts`
        - `poll.entity.ts`
        - `user.entity.ts`
        - `vote.entity.ts`
      - **`mappers/`**: Mappers for converting database entities to domain models.
        - `poll.mapper.ts`
        - `poll-option.mapper.ts`
        - `user.mapper.ts`
        - `vote.mapper.ts`
      - **`repositories/`**: Repositories for interacting with the database.
        - `in-memory/in-memory-data.store.ts`
        - `in-memory/in-memory-poll-read.repository.ts`
    - **`presenters/graphql/`**: Presenters for GraphQL API.
      - `polls.mapper.ts`
      - `polls.resolver.ts`
    - **`presenters/http/`**: Presenters for HTTP API.
      - `polls.controller.ts`
    - **`types/`**: Types and enums for the module.
      - `poll.enums.ts`
      - `poll.types.ts`
      - `user.types.ts`

- **`test/`**: End-to-end tests for the backend.
  - `app.e2e-spec.ts`

- **`tsconfig.build.json`**: TypeScript configuration for building the backend.
- **`tsconfig.json`**: TypeScript configuration for development.
- **`vitest.config.e2e.ts`**: Vitest configuration for end-to-end tests.
- **`vitest.config.ts`**: Vitest configuration for unit tests.

#### Installation

To install the project dependencies, navigate to the root directory and run:

```bash
pnpm install
```

#### Running the Backend

To start the backend server, navigate to the root directory and run:

```bash
pnpm run start:dev
```

This will start the NestJS development server in watch mode.

#### Testing

To run the tests, navigate to the root directory and run:

```bash
pnpm test:e2e
```

This will execute the end-to-end tests using Vitest.

#### Contributing

Contributions are welcome! Please submit a pull request and provide tests as part of your changes.

#### License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.
