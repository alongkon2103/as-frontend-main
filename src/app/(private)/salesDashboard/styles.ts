import { purpleText } from "@/utils/utils";
import { type SxProps, type Theme } from "@mui/material";

type StylesKeys =
  | "titleWrapper"
  | "titleText"
  | "cardTitleText"
  | "forecastDropdown"
  | "forecastButton";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  titleWrapper: {
    marginTop: "2vh",
  },
  titleText: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: "700",
  },
  cardTitleText: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: 400,
    color: "var(--Text-Primary, rgba(0, 0, 0, 0.87))",
  },
  forecastDropdown: {
    marginRight: "16px",
    color: purpleText,
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: purpleText,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: purpleText,
      borderWidth: "1.2px",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: purpleText,
    },
  },
  forecastButton: {
    marginTop: "16px",
    borderRadius: "8px",
    background: "#9C27B0",
    boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.06)",
    color: "white",
    width: "100%",
    ":hover": {
      background: "#9C27B0",
    },
  },
});
