import { type SxProps, type Theme } from "@mui/material";

type StylesKeys =
  | "titleBar"
  | "topTitle"
  | "dateText"
  | "titleText"
  | "normalText"
  | "jobDetailFilterModal";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  topTitle: {
    fontFamily: "Roboto",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "150%" /* 36px */,
  },
  titleBar: {
    display: "flex",
    gap: "20px",
  },
  dateText: {
    fontFamily: "Roboto",
    fontSize: "12px",
    fontStyle: "italic",
    fontWeight: 400,
    lineHeight: "16px",
  },
  titleText: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "700",
    marginRight: "1vw",
  },
  normalText: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
  },
  jobDetailFilterModal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "96%",
    height: "88%",
    bgcolor: "#F4F7FA",
    border: "1px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    marginLeft: "3%",
    marginTop: "5%",
  },
});
