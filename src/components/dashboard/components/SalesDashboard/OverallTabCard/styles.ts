import { type SxProps, type Theme } from "@mui/material";

type StylesKeys = "container" | "title" | "stats" |"amount" | "unit";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  container: {
    minWidth: "123px",
    borderRadius: "var(--8px-Space, 8px)",
    background: "#FFF",
    boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.16)",
    padding: "16px",
    height: "100%"
  },
  title: {
    color: "var(--Text-Primary, rgba(0, 0, 0, 0.87))",
    fontFeatureSettings: `'clig' off, 'liga' off`,
    fontFamily: "Roboto",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    marginBottom: "16px",
  },
  unit : {
    color : "rgba(0, 0, 0, 0.60)",
    fontFeatureSettings: `'clig' off, 'liga' off`,
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
  amount :{
    color : "rgba(0, 0, 0, 0.60)",
    fontFeatureSettings: `'clig' off, 'liga' off`,
    fontFamily: "Roboto",
    fontSize: "32px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    marginBottom:"8px"
  },
  stats:{
    fontFeatureSettings: `'clig' off, 'liga' off`,
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  }
});