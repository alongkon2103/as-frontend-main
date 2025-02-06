import { type SxProps, type Theme } from "@mui/material";

type StylesKeys = "datePicker";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  datePicker: {
    "*": {
      maxWidth: "150px !important",
      maxHeight: "40px !important",
    },
  },
});
