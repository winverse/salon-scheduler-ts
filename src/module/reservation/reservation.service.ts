import { GetTimeSlotBodyDto } from "@module/reservation/dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ReservationService {
  public async getTimeSlot(body: GetTimeSlotBodyDto) {
    return [];
  }
}
