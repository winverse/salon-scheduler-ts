import { Test, TestingModule } from "@nestjs/testing";
import { ReservationService } from "./reservation.service";
import { PrismaModule } from "@provider/prisma/prisma.module";
import { UtilsModule } from "@provider/utils/utils.module";
import { formatInTimeZone } from "date-fns-tz";
import { Timeslot } from "@common/interface";
import { GetTimeSlotBodyDto } from "@module/reservation/dto";
import { ONE_SECOND_IN_MS } from "@common/constants";

type SlotTimeIntervals = {
  slotInterval: number;
  durationInterval: number;
};

async function timeTableTestModule(
  reservationService: ReservationService,
  expectedStartDate: string,
  body: GetTimeSlotBodyDto,
) {
  const { timezone_identifier, timeslot_interval, service_duration } = body;
  const timeTable = await reservationService.getTimeTable(body);

  const { start_of_day, timeslots, is_day_off } = timeTable[0];

  expect(
    formatInTimeZone(
      start_of_day * ONE_SECOND_IN_MS,
      timezone_identifier,
      "yyyy-MM-dd",
    ),
  ).toBe(expectedStartDate);

  if (is_day_off) return;

  const slotTimeIntervals = timeslots.reduce(
    (acc: SlotTimeIntervals[], cur: Timeslot, index, origin) => {
      const next = origin[index + 1];
      if (!next) return acc;

      const slotInterval = next.begin_at - cur.begin_at;
      const durationInterval = cur.end_at - cur.begin_at;
      return acc.concat({ slotInterval, durationInterval });
    },
    [],
  );

  slotTimeIntervals.forEach(({ slotInterval, durationInterval }) => {
    expect(slotInterval).toBe(timeslot_interval);
    expect(durationInterval).toBe(service_duration);
  });
}

describe("ReservationService", () => {
  let reservationService: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, UtilsModule],
      providers: [ReservationService],
    }).compile();

    reservationService = module.get<ReservationService>(ReservationService);
  });

  describe("[GetTimeTable]", () => {
    describe("[Success]", () => {
      it("Should be defined getTimeTable", () => {
        expect(reservationService.getTimeTable).toBeDefined();
      });
      it("getTimeTable Test with Asia/Seoul timezone", async () => {
        const body = {
          start_day_identifier: "20210504", // 시작 날짜
          days: 1,
          timeslot_interval: 1800, // 30분
          service_duration: 3600, // 60분
          is_ignore_schedule: false,
          is_ignore_workhour: false,
          timezone_identifier: "Asia/Seoul",
        };
        await timeTableTestModule(reservationService, "2021-05-04", body);
      });

      it("getTimeTable Test with America/New_York timezone", async () => {
        const body = {
          start_day_identifier: "20230319", // 시작 날짜
          days: 1,
          timeslot_interval: 600, // 10분
          service_duration: 1800, // 30분
          is_ignore_schedule: false,
          is_ignore_workhour: false,
          timezone_identifier: "America/New_York",
        };
        await timeTableTestModule(reservationService, "2023-03-19", body);
      });
    });
  });
});
