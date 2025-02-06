import { type SxProps, type Theme } from "@mui/material";

type StylesKeys =
  | "topTitleText"
  | "low_performance_box"
  | "low_performance_text"
  | "dateText"
  | "timestampText"
  | "titleText"
  | "calendarBox";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  topTitleText: {
    fontFamily: "Roboto",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "150%" /* 36px */,
  },
  low_performance_text: {
    fontFamily: "Roboto",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "150%",
    mt: "40px",
  },
  low_performance_box: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
    justifyContent: "space-between",
  },
  dateText: {
    fontFamily: "Roboto",
    fontSize: "12px",
    fontStyle: "italic",
    fontWeight: 400,
    lineHeight: "16px",
  },
  timestampText: {
    color: "rgba(0, 0, 0, 0.60)",
    fontSize: 12,
    fontStyle: "italic",
    display: "inline-block",
  },
  titleText: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "700",
    mr: "1vw",
    whiteSpace: "nowrap",
    display: "inline",
  },
  calendarBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: "40px",
  },
});
