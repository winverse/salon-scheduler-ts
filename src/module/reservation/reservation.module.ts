import { Module } from "@nestjs/common";
import { ReservationService } from "./reservation.service";
import { ReservationController } from "./reservation.controller";
import { UtilsModule } from "@provider/utils/utils.module";
import { PrismaModule } from "@provider/prisma/prisma.module";

@Module({
  imports: [PrismaModule, UtilsModule],
  providers: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}
