import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { t } from "i18next";
import {
  BaseItemStockHoverProps,
  ItemStockProps,
  OutsourceHoverProps,
} from "@/store/features/ProductionOverview/ProductionOverviewSlice";
import { Comment } from "@/components/shared/Comment";
import dayjs from "dayjs";

export const calculateWip = (itemStock: ItemStockProps) => {
  if (!itemStock) return 0;
  return (
    itemStock.mc.quantity +
    itemStock.outsource.quantity +
    itemStock.sp.quantity +
    itemStock.assy.quantity +
    itemStock.packing.quantity
  );
};

export const calculateWipStopQty = (itemStock: ItemStockProps) => {
  if (!itemStock) return 0;
  return (
    itemStock.mc.stopQty +
    itemStock.outsource.stopQty +
    itemStock.sp.stopQty +
    itemStock.assy.stopQty +
    itemStock.packing.stopQty
  );
};

export interface ItemStockFullToolTipProps {
  itemStocks: BaseItemStockHoverProps[];
}

export interface ItemStockWIPOutsourceProps {
  po: string;
  line?: number;
  supplier?: string;
  orderDate?: string;
  dueDate: string;
  qty: number;
}
export interface ItemStockWIPCompactToolTipProps {
  itemStocks: ItemStockProps;
}

export interface ItemStockOutsourceToolTipProps {
  itemStocks: OutsourceHoverProps[];
}

export const ItemStockFullToolTip: React.FC<ItemStockFullToolTipProps> = ({
  itemStocks,
}) => {
  const hasStopped = itemStocks.some((itemStock) => itemStock.stopQty > 0);
  return (
    <Box sx={{ maxHeight: "250px", overflowY: "scroll" }}>
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
              {t("job")}
            </TableCell>
            <TableCell>{t("problem")}</TableCell>
            <TableCell sx={{ color: hasStopped ? "red" : "" }}>
              {t("stop_quantity")}
            </TableCell>
            <TableCell
              sx={{
                borderTopRightRadius: "8px",
                borderBottomRightRadius: "8px",
              }}
            >
              {t("pass_quantity")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemStocks.map((itemStock, index) => (
            <TableRow key={index}>
              <TableCell
                sx={{
                  color: itemStock.stopQty > 0 ? "red" : "",
                }}
              >
                {itemStock.job}
              </TableCell>
              <TableCell
                sx={{
                  color: itemStock.stopQty > 0 ? "red" : "",
                }}
              >
                <Comment comment={itemStock.problem} isCell={true} />
              </TableCell>
              <TableCell
                sx={{
                  color: itemStock.stopQty > 0 ? "red" : "",
                }}
              >
                {itemStock.stopQty}
              </TableCell>
              <TableCell>{itemStock.passQty}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

const wipHeaders = [
  "Firm",
  "M/C'g",
  "Outsource",
  "SP",
  "Semi FG",
  "Assy",
  "Packing",
];

export const ItemStockZeroWIPToolTip = () => {
  return (
    <Table
      sx={{
        [`& .${tableCellClasses.root}`]: {
          borderBottom: "none",
        },
      }}
    >
      <TableHead>
        <TableCell
          sx={{
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px",
          }}
        >
          {t("wip_operation")}
        </TableCell>
        <TableCell>{t("stop_quantity")}</TableCell>
        <TableCell
          sx={{
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px",
          }}
        >
          {t("pass_quantity")}
        </TableCell>
      </TableHead>
      <TableBody>
        {wipHeaders.map((header, index) => (
          <TableRow key={index}>
            <TableCell>{header}</TableCell>
            <TableCell>0</TableCell>
            <TableCell>0</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell>{t("Total")}</TableCell>
          <TableCell>0</TableCell>
          <TableCell>0</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

const getQty = (header: string, itemStocks: ItemStockProps) => {
  switch (header) {
    case "Firm":
      return itemStocks.firm.quantity;
    case "M/C'g":
      return itemStocks.mc.quantity;
    case "Outsource":
      return itemStocks.outsource.quantity;
    case "SP":
      return itemStocks.sp.quantity;
    case "Semi FG":
      return itemStocks.semiFG.quantity;
    case "Assy":
      return itemStocks.assy.quantity;
    case "Packing":
      return itemStocks.packing.quantity;
    default:
      return 0;
  }
};
const getStopQty = (header: string, itemStocks: ItemStockProps) => {
  switch (header) {
    case "Firm":
      return itemStocks.firm.stopQty;
    case "M/C'g":
      return itemStocks.mc.stopQty;
    case "Outsource":
      return itemStocks.outsource.stopQty;
    case "SP":
      return itemStocks.sp.stopQty;
    case "Assy":
      return itemStocks.assy.stopQty;
    case "Packing":
      return itemStocks.packing.stopQty;
    default:
      return 0;
  }
};

export const ItemStockWIPCompactToolTip: React.FC<
  ItemStockWIPCompactToolTipProps
> = ({ itemStocks }: ItemStockWIPCompactToolTipProps) => {
  const totalStopQuantity = calculateWipStopQty(itemStocks);
  const totalPassQuantity = calculateWip(itemStocks);
  const hasStopped = totalStopQuantity > 0;
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
            {t("wip_operation")}
          </TableCell>
          <TableCell sx={{ color: hasStopped ? "red" : "" }}>
            {t("stop_quantity")}
          </TableCell>
          <TableCell
            sx={{
              borderTopRightRadius: "8px",
              borderBottomRightRadius: "8px",
            }}
          >
            {t("pass_quantity")}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {wipHeaders.map((header, index) => (
          <TableRow key={index} sx={{ borderBottom: header === "Firm" ? "1px solid lightgrey" : "none" }}>
            <TableCell
              sx={{
                color: getStopQty(header, itemStocks) > 0 ? "red" : "",
              }}
            >
              {header}
            </TableCell>
            <TableCell
              sx={{ color: getStopQty(header, itemStocks) > 0 ? "red" : "" }}
            >
              {getStopQty(header, itemStocks)}
            </TableCell>
            <TableCell>{getQty(header, itemStocks)}</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell
            sx={{
              color: totalStopQuantity > 0 ? "red" : "",
            }}
          >
            {totalStopQuantity}
          </TableCell>
          <TableCell>{totalPassQuantity}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export const ItemStockOutsourceToolTip: React.FC<
  ItemStockOutsourceToolTipProps
> = ({ itemStocks }: ItemStockOutsourceToolTipProps) => {
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
            {t("po")}
          </TableCell>
          <TableCell>{t("po_line")}</TableCell>
          <TableCell>{t("due_date")}</TableCell>
          <TableCell
            sx={{
              borderTopRightRadius: "8px",
              borderBottomRightRadius: "8px",
            }}
          >
            {t("qty")}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {itemStocks.map((itemStock, index) => (
          <TableRow key={index}>
            <TableCell>{itemStock.po}</TableCell>
            <TableCell>{itemStock.line}</TableCell>
            <TableCell>
              {itemStock.dueDate
                ? dayjs(itemStock.dueDate).format("DD/MM/YYYY")
                : ""}
            </TableCell>
            <TableCell>{itemStock.qty}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
