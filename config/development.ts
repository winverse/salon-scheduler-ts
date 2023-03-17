import { Config } from "src/provider/config";

export const config: Config = {
  app: {
    port: 8080,
  },
  db: {
    type: "sqlite",
    database: "salon",
    entities: [__dirname + "/**/*.entity.ts"],
    synchronize: true,
    logging: process.env.NODE_ENV !== "production",
  },
};
