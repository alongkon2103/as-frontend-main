import { DelayedHoverProps, ProblemsHoverProps } from "@/store/features/QuantityBreakdown/QuantityBreakdownSlice";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";


export interface DelayedTooltipProps extends DelayedHoverProps{
  onClick: () => void;
}

export const DelayedTooltip: React.FC<DelayedTooltipProps> = ({
  hover,
  moreThanFive,
  onClick,
}: DelayedTooltipProps) => {
  const { t } = useTranslation();
  return (
    <Table
      sx={{
        [`& .${tableCellClasses.root}`]: {
          borderBottom: "none",
        },
      }}
    >
      <TableBody>
        <TableRow sx={{ background: "#F4F7FA" }}>
          <TableCell
            sx={{
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
            }}
          >
            {t("job_#")}
          </TableCell>
          <TableCell>{t("suffix")}</TableCell>
          <TableCell
            sx={{
              borderTopRightRadius: "8px",
              borderBottomRightRadius: "8px",
            }}
          >
            {t("qty")}
          </TableCell>
        </TableRow>
        {hover.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.job}</TableCell>
            <TableCell>{item.suffix}</TableCell>
            <TableCell>{item.qty}</TableCell>
          </TableRow>
        ))}
         {moreThanFive && <TableRow><TableCell colSpan={3} sx={{ padding: 1}}><Button variant="contained" onClick={onClick} fullWidth>{t('view_all')}</Button></TableCell></TableRow>}
      </TableBody>
      
    </Table>
    
    
  );
};

export interface PropblemTooltipProps extends ProblemsHoverProps {
  onClick: () => void;
}

export const ProblemTooltip: React.FC<PropblemTooltipProps> = ({
  hover,
  moreThanFive,
  onClick,
}: PropblemTooltipProps) => {
  const { t } = useTranslation();
  return (
    <Table
      sx={{
        [`& .${tableCellClasses.root}`]: {
          borderBottom: "none",
        },
      }}
    >
      <TableBody>
        <TableRow sx={{ background: "#F4F7FA" }}>
          <TableCell
            sx={{
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
            }}
          >
            {t("job_#")}
          </TableCell>
          <TableCell>{t("suffix")}</TableCell>
          <TableCell
            sx={{
              borderTopRightRadius: "8px",
              borderBottomRightRadius: "8px",
            }}
          >
            {t("qty")}
          </TableCell>
          <TableCell>{t("mrrNumber")}</TableCell>
        </TableRow>
        {hover.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.job}</TableCell>
            <TableCell>{item.suffix}</TableCell>
            <TableCell>{item.qty}</TableCell>
            <TableCell>{item.mrr}</TableCell>
          </TableRow>
        ))}
        {moreThanFive && <TableRow><TableCell colSpan={4} sx={{ padding: 1}}><Button variant="contained" onClick={onClick} fullWidth>{t('view_all')}</Button></TableCell></TableRow>}
      </TableBody>
    </Table>
  );
};
