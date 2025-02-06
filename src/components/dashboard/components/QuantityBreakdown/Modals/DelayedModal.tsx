import {
  Box,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { getThemedStyles } from "./styles";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import CloseButton from "@/components/shared/CloseButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchDelayed } from "@/store/features/QuantityBreakdown/Modals/DelayedSlice";

export interface DelayedModalProps {
  id: number;
  projectName: string;
  fromDate: string;
  toDate: string;
  onClose: () => void;
}

const DelayedModal: React.FC<DelayedModalProps> = ({
  id,
  projectName,
  fromDate,
  toDate,
  onClose,
}: DelayedModalProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDelayed({ fromDate, toDate, projectId: id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, fromDate, toDate]);

  const { t } = useTranslation();
  let { data: delayedData, loading } = useAppSelector(
    (state) => state.qbDelayed
  );
  if (!delayedData) delayedData = [];

  const styles = getThemedStyles();
  const tableHeaders = ["job_#", "suffix", "qty"];
  return (
    <Box sx={styles.modalContainer}>
      <Grid container direction={"row"} justifyContent={"space-between"}>
        <Typography
          sx={{
            color: "var(--Text-Primary, rgba(0, 0, 0, 0.87))",
            fontFamily: "Roboto",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "normal",
          }}
        >
          All Delayed:
        </Typography>
        <CloseButton onClose={onClose} />
      </Grid>
      <Box
        sx={{
          display: "flex",
          marginTop: "5px",
          marginBottom: "5px",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "var(--Text-Primary, rgba(0, 0, 0, 0.87))",
            fontFamily: "Roboto",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "normal",
          }}
        >
          Projects:{" "}
        </Typography>
        <Typography sx={{ marginLeft: "8px" }}>{projectName}</Typography>
      </Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Table>
          <TableRow>
            {tableHeaders.map((header, index) => (
              <TableCell key={index} sx={{ padding: "5px 5px 5px 10px" }}>
                {t(header)}
              </TableCell>
            ))}
          </TableRow>
          <TableBody sx={{ height: "30px", overflow: "scroll" }}>
            {delayedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.job}</TableCell>
                <TableCell>{row.suffix}</TableCell>
                <TableCell>{row.qty}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default DelayedModal;
