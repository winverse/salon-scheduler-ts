import { Injectable } from "@nestjs/common";
import { getDay } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

@Injectable()
export class UtilsService {
  dateStringToMidnight(dateString: string, timezone: string) {
    const date = zonedTimeToUtc(`${dateString}T00:00:00`, timezone);
    return date.getTime();
  }
  getIntWeekday(date: Date | number) {
    return getDay(date) + 1;
  }
  getStringWeekday(date: Date | number) {
    const int = getDay(date);
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return days[int];
  }
}
