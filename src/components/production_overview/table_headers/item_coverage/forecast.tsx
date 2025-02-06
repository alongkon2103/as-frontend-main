import * as React from "react";
import CloudIcon from "@mui/icons-material/CloudOutlined";
import { Box, Switch, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export interface ForecastToggleProps {
  forecast: boolean;
  handleChange: () => void;
  color?: string;
}

const ForecastToggle: React.FC<ForecastToggleProps> = ({
  forecast,
  handleChange,
  color,
}: ForecastToggleProps) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "1px",
        color: color ?? "black",
      }}
    >
      <Typography>{t("forecast")}</Typography>
      <CloudIcon sx={{ color: color ?? "black", paddingLeft: "3px" }} />
      <Switch
        checked={forecast}
        onChange={handleChange}
        color={color ? "secondary" : "primary"}
      />
    </Box>
  );
};

export default ForecastToggle;
