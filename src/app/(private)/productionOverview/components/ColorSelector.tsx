import {
  greenBackground,
  greenText,
  orangeBackground,
  orangeText,
  redBackground,
  redText,
} from "@/utils/utils";
import { MenuItem, Select, TableCell, Typography } from "@mui/material";
import { useState } from "react";

export interface ColorSelctorProps {
  onSelect: (value: any) => void;
  props: any;
}

export const ColorSelector: React.FC<ColorSelctorProps> = ({
  onSelect,
  props,
}: ColorSelctorProps) => {
  const [value, setValue] = useState("No Filter");

  return (
    <TableCell
      sx={{
        width: "100%",
        p: 0.8,
        border: "none",
        borderLeft: "1px solid rgba(0,0,0,0.15)",
      }}
      {...props}
    >
      <Select
        labelId="color-select-label"
        id="color-simple-select"
        value={value}
        label="Color"
        size="small"
        onChange={(e) => {
          setValue(e.target.value);
          onSelect(e.target.value ? { value: e.target.value } : null);
        }}
        sx={{
          padding: 0,
          background: value,
          minWidth: "100%",
          color: () => {
            if (value) {
              switch (value) {
                case redBackground:
                  return redText;
                case greenBackground:
                  return greenText;
                case orangeBackground:
                  return orangeText;
                default:
                  return "black";
              }
            }
          },
        }}
      >
        <MenuItem value={"No Filter"}>All Color</MenuItem>
        <MenuItem
          value={redBackground}
          sx={{
            background: redBackground,
            width: "100%",
            height: "40px",
            color: redText,
          }}
        >
          Red
        </MenuItem>
        <MenuItem
          value={greenBackground}
          sx={{
            background: greenBackground,
            width: "100%",
            height: "40px",
            color: greenText,
          }}
        >
          Green
        </MenuItem>
        <MenuItem
          value={orangeBackground}
          sx={{
            background: orangeBackground,
            width: "100%",
            height: "40px",
            color: orangeText,
          }}
        >
          Orange
        </MenuItem>
      </Select>
    </TableCell>
  );
};
