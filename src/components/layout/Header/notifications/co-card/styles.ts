import { type SxProps, type Theme } from "@mui/material";

type StylesKeys =
  | "coCardModal"
  | "boldText"
  | "detailsTitle"
  | "readyToShipModal";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  coCardModal: {
    position: "fixed",
    left: "35%",
    top: "2%",
    width: "30%",
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
  boldText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
  },
  detailsTitle: {
    fontWeight: 700,
    fontFamily: "Roboto",
    fontSize: "20px",
    fontStyle: "normal",
    lineHeight: "19px",
    color: "rgba(0, 0, 0, 0.87)",
    marginTop: "24px",
  },
  readyToShipModal: {
    position: "fixed",
    left: "35%",
    top: "2%",
    minWidth: "350px",
    height: "90%",
    bgcolor: "#F4F7FA",
    border: "1px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    marginLeft: "5%",
    marginTop: "2%",
  },
});
