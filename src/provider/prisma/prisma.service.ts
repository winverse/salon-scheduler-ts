import {
  HttpException,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      throw new HttpException("SERVER_ERROR", 503);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async getClient() {
    return this;
  }
}
