import { type SxProps, type Theme } from "@mui/material";

type StylesKeys = "overdueModal" | "headerBar" | "title" | "weekTitle";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  overdueModal: {
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
    border: "none",
    zIndex: 1401,
    "&:focus": {
      outline: "none",
      border: "none",
    },
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
});
