import { type SxProps, type Theme } from "@mui/material";

type StylesKeys = "descriptionTitle" | "description";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  descriptionTitle: {
    fontWeight: 700,
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    lineHeight: "19px",
    color: "rgba(0, 0, 0, 0.87)",
  },
  description: {
    fontWeight: 400,
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    lineHeight: "19px",
    color: "rgba(0, 0, 0, 0.87)",
    marginLeft: "10px",
  },
});
