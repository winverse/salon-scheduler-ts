import { ONE_MINUTE_IN_S } from "@common/constants/time.constants";
import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

export class GetTimeSlotBodyDto {
  @IsString()
  readonly start_day_identifier: string;

  @IsString()
  readonly timezone_identifier: string;

  @IsInt()
  readonly service_duration: number;

  @IsInt()
  @IsOptional()
  readonly days?: number = 1;

  @IsInt()
  @IsOptional()
  readonly timeslot_interval?: number = ONE_MINUTE_IN_S * 30; // 30분

  @IsBoolean()
  @IsOptional()
  readonly is_ignore_schedule?: boolean = false;

  @IsBoolean()
  @IsOptional()
  readonly is_ignore_workhour?: boolean = false;
}
