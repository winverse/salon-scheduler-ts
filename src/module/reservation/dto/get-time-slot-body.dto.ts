import { ONE_MINUTE_IN_S } from "@common/constants";
import { ApiProperty } from "@nestjs/swagger";
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
  @ApiProperty({
    example: "20230319",
    description: "date",
  })
  @IsString()
  readonly start_day_identifier: string;

  @ApiProperty({
    example: "Asia/Seoul",
    description: "From IANA time-zone database",
  })
  @IsTimeZone()
  readonly timezone_identifier: string;

  @ApiProperty({
    example: 3600, // 60분
    description:
      "단위는 interval(초), 서비스 제공 시간, slot의 begin_at, end_at을 정한다.",
  })
  @IsInt()
  readonly service_duration: number;

  @ApiProperty({
    example: 3,
    description: "slots의 길이(length)를 정한다.",
    nullable: true,
  })
  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(365)
  readonly days: number = 1;

  @ApiProperty({
    example: 1800, // 30분
    description:
      "단위는 interval(초), 서비스 제공 시간, slot간의 begin_at을 정한다.",
    nullable: true,
  })
  @IsInt()
  @IsOptional()
  readonly timeslot_interval: number = ONE_MINUTE_IN_S * 30;

  @ApiProperty({
    example: false, // 30분
    description: "이미 존재하는 예약을 참고하여 데이터를 가공할지 정한다.",
    nullable: true,
  })
  @IsBoolean()
  @IsOptional()
  readonly is_ignore_schedule: boolean = false;

  @ApiProperty({
    example: false,
    description: "shop의 개점 정보를 참고하여 데이터를 가공할지 정한다.",
    nullable: true,
  })
  @IsBoolean()
  @IsOptional()
  readonly is_ignore_workhour: boolean = false;
}
