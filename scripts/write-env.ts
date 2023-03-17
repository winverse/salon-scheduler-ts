import path from "path";
import fs from "fs";
import { Config } from "src/provider/config";

async function main() {
  const configFileName = "development";
  const configFilePath = path.resolve(
    process.cwd(),
    `config/${configFileName}.ts`,
  );

  const existConfigFile = fs.existsSync(configFilePath);

  if (!existConfigFile) {
    throw new Error(`Not found config/${configFileName}.ts file`);
  }

  const { config }: { config: Config } = await import(configFilePath);

  // write env
  const { app, db } = config;

  const envFilePath = path.resolve(process.cwd(), `.env`);

  fs.writeFileSync(
    envFilePath,
    `PORT=${app.port}

      DATABASE_URL=${db.database_url}
      `.replace(/ /gi, ""),
  );
}

main();
