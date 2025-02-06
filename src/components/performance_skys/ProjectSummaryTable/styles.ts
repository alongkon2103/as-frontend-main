import { type SxProps, type Theme } from "@mui/material";

type StylesKeys = "tableCell" | "table" | "tableContainer";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  tableCell: {
    width: "100px",
    borderRight: "1px solid",
    borderColor: "divider",
  },
  table: {
    borderRadius: 2,
    overflow: "hidden",
    borderColor: "divider",
  },
  tableContainer: {
    borderRadius: 2,
    overflow: "hidden",
    border: "1px solid",
    borderColor: "divider",
  },
});
