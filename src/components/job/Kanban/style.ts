import { type SxProps, type Theme } from "@mui/material";

type StylesKeys =  "title" | "percent" | "bar" | "badge"

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  title: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    display: 'block'
  },
  percent:{
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    paddingRight: '2vw'
  },
  bar: {
    width: "100%",
    marginTop: '1vh'
  },
  badge: {
    marginTop: '1vh'
  }
});
