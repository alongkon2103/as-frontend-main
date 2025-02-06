import { type SxProps, type Theme } from "@mui/material";

type StylesKeys = "titleWrapper" | "titleText";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  titleWrapper: {
    marginTop: "2vh",
  },
  titleText: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: "700",
  },
});
