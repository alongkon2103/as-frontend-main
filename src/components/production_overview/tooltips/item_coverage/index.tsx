import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import { getThemedStyles } from "./styles";
import { SaleTableCell } from "../../sale_table_cell";
import WarningFillIcon from "@mui/icons-material/Warning";
import CloudQueueTwoToneIcon from "@mui/icons-material/CloudQueueTwoTone";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { DateRangeHoverProps } from "@/store/features/ProductionOverview/ProductionOverviewSlice";
import dayjs from "dayjs";
import {
  grayText,
  greenBackground,
  greenText,
  orangeText,
  redText,
} from "../../../../utils/utils";
import BoatIcon from "@mui/icons-material/DirectionsBoat";

export const ItemCoverageInfoToolTips: React.FC = () => {
  const { t } = useTranslation();
  const styles = getThemedStyles();
  return (
    <Box sx={{ padding: "10px" }}>
      <Box sx={{ marginBottom: "21px" }}>
        <Typography sx={styles.infoTitle}>
          {t("icon_and_color_meaning")}
        </Typography>
      </Box>
      <Box sx={{ ...styles.normalFlex, marginBottom: "16px" }}>
        <StickyNote2Icon color={"primary"} />
        <Typography sx={{ color: "primary" }}>
          : {t("order_receipt_from_customer")}
        </Typography>
      </Box>
      <Box sx={styles.normalFlex}>
        <Box>
          <SaleTableCell
            backgroundColor={"#EDF7ED"}
            numerator={200}
            denominator={200}
            numeratorColor={greenText}
            denominatorColor={"#225FA6"}
          />
        </Box>
        <Box sx={{ marginLeft: "10px" }}>
          <Typography sx={styles.titleText}>{t("fg_shipped")}</Typography>
          <Typography sx={styles.greyText}>
            {t("green_text_with_green_background")}
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.normalFlex}>
        <Box>
          <SaleTableCell
            backgroundColor={greenBackground}
            numerator={200}
            denominator={200}
            numeratorColor={"rgba(0, 0, 0, 0.87)"}
            denominatorColor={"#225FA6"}
          />
        </Box>
        <Box sx={{ marginLeft: "10px" }}>
          <Typography sx={styles.titleText}>
            {t("fg_ready_still_not_shipped")}
          </Typography>
          <Typography sx={styles.greyText}>
            {t("black_text_with_green_background")}
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.normalFlex}>
        <Box>
          <SaleTableCell
            backgroundColor={"#FFF4E5"}
            numerator={80}
            denominator={200}
            numeratorColor={orangeText}
            denominatorColor={"#225FA6"}
          />
        </Box>
        <Box sx={{ marginLeft: "10px" }}>
          <Typography sx={styles.titleText}>
            {t("fg_order_for_ready")}
          </Typography>
          <Typography sx={styles.greyText}>
            {t("orange_text_with_orange_background")}
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.normalFlex}>
        <Box>
          <SaleTableCell
            backgroundColor={"#FDEDED"}
            numerator={80}
            denominator={200}
            numeratorColor={redText}
            denominatorColor={"#225FA6"}
          />
        </Box>
        <Box sx={{ marginLeft: "10px" }}>
          <Typography sx={styles.titleText}>
            {t("fg_wip_not_enough_for_order")}
          </Typography>
          <Typography sx={styles.greyText}>
            {t("red_text_with_red_background")}
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.normalFlex}>
        <Box>
          <SaleTableCell
            backgroundColor={"#FDEDED"}
            numerator={80}
            denominator={200}
            numeratorColor={redText}
            denominatorColor={"#225FA6"}
            specialIcon={
              <WarningFillIcon style={{ color: redText, marginLeft: "10px" }} />
            }
          />
        </Box>
        <Box sx={{ marginLeft: "10px" }}>
          <Typography sx={styles.titleText}>
            {t("fg_wip_not_enough_for_order_no_rm")}
          </Typography>
          <Typography
            sx={{
              ...styles.greyText,
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {t("red_text_with_red_background_with")}
            <WarningFillIcon
              style={{
                color: redText,
                width: "16px",
                height: "16px",
                marginLeft: "5px",
              }}
            />
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          color: "purple",
          display: "flex",
          alignItems: "center",
          marginBottom: "0px",
        }}
      >
        <Typography>{t("forecast")}</Typography>
        <CloudQueueTwoToneIcon sx={{ marginLeft: "10px" }} />
        <ToggleOnIcon
          sx={{ marginLeft: "10px", width: "55px", height: "55px" }}
        />
      </Box>
      <Typography
        sx={{
          color: "var(--text-primary, rgba(0, 0, 0, 0.60))",
          fontFeatureSettings: "'clig' off, 'liga' off",
          fontFamily: "Roboto",
          fontSize: "12px",
          fontStyle: "italic",
          fontWeight: 400,
          lineHeight: "16px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: redText, marginRight: "5px" }}>*</Typography>{" "}
        {t("forecast_description")}
      </Typography>
    </Box>
  );
};

export interface ItemCoverageInfoToolTipProps {
  itemCoverageHoverData: DateRangeHoverProps[];
}

export const ItemCoverageToolTips: React.FC<ItemCoverageInfoToolTipProps> = ({
  itemCoverageHoverData,
}: ItemCoverageInfoToolTipProps) => {
  const shippedTotal = itemCoverageHoverData.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue.shipped ?? 0;
    },
    0
  );
  const fgTotal = itemCoverageHoverData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.fg ?? 0;
  }, 0);
  const orderedTotal = itemCoverageHoverData.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue.ordered ?? 0;
    },
    0
  );
  const reservedTotal = itemCoverageHoverData.reduce(
    (accumulator, currentValue) => {
      return accumulator ?? 0 + currentValue.reserved ?? 0;
    },
    0
  );
  const pickedTotal = itemCoverageHoverData.reduce(
    (accumulator, currentValue) => {
      return accumulator ?? 0 + currentValue.reserved ?? 0;
    },
    0
  );
  const packedTotal = itemCoverageHoverData.reduce(
    (accumulator, currentValue) => {
      return accumulator ?? 0 + currentValue.reserved ?? 0;
    },
    0
  );

  let redFlagFG = false;
  let redFlagShipped = false;

  const passDueDate = (dueDate: string) => {
    return dayjs(dueDate).isBefore(dayjs());
  };

  // due date
  const getC0DueDateColor = (item: DateRangeHoverProps) => {
    // if passed due date then red
    if (passDueDate(item.dueDate)) {
      return redText;
    } else {
      // if fg and shipped are enough then green
      if (item.fg >= item.ordered && item.ordered === item.shipped) {
        return greenText;
      } else {
        return grayText;
      }
    }
  };

  const getOrderColor = (item: DateRangeHoverProps) => {
    // if all conditions are correct then green else gray
    if (item.fg >= item.ordered && item.ordered === item.shipped) {
      return greenText;
    } else {
      return grayText;
    }
  };

  const getFGColor = (item: DateRangeHoverProps) => {
    // if fg and shipped are enough then green
    if (item.fg >= item.ordered && item.ordered === item.shipped) {
      return greenText;
    } else {
      // passed due date and not enough fg
      if (passDueDate(item.dueDate) && item.fg < item.ordered) {
        return redText;
      } else {
        // enough fg but not enough shipped
        return grayText;
      }
    }
  };

  // packed
  const getShippedColor = (item: DateRangeHoverProps) => {
    // if fg and shipped are enough then green
    if (item.fg >= item.ordered && item.ordered === item.shipped) {
      return greenText;
    } else {
      // enough fg but not shipped and passed due date
      if (
        passDueDate(item.dueDate) &&
        item.fg >= item.ordered &&
        item.ordered > item.shipped
      ) {
        return redText;
      } else {
        return grayText;
      }
    }
  };

  return (
    <Table
      sx={{
        [`& .${tableCellClasses.root}`]: {
          borderBottom: "none",
          padding: "5px",
        },
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell
            sx={{ borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px" }}
            data-testid="co"
          >
            {t("co")}
          </TableCell>
          <TableCell data-testid="customer_co">{t("customer_co")}</TableCell>
          <TableCell data-testid="co_line">{t("co_line")}</TableCell>
          <TableCell data-testid="due_date">{t("due_date")}</TableCell>
          <TableCell data-testid="requested_date">
            {t("requested_date")}
          </TableCell>
          <TableCell data-testid="recovery_date">
            {t("recovery_date")}
          </TableCell>
          <TableCell data-testid="fg">{t("fg")}</TableCell>
          <TableCell data-testid="ordered">{t("ordered")}</TableCell>

          <TableCell data-testid="reserved">{t("reserved")}</TableCell>
          <TableCell data-testid="picked">{t("picked")}</TableCell>
          <TableCell data-testid="packed">{t("packed")}</TableCell>
          <TableCell
            data-testid="shipped"
            sx={{
              borderTopRightRadius: "8px",
              borderBottomRightRadius: "8px",
            }}
          >
            {t("shipped")}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {itemCoverageHoverData.map((itemCoverages, index) => (
          <TableRow key={index}>
            <TableCell sx={{ color: getC0DueDateColor(itemCoverages) }}>
              {itemCoverages.co}
            </TableCell>
            <TableCell sx={{ color: getC0DueDateColor(itemCoverages) }}>
              {itemCoverages.custCo}
            </TableCell>
            <TableCell sx={{ color: getC0DueDateColor(itemCoverages) }}>
              {itemCoverages.coLine}
            </TableCell>
            <TableCell sx={{ color: getC0DueDateColor(itemCoverages) }}>
              {itemCoverages.dueDate
                ? dayjs(itemCoverages.dueDate).format("DD/MM/YYYY")
                : "-"}
            </TableCell>
            <TableCell sx={{ color: getC0DueDateColor(itemCoverages) }}>
              {itemCoverages.requestedDate
                ? dayjs(itemCoverages.requestedDate).format("DD/MM/YYYY")
                : "-"}
              {dayjs(itemCoverages.requestedDate).diff(
                dayjs(itemCoverages.dueDate),
                "day"
              ) > 45 && (
                <BoatIcon
                  sx={{ marginLeft: "5px", width: "13px", height: "13px" }}
                />
              )}
            </TableCell>
            <TableCell sx={{ color: getC0DueDateColor(itemCoverages) }}>
              {itemCoverages.recoveryDate
                ? dayjs(itemCoverages.recoveryDate).format("DD/MM/YYYY")
                : "-"}
            </TableCell>
            <TableCell sx={{ color: getFGColor(itemCoverages) }}>
              {itemCoverages.fg ?? 0}
            </TableCell>
            <TableCell sx={{ color: getOrderColor(itemCoverages) }}>
              {itemCoverages.ordered ?? 0}
            </TableCell>
            <TableCell>
              {" "}
              {/* may need color later */}
              {itemCoverages.reserved ?? 0}
            </TableCell>
            <TableCell>
              {" "}
              {/* may need color later */}
              {itemCoverages.picked ?? 0}
            </TableCell>
            <TableCell>
              {" "}
              {/* may need color later */}
              {itemCoverages.packed ?? 0}
            </TableCell>
            <TableCell sx={{ color: getShippedColor(itemCoverages) }}>
              {itemCoverages.shipped ?? 0}
            </TableCell>
          </TableRow>
        ))}
        {itemCoverageHoverData.length > 0 && (
          <TableRow key={"total"}>
            <TableCell sx={{ textAlign: "left" }}>Total</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell sx={{ color: redFlagFG ? redText : "" }}>
              {fgTotal}
            </TableCell>
            <TableCell sx={{ textAlign: "left" }}>{orderedTotal}</TableCell>
            <TableCell sx={{ textAlign: "left" }}>{reservedTotal}</TableCell>
            <TableCell sx={{ textAlign: "left" }}>{pickedTotal}</TableCell>
            <TableCell sx={{ textAlign: "left" }}>{packedTotal}</TableCell>
            <TableCell
              sx={{
                color: redFlagShipped ? redText : "",
                textAlign: "left",
              }}
            >
              {shippedTotal}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
