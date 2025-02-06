import { TableHeader } from "@/utils/types";
import { formatNumberToComma } from "@/utils/utils";
import { Box } from "@mui/material";
import dayjs from "dayjs";

export type OverdueDetailProps = {
  order: string;
  orderLine: number;
  customerPO: string;
  item: string;
  dueDate: string;
  requestedDate: string;
  status: string;
  orderedQuantity: number;
  shippedQuantity: number;
  remainQuantity: number;
  netPrice: number;
  currency: string;
};

export const mockData = [
  {
    order: 1,
    customerPO: 2,
    orderLine: 3,
    item: 4,
    dueDate: "2024-03-26T02:16:36.407Z",
    requestedDate: "2024-03-26T02:16:36.407Z",
    status: "Filled",
    orderedQuantity: 7,
    shippedQuantity: 8,
    remainQuantity: 8,
    netPrice: 9,
    currency: "USD",
  },
  {
    order: 1,
    customerPO: 2,
    orderLine: 3,
    item: 4,
    dueDate: "2024-03-26T02:16:36.407Z",
    requestedDate: "2024-03-26T02:16:36.407Z",
    status: "Ordered",
    orderedQuantity: 2,
    shippedQuantity: 8,
    remainQuantity: 8,
    netPrice: 9,
    currency: "USD",
  },
];

export const tableheaders: TableHeader[] = [
  {
    title: "SAT Order",
    name: "order",
    align: "left",
    type: "custom",
    customCell: (data: any) => {
      return <Box>{data.order}</Box>;
    },
  },
  {
    title: "Customer PO",
    name: "customerPO",
    align: "left",
    type: "custom",
    customCell: (data: any) => {
      return <Box>{data.customerPO}</Box>;
    },
  },
  {
    title: "Line",
    name: "orderLine",
    align: "left",
    type: "custom",
    customCell: (data: any) => {
      return <Box>{data.orderLine}</Box>;
    },
  },
  {
    title: "Part Number",
    name: "item",
    align: "left",
    type: "custom",
    customCell: (data: any) => {
      return <Box>{data.item}</Box>;
    },
  },
  {
    title: "Due Date",
    name: "dueDate",
    align: "left",
    type: "custom",
    customCell: (data: any) => {
      return (
        <Box>
          {data.dueDate ? dayjs(data.dueDate).format("DD/MM/YYYY") : "-"}
        </Box>
      );
    },
  },
  {
    title: "Requested Date",
    name: "requestedDate",
    align: "left",
    type: "custom",
    customCell: (data: any) => {
      return (
        <Box>
          {data.dueDate ? dayjs(data.requestedDate).format("DD/MM/YYYY") : "-"}
        </Box>
      );
    },
  },
  {
    title: "Status",
    name: "status",
    align: "left",
    type: "custom",
    customCell: (data: any) => {
      return (
        <Box
          sx={{
            color:
              data.status === "Ordered"
                ? "rgba(237, 108, 2, 1)"
                : "rgba(99, 142, 38, 1)",
            backgroundColor:
              data.status === "Ordered"
                ? "rgba(255, 244, 229, 1)"
                : "rgba(240, 244, 234, 1)",
            padding: "8px",
            borderRadius: "4px",
            alignItems: "center",
            textAlign: "center",
            width: "80px",
          }}
        >
          {data.status}
        </Box>
      );
    },
  },
  {
    title: "Ordered / Shipped Qty",
    name: "ordered_shipped_qty",
    align: "left",
    type: "custom",
    customCell: (data: any) => {
      return (
        <Box>
          {data.orderedQuantity} / {data.shippedQuantity}
        </Box>
      );
    },
  },
  {
    title: "Remain Qty",
    name: "remainQuantity",
    align: "left",
    type: "custom",
    customCell: (data: any) => {
      return <Box>{data.remainQuantity}</Box>;
    },
  },
  {
    title: "Net Price",
    name: "netPrice",
    align: "left",
    type: "custom",
    customCell: (data: any) => {
      return (
        <Box>
          {data.currency === "USD" ? "$" : "฿"}{" "}
          {formatNumberToComma(data.netPrice)}
        </Box>
      );
    },
  },
];
