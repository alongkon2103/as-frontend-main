import {
  Box,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getThemedStyles } from "./styles";
import CloseButton from "@/components/shared/CloseButton";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchQBProblems } from "@/store/features/QuantityBreakdown/Modals/ProblemsSlice";

export interface ProblemModalProps {
  id: number;
  projectName: string;
  fromDate: string;
  toDate: string;
  onClose: () => void;
}

const ProblemModal: React.FC<ProblemModalProps> = ({
  id,
  projectName,
  fromDate,
  toDate,
  onClose,
}: ProblemModalProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchQBProblems({ fromDate, toDate, projectId: id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, fromDate, toDate]);

  const { t } = useTranslation();
  let { data: problemData, loading } = useAppSelector(
    (state) => state.qbProblems
  );
  if (!problemData) problemData = [];

  const styles = getThemedStyles();
  const tableHeaders = ["job_#", "suffix", "qty", "mrr_number"];
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
          All Problems
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
          <TableBody>
            {problemData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.job}</TableCell>
                <TableCell>{row.suffix}</TableCell>
                <TableCell>{row.qty}</TableCell>
                <TableCell>{row.mrr}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default ProblemModal;
