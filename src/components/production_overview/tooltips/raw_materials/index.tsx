import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { getThemedStyles } from "./styles";
import { t } from "i18next";
import dayjs from "dayjs";

export interface RawMaterialNameToolTipProps {
  rawMaterial: string;
  qty: number;
}

export const RawMaterialNameToolTip: React.FC<{
  rawMaterials: RawMaterialNameToolTipProps[];
}> = ({ rawMaterials }) => {
  const styles = getThemedStyles();
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
            {t("name")}
          </TableCell>
          <TableCell
            sx={{
              borderTopRightRadius: "8px",
              borderBottomRightRadius: "8px",
            }}
          >
            {t("quantity")}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rawMaterials.map((rawMaterial, index) => (
          <TableRow key={index}>
            <TableCell>{rawMaterial.rawMaterial}</TableCell>
            <TableCell>{rawMaterial.qty}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export interface RawMaterialOpenOrderProps {
  po: string;
  supplier: string;
  orderDate: string;
  dueDate: string;
  qty: string;
}
export interface RawMaterialOpenOrderToolTipProps {
  rawMaterialOpenOrders: RawMaterialOpenOrderProps[];
}

export const RawMaterialOpenOrderToolTip: React.FC<
  RawMaterialOpenOrderToolTipProps
> = ({ rawMaterialOpenOrders }: RawMaterialOpenOrderToolTipProps) => {
  const total = rawMaterialOpenOrders.reduce((accumulator, currentValue) => {
    return accumulator + parseInt(currentValue.qty);
  }, 0);

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
          <TableCell>{t("open_order")}</TableCell>
          <TableCell>{t("supplier")}</TableCell>
          <TableCell>{t("order_date")}</TableCell>
          <TableCell>{t("due_date")}</TableCell>
          <TableCell>{t("qty")}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rawMaterialOpenOrders.map((openOrders, index) => (
          <TableRow key={index}>
            <TableCell>{openOrders.po}</TableCell>
            <TableCell>{openOrders.supplier}</TableCell>
            <TableCell>
              {dayjs(openOrders.orderDate).format("YYYY-MM-DD")}
            </TableCell>
            <TableCell>
              {dayjs(openOrders.dueDate).format("YYYY-MM-DD")}
            </TableCell>
            <TableCell>{openOrders.qty}</TableCell>
          </TableRow>
        ))}
        {rawMaterialOpenOrders.length > 0 && (
          <TableRow key={"total"}>
            <TableCell>Total</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>{total}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
