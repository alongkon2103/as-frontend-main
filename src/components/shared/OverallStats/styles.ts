import { type SxProps, type Theme } from "@mui/material";

type StylesKeys =
  | "onThisWeekWrapper"
  | "title"
  | "titleLeft"
  | "defaultText"
  | "fadedText"
  | "detailNumber"
  | "boldNumber"
  | "overallStatDetail"
  | "overAllStatDetailNumber";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  onThisWeekWrapper: {
    borderRadius: "10px",
    background: "var(--neutral-0, #FFF)",
    boxShadow:
      "0px 0.949999988079071px 2.8399999141693115px 0px rgba(0, 0, 0, 0.20)",
    padding: "16px",
    minHeight: "300px",
  },
  titleLeft: {
    display: "flex",
    flexGrow: 1,
    gap: "3px",
  },
  title: {
    color: "var(--text-primary, rgba(0, 0, 0, 0.87))",
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: "Roboto",
    fontSize: "28px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    marginRight: "8px",
  },
  defaultText: {
    color: "var(--text-primary, rgba(0, 0, 0, 0.87))",
    fontFamily: "Roboto",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
  },
  fadedText: {
    color: "var(--text-disabled, rgba(0, 0, 0, 0.38))",
    fontFamily: "Roboto",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "16px" /* 133.333% */,
  },
  detailNumber: {
    color: "var(--blue-dark, #014361)",
    fontFamily: "Roboto",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
  boldNumber: {
    fontFamily: "Roboto",
    fontSize: "32px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    color: "#014361",
  },
  overallStatDetail: {
    fontWeight: "400",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: "12px",
    fontStyle: "normal",
    lineHeight: "normal",
  },
  overAllStatDetailNumber: {
    fontWeight: "400",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: "20px",
    fontStyle: "normal",
    lineHeight: "normal",
    marginTop: "16px",
  },
});
