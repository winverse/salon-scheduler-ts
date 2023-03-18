export type DayTimetable = {
  start_of_day: number; // Unixstamp seconds
  day_modifier: number;
  is_day_off: boolean;
  timeslots: Timeslot[];
};

export type Timeslot = {
  begin_at: number; // Unixstamp seconds
  end_at: number; // Unixstamp seconds
};

export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";
