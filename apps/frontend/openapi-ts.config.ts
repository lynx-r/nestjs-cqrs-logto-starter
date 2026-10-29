import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://localhost:3000/docs",
  output: {
    path: "./src/client",
  },
  plugins: [
    "@hey-api/client-fetch",
    "@hey-api/sdk",
    "@hey-api/typescript",
    {
      dates: true,
      name: "@hey-api/transformers",
    },
  ],
});

// TODO: сгенерить клиента донастроить M2M для NestJS
