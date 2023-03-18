import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { configuration, ConfigModule } from "@provider/config";
import { PrismaModule } from "./provider/prisma/prisma.module";
import { ReservationModule } from "./module/reservation/reservation.module";
import { UtilsModule } from "./provider/utils/utils.module";

@Module({
  imports: [
    NestConfigModule.forRoot({ load: [configuration] }),
    ConfigModule,
    PrismaModule,
    ReservationModule,
    UtilsModule,
  ],
})
export class AppModule {}
