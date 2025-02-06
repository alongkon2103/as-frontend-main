import { type SxProps, type Theme } from "@mui/material";

type StylesKeys = "topHeader" | "headerText";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  topHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: "18px",
    fontWeight: "700",
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    lineHeight: "16.41px",
  },
});
