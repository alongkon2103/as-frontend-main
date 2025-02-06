import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
} from "@mui/material";
import { t } from "i18next";

export interface OutsourceToolTipProps {
  preOutsourceIns: number;
  outsourceAtSupplier: number;
  inspectAfterOutsource: number;
}

export const OutsourceToolTip: React.FC<OutsourceToolTipProps> = ({
  preOutsourceIns,
  outsourceAtSupplier,
  inspectAfterOutsource,
}: OutsourceToolTipProps) => {
  return (
    <Table
      sx={{
        [`& .${tableCellClasses.root}`]: {
          borderBottom: "none",
        },
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell
            sx={{
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
            }}
          >
            {t("preOutsourceIns")}
          </TableCell>
          <TableCell>{t("outsourceAtSupplier")}</TableCell>
          <TableCell
            sx={{
              borderTopRightRadius: "8px",
              borderBottomRightRadius: "8px",
            }}
          >
            {t("inspectAfterOutsource")}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{preOutsourceIns}</TableCell>
          <TableCell>{outsourceAtSupplier}</TableCell>
          <TableCell>{inspectAfterOutsource}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
