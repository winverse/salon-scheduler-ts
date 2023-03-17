import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export type AppConfig = {
  readonly port: number;
};

export type DbConfig = {
  type: string;
  database: string;
  entities: string[];
  synchronize: boolean;
  logging: boolean;
} & TypeOrmModuleOptions;

export type ConfigKey = AppConfig | DbConfig;

export type Config = {
  app: AppConfig;
  db: DbConfig;
};
