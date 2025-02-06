import { type SxProps, type Theme } from "@mui/material";

type StylesKeys = "";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({ "": "" });
