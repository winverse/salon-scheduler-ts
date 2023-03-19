import { ApiProperty } from "@nestjs/swagger";

class TimeSlot {
  @ApiProperty({ example: 1620090000 })
  begin_at: number;

  @ApiProperty({ example: 1620093600 })
  end_at: number;
}

export class GetTimeTableResponse {
  @ApiProperty({ example: 1620054000 })
  start_of_day: number;

  @ApiProperty({ example: 1 })
  day_modifier: number;

  @ApiProperty({ example: false })
  is_day_off: boolean;

  @ApiProperty({ type: TimeSlot, isArray: true })
  timeslots: TimeSlot[];
}
