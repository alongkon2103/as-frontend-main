import { type SxProps, type Theme } from "@mui/material";

type StylesKeys = "box";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  box: {
    borderRadius: "8px",
    background: "#FFF",
    boxShadow: " 0px 1px 4px 0px rgba(0, 0, 0, 0.16)",
  },
});
