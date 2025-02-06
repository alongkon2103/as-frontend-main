"use client";

import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { UseDateFieldProps } from "@mui/x-date-pickers/DateField";
import {
  BaseSingleInputFieldProps,
  DateValidationError,
  FieldSection,
} from "@mui/x-date-pickers/models";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Day } from "../CustomDay";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear);
interface ButtonFieldProps
  extends UseDateFieldProps<Dayjs>,
    BaseSingleInputFieldProps<
      Dayjs | null,
      Dayjs,
      FieldSection,
      DateValidationError
    > {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ButtonField(props: ButtonFieldProps) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props;

  return (
    <Button
      variant="outlined"
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "black",
        border: "1px solid #E0E0E0",
        ":hover": {
          border: "1px solid black",
        },
        maxWidth: "160px",
        minHeight: "42px",
      }}
      onClick={() => setOpen?.((prev) => !prev)}
    >
      {label ?? "Pick a date"}
      <ArrowDropDownIcon />
    </Button>
  );
}

interface ButtonDatePickerProps
  extends Omit<DatePickerProps<Dayjs>, "open" | "onOpen" | "onClose"> {
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
}

function ButtonDatePicker(props: ButtonDatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const { value, onChange } = props;

  return (
    <DatePicker
      displayWeekNumber
      slots={{ day: Day, field: ButtonField, ...props.slots }}
      slotProps={{
        field: { setOpen } as any,
        day: {
          selectedDay: value,
        } as any,
      }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      onChange={(value) => onChange(value)}
    />
  );
}
interface WeekPickerProps {
  value: Dayjs;
  onChange: (date: Dayjs) => void;
}

export default function WeekPicker({ value, onChange }: WeekPickerProps) {
  const getWeekNumber = (date: Dayjs) => {
    return dayjs(date).week();
  };

  return (
    <Stack spacing={1}>
      <ButtonDatePicker
        label={`WK ${
          value == null
            ? `${getWeekNumber(dayjs(value))}, ${dayjs(value).year()}`
            : `${getWeekNumber(dayjs(value))}, ${dayjs(value).year()}`
        }`}
        value={value}
        onChange={(value) => {
          onChange(value as Dayjs);
        }}
      />
    </Stack>
  );
}
