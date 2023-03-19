import { NOT_FOUND_WORKHOUR } from "@common/constants";
import { GetTimeSlotBodyDto } from "@module/reservation/dto";
import { GetTimeTableResponse } from "@module/reservation/res/get-time-table.response";
import { ReservationService } from "@module/reservation/reservation.service";
import { Body, Controller, Post, Res } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FastifyReply } from "fastify";

@ApiTags("reservation")
@Controller({
  path: "/",
  version: ["1"],
})
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}
  @ApiOperation({
    summary: "예약에 필요한 time-slot 불러오기",
  })
  @ApiResponse({
    status: 200,
    type: GetTimeTableResponse,
    description: "Ok",
    isArray: true,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND_WORKHOUR })
  @Post("/getTimeSlots")
  async getTimeSlots(
    @Body() body: GetTimeSlotBodyDto,
    @Res() reply: FastifyReply,
  ) {
    const result = await this.reservationService.getTimeTable(body);
    reply.status(200).send(result);
  }
}
