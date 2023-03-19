import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { swagger } from "src/swagger";

async function bootstrap() {
  const fastify = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  fastify.setGlobalPrefix("/api");
  fastify.enableVersioning({
    type: VersioningType.URI,
  });

  fastify.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      stopAtFirstError: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      disableErrorMessages: false,
    }),
  );

  if (process.env.NODE_ENV !== "production") {
    swagger(fastify);
  }

  const PORT = process.env.PORT;
  await fastify.listen(PORT!, (error, address) => {
    if (error) {
      throw new Error(error as any);
    }

    address = address.replace("[::1]", "localhost");
    console.info(`Server is Running, address: ${address}`);
    console.info(`Swagger: ${address}/api/documentation`);
  });
}
bootstrap();
