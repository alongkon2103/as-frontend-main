import { type SxProps, type Theme } from "@mui/material";

type StylesKeys =
  | "box"
  | "treeWrapper"
  | "treeTitle"
  | "itemTitle"
  | "quantity"
  | "job"
  | "dateTitle"
  | "dateValue"
  | "jobDetailFilterModal";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  box: {
    overflow: "hidden !important",
    marginX: "2vw",
    marginTop: "4rem",
    maxHeight: "80vh",
  },
  treeWrapper: {
    background: "#F4F7FA",
    height: "92vh",
    padding: "1vw",
  },
  treeTitle: {
    color: "rgba(0, 0, 0, 0.60)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
  },
  itemTitle: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
  },
  quantity: {
    color: "rgba(0, 0, 0, 0.60)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    marginLeft: "1vw",
  },
  job: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
    textAlign: "right",
    paddingRight: "1vw",
  },
  dateTitle: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
    textAlign: "center",
  },
  dateValue: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    textAlign: "center",
    marginLeft: "0.2vw",
  },
  jobDetailFilterModal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "94%",
    height: "85%",
    bgcolor: "#F4F7FA",
    border: "1px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    marginLeft: "3%",
    marginTop: "6%",
  },
});
