import { type SxProps, type Theme } from "@mui/material";

type StylesKeys =
  | "box"
  | "tab"
  | "loading"
  | "graphBox"
  | "tabText"
  | "subHeader"
  | "topButton"
  | "markColor"
  | "xTickLabel"
  | "yLabel"
  | "yTickLabel";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  box: {
    width: "min(834px,100%)",
    height: "431px",
    p: "12px",
    boxShadow:
      "0px 0.5px 1.75px 0px #0000000A, 0px 1.85px 6.25px 0px #00000030",
    borderRadius: 1,
  },
  tab: { marginBottom: "10px" },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  graphBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 1,
  },
  tabText: {
    color: "#000",
    fontFamily: "Roboto",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "24px",
  },
  subHeader: {
    color: "rgba(0, 0, 0, 0.60)",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.25",
  },
  topButton: {
    bgcolor: "#fff",
    color: "#1976d2",
    border: "1px solid #1976d2",
    "&:hover": {
      bgcolor: "#1976d2",
      color: "#fff",
    },
  },
  markColor: {
    [`& .MuiMarkElement-root`]: {
      // Use default class name for mark elements
      fill: "#000",
    },
  },
  xTickLabel: {
    fontSize: 10,
    angle: -45,
    textAnchor: "end",
    whiteSpace: "pre-line",
    dominantBaseline: "hanging",
  },
  yLabel: {
    fontSize: 12,
    color: "var(--light-base-axis-legend-label, rgba(0, 0, 0, 0.60))",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "16px",
    letterSpacing: "0.15px",
  },
  yTickLabel: { fontSize: 12 },
});
