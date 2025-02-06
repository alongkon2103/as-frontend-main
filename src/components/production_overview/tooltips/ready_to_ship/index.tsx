import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { t } from "i18next";
import {
  ReadyToShipProps,
} from "@/store/features/ProductionOverview/ProductionOverviewSlice";
import dayjs from "dayjs";
import { grayText, greenText, redText } from "../../../../utils/utils";
import BoatIcon from "@mui/icons-material/DirectionsBoat";
export interface ReadyToShipInfoToolTipProps {
  readyToShipHoverData: ReadyToShipProps;
}

export const ReadyToShipToolTips: React.FC<ReadyToShipInfoToolTipProps> = ({
  readyToShipHoverData,
}: ReadyToShipInfoToolTipProps) => {
  let redFlagFG = false;
  let redFlagShipped = false;

  const passDueDate = (dueDate: string) => {
    return dayjs(dueDate).isBefore(dayjs());
  };

  // due date
  const getC0DueDateColor = (item: ReadyToShipProps) => {
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

  const getOrderColor = (item: ReadyToShipProps) => {
    // if all conditions are correct then green else gray
    if (item.fg >= item.ordered && item.ordered === item.shipped) {
      return greenText;
    } else {
      return grayText;
    }
  };

  const getFGColor = (item: ReadyToShipProps) => {
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
  const getShippedColor = (item: ReadyToShipProps) => {
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
        <TableRow>
          <TableCell sx={{ color: getC0DueDateColor(readyToShipHoverData) }}>
            {readyToShipHoverData.coNum}
          </TableCell>
          <TableCell sx={{ color: getC0DueDateColor(readyToShipHoverData) }}>
            {readyToShipHoverData.custCo}
          </TableCell>
          <TableCell sx={{ color: getC0DueDateColor(readyToShipHoverData) }}>
            {readyToShipHoverData.coLine}
          </TableCell>
          <TableCell sx={{ color: getC0DueDateColor(readyToShipHoverData) }}>
            {readyToShipHoverData.coDate
              ? dayjs(readyToShipHoverData.coDate).format("DD/MM/YYYY")
              : "-"}
          </TableCell>
          <TableCell sx={{ color: getC0DueDateColor(readyToShipHoverData) }}>
              {readyToShipHoverData.requestedDate
                ? dayjs(readyToShipHoverData.requestedDate).format("DD/MM/YYYY")
                : "-"}
              {dayjs(readyToShipHoverData.requestedDate).diff(
                dayjs(readyToShipHoverData.coDate),
                "day"
              ) > 45 && (
                <BoatIcon
                  sx={{ marginLeft: "5px", width: "13px", height: "13px" }}
                />
              )}
            </TableCell>
          <TableCell>
            {readyToShipHoverData.recoveryDate
              ? dayjs(readyToShipHoverData.recoveryDate).format("DD/MM/YYYY")
              : "-"}
          </TableCell>
          <TableCell sx={{ color: getFGColor(readyToShipHoverData) }}>
            {readyToShipHoverData.fg ?? 0}
          </TableCell>
          <TableCell sx={{ color: getOrderColor(readyToShipHoverData) }}>
            {readyToShipHoverData.ordered ?? 0}
          </TableCell>
          <TableCell>{readyToShipHoverData.reserved ?? 0}</TableCell>
          <TableCell>{readyToShipHoverData.picked ?? 0}</TableCell>
          <TableCell>{readyToShipHoverData.packed ?? 0}</TableCell>
          <TableCell sx={{ color: getShippedColor(readyToShipHoverData) }}>
            {readyToShipHoverData.shipped ?? 0}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
