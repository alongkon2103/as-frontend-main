import { type SxProps, type Theme } from "@mui/material";

type StylesKeys = "columnFilterModal";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  columnFilterModal: {
    position: "fixed",
    left: [0, "auto"],
    top: [0, 0],
    right: [1, 0],
    width: ["100%", "35%"],
    height: "85%",
    bgcolor: "#F4F7FA",
    border: "1px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    marginRight: "5%",
    marginTop: "6%",
  },
});
