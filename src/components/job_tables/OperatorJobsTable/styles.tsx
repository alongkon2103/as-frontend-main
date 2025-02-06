import { type SxProps, type Theme } from "@mui/material";

type StylesKeys = "tableTitleText" | "filterModal" | "jobDetailFilterModal";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  tableTitleText: {
    fontWeight: 700,
    fontFamily: "Roboto",
    fontSize: "24px",
    fontStyle: "normal",
    lineHeight: "28px",
    color: "#00000099",
  },
  filterModal: {
    position: "fixed",
    right: 0,
    top: 0,
    width: "400px",
    height: "100%",
    maxHeight: "100%",
    bgcolor: "#F4F7FA",
    border: "1px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    overflow: "auto",
    py: 3,
    px: 4,
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
