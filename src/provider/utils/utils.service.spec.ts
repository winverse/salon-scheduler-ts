import { Test, TestingModule } from "@nestjs/testing";
import { UtilsService } from "./utils.service";
import { formatInTimeZone } from "date-fns-tz";

describe("UtilsService", () => {
  let utilsService: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsService],
    }).compile();

    utilsService = module.get<UtilsService>(UtilsService);
  });

  describe("[DateStringToMidnight]", () => {
    describe("[Success]", () => {
      it("should be defined dateStringToMidnight", () => {
        expect(utilsService.dateStringToMidnight).toBeDefined();
      });
      it("timezone 상관 없이 항상 자정 시간만 반환하기 ", () => {
        const result = [
          { date: "20201009", timezone: "Asia/Seoul" },
          { date: "20201010", timezone: "America/New_York" },
          { date: "20201011", timezone: "America/Los_Angeles" },
          { date: "20201230", timezone: "Europe/Paris" },
          { date: "20201030", timezone: "Europe/London" },
        ].map(({ date, timezone }) => ({
          time: utilsService.dateStringToMidnight(date, timezone),
          timezone,
        }));
        result.map(({ time, timezone }) => {
          const format = formatInTimeZone(time, timezone, "HH:mm:ss");
          expect(format).toBe("00:00:00");
        });
      });
    });
  });
  describe("[GetStringWeekday]", () => {
    it("Should Be defined getStringWeekday", () => {
      expect(utilsService.getStringWeekday).toBeDefined();
    });
    it.each([
      ["2023-03-19", "일"],
      ["2023-03-20", "월"],
      ["2022-11-24", "목"],
      ["2022-11-02", "수"],
    ])("getStringWeekday(%s) returns %s", (date, expected) => {
      const day = new Date(date);
      expect(utilsService.getStringWeekday(day)).toBe(expected);
    });
  });
});
