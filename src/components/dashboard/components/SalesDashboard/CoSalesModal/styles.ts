import { type SxProps, type Theme } from "@mui/material";

type StylesKeys =
  | "coModal"
  | "headerBar"
  | "title"
  | "weekTitle"
  | "emptyStateContainer"
  | "coSalesContainer"
  | "tableContainer";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  coModal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "90%",
    height: "90%",
    bgcolor: "#FFF",
    borderRadius: "16px",
    marginLeft: "5%",
    marginTop: "2%",
    padding: "24px",
    border: "1px solid #E0E0E0",
  },
  headerBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "var(--Text-Primary, rgba(0, 0, 0, 0.87))",
    fontFamily: "Roboto",
    fontSize: "32px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
  weekTitle: {
    color: "var(--Text-Primary, rgba(0, 0, 0, 0.87))",
    fontFamily: "Roboto",
    fontSize: "20px",
    fontStyle: "italic",
    fontWeight: 700,
    lineHeight: "normal",
  },
  emptyStateContainer: {
    width: "100%",
    textAlign: "center",
    marginTop: "75px",
  },
  coSalesContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "8px",
  },
  tableContainer: { height: "62vh", overflow: "scroll", borderRadius: "8px" },
});
