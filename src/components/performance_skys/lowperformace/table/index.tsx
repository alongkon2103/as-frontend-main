// "use client";

// import React, { useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
// } from "@mui/material";
// import { useTranslation } from "react-i18next";
// import {
//   fetchLowPerformance,
//   LowPerformanceProps,
// } from "@/store/features/PerformanceReport/LowPerformanceSlice";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { getThemedStyles } from "./styles";

// const styles = getThemedStyles();

// export interface LowMachinePerformanceTableProps {
//   businessSegment: string;
//   fromDate: string;
//   toDate: string;
// }

// export const LowMachinePerformanceTable: React.FC<
//   LowMachinePerformanceTableProps
// > = ({
//   businessSegment,
//   fromDate,
//   toDate,
// }: LowMachinePerformanceTableProps) => {
//   const { t } = useTranslation();
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     dispatch(
//       fetchLowPerformance({
//         selectTop: "10",
//         businessSegment: businessSegment,
//         fromDate: fromDate,
//         toDate: toDate,
//       })
//     );
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [businessSegment, fromDate, toDate]);

//   const { lowPerformance, loading } =
//     useAppSelector((state: any) => state.lowPerformance) ?? [];

//   return (
//     <Box sx={styles.box}>
//       <Typography sx={styles.title}>{t("low_m_performance")}</Typography>
//       {loading ? (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100%",
//           }}
//         >
//           <CircularProgress size={40} sx={{ my: "30px" }} />
//         </Box>
//       ) : (
//         <TableContainer data-testid="lowperformanceMachineTable">
//           <Table size="small">
//             <TableHead>
//               <TableRow sx={styles.tablerow}>
//                 <TableCell data-testid="R/M" sx={styles.R_M_header}>
//                   {t("R/M")}
//                 </TableCell>
//                 <TableCell data-testid="percentage"sx={styles.percentage_header}>
//                   {t("percentage")}
//                 </TableCell>
//                 <TableCell data-testid="cimcopercentage" sx={{paddingLeft:'8px'}}>
//                   {t("cimcopercentage")}
//                 </TableCell>
//                 <TableCell data-testid="reason(s)" sx={styles.reasons_header}>
//                   {t("reason(s)")}
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {lowPerformance?.map((data: LowPerformanceProps) => (
//                 <TableRow key={data.resourceId || "N/A"} sx={styles.tablerow}>
//                   <TableCell sx={styles.resource}>
//                     {data.resourceId || "N/A"} <br />
//                     <Typography sx={styles.machine}>
//                       {data.resourceLocation || "N/A"}
//                     </Typography>
//                     <Typography sx={styles.machine}>
//                      {data.machineLocation || "N/A"}
//                     </Typography>
//                   </TableCell>
//                   <TableCell sx={styles.percentage_text}>
//                     {data.percentage !== undefined
//                       ? `${data.percentage}%`
//                       : "N/A"}
//                   </TableCell>

//                   <TableCell sx={styles.percentage_text}>
//                   {data.cimcoPercentage !== undefined
//                       ? `${data.cimcoPercentage}%`
//                       : `${0}%`}
//                   </TableCell>
//                   <TableCell sx={styles.reasons_text}>
//                     {data.reasons || "N/A"}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// };

// export default LowMachinePerformanceTable;
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  fetchLowPerformance,
  LowPerformanceProps,
} from "@/store/features/PerformanceReport/LowPerformanceSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getThemedStyles } from "./styles";

const styles = getThemedStyles();

export interface LowMachinePerformanceTableProps {
  businessSegment: string;
  fromDate: string;
  toDate: string;
}

export const LowMachinePerformanceTable: React.FC<
  LowMachinePerformanceTableProps
> = ({
  businessSegment,
  fromDate,
  toDate,
}: LowMachinePerformanceTableProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [sortConfig, setSortConfig] = useState<{
    key: keyof LowPerformanceProps | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    dispatch(
      fetchLowPerformance({
        selectTop: "10",
        businessSegment: businessSegment,
        fromDate: fromDate,
        toDate: toDate,
      })
    );
  }, [businessSegment, fromDate, toDate]);

  const { lowPerformance, loading } =
    useAppSelector((state: any) => state.lowPerformance) ?? [];

  const handleSort = (key: keyof LowPerformanceProps) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (sortConfig.key) {
      const key = sortConfig.key as keyof LowPerformanceProps; 
      return [...lowPerformance].sort((a, b) => {
        const aValue = a[key] ?? ""; 
        const bValue = b[key] ?? ""; 
  
        if (sortConfig.direction === "asc") {
          return aValue > bValue ? 1 : -1;
        }
        return aValue < bValue ? 1 : -1;
      });
    }
    return lowPerformance;
  }, [lowPerformance, sortConfig]);
  

  return (
    <Box sx={styles.box}>
      <Typography sx={styles.title}>{t("low_m_performance")}</Typography>
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
        <TableContainer data-testid="lowperformanceMachineTable">
          <Table size="small">
            <TableHead>
              <TableRow sx={styles.tablerow}>
                <TableCell
                  data-testid="R/M"
                  sx={{ cursor: "pointer", ...styles.R_M_header }}
                  onClick={() => handleSort("resourceId")  }
                >
                  {t("R/M")}
                </TableCell>
                <TableCell
                  data-testid="percentage"
                  sx={{ cursor: "pointer",width:"0px", ...styles.percentage_header }}
                  onClick={() => handleSort("percentage")}
                >
                  {t("ftPercentage")}
                </TableCell>
                <TableCell 
                  data-testid="cimcopercentage"
                  sx={{ paddingLeft: "8px",cursor:"pointer",width:"0px" }}
                  onClick={() => handleSort("cimcoPercentage")}
                >
                  {t("cimcopercentage")}
                </TableCell>
                <TableCell
                  data-testid="reason(s)"
                  sx={{ cursor: "pointer", ...styles.reasons_header }}
                  onClick={() => handleSort("reasons")}
                >
                  {t("reason(s)")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData?.map((data: LowPerformanceProps) => (
                <TableRow key={data.resourceId || "N/A"} sx={styles.tablerow}>
                  <TableCell sx={styles.resource}>
                    {data.resourceId || "N/A"} <br />
                    <Typography sx={styles.machine}>
                      {data.resourceLocation || "N/A"}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontStyle: "normal",
                        letterSpacing: "0.17px",
                      }}
                    >
                      {data.machineLocation || "N/A"}
                    </Typography>
                  </TableCell>
                  <TableCell sx={styles.percentage_text}>
                    {data.percentage !== undefined
                      ? `${data.percentage}%`
                      : "N/A"}
                  </TableCell>
                  <TableCell
                      sx={{
                        color: data.cimcoPercentage === 100 ? "black" : "#D32F2F",
                        p: "8px",
                        fontFeatureSettings: "'clig' off, 'liga' off",
                        verticalAlign: "top",
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        letterSpacing: "0.17px",
                        lineHeight: "143%",
                      }}
                    >
                      {`${data.cimcoPercentage ?? 0}%`}
                    </TableCell>

                  {/* <TableCell
                    sx={{
                      ...styles.percentage_text,
                      color: data.cimcoPercentage === 0 || data.cimcoPercentage === undefined ? 'black' : '#D32F2F',
                    }}
                  >
                    {data.cimcoPercentage !== undefined
                      ? `${data.cimcoPercentage}%`
                      : `${0}%`}
                  </TableCell> */}

                  <TableCell sx={styles.reasons_text}>
                    {data.reasons || "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default LowMachinePerformanceTable;
