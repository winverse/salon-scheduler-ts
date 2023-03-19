import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { configuration, ConfigModule } from "@provider/config";
import { PrismaModule } from "./provider/prisma/prisma.module";
import { ReservationModule } from "./module/reservation/reservation.module";
import { UtilsModule } from "./provider/utils/utils.module";
import { APP_FILTER } from "@nestjs/core";
import { HttpExceptionFilter } from "@common/filter";

@Module({
  imports: [
    NestConfigModule.forRoot({ load: [configuration] }),
    ConfigModule,
    PrismaModule,
    ReservationModule,
    UtilsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
