import { Box, Input, TableCell } from "@mui/material";
import { ColorSelector } from "../components/ColorSelector";
import { colorColumns } from "../utils";
import { getBackgroundColor } from "../components/utils";
import { IntegratedFiltering, FilteringState } from "@devexpress/dx-react-grid";

export const filterCell = (props: any) => {
  const { column, filter, onFilter } = props;
  if (column.filteringEnabled) {
    if (colorColumns.includes(column.name)) {
      return (
        <ColorSelector
          onSelect={(value) => {
            onFilter(value);
          }}
          props={props}
        />
      );
    } else {
      return (
        <TableCell
          sx={{
            width: "100%",
            p: 1,
            border: "none",
            borderLeft: "1px solid rgba(0,0,0,0.15)",
            borderBottom: "1px solid rgba(0,0,0,0.15) !important",
          }}
          {...props}
        >
          <Input
            placeholder={column.filteringEnabled ? "Filter..." : "Disabled"}
            {...props}
            disabled={!column.filteringEnabled}
            value={filter ? filter.value : ""}
            onChange={(e) =>
              onFilter(e.target.value ? { value: e.target.value } : null)
            }
          />
        </TableCell>
      );
    }
  } else {
    return (
      <TableCell
        {...props}
        sx={{
          width: "100%",
          p: 1,
          border: "none",
          borderBottom: "1px solid rgba(0,0,0,0.15) !important",
          borderLeft: "1px solid rgba(0,0,0,0.15)",
        }}
      >
        <Box></Box>
      </TableCell>
    );
  }
};

export const colorFilters = colorColumns.map((column) => ({
  columnName: column,
  predicate: (
    value: any,
    filter: { columnName: string; value?: any },
    row: any
  ) => {
    if (!filter.value.length || filter.value === "No Filter") return true;
    if (getBackgroundColor(value) === filter.value) return true;
    return IntegratedFiltering.defaultPredicate(value, filter, row);
  },
}));

export const columnFilterExtensions = (): {
  columnName: string;
  predicate: object;
}[] => {
  return [
    ...colorFilters,
    {
      columnName: "material",
      predicate: (
        value: any,
        filter: { columnName: string; value?: any },
        row: any
      ) => {
        if (!filter.value.length) return true;
        if (value?.name?.toLowerCase().includes(filter.value.toLowerCase()))
          return true;
        return IntegratedFiltering.defaultPredicate(value, filter, row);
      },
    },
  ];
};
