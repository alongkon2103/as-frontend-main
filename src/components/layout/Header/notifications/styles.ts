import { type SxProps, type Theme } from "@mui/material";

type StylesKeys = "headerWrapper" | "coCardModal" | "jobDetailFilterModal";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  headerWrapper: {
    backgroundColor: "white",
    position: "fixed",
    top: "0",
    zIndex: "999",
  },
  coCardModal: {
    position: "fixed",
    left: ["3%", "3%", "25%"],
    top: [0, 0, 0],
    width: ["94%", "94%", "50%"],
    height: "90%",
    bgcolor: "#FFF",
    border: "1px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    marginRight: "5%",
    marginTop: "2%",
    padding: "2%",
    overflow: "scroll",
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
