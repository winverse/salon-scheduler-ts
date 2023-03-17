import path from "path";
import fs from "fs";

import Joi from "joi";
import { Config } from "./config.interface";

const validateConfig = (config: Config): void => {
  const configSchema = Joi.object().keys({
    app: Joi.object().keys({
      port: Joi.number().required(),
    }),
    db: Joi.object().keys({
      type: Joi.string().valid("sqlite").required(),
      database: Joi.string().required(),
      entities: Joi.array().items(Joi.string().required()).required(),
      synchronize: Joi.boolean().required(),
      logging: Joi.boolean().required(),
    }),
  });

  const { error } = configSchema.validate(config);

  if (error) {
    throw new Error(`config validate failed, message: ${error.message}`);
  }
};

export const configuration = async (): Promise<Config> => {
  const configFilename = "development";
  const configFilePath = path.resolve(
    process.cwd(),
    `config/${configFilename}.ts`,
  );

  const existFile = fs.existsSync(configFilePath);

  if (!existFile) {
    throw new Error(`Missing env file in config/${configFilename}.ts`);
  }

  const { config }: { config: Config } = await import(
    `../../../config/${configFilename}`
  );

  validateConfig(config);

  return config;
};
