import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchProjectSummary,
  ProjectSummaryProps,
} from "@/store/features/PerformanceReport/ProjectSummarySlice";
import { useTranslation } from "react-i18next";
import { getBusinessSegment, headers } from "./util";
import { getThemedStyles } from "./styles";
import Image from "next/image";

const styles = getThemedStyles();

interface ProjectSummaryTableProps {
  fromDate: string;
  toDate: string;
}

const ProjectSummaryTableHead: React.FC<{ data: ProjectSummaryProps[] }> = ({
  data,
}) => {
  return (
    <TableHead>
      <TableRow sx={styles.tableCell}>
        <TableCell sx={{ width: "192px" }}></TableCell>
        {data?.map((project) => (
          <TableCell key={project.project} align="left" sx={styles.tableCell}>
            {project.project}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const ProjectSummaryTableBody: React.FC<{
  data: ProjectSummaryProps[];
}> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <TableBody>
      {headers?.map((header) => (
        <TableRow
          key={header}
          sx={{
            "&:last-child td, &:last-child th": { borderBottom: 0 },
          }}
        >
          <TableCell component="th" scope="row" sx={{ flex: 1 }}>
            <Box>
              <Typography>
                {t(`project_summary_${header}`)}
                {header === "performance" && (
                  <Tooltip
                    title={
                      <Box>
                        Performance %
                        <br />
                        <br />
                        Actual (pcs)/PLAN-APS (pcs) = Qty Performance %
                      </Box>
                    }
                  >
                    <Image
                      src="/info.svg"
                      width={20}
                      height={20}
                      alt="info"
                      style={{ marginLeft: "5px" }}
                    />
                  </Tooltip>
                )}
              </Typography>
            </Box>
          </TableCell>
          {data?.map((project, index) => (
            <TableCell
              key={project.project + header}
              align="left"
              sx={styles.tableCell}
            >

              {project[header] ?? "-"} {(header === "performance" || header==="utilization") && (project[header] >=0) && "%"}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export const ProjectSummaryTable: React.FC<ProjectSummaryTableProps> = ({
  fromDate,
  toDate,
}) => {
  const params = useSearchParams();
  const [id, setId] = useState(Number(params.get("id")));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchProjectSummary({
        businessSegment: getBusinessSegment(id),
        fromDate: fromDate,
        toDate: toDate,
        equipmentType: "",
      })
    );
  }, [dispatch, fromDate, toDate, id]);

  useEffect(() => {
    const newId = Number(params.get("id"));
    setId(newId);
  }, [params]);

  const { projectSummary, loading } =
    useAppSelector((state) => state.projectSummary) ?? [];

  if (projectSummary?.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          border: "1px solid #E0E0E0",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        Currently, there is no project summary data to display
      </Box>
    );
  }

  return (
    <Box sx={{ mt: "25px" }}>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={styles.tableContainer}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress size={40} sx={{ my: "30px" }} />
          </Box>
        ) : (
          <Table aria-label="project summary table" sx={styles.table}>
            <ProjectSummaryTableHead data={projectSummary} />
            <ProjectSummaryTableBody data={projectSummary} />
          </Table>
        )}
      </TableContainer>
    </Box>
  );
};
