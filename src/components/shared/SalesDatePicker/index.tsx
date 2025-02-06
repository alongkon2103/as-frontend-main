import {
  Box,
  Button,
  FormControlLabel,
  Popover,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { ArrowDropDownIcon, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";
import WeekPicker from "../WeekPicker2";
import {
  formatMonth,
  formatWeek,
  isWeek2BeforeWeek1,
  parseWeekYearString,
  parseMonthYearString,
} from "@/utils/utils";
import { DateFilterType } from "@/app/(private)/salesDashboard/types";
// format (Week Number 2 digits)/(Year 4 digits) - eg 01/2021

export type WeekType = {
  fromDate: string;
  toDate: string;
  filterType: DateFilterType;
};

export default function SalesDatePicker({
  weekRange,
  handleDateChange,
  projectLabel,
}: {
  weekRange: WeekType; // a fallback status for when apply is not clicked
  handleDateChange: (value: WeekType) => void;
  projectLabel?: string;
}) {
  const [startDate, setStartDate] = useState(dayjs().startOf("week"));
  const [endDate, setEndDate] = useState(
    weekRange.filterType === "week"
      ? dayjs().add(4, "week").endOf("week")
      : dayjs().add(1, "month").endOf("month")
  );
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [radioValue, setRadioValue] = useState("week_range");

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const year = dayjs(startDate).year();
  const startWeek = dayjs(startDate).week();
  const endWeek = dayjs(endDate).week();
  const endYear = dayjs(endDate).year();

  const handleClose = () => {
    if (weekRange.filterType === "week") {
      setStartDate(parseWeekYearString(weekRange.fromDate));
      setEndDate(parseWeekYearString(weekRange.toDate));
      setRadioValue("week_range");
    } else {
      setStartDate(parseMonthYearString(weekRange.fromDate));
      setEndDate(parseMonthYearString(weekRange.toDate));
      setRadioValue("month_range");
    }
    setAnchorEl(null);
  };

  const onRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if ((event.target as HTMLInputElement).value === "specific") {
      setEndDate(startDate);
    } else {
      setEndDate(dayjs(startDate).add(4, "week").endOf("week"));
    }
    setRadioValue((event.target as HTMLInputElement).value);
  };

  const getSalesDatePicker = () => {
    return (
      <>
        <Button
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "black",
            border: "1px solid #E0E0E0",
            ":hover": {
              border: "1px solid black",
            },
            fontWeight: 400,
            maxWidth: "500px",
            minHeight: "42px",
            textTransform: "none",
          }}
          onClick={handleClick}
        >
          {projectLabel && <b>{projectLabel} :</b>}
          {radioValue === "week_range"
            ? `WK ${startWeek}, ${year} - WK ${endWeek}, ${endYear}`
            : `${startDate.format("MMM YYYY")} - ${endDate.format("MMM YYYY")}`}
          <ArrowDropDownIcon />
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{
            minWidth: 500,
          }}
        >
          <Box m={2} mt={0}>
            <RadioGroup value={radioValue} onChange={onRadioChange} row>
              <FormControlLabel
                value="week_range"
                control={<Radio />}
                label="Week Range"
              />
              <FormControlLabel
                value="month_range"
                control={<Radio />}
                label="Month Range"
              />
            </RadioGroup>
            {radioValue === "week_range" ? (
              <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                <Typography mr={1}>{"From "}</Typography>
                <WeekPicker
                  value={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                  }}
                ></WeekPicker>
                <Typography mx={1}>{"to "}</Typography>
                <WeekPicker
                  value={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                  }}
                ></WeekPicker>
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                <Typography mr={1}>{"From "}</Typography>
                <Stack spacing={1}>
                  <DatePicker
                    openTo="month"
                    views={["year", "month"]}
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue as any);
                    }}
                    format="MMM YYYY"
                    sx={{
                      maxWidth: "140px",
                    }}
                    slotProps={{ textField: { size: "small" } }}
                  />
                </Stack>
                <Typography mx={1}>{"to "}</Typography>
                <Stack spacing={1}>
                  <DatePicker
                    openTo="month"
                    views={["year", "month"]}
                    value={endDate}
                    onChange={(newValue) => {
                      setEndDate(newValue as any);
                    }}
                    format="MMM YYYY"
                    sx={{
                      maxWidth: "140px",
                    }}
                    slotProps={{ textField: { size: "small" } }}
                  />
                </Stack>
              </Box>
            )}
            {radioValue === "week_range" &&
              isWeek2BeforeWeek1(
                formatWeek(startDate),
                formatWeek(endDate)
              ) && (
                <Typography color="red" mb={2}>
                  * End Week cannot be before the Start Week
                </Typography>
              )}
            {radioValue === "month_range" && endDate.isBefore(startDate) && (
              <Typography color="red" mb={2}>
                * End Month cannot be before the Start Month
              </Typography>
            )}
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                handleDateChange({
                  fromDate:
                    radioValue === "week_range"
                      ? formatWeek(startDate)
                      : formatMonth(startDate),
                  toDate:
                    radioValue === "week_range"
                      ? formatWeek(endDate)
                      : formatMonth(endDate),
                  filterType:
                    radioValue === "week_range"
                      ? DateFilterType.WEEK
                      : DateFilterType.MONTH,
                });
                setAnchorEl(null);
              }}
              disabled={isWeek2BeforeWeek1(
                formatWeek(startDate),
                formatWeek(endDate)
              )}
            >
              Apply
            </Button>
          </Box>
        </Popover>
      </>
    );
  };
  return <div>{getSalesDatePicker()}</div>;
}
