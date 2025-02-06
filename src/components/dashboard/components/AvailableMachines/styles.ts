import { type SxProps, type Theme } from "@mui/material";

type StylesKeys =
  | "wrapper"
  | "title"
  | "description"
  | "listWrapper"
  | "listDetails"
  | "machineDetails";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  wrapper: {
    padding: "1vw",
    background: "#EFF2F6",
    maxHeight: "440px",
    overflow: "scroll",
    borderRadius: "8px",
  },
  title: {
    fontFamily: "Roboto",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
  },
  description: {
    paddingTop: "8px",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    color: "#3F444D",
  },
  listWrapper: { background: "white", marginTop: "16px", padding: 0 },
  listDetails: { padding: "16px" },
  machineDetails: {
    color: "#001C3B",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
});
