import { Injectable } from "@nestjs/common";
import { getDay } from "date-fns";

@Injectable()
export class UtilsService {
  stringDateToTime(dateString: string) {
    // server timezone base
    const year = parseInt(dateString.slice(0, 4), 10);
    const month = parseInt(dateString.slice(4, 6), 10) - 1;
    const day = parseInt(dateString.slice(6), 10);
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0); // last midnight
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
