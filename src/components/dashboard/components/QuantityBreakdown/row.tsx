"use client";

import { QuantityBreakdownProps } from "@/store/features/QuantityBreakdown/QuantityBreakdownSlice";
import {
  generateSidebarUrl,
  greenBackground,
  greenText,
  lightGreenBackground,
  lightGreenText,
  orangeBackground,
  orangeText,
  redBackground,
  redText,
} from "@/utils/utils";
import {
  TableCell,
  TableRow,
  Box,
  Button,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { SidebarDropDownTypes } from "@/utils/types";
import { DelayedTooltip, ProblemTooltip } from "./ToolTips";
import { LightBackgroundTooltip } from "@/components/production_overview/tooltips/general";

export interface QuantityBreakdownRowProps {
  row: QuantityBreakdownProps;
  index: number;
  onClick: (id: number, type: string) => void;
}

const QuantityBreakdownRow: React.FC<QuantityBreakdownRowProps> = ({
  row,
  index,
  onClick,
}) => {
  const { t } = useTranslation();
  const calculateProgress = (progress: number) => {
    if (progress === 100) {
      return {
        backgroundColor: greenBackground,
        color: greenText,
        padding: "12px",
      };
    } else if (progress > 66 && progress < 100) {
      return {
        backgroundColor: lightGreenBackground,
        color: lightGreenText,
        padding: "12px",
      };
    } else if (progress > 33 && progress < 66) {
      return {
        backgroundColor: "rgba(255, 249, 230, 1)",
        color: "rgba(233, 175, 0, 1)",
        padding: "12px",
      };
    } else if (progress > 0 && progress < 33) {
      return {
        backgroundColor: orangeBackground,
        color: orangeText,
        padding: "12px",
      };
    } else if (progress === 0) {
      return {
        backgroundColor: redBackground,
        color: redText,
        padding: "12px",
      };
    }
  };

  return (
    <>
      <TableRow key={index}>
        <TableCell>{row?.projectName ?? "-"}</TableCell>
        <TableCell>{row?.planned ?? "-"}</TableCell>
        <TableCell>{row?.onGoing ?? "-"}</TableCell>
        <TableCell align="center">
          <Box sx={calculateProgress(row.progress)}>
            {row?.progress >= 0 ? `${row.progress.toFixed(2)}%` : "-"}
          </Box>
        </TableCell>
        <TableCell>
          {row?.delayedHover?.hover && row.delayedHover?.hover.length > 0 ? (
            <LightBackgroundTooltip
              title={
                <DelayedTooltip
                  hover={row.delayedHover?.hover ?? []}
                  moreThanFive={row.delayedHover?.moreThanFive ?? false}
                  onClick={() => {
                    onClick(row.id, "delayed");
                  }}
                />
              }
            >
              <Typography
                sx={{ fontSize: "14px", textDecoration: "underline", ":hover": { cursor: "pointer" } }}
              >
                {row?.delayed ?? "-"}
              </Typography>
            </LightBackgroundTooltip>
          ) : (
            <Typography sx={{ fontSize: "14px" }}>
              {row?.delayed ?? "-"}
            </Typography>
          )}
        </TableCell>
        <TableCell sx={{ maxWidth: "100px"}}>
          {row?.problemHover?.hover && row.problemHover?.hover.length > 0 ? (
            <LightBackgroundTooltip
              minWidth={460}
              title={
                <ProblemTooltip
                  hover={row.problemHover?.hover ?? []}
                  moreThanFive={row.problemHover?.moreThanFive ?? false}
                  onClick={() => {
                    onClick(row.id, "problems");
                  }}
                />
              }
            >
              <Typography
                sx={{ fontSize: "14px", textDecoration: "underline", ":hover": { cursor: "pointer" } }}
              >
                {row?.problems ?? "-"}
              </Typography>
            </LightBackgroundTooltip>
          ) : (
            <Typography sx={{ fontSize: "14px" }}>
              {row?.problems ?? "-"}
            </Typography>
          )}
        </TableCell>
        <TableCell>
          <Button
            variant="text"
            sx={{
              textTransform: "none",
              color: "rgba(34, 95, 166, 1)",
            }}
            href={generateSidebarUrl(row, SidebarDropDownTypes.PROJECTS)}
          >
            {t("go_to_project")}
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default QuantityBreakdownRow;
