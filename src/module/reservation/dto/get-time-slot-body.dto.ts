import { ONE_MINUTE_IN_S } from "@common/constants";
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsTimeZone,
  Max,
  Min,
} from "class-validator";

export class GetTimeSlotBodyDto {
  @IsString()
  readonly start_day_identifier: string;

  @IsTimeZone()
  readonly timezone_identifier: string;

  @IsInt()
  readonly service_duration: number; // 서비스 제공 시간, slot의 begin_at, end_at을 정한다.

  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(365)
  readonly days: number = 1;

  @IsInt()
  @IsOptional()
  readonly timeslot_interval: number = ONE_MINUTE_IN_S * 30; // 30분, slot간의 begin_at 시간을 정한다

  @IsBoolean()
  @IsOptional()
  readonly is_ignore_schedule: boolean = false;

  @IsBoolean()
  @IsOptional()
  readonly is_ignore_workhour: boolean = false;
}
