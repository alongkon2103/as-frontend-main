import { type SxProps, type Theme } from "@mui/material";

type StylesKeys =
  | "titleBar"
  | "topTitle"
  | "dateText"
  | "titleText"
  | "normalText"
  | "machineDetailContainer"
  | "machineDetail"
  | "totalCycleTimeCard"
  | "spindleStatsCard"
  | "machineDetailTypos"
  | "machineDetailTypo"
  | "machineImage"
  | "statusText"
  | "runningBox"
  | "stopBox"
  | "idleBox"
  | "offBox"
  | "assigneeAvatar";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  topTitle: {
    fontFamily: "Roboto",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "150%" /* 36px */,
    wordBreak: "break-word",
  },
  titleBar: {
    display: "flex",
    gap: "20px",
  },
  dateText: {
    fontFamily: "Roboto",
    fontSize: "12px",
    fontStyle: "italic",
    fontWeight: "400",
    lineHeight: "16px",
  },
  titleText: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "700",
    marginRight: "1vw",
    whiteSpace: "nowrap",
    display: "inline",
  },
  normalText: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    wordBreak: "break-word",
    display: "inline",
  },
  machineDetailContainer: {
    direction: "row",
    gap: "29px",
    mt: "24px !important",
  },
  machineDetail: {
    py: "16px",
    pl: "24px",
    display: "flex",
    alignItems: "center",
  },
  machineImage: {
    height: "100%",
    aspectRatio: "1/1",
    position: "relative",
  },
  machineDetailTypos: {
    display: "flex",
    flexWrap: "wrap",
    ml: "50px",
    p: "1rem 0",
    columnGap: "24px",
    alignContent: "space-between",
    height: "100%",
  },
  machineDetailTypo: {
    width: "calc(50% - 12px)",
  },
  statusText: {
    fontWeight: "700",
    fontSize: "0.75rem",
  },
  runningBox: {
    display: "inline-block",
    p: "0.25rem 0.5rem",
    width: "fit-content",
    borderRadius: "0.25rem",
    background: "#EDF7ED",
    color: "#2E7D32",
  },
  stopBox: {
    display: "inline-block",
    p: "0.25rem 0.5rem",
    width: "fit-content",
    borderRadius: "0.25rem",
    background: "#FDEDED",
    color: "#D32F2F",
  },
  idleBox: {
    display: "inline-block",
    p: "0.25rem 0.5rem",
    width: "fit-content",
    borderRadius: "0.25rem",
    background: "#FFF9E6",
    color: "#232A35",
  },
  offBox: {
    display: "inline-block",
    p: "0.25rem 0.5rem",
    width: "fit-content",
    borderRadius: "0.25rem",
    background: "#D6D9DD",
    color: "#00000099",
  },
  assigneeAvatar: {
    position: "relative",
    top: "5px",
    textAlign: "center",
    mr: "10px",
    width: "20px",
    height: "20px",
    bgcolor: "#001C3B",
    display: "inline-block",
  },
  totalCycleTimeCard: {
    backgroundColor: "#D5E3FF",
    height: "80px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    mb: "16px",
  },
  spindleStatsCard: {
    backgroundColor: "#E5F6FD",
    height: "146px",
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
});
