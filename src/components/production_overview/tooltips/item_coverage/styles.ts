import { type SxProps, type Theme } from "@mui/material";

type StylesKeys =
  | "hoverBackground"
  | "infoTitle"
  | "normalFlex"
  | "titleText"
  | "greyText";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  hoverBackground: {
    backgroundColor: "#FFFFFF",
    color: "#000000",
    border: "1px solid #dadde9",
  },
  infoTitle: {
    color: "var(--text-primary, rgba(0, 0, 0, 0.87))",
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
  },
  normalFlex: {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    marginBottom: "10px",
  },
  titleText: {
    color: "var(--text-primary, rgba(0, 0, 0, 0.87))",
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
  greyText: {
    color: "var(--text-primary, rgba(0, 0, 0, 0.60))",
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: "Roboto",
    fontSize: "12px",
    fontStyle: "italic",
    fontWeight: 400,
    lineHeight: "16px",
    marginTop: "10px",
  },
});
