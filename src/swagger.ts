import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { NestFastifyApplication } from "@nestjs/platform-fastify";

export const swagger = async (fastify: NestFastifyApplication) => {
  const swaggerConfig = new DocumentBuilder().setVersion("1.0").build();

  const document = SwaggerModule.createDocument(fastify, swaggerConfig);

  SwaggerModule.setup("/api/documentation", fastify, document);
};
