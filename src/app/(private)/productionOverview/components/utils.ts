import {
  greenBackground,
  greenText,
  orangeBackground,
  orangeText,
  redBackground,
  redText,
} from "@/utils/utils";

export const getBackgroundColor = (item: {
  color: "red" | "green" | "orange"
}) => {
  if (!item) {
    return "";
  }

  switch (item.color) {
    case "red":
      return redBackground;
    case "green":
      return greenBackground;
    case "orange":
      return orangeBackground;
    default:
      return "";
  }
};

export const showErrorIcon = (item: {
  coQty: number;
  wipQty: number;
  shippedQty: number;
  fgQty: number;
  rmQty: number; // unknown value
}) => {
  if (!item || item.coQty === 0) {
    return false;
  }
  // if (
  //   item?.fgQty ||
  //   0 + item?.wipQty ||
  //   0 + item?.rmQty ||
  //   0 < item?.coQty ||
  //   0
  // ) {
  //   return true;
  // }
  return false;
};

export const getTextColor = (item: {
  fgQty: number;
  coQty: number;
  wipQty: number;
  shippedQty: number;
}) => {
  const black = "rgba(0, 0, 0, 0.87)";

  if (!item || item?.coQty === 0) {
    return "grey";
  }
  if (item.fgQty >= item.coQty) {
    if (item.shippedQty < item.coQty) {
      return black;
    } else {
      return greenText;
    }
  } else {
    // overdue items doesn't have wipQty
    if (item.fgQty + (item.wipQty || 0) >= item.coQty) {
      return orangeText;
    } else {
      return redText;
    }
  }
};
