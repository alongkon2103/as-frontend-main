import { type SxProps, type Theme } from "@mui/material";

type StylesKeys =
  | "titleWrapper"
  | "titleText"
  | "subTitleText"
  | "layoutBox"
  | "layoutHeight";

export const getThemedStyles = (
  isSidebarOpen: boolean
): {
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
  subTitleText: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: "400",
  },
  layoutBox: {
    width: isSidebarOpen ? "calc(100vw - 240px)" : "98vw",
    transition: "margin-left 0.3s ease",
    marginLeft: isSidebarOpen ? "0px" : "-190px",
    position: "relative",
    marginTop: "22px"
  },
  layoutHeight: {
    height: "100%",
    marginTop: "30px",
  },
});
