import path from "path";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const seedDir = path.resolve(process.cwd(), "seeds");
  const files = fs.readdirSync(seedDir).map((file) => `../seeds/${file}`);

  const promises = files.map(async (filepath) => {
    const { default: data } = await import(filepath);

    const tablename = path.basename(filepath, ".json");
    data.forEach(async (row) => {
      const client: any = prisma[tablename];
      await client.create({
        data: row,
      });
    });
  });

  await Promise.all(promises);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
