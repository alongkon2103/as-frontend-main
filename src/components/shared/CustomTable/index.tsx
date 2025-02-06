import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { TableData, TableHeader } from "@/utils/types";
import { ReactNode, useState } from "react";
import { getHigherValueAndDifference } from "@/components/dashboard/components/SalesDashboard/MonthlyForecastModal/table";

export interface CustomTableProps {
  headers: TableHeader[];
  data: TableData[];
  isLoading: boolean;
  emptyState?: ReactNode;
  headerColor?: string;
  bodyColor?: string;
}

const renderTableBody = (headers: TableHeader[], data: TableData[]) => {
  if (data.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={12} align="center">
          <Typography variant="h6" component="div" sx={{ color: "#BDBDBD" }}>
            No data found
          </Typography>
        </TableCell>
      </TableRow>
    );
  }
  return data.map((item) => (
    <TableRow
      key={item.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      {headers.map(({ name, type, align, valign, customCell, width }) => {
        if (type === "text")
          return (
            <TableCell
              align={align}
              sx={{
                verticalAlign: valign,
                padding: "8px",
                maxWidth: width ?? "50px",
              }}
            >
              <Typography>{item[name]}</Typography>
            </TableCell>
          );
        else if (customCell)
          return (
            <TableCell
              align={align}
              sx={{
                verticalAlign: valign,
                padding: "8px",
                maxWidth: width ?? "50px",
              }}
            >
              {customCell(item)}
            </TableCell>
          );
      })}
    </TableRow>
  ));
};

const renderLoading = () => (
  <TableRow>
    <TableCell colSpan={12} align="center">
      <CircularProgress />
    </TableCell>
  </TableRow>
);

const CustomTable = ({
  headers,
  data,
  isLoading,
  emptyState,
  headerColor,
  bodyColor,
}: CustomTableProps) => {
  const [filters, setFilters] = useState<Record<string, any>>({});
  if (!isLoading && (!data || data?.length === 0)) return <>{emptyState}</>;

  const handleFilterChange = (
    field: string,
    value: string,
    customCellFilter?: string
  ) => {
    setFilters((prevFilters: any) => {
      return {
        ...prevFilters,
        [field]: customCellFilter ? { customCellFilter: value } : value,
      };
    });
  };

  const renderHeaders = (headers: TableHeader[], headerColor?: string) => {
    return (
      <TableRow>
        {headers.map((header, index) => (
          <TableCell
            key={index}
            align={header.align}
            sx={{ padding: "8px", maxWidth: "20px", background: "#F4F7FA" }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box>{header.title}</Box>
              {header.filter &&
                header.filter(filters[header.name] || "", handleFilterChange)}
            </Box>
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const filteredData =
    data?.filter((row) =>
      Object.entries(filters).every(([key, value]) => {
        if (Object.keys(value).includes("customCellFilter")) {
          if (key === "net_qty") {
            if (value.customCellFilter === "all") {
              return true;
            } else {
              const higherValue = getHigherValueAndDifference(row?.qty);
              return higherValue.type === value.customCellFilter;
            }
          }
        } else {
          return row[key]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        }
      })
    ) ?? [];

  return (
    <TableContainer
      component={Paper}
      sx={{ overflowX: "initial", background: bodyColor ?? "#F4F7FA" }}
    >
      <Table stickyHeader>
        <TableHead>{renderHeaders(headers, headerColor)}</TableHead>
        <TableBody sx={{ background: bodyColor }}>
          {isLoading ? renderLoading() : renderTableBody(headers, filteredData)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
