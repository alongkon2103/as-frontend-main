import { Box, Modal, Tab, Tabs, Typography } from "@mui/material";
import { getThemedStyles } from "./styles";
import Image from "next/image";
import { useEffect, useState } from "react";
import CustomTable from "@/components/shared/CustomTable";
import { tableheaders } from "../Shared";
import { BreakdownProps } from "@/store/features/SalesDashboard/SalesDashboardSlice";
import dayjs from "dayjs";
import { formatNumberToComma, greenText } from "@/utils/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBreakdownDetails } from "@/store/features/SalesDashboard/BreakdownSlice";
import { BreakdownType } from "./types";

export interface CoSalesModalProps {
  projectId: string;
  groupByType: string;
  open: boolean;
  onClose: () => void;
  data: BreakdownProps;
  fromDate: string;
  toDate: string;
  dateFilter: string;
  currencySign: string;
}

const CoSalesModal: React.FC<CoSalesModalProps> = ({
  projectId,
  groupByType,
  open,
  onClose,
  data,
  fromDate,
  toDate,
  dateFilter,
  currencySign
}: CoSalesModalProps) => {
  const styles = getThemedStyles();
  const [tab, setTab] = useState(BreakdownType.ORDERED);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(
        fetchBreakdownDetails({
          projectId,
          groupBy: data?.groupBy,
          groupByType,
          fromDate,
          toDate,
          dateFilter,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.groupBy, projectId, groupByType]);

  const { data: breakdownData, loading } = useAppSelector(
    (state) => state.breakdownList
  );
  const ordered = breakdownData?.filter((item) => item.shippedQuantity <= 0);
  const shipped = breakdownData?.filter((item) => item.shippedQuantity > 0);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: BreakdownType
  ) => {
    setTab(newValue);
  };

  const renderEmptyState = () => {
    if (tab === BreakdownType.ORDERED) {
      return (
        <Box sx={styles.emptyStateContainer}>
          <Image
            src="/no_orders.svg"
            width={240}
            height={230}
            alt="No Orders"
          />
        </Box>
      );
    } else {
      return (
        <Box sx={styles.emptyStateContainer}>
          <Image
            src="/no_order_ship.svg"
            width={240}
            height={230}
            alt="No Orders Shipped"
          />
        </Box>
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={styles.coModal}>
        <Box sx={styles.headerBar}>
          <Typography sx={styles.title}>{"CO Breakdown"}</Typography>
          <Image
            src="/close.svg"
            width={24}
            height={24}
            alt="info"
            onClick={onClose}
            style={{
              cursor: "pointer",
            }}
          />
        </Box>
        <Typography pt={"16px"} sx={styles.weekTitle}>{`${
          data?.groupBy ?? "-"
        } [${
          data?.criteriaDateFrom
            ? dayjs(data?.criteriaDateFrom).format("DD/MM/YYYY")
            : ""
        }-${
          data?.criteriaDateTo
            ? dayjs(data?.criteriaDateTo).format("DD/MM/YYYY")
            : ""
        }]`}</Typography>

        <Box sx={styles.coSalesContainer}>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="job tabs"
            sx={{ textAlign: "left" }}
          >
            <Tab label={`Ordered`} value={BreakdownType.ORDERED} />
            <Tab label={`Shipped`} value={BreakdownType.SHIPPED} />
          </Tabs>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Box sx={{ display: "flex", gap: "5px" }}>
              <Typography fontWeight={700}>
                {tab === BreakdownType.ORDERED
                  ? `Total Ordered Quantity: `
                  : `Total Shipped Quantity: `}
              </Typography>
              <Typography datatest-id="co-total-quantity">
                {`${
                  tab === BreakdownType.ORDERED
                    ? data?.ordered?.qty
                      ? formatNumberToComma(data?.ordered?.qty)
                      : 0
                    : data?.shipped
                      ? formatNumberToComma(data?.shipped)
                      : 0
                }`}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "5px" }}>
              <Typography fontWeight={700}>{`Total Net Price: `}</Typography>
              <Typography
                sx={{
                  color:
                    tab === BreakdownType.ORDERED
                      ? "rgba(34, 95, 166, 1)"
                      : greenText,
                }}
              >{`${currencySign}${
                tab === BreakdownType.ORDERED
                  ? data?.actualRevenue?.orderedQty
                    ? formatNumberToComma(data?.actualRevenue?.orderedQty)
                    : 0
                  : data?.actualRevenue?.qty
                    ? formatNumberToComma(data?.actualRevenue?.qty)
                    : 0
              }`}</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={styles.tableContainer}>
          <CustomTable
            headers={tableheaders}
            data={tab === BreakdownType.ORDERED ? ordered : shipped}
            isLoading={loading}
            emptyState={renderEmptyState()}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default CoSalesModal;
