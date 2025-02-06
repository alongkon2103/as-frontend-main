/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { DateRangePicker } from "rsuite";
import subDays from "date-fns/subDays";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import addDays from "date-fns/addDays";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import addMonths from "date-fns/addMonths";
import "rsuite/dist/rsuite.min.css";
import { subMonths, format } from "date-fns";
import "./DateRange.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { DateRangeFilterActions } from "@/store/features/DateFilters/DateFilterSlice";

export interface CustomDatePickerProps {
  handleDateChange: any;
  startDate?: string;
  endDate?: string;
  from?: "dashboard" | "project" | "weekly_details";
  shortcuts?: "mini" | "full";
  sky?: boolean;
}

export interface DateType {
  fromDate: string;
  toDate: string;
}

export const DateRange = ({
  startDate,
  endDate,
  handleDateChange,
  from,
  shortcuts = "full",
  sky = false
}: CustomDatePickerProps) => {
  const [value, setValue] = useState<any>([]);

  const dispatch = useAppDispatch();

  const { employeeId: userId } = useAppSelector(
    (state) => state.auth.currentUser
  );

  let predefinedRanges = [];

  if (shortcuts === "mini") {
    predefinedRanges = [
      {
        label: "Today",
        value: [addDays(new Date(), 0), addDays(new Date(), 0)],
        placement: "left",
      },
      {
        label: "This week",
        value: [
          startOfWeek(new Date(), { weekStartsOn: 1 }),
          endOfWeek(new Date(), { weekStartsOn: 1 }),
        ],
        placement: "left",
      },
      {
        label: "Next 3 days",
        value: [addDays(new Date(), 1), addDays(new Date(), 3)],
        placement: "left",
      },
      {
        label: "Next 7 days",
        value: [addDays(new Date(), 1), addDays(new Date(), 7)],
        placement: "left",
      },
      {
        label: "Next 14 days",
        value: [addDays(new Date(), 1), addDays(new Date(), 14)],
        placement: "left",
      },
      {
        label: "Cancel",
        value: () => {
          return value;
        },
        appearance: "default",
      },
    ];
  } else {
    predefinedRanges = [
      {
        label: "Today",
        value: sky ? [addDays(new Date(), -1), addDays(new Date(), 0)] : [addDays(new Date(), 0), addDays(new Date(), 0)],
        placement: "left",
      },
      {
        label: "Yesterday",
        value: sky ? [addDays(new Date(), -1), addDays(new Date(), 0)] : [addDays(new Date(), -1), addDays(new Date(), -1)],
        placement: "left",
      },
      {
        label: "This week",
        value: [
          startOfWeek(new Date(), { weekStartsOn: 1 }),
          endOfWeek(new Date(), { weekStartsOn: 1 }),
        ],
        placement: "left",
      },
      {
        label: "This month",
        value: [startOfMonth(new Date()), endOfMonth(new Date())],
        placement: "left",
      },
      {
        label: "Last 30 days",
        value: [subDays(new Date(), 29), new Date()],
        placement: "left",
      },
      {
        label: "Last month",
        value: [
          startOfMonth(addMonths(new Date(), -1)),
          endOfMonth(addMonths(new Date(), -1)),
        ],
        placement: "left",
      },
      {
        label: "Last 3 months",
        value: [subMonths(new Date(), 3), new Date()],
        placement: "left",
      },
      {
        label: "Last 12 months",
        value: [subMonths(new Date(), 12), new Date()],
        placement: "left",
      },
      {
        label: "This year (Jan - Today)",
        value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
        placement: "left",
      },
      {
        label: "Cancel",
        value: () => {
          return value;
        },
        appearance: "default",
      },
    ];
  }

  // need to update the setValue when startDate and endDate change
  useEffect(() => {
    if (startDate !== undefined && endDate !== undefined) {
      setValue([new Date(startDate), new Date(endDate)]);
    } else {
      setValue([
        startOfWeek(new Date(), { weekStartsOn: 1 }),
        endOfWeek(new Date(), { weekStartsOn: 1 }),
      ]);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (value.length === 2) {
      handleDateChange({
        toDate: format(value[1], "yyyy/MM/dd"),
        fromDate: format(value[0], "yyyy/MM/dd"),
      });

      if (from === "project") {
        dispatch(
          DateRangeFilterActions.updateProjectFilters({
            userId: userId,
            filters: {
              startDate: format(value[0], "yyyy/MM/dd"),
              endDate: format(value[1], "yyyy/MM/dd"),
            },
          })
        );
      } else if (from === "dashboard") {
        dispatch(
          DateRangeFilterActions.updateDashBoardFilters({
            userId: userId,
            filters: {
              startDate: format(value[0], "yyyy/MM/dd"),
              endDate: format(value[1], "yyyy/MM/dd"),
            },
          })
        );
      } else if (from === "weekly_details") {
        dispatch(
          DateRangeFilterActions.updateWeeklyDetailFilters({
            userId: userId,
            filters: {
              startDate: format(value[0], "yyyy/MM/dd"),
              endDate: format(value[1], "yyyy/MM/dd"),
            },
          })
        );
      }
    }
  }, [value]);

  return (
    <DateRangePicker
      data-testid="date-range-picker"
      ranges={predefinedRanges as any}
      placement="auto"
      value={value}
      onChange={setValue}
      format="dd/MM/yyyy"
      character=" - "
      cleanable={false}
      isoWeek={true}
    />
  );
};
