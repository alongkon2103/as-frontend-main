import { type SxProps, type Theme } from "@mui/material";

type StylesKeys = "hoverBackground";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  hoverBackground: {
    backgroundColor: "#FFFFFF",
    color: "#000000",
    border: "1px solid #dadde9",
  },
});
