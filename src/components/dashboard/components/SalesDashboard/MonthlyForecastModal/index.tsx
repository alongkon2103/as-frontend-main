import { Box, Modal, Typography } from "@mui/material";
import { getThemedStyles } from "./styles";
import Image from "next/image";
import CustomTable from "@/components/shared/CustomTable";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMonthlyForecast } from "@/store/features/SalesDashboard/MonthlyForecastSlice";
import { DateFilterType } from "@/app/(private)/salesDashboard/types";
import { getTableHeaders } from "./table";
import { parseMonthYearString } from "@/utils/utils";

export interface MonthlyForecastModalProps {
  open: boolean;
  fromDate: string;
  toDate: string;
  onClose: () => void;
  projectId: string;
  dateAhead: string;
  filterType: DateFilterType;
  currencySign: string;
}

const numberToMonth = (month: string) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const index = parseInt(month, 10) - 1;
  return months[index] || "";
};

function convertToEndOfMonth(monthYear: string): string {
  const [month, year] = monthYear.split("/").map(Number); // Convert strings to numbers

  const lastDay = new Date(year, month, 0).getDate();

  return `${lastDay.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;
}

const MonthlyForecastModal: React.FC<MonthlyForecastModalProps> = ({
  open,
  onClose,
  fromDate,
  toDate,
  projectId,
  dateAhead,
  filterType,
  currencySign
}: MonthlyForecastModalProps) => {
  const styles = getThemedStyles();

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (filterType === DateFilterType.MONTH) {
      dispatch(
        fetchMonthlyForecast({ projectId, fromDate, toDate, dateAhead })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, fromDate, toDate, dateAhead, filterType]);

  const { data, loading } = useAppSelector(
    (state) => state.monthlyForecastList
  );

  const uniqueMonthYear = new Set();
  // Iterate over the data and add normalized month-year strings to the set
  data.forEach((item: any) => {
    const monthYear = `${item.month}-${item.year}`;
    uniqueMonthYear.add(monthYear);
  });

  const tableHeaders = getTableHeaders(uniqueMonthYear, currencySign);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="overdue-modal"
      aria-describedby="overdue-modal"
    >
      <Box sx={styles.monthlyForecastModal}>
        <Box sx={styles.headerBar}>
          <Typography sx={styles.title}>Month Forecast Breakdown</Typography>
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
        <Box pt={"16px"} mb={"8px"}>
          <Typography sx={styles.weekTitle}>
            {`${numberToMonth(fromDate.substring(0, 2))} - ${numberToMonth(
              toDate.substring(0, 2)
            )} `}
            [01/{fromDate} - {convertToEndOfMonth(toDate)}]
          </Typography>
        </Box>
        <Box sx={styles.tableContainer}>
          <CustomTable
            headers={tableHeaders}
            data={data}
            isLoading={loading}
            bodyColor="#FFF"
            emptyState={
              <Box
                sx={{ width: "100%", textAlign: "center", marginTop: "75px" }}
              >
                <Image
                  src="/no_overdue.svg"
                  width={240}
                  height={230}
                  alt="No Overdue"
                />
              </Box>
            }
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default MonthlyForecastModal;
