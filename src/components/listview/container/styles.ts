import { type SxProps, type Theme } from "@mui/material";

export const mainContainerStyle = () => ({
  padding: "10.293px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "220px",
  overflowY: "auto",
  backgroundColor: "#F4F7FA",
  height: "100%",
  maxHeight: {
    xs: "50vh",
    sm: "70vh",
    md: "80vh",
    lg: "90vh",
    xl: "100vh",
  },
  position: "fixed",
  right: 0,
});

export const headerStyles = () => ({
  color: "#000",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Roboto",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "normal",
  mb: 0.5,
});

type TimeKeys = "updatedText" | "timeText";

export const TimeStyles = (): {
  [key in TimeKeys]: SxProps<Theme> | any;
} => ({
  updatedText: {
    display: "flex",
    alignItems: "center",
    color: "#000",
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: "Roboto",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 700,
    mb: 2,
  },
  timeText: {
    color: "#000",
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: "Roboto",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
  },
});

export const boxPosition = () => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
});

export const groupLabelStyles = (status: string): SxProps<Theme> => ({
  color: status === "STOP" ? "#D32F2F" : "#00000099",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Roboto",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "normal",
  mb: 1,
});
