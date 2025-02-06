import { Box, Card, Typography, Icon } from "@mui/material";
import React from "react";
import {
  cardIdleStyle,
  cardOffStyle,
  cardRunningStyle,
  cardStopStyle,
  iconSizeStyle,
} from "./styles";
import WifiOffRoundedIcon from "@mui/icons-material/WifiOffRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";

export interface ShopFloorCardProps {
  machineName: string;
  status: string;
  machineLabel: string;
  positionX: number;
  positionY: number;
  boxGroup: number;
}
const statusIcons: { [key: string]: React.ReactNode } = {
  OFF: <WifiOffRoundedIcon sx={iconSizeStyle()} />,
  STOP: <WarningRoundedIcon sx={iconSizeStyle()} />,
  RUN: <CheckCircleRoundedIcon sx={iconSizeStyle()} />,
  IDLE: <AccessTimeFilledRoundedIcon sx={iconSizeStyle()} />,
};

export const ShopFloorCard: React.FC<ShopFloorCardProps> = ({
  machineName,
  status,
  machineLabel,
}: ShopFloorCardProps) => {
  const off_style = cardOffStyle();
  const stop_style = cardStopStyle();
  const running_style = cardRunningStyle();
  const idle_style = cardIdleStyle();

  const IconComponent = statusIcons[status];

  let styles: any = {};
  switch (status) {
    case "OFF":
      styles = off_style;
      break;
    case "IDLE":
      styles = idle_style;
      break;
    case "RUN":
      styles = running_style;
      break;
    case "STOP":
      styles = stop_style;
      break;
    default:
      styles = off_style;
      break;
  }

  return (
    <Card data-testid="shopfloor-card" sx={styles.cardDisplay}>
      <Box>
        <Typography sx={styles.cardHeader}>{machineName}</Typography>
        <Typography
          sx={{
            ...styles.cardMachineLabel,
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {machineLabel && machineLabel}
        </Typography>
      </Box>
      <Box data-testid="test-icon">
        <Icon sx={styles.iconHeader}>{IconComponent}</Icon>
      </Box>
    </Card>
  );
};

export default ShopFloorCard;
