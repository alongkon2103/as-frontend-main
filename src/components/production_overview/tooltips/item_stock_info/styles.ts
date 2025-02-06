import { type SxProps, type Theme } from "@mui/material";

type StylesKeys = "infoTitle" | "titleText" | "greyText";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  infoTitle: {
    color: "var(--text-primary, rgba(0, 0, 0, 0.87))",
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
  },
  titleText: {
    color: "var(--text-primary, rgba(0, 0, 0, 0.87))",
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: "Roboto",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
  },
  greyText: {
    color: "var(--text-primary, rgba(0, 0, 0, 0.60))",
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontWeight: 400,
    fontFamily: "Roboto",
    fontSize: "12px",
    fontStyle: "italic",
    lineHeight: "16px",
    marginTop: "10px",
  },
});
