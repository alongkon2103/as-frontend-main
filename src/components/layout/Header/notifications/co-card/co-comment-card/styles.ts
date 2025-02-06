import { redText } from "@/utils/utils";
import { type SxProps, type Theme } from "@mui/material";

type StylesKeys =
  | "title"
  | "description"
  | "problem"
  | "resolvedProblem"
  | "createdAt";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  title: {
    fontWeight: 700,
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    lineHeight: "normal",
    color: "rgba(0, 0, 0, 0.87)",
  },
  description: {
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    lineHeight: "normal",
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: 400,
  },
  problem: {
    color: redText,
    backgroundColor: "rgba(253, 237, 237, 1)",
  },
  resolvedProblem: {
    color: "rgba(0, 0, 0, 0.60)",
    backgroundColor: "#EFF2F6",
  },
  createdAt: {
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    lineHeight: "normal",
    color: "rgba(0, 0, 0, 0.60)",
    fontWeight: 400,
  },
});
