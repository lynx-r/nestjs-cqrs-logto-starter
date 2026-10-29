import { ModuleNames } from '#/config/constants/index.js';

export interface DomainErrorDescriptor {
  message: string;
  statusCode: number;
  developerMessage?: string;
  code: number;
  module: ModuleNames;
}
