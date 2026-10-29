export enum NodeEnv {
  Production = 'production',
  Development = 'development',
  Test = 'test',
}

export type DatabaseConfig = {
  connectionUrl: string;
  name: string;
  username: string;
  password: string;
  port: number;
  host: string;
  synchronize: boolean;
};
