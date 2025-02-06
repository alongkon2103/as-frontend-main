import { type SxProps, type Theme } from "@mui/material";

type StylesKeys =
  | "toggleButtonOpen"
  | "toggleButtonClose"
  | "projectList"
  | "baseStyle"
  | "selectedStyle"
  | "defaultProject"
  | "sidebarLogo"
  | "menuItem";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  toggleButtonOpen: {
    position: "absolute",
    top: "62px",
    left: "263px",
    backgroundColor: "white",
    width: "24px",
    height: "24px",
    zIndex: "9999",
    boxShadow: "0 0 0 1px grey",
    "&.MuiIconButton-root:hover": {
      boxShadow: "0 0 0 3px grey",
    },
  },
  toggleButtonClose: {
    position: "absolute",
    top: "62px",
    left: "36px",
    backgroundColor: "white",
    width: "24px",
    height: "24px",
    zIndex: "99999",
    boxShadow: "0 0 0 1px grey",
    "&.MuiIconButton-root:hover": {
      boxShadow: "0 0 0 3px grey",
    },
  },
  projectList: {
    maxHeight: "400px",
    overflowY: "auto",
    padding: "0px",
  },
  baseStyle: {
    color: "primary",
    fontWeight: "400",
    fontSize: "14px",
  },
  selectedStyle: {
    color: "primary",
    fontWeight: "700",
    fontSize: "14px",
  },
  defaultProject: {
    color: "rgba(0, 0, 0, 0.6)",
    fontWeight: "400",
    fontSize: "14px",
  },
  sidebarLogo: {
    display: "flex",
    padding: "48px 16px",
    flexShrink: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItem: {
    margin: "0px 8px",
    padding: "8px",
  },
});
