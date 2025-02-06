import { type SxProps, type Theme } from "@mui/material";
import { lineElementClasses } from "@mui/x-charts";

type StylesKeys =
  | "box"
  | "header"
  | "sub_header"
  | "selectbox"
  | "chartbox"
  | "invisible_line"
  | "xAxisLabelStyles"
  | "chartLegend"
  | "targetLine"
  | "loading"
  | "topButton"
  | "gaugeTitle"
  | "modalBox"
  | "modalContentBox"
  | "modalTextHeader"
  | "modalProjectName"
  | "modalCloseIcon"
  | "modalPerformanceGauge"
  | "modalUtilizationGauge"
  | "modalGraphBox"
  | "modalTextPostion"
  | "modalMachine"
  | "modalMachineLabel"
  | "modalTargetLine";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  box: {
    mt: "24px",
    backgroundColor: "#FFF",
    maxWidth: "1151px",
    height: "562px",
    borderRadius: "4px",
    border: "1px solid #EAEDF1",
    boxShadow:
      "0px 0.5px 1.75px 0px rgba(55, 98, 156, 0.13), 0px 1.85px 6.25px 0px rgba(55, 98, 156, 0.15)",
    padding: "16px",
  },
  header: {
    color: "#000",
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: "Roboto",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
  sub_header: {
    color: "rgba(0, 0, 0, 0.60)",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.25px",
  },
  selectbox: { width: "245px", height: "43px" },
  chartbox: {
    height: "calc(100% - 90px)",
    width: "100%",
    mt: "12px",
    position: "relative",
  },
  invisible_line: {
    [`& .${lineElementClasses?.root || "MuiLineElement-root"}`]: {
      strokeWidth: 0,
      strokeDasharray: "5 5",
    },
  },
  xAxisLabelStyles: {
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: 700,
    lineHeight: "16px",
    letterSpacing: "0.15px",
    fill: "#225FA6",
  },
  chartLegend: {
    legend: {
      direction: "row",
      itemMarkWidth: 14,
      itemMarkHeight: 14,
      markGap: 10,
      itemGap: 8,
      padding: -5,
      labelStyle: {
        fontSize: 14,
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: 400,
        fill: "rgba(0, 0, 0, 0.60)",
        lineHeight: "normal",
      },
    },
  },
  targetLine: {
    position: "absolute",
    top: "calc((100% - 100 / 120 * 100%) + 33px)",
    left: "4.5%",
    right: 0,
    height: "2px",
    borderTop: "2px dashed #E9AF00",
    width: "91%",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  topButton: {
    bgcolor: "#fff",
    color: "#1976d2",
    "&:hover": {
      bgcolor: "#1976d2",
      color: "#fff",
    },
  },
  gaugeTitle: {
    color: "rgba(0, 0, 0, 0.60)",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 700,
  },
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "1200px",
    height: "660px",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
    p: 4,
    backgroundColor: "#FFF",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
  modalContentBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  },
  modalTextHeader: {
    color: "#000",
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: "Roboto",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    display: "inline",
    marginRight: 1,
  },
  modalProjectName: {
    color: "#000",
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: "Roboto",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    display: "inline",
  },
  modalCloseIcon: { marginLeft: 2 },
  modalPerformanceGauge: {
    height: "fit-content",
    borderRadius: "4px",
    boxShadow:
      "0px 0.5px 1.75px 0px rgba(0, 0, 0, 0.04), 0px 1.85px 6.25px 0px rgba(0, 0, 0, 0.19)",
    padding: "16px 0px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginRight: "1vw",
  },
  modalUtilizationGauge: {
    height: "fit-content",
    borderRadius: "4px",
    boxShadow:
      "0px 0.5px 1.75px 0px rgba(0, 0, 0, 0.04), 0px 1.85px 6.25px 0px rgba(0, 0, 0, 0.19)",
    padding: "16px 0px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginLeft: "1vw",
  },
  modalGraphBox: {
    width: "100%",
    height: "fit-content",
    borderRadius: "4px",
    boxShadow:
      "0px 0.5px 1.75px 0px rgba(0, 0, 0, 0.04), 0px 1.85px 6.25px 0px rgba(0, 0, 0, 0.19)",
    padding: "16px 0px",
  },
  modalTextPostion: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0px",
    padding: "0 40px",
  },
  modalMachine: {
    color: "var(--Text-Primary, rgba(0, 0, 0, 0.87))",
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: "Roboto",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
  },
  modalMachineLabel: {
    color: "var(--Text-Secondary, rgba(0, 0, 0, 0.60))",
    fontFamily: "Roboto",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "16px",
    letterSpacing: "0.15px",
  },
  modalTargetLine: {
    position: "absolute",
    left: "6.8%",
    right: 0,
    height: "2px",
    borderTop: "2px dashed #E9AF00",
    width: "86%",
  },
});
