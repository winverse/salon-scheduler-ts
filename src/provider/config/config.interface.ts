export type AppConfig = {
  readonly port: number;
};

export type DbConfig = {
  readonly provider: "sqlite";
};

export type ConfigKey = AppConfig | DbConfig;

export type Config = {
  app: AppConfig;
  db: DbConfig;
};
