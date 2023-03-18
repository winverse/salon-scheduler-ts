import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { VersioningType } from "@nestjs/common";

async function bootstrap() {
  const fastify = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  fastify.setGlobalPrefix("/api");
  fastify.enableVersioning({
    type: VersioningType.URI,
  });

  const PORT = process.env.PORT;
  await fastify.listen(PORT!, (error, address) => {
    if (error) {
      throw new Error(error as any);
    }

    address = address.replace("[::1]", "localhost");
    console.info(`Server is Running, address: ${address}`);
  });
}
bootstrap();
