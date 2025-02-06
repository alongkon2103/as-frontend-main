import { type SxProps, type Theme } from "@mui/material";

type StylesKeys =
  | "onThisWeekWrapper"
  | "title"
  | "titleLeft"
  | "defaultText"
  | "fadedText"
  | "plannedNumber"
  | "detailTextBold"
  | "detailTextNormal"
  | "detailNumber"
  | "detailTextWrapper"
  | "modalStyle";

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
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "16px" /* 133.333% */,
  },
  plannedNumber: {
    fontFamily: "Roboto",
    fontSize: "32px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
  },
  detailTextBold: {
    color: "var(--text-secondary, rgba(0, 0, 0, 0.60))",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "18px",
  },
  detailTextNormal: {
    color: "var(--text-secondary, rgba(0, 0, 0, 0.60))",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "18px",
  },
  detailNumber: {
    fontFamily: "Roboto",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    textAlign: "center",
  },
  detailTextWrapper: {
    display: "flex",
    verticalAlign: "center",
    gap: "3px",
    paddingTop: "5px",
  },
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    py: 3,
    px: 4,
  },
});
