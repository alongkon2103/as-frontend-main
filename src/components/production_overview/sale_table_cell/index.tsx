import { Box, Typography } from "@mui/material";
import React from "react";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import BlockIcon from "@mui/icons-material/Block";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import BoatIcon from "@mui/icons-material/DirectionsBoat";
export interface SaleTableCellProps {
  backgroundColor: string;
  numerator: string | number;
  denominator: string | number;
  numeratorColor: string;
  denominatorColor: string;
  specialIcon?: React.ReactNode;
  iconType?: "default" | "stopped" | "SS";
  forecast?: boolean;
  forecastQty?: number;
  boatIcon?: boolean;
  underline?: boolean;
}

export const SaleTableCell: React.FC<SaleTableCellProps> = ({
  backgroundColor,
  numerator,
  denominator,
  numeratorColor,
  denominatorColor,
  specialIcon,
  iconType = "default",
  forecast = false,
  underline = true,
  boatIcon = false,
  forecastQty,
}: SaleTableCellProps) => {
  return (
    <Box
      sx={{
        padding: "10px",
        // maxWidth: forecast ? "110px" : "80px",
        width: "100%",
        height: "70px",
        background: backgroundColor,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "left", alignItems: 'center' }}>
        <Typography
          sx={{
            textDecoration:
              numerator === "-" || !underline ? "none" : "underline",
            color: numeratorColor,
          }}
        >
          {numerator}
        </Typography>
        {specialIcon ? specialIcon : null}
        {boatIcon && <BoatIcon sx={{ color: numeratorColor, width: '16px', height: '16px', marginLeft: "10px"}} />}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          marginTop: "1px",
        }}
      >
        {iconType === "default" ? (
          <StickyNote2Icon
            color={denominatorColor === "grey" ? "disabled" : "primary"}
          />
        ) : iconType === "stopped" ? (
          <BlockIcon sx={{ color: "red" }} />
        ) : (
          <Typography
            sx={{
              color: denominatorColor,
              fontSize: "16px",
            }}
          >
            SS:{" "}
          </Typography>
        )}
        <Typography sx={{ color: denominatorColor, marginLeft: "3px" }}>
          {denominator}
        </Typography>
        {forecast && (
          <>
            <CloudQueueIcon
              sx={{ color: "rgba(156, 39, 176, 1)", marginLeft: "5px" }}
            />
            <Typography
              sx={{ color: "rgba(156, 39, 176, 1)", marginLeft: "3px" }}
            >
              {forecastQty ? forecastQty : "-"}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};
