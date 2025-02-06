import { type SxProps, type Theme } from "@mui/material";

type StylesKeys = "modalContainer";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  modalContainer: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "25%",
    height: "50%",
    bgcolor: "#F4F7FA",
    border: "1px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    marginRight: "5%",
    marginTop: "5%",
    padding: "10px",
    overflow: "auto",
  },
});
