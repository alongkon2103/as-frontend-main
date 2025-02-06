import { type SxProps, type Theme } from "@mui/material";

type StylesKeys =
  | "title"
  | "dateDescription"
  | "detailsTitle"
  | "descriptionTitle"
  | "bulletList"
  | "operationDetailTitle"
  | "operationDetail"
  | "operationDetailNoColor"
  | "operationDetailChip"
  | "commentDetailTitle";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  title: {
    fontWeight: 700,
    fontFamily: "Roboto",
    fontSize: "24px",
    fontStyle: "normal",
    lineHeight: "28px",
    color: "rgba(0, 0, 0, 0.87)",
  },
  dateDescription: {
    fontWeight: 400,
    fontFamily: "Roboto",
    fontSize: "12px",
    fontStyle: "normal",
    lineHeight: "16px",
    color: "rgba(0, 0, 0, 0.60)",
    marginTop: "8px",
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
  descriptionTitle: {
    fontWeight: 700,
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    lineHeight: "19px",
    color: "rgba(0, 0, 0, 0.87)",
  },
  bulletList: {
    listStyleType: "disc",
    display: "list-item",
  },
  operationDetailTitle: {
    fontWeight: 700,
    fontFamily: "Roboto",
    fontSize: "20px",
    fontStyle: "normal",
    lineHeight: "19px",
    color: "rgba(0, 0, 0, 0.87)",
  },
  operationDetail: {
    fontWeight: 400,
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    lineHeight: "19px",
    color: "rgba(0, 0, 0, 0.87)",
    marginLeft: "10px",
  },
  operationDetailNoColor: {
    fontWeight: 400,
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    lineHeight: "19px",
    marginLeft: "10px",
  },
  operationDetailChip: {
    fontWeight: 400,
    fontFamily: "Roboto",
    fontSize: "12px",
    fontStyle: "normal",
    lineHeight: "18px",
    marginLeft: "10px",
    padding: "4px 8px",
    width: "fit-content",
  },
  commentDetailTitle: {
    fontWeight: 700,
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    lineHeight: "19px",
  },
});
