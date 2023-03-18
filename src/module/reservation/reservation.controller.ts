import { GetTimeSlotBodyDto } from "@module/reservation/dto";
import { ReservationService } from "@module/reservation/reservation.service";
import { Body, Controller, Post, Res } from "@nestjs/common";
import { FastifyReply } from "fastify";

@Controller({
  path: "/",
  version: ["1"],
})
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}
  @Post("/getTimeSlots")
  async getTimeSlots(
    @Body() body: GetTimeSlotBodyDto,
    @Res() reply: FastifyReply,
  ) {
    const result = await this.reservationService.getTimeTable(body);
    reply.status(200).send(result);
  }
}
