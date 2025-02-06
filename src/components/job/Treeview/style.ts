import { redText } from "@/utils/utils";
import { type SxProps, type Theme } from "@mui/material";

type StylesKeys =
  | "materialId"
  | "subOrderId"
  | "qty"
  | "totalQty"
  | "icon"
  | "problem";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  materialId: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    textWrap: "nowrap",
  },
  subOrderId: {
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    textWrap: "nowrap",
  },
  qty: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    textWrap: "nowrap",
  },
  totalQty: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    textWrap: "nowrap",
  },
  icon: {
    marginLeft: "5px",
  },
  problem: {
    color: redText,
  },
});
