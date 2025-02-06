import { MenuItem, Select, TableCell } from "@mui/material";
import { useState } from "react";

export interface ColorSelctorProps {
  onSelect: (value: any) => void;
}

export const ColorSelector: React.FC<ColorSelctorProps> = ({
  onSelect,
}: ColorSelctorProps) => {
  const [value, setValue] = useState("all");

  return (
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
      MenuProps={{
        sx: {
          "&& .Mui-selected": {
            fontWeight: "500",
            background: () => {
              if (value) {
                switch (value) {
                  case "value":
                    return "#E5F6FD";
                  case "forecast":
                    return "#F9D6FF";
                  case "all":
                    return "white";
                  default:
                    return "white";
                }
              }
            },
          },
        },
      }}
      sx={{
        padding: 0,
        background: () => {
          if (value) {
            switch (value) {
              case "value":
                return "#E5F6FD";
              case "forecast":
                return "#F9D6FF";
              case "all":
                return "white";
              default:
                return "white";
            }
          }
        },
        minWidth: "100%",
        color: () => {
          if (value) {
            switch (value) {
              case "value":
                return "#225FA6";
              case "forecast":
                return "#7B1FA2";
              case "all":
                return "black";
              default:
                return "black";
            }
          }
        },
        boxShadow: "none",
        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            border: "0.1px solid black",
          },
      }}
    >
      <MenuItem
        value={"all"}
        sx={{
          background: "white",
          width: "100%",
          height: "40px",
          color: "black",
        }}
      >
        All
      </MenuItem>
      <MenuItem
        value={"value"}
        sx={{
          background: "#E5F6FD",
          width: "100%",
          height: "40px",
          color: "#225FA6",
        }}
      >
        Value
      </MenuItem>
      <MenuItem
        value={"forecast"}
        sx={{
          width: "100%",
          height: "40px",
          background: "#F9D6FF",
          color: "#7B1FA2",
        }}
      >
        Forecast
      </MenuItem>
    </Select>
  );
};
