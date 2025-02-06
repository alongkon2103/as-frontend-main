import { DateRangeHoverProps } from "@/store/features/ProductionOverview/ProductionOverviewSlice";
import dayjs from "dayjs";

export const renderTableCells = (end: number) => {
  const cells = [];
  const month = dayjs().month() + 1;
  const year = dayjs().year();

  for (let i = 0; i < end; i++) {
    const adjustedMonth = (month + i) % 12 || 12;
    const monthStr = dayjs()
      .month(adjustedMonth - 1)
      .format("MMM");
    const adjustedYear = year + Math.floor((month + i - 1) / 12);
    const date = `${monthStr}-${adjustedYear.toString().substring(2, 4)}`;
    cells.push({ name: String(i), title: date, filteringEnabled: true });
  }
  return cells;
};

export const validWeeks = Array.from(
  { length: 52 },
  (_, index) => "WK" + (index + 1).toString().padStart(2, "0")
);

export const validMonths = renderTableCells(12);

export const colorColumns = [
  "overdue",
  ...validWeeks,
  ...validMonths.map((column) => column.name),
];

export const calculateWorkWeek = (week: number) => {
  return week === 0
    ? "WK52"
    : week.toString().length > 1
    ? "WK" + week.toString()
    : "WK0" + week.toString();
};

export const calculateDateRangeFromWeek = (week: number) => {
  const year = dayjs().year();
  const startDate = dayjs().year(year).week(week).startOf("week");
  const endDate = dayjs().year(year).week(week).endOf("week");

  return `${startDate.format("DD/MM/YYYY")} - ${endDate.format("DD/MM/YYYY")}`;
};

export const showBoat = (hover: DateRangeHoverProps[]): boolean => {
  return hover.some((item: DateRangeHoverProps) => dayjs(item.requestedDate).diff(dayjs(item.dueDate), "day") > 45);
}

// columns that can grab the value immediately
export const valueColumns = [
  "name",
  "assemblyPart",
  "mcPart",
  "familyCode",
  "price",
];
