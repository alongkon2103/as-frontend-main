import { type SxProps, type Theme } from "@mui/material";

type StylesKeys =
  | "content"
  | "board"
  | "boardTitle"
  | "item"
  | "itemTitle"
  | "refNum"
  | "qty"
  | "operNum"

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  content: {
    display: "flex",
    padding: "16px",
    flexDirection: "column",
    alignItems: "flex-start",
    borderRadius: "4px",
    background: "#F4F7FA",
    minHeight: '75vh',
    overflow: 'scroll'
  },
  board: {
    display: "flex",
    padding: "16px",
    alignItems: "flex-start",
    borderRadius: "5px",
  },
  boardTitle: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
  },
  item: {
    display: "flex",
    minWidth: '200px',
    padding: "16px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    alignSelf: "stretch",
    borderRadius: "5px",
    background: "#fff",
    marginTop: "2vh",
  },
  itemTitle: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
  },
  operNum: {
    color: "#001C3B",
    fontFamily: "Roboto",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal"
  },
  refNum: {
    color: "#225FA6",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
  },
  qty: {
    color: "rgba(0, 0, 0, 0.6)",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
  }
});
