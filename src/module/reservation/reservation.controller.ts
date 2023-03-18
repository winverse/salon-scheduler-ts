import { Controller, Post } from "@nestjs/common";

@Controller({
  path: "/",
  version: ["1"],
})
export class ReservationController {
  @Post("/getTimeSlots")
  async getTimeSlots() {
    return "getTimeSlots";
  }
}
