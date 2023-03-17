import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

async function bootstrap() {
  const fastify = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const PORT = 8080;
  await fastify.listen(PORT!, (error, address) => {
    if (error) {
      throw new Error(error as any);
    }

    address = address.replace("[::1]", "localhost");
    console.info(`Server is Running, address: ${address}`);
  });
}
bootstrap();
