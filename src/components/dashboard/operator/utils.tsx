import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import { getThemedStyles } from "./styles";

const styles = getThemedStyles();
const statusStyles: Record<string, SxProps<Theme>> = {
  RUN: styles.runningBox,
  STOP: styles.stopBox,
  IDLE: styles.idleBox,
  OFF: styles.offBox,
};

export const getStatusBoxStyle = (machineStatus: string): {} => {
  return statusStyles[machineStatus] || styles.offBox;
};
