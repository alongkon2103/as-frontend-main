import { type SxProps, type Theme } from "@mui/material";

type StylesKeys =
  | "box"
  | "title"
  | "subtitle"
  | "tablerow"
  | "R_M_header"
  | "percentage_header"
  | "reasons_header"
  | "resource"
  | "machine"
  | "percentage_text"
  | "reasons_text"
    "percentage_text_Cimco";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  box: {
    boxShadow:
      "0px 0.5px 1.75px 0px #0000000A, 0px 1.85px 6.25px 0px #00000030",
    borderRadius: "4px",
    width: "500px",
    height: "431px",
    gap: "16px",
    overflowY: "auto",
    p: 3,
  },
  title: {
    color: "#000",
    fontFamily: "Roboto",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "24px",
  },
  subtitle: {
    color: "#00000099",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "20px",
    letterSpacing: "0.25px",
    marginBottom: "16px",
  },
  tablerow: { backgroundColor: "#FFFFFF" },
  R_M_header: {
    p: "8px",
    paddingRight: "5px",
    color: "#000000DE",
    fontFeatureSettings: "'clig' off, 'liga' off",
    width: "150px",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "24px",
    letterSpacing: "0.17px",
  },
  percentage_header: {
    p: "8px",
    paddingRight: "16px",

    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "24px",
    letterSpacing: "0.17px",
  },
  reasons_header: {
    p: "8px",
    width: "124px",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "24px",
    letterSpacing: "0.17px",
  },
  resource: {
    p: "8px",
    fontFeatureSettings: "'clig' off, 'liga' off",
    verticalAlign: "top",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    letterSpacing: "0.17px",
    lineHeight: "143%",
  },
  machine: {
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: "Roboto",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "700",
    letterSpacing: "0.17px",
    lineHeight: "143%",
  },
  percentage_text: {
    p: "8px",
    fontFeatureSettings: "'clig' off, 'liga' off",
    verticalAlign: "top",
    color: "#D32F2F",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    letterSpacing: "0.17px",
    lineHeight: "143%",
  },
  reasons_text: {
    p: "8px",
    fontFeatureSettings: "'clig' off, 'liga' off",
    color: "#000000DE",
    verticalAlign: "top",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    letterSpacing: "0.17px",
    lineHeight: "143%",
  },
});
