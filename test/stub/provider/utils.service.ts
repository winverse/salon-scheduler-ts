import { UtilsService } from "@provider/utils/utils.service";
import { Stub } from "test/stub/stub.interface";

export type StubUtilsService = Stub<UtilsService>;

export const stubUtilsService: StubUtilsService = {
  dateStringToMidnight: jest.fn(),
  getIntWeekday: jest.fn(),
  getStringWeekday: jest.fn(),
};
