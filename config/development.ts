import { Config } from "src/provider/config";

export const config: Config = {
  app: {
    port: 8080,
  },
  db: {
    provider: "sqlite",
    database_url: "file:../salon.sqlite",
  },
};
