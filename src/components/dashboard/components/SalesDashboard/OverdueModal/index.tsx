import { Box, Modal, Typography } from "@mui/material";
import { getThemedStyles } from "./styles";
import Image from "next/image";
import CustomTable from "@/components/shared/CustomTable";
import dayjs from "dayjs";
import { formatNumberToComma, redText } from "@/utils/utils";
import { tableheaders } from "../Shared";
import { useEffect } from "react";
import { fetchOverdueDetails } from "@/store/features/SalesDashboard/OverdueDetailSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export interface OverdueModalProps {
  open: boolean;
  totalOrderedQty: number;
  totalNetPrice: number;
  currency: string;
  onClose: () => void;
  projectId: string;
  moreThanFifteen: boolean;
}

const OverdueModal: React.FC<OverdueModalProps> = ({
  open,
  onClose,
  totalOrderedQty,
  currency,
  totalNetPrice,
  projectId,
  moreThanFifteen,
}: OverdueModalProps) => {
  const styles = getThemedStyles();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOverdueDetails({ projectId, moreThanFifteen }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, moreThanFifteen]);

  const { data, loading } = useAppSelector((state) => state.overdueList);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="overdue-modal"
      aria-describedby="overdue-modal"
    >
      <Box sx={styles.overdueModal}>
        <Box sx={styles.headerBar}>
          <Typography sx={styles.title}>
            Overdue {moreThanFifteen ? "> 15 days" : "1-15 days"}
          </Typography>
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
        <Box
          pt={"16px"}
          mb={"8px"}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography sx={styles.weekTitle}>{`Today's Date: ${dayjs().format(
            "DD/MM/YYYY"
          )}`}</Typography>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Box sx={{ display: "flex", gap: "5px" }}>
              <Typography fontWeight={700}>{`Total Quantity: `}</Typography>
              <Typography datatest-id="overdue-total-quantity">{` ${formatNumberToComma(
                totalOrderedQty
              )}`}</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "5px" }}>
              <Typography fontWeight={700}>{`Total Net Price: `}</Typography>
              <Typography sx={{ color: redText }}>{` ${currency === "USD" ? "$": "฿"}${formatNumberToComma(
                totalNetPrice
              )}`}</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ height: "72vh", overflow: "scroll", borderRadius: "8px" }}>
          <CustomTable
            headers={tableheaders}
            data={data}
            isLoading={loading}
            emptyState={
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                  marginTop: "75px",
                }}
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

export default OverdueModal;
