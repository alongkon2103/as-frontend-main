import { type SxProps, type Theme } from "@mui/material";

type StylesKeys = "headerWrapper";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  headerWrapper: {
    backgroundColor: "white",
    position: "fixed",
    top: "0",
    zIndex: "999",
  },
});
