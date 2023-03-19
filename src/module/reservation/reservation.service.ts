import { NOT_FOUND_WORKHOUR } from "@common/constants";
import { DayTimetable, Timeslot } from "@common/interface";
import { GetTimeSlotBodyDto } from "@module/reservation/dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@provider/prisma/prisma.service";
import { UtilsService } from "@provider/utils/utils.service";
import { addDays, addMinutes } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

@Injectable()
export class ReservationService {
  constructor(
    private readonly utils: UtilsService,
    private readonly prisma: PrismaService,
  ) {}
  public async getTimeTable(body: GetTimeSlotBodyDto): Promise<DayTimetable[]> {
    const { start_day_identifier, timezone_identifier, days } = body;

    const startDayWithMidnight = this.utils.dateStringToMidnight(
      start_day_identifier,
      timezone_identifier,
    );

    const startDayUtc = zonedTimeToUtc(
      startDayWithMidnight,
      timezone_identifier,
    );

    const promises = Array(days)
      .fill(startDayUtc)
      .map((date, index) => addDays(date, index))
      .map((date, index) => this.getTimeSlot(date, body, index + 1));

    const result = await Promise.all(promises);
    return result;
  }
  private async getTimeSlot(
    utcDate: Date,
    metadata: GetTimeSlotBodyDto,
    dayModifier: number,
  ): Promise<DayTimetable> {
    // time -> new Date()를 사용하여 정상 출력이 가능한 단위
    // unixstamp -> ms(1000)을 사용하는 단위
    // interval -> s(1)을 사용하는 단위

    const {
      service_duration: service_duration_interval,
      timeslot_interval,
      is_ignore_schedule,
      timezone_identifier,
    } = metadata;

    const startOfDayTime = utcToZonedTime(
      utcDate,
      timezone_identifier,
    ).getTime();

    const weekday = this.utils.getIntWeekday(startOfDayTime);

    const workhour = await this.prisma.workhours.findFirst({
      where: {
        weekday,
      },
    });

    if (!workhour) {
      const message = `${this.utils.getStringWeekday(
        startOfDayTime,
      )}요일 ${NOT_FOUND_WORKHOUR}`;
      throw new NotFoundException(message);
    }

    const { open_interval: open_unixstamp, close_interval: close_unixstamp } =
      workhour;

    const openTime = startOfDayTime + open_unixstamp * 1000;
    const closeTime = startOfDayTime + close_unixstamp * 1000;

    const storeOperatingTime = closeTime - openTime;
    const timeslotLength = Math.floor(
      storeOperatingTime / (timeslot_interval * 1000),
    );

    const events = await this.prisma.events.findMany({
      where: {
        begin_at: {
          gte: openTime / 1000,
          lte: closeTime / 1000,
        },
      },
    });

    const timeslots: Timeslot[] = Array(timeslotLength)
      .fill(openTime)
      .reduce((acc: Timeslot[], open: number, index) => {
        const beginAtTime = addMinutes(
          open,
          index * (timeslot_interval / 60),
        ).getTime();

        const endAtTime = addMinutes(
          beginAtTime,
          service_duration_interval / 60,
        ).getTime();

        const existsEvent = events.find(
          (event) =>
            event.begin_at <= beginAtTime && beginAtTime <= event.end_at,
        );

        if (!is_ignore_schedule && existsEvent) return acc;

        return acc.concat({
          begin_at: beginAtTime / 1000,
          end_at: endAtTime / 1000,
        });
      }, []);

    return {
      start_of_day: startOfDayTime / 1000, // 정시 기준
      day_modifier: dayModifier,
      is_day_off: open_unixstamp === close_unixstamp,
      timeslots,
    };
  }
}
