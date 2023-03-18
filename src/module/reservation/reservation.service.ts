import { NOT_FOUND_WORKHOUR } from "@common/constants";
import { DayTimetable, Timeslot } from "@common/interface";
import { GetTimeSlotBodyDto } from "@module/reservation/dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@provider/prisma/prisma.service";
import { UtilsService } from "@provider/utils/utils.service";
import { add } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

@Injectable()
export class ReservationService {
  constructor(
    private readonly utils: UtilsService,
    private readonly prisma: PrismaService,
  ) {}
  public async getTimeTable(body: GetTimeSlotBodyDto): Promise<DayTimetable[]> {
    const { start_day_identifier, timezone_identifier, days } = body;

    const time = this.utils.stringDateToTime(start_day_identifier);
    const utcDate = zonedTimeToUtc(time, timezone_identifier);

    const promises = Array(days)
      .fill(utcDate)
      .map((date, index) => add(date, { days: index }))
      .map((date, index) => this.getTimeSlot(date, body, index + 1));

    const result = await Promise.all(promises);

    return result;
  }
  private async getTimeSlot(
    utcDate: Date,
    metaData: GetTimeSlotBodyDto,
    dayModifier: number,
  ): Promise<DayTimetable> {
    // date -> new Date()를 사용하여 정상 출력이 가능한 단위
    // unixstamp -> ms(1000)을 곱해줘야지 date가 됨
    // interval -> s(1)을 사용하는 단위

    const {
      service_duration: service_duration_interval,
      timeslot_interval,
      is_ignore_schedule,
      timezone_identifier,
    } = metaData;

    const startOfDayDate = utcToZonedTime(
      utcDate,
      timezone_identifier,
    ).getTime();

    const weekday = this.utils.getIntWeekday(startOfDayDate);

    const workhour = await this.prisma.workhours.findFirst({
      where: {
        weekday,
      },
    });

    if (!workhour) {
      const message = `${this.utils.getStringWeekday(
        startOfDayDate,
      )}요일 ${NOT_FOUND_WORKHOUR}`;
      throw new NotFoundException(message);
    }

    const { open_interval: open_unixstamp, close_interval: close_unixstamp } =
      workhour;

    const openDate = startOfDayDate + open_unixstamp * 1000;
    const closeDate = startOfDayDate + close_unixstamp * 1000;

    const diffDate = closeDate - openDate;
    const timeslotLength = Math.floor(diffDate / (timeslot_interval * 1000));

    const events = await this.prisma.events.findMany({
      where: {
        begin_at: {
          gte: openDate / 1000,
          lte: closeDate / 1000,
        },
      },
    });

    const timeslots: Timeslot[] = Array(timeslotLength)
      .fill(openDate)
      .reduce((acc: Timeslot[], open: number, index) => {
        const beginAtDate = add(open, {
          minutes: index * (timeslot_interval / 60),
        }).getTime();

        const endAtDate = add(beginAtDate, {
          minutes: service_duration_interval / 60,
        }).getTime();

        const existsEvent = events.find(
          (event) =>
            event.begin_at <= beginAtDate && beginAtDate <= event.end_at,
        );

        if (!is_ignore_schedule && existsEvent) return acc;

        return acc.concat({
          begin_at: beginAtDate / 1000,
          end_at: endAtDate / 1000,
        });
      }, []);

    return {
      start_of_day: startOfDayDate / 1000, // 정시 기준
      day_modifier: dayModifier,
      is_day_off: open_unixstamp === close_unixstamp,
      timeslots,
    };
  }
}
