import { type SxProps, type Theme } from "@mui/material";

type StylesKeys = "card" | "title" | "date" | "count" | "total" | "descp";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  card: {
    borderRadius: "8px",
    background: "#FFF",
    boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.16)",
    padding: "10px",
    minWidth: "14rem",
    height: "174px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: " flex-start",
  },
  title: {
    color: "var(--text-primary, rgba(0, 0, 0, 0.87))",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: "700",
    lineheight: "normal",
    whiteSpace: "nowrap",
    paddingRight: "1rem",
  },
  date: {
    color: " var(--text-secondary, rgba(0, 0, 0, 0.60))",
    fontSize: "12px",
    fontStyle: "italic",
    fontWeight: "400",
    lineHeight: "16px",
    marginTop: "0.5rem",
  },
  count: {
    fontSize: "40px",
    fontStyle: "normal",
    fontWeight: "400",
    lineJHeight: "normal",
    marginTop: "0.8rem",
  },
  total: {
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: "400",
    lineJHeight: "normal",
  },
  descp: {
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineheight: "normal",
    marginTop: "0.3rem",
  },
});
