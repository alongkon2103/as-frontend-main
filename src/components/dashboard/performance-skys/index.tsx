import { ProjectSummaryTable } from "@/components/performance_skys/ProjectSummaryTable";
import { Box, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getThemedStyles } from "./styles";
import { DateRange, DateType } from "@/components/shared/DateRange";
import LowMachinePerformanceGraph from "@/components/performance_skys/lowperformace/graph";
import LowMachinePerformanceTable from "@/components/performance_skys/lowperformace/table";
import { ProjectSummaryGraph } from "@/components/performance_skys/ProjectSummaryGraph";

interface PerformanceSkysDashboardProps {}

export const PerformanceSkysDashboard: React.FC<
  PerformanceSkysDashboardProps
> = () => {
  const [statsDates, setStatsDate] = useState<{
    fromDate: Dayjs;
    toDate: Dayjs;
  }>({
    fromDate: dayjs().hour(8).minute(0).second(0).subtract(1, "day"),
    toDate: dayjs().hour(8).minute(0).second(0),
  });
  const { t } = useTranslation();
  const params = useSearchParams();
  const [id, setId] = useState(Number(params.get("id")));
  const styles = getThemedStyles();

  useEffect(() => {
    // This effect will run whenever the URL parameter changes
    const newId = Number(params.get("id"));
    setId(newId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.get("id")]);

  const handleStatDate = (e: DateType) => {
    setStatsDate({
      fromDate: dayjs(e.fromDate).hour(8).minute(0).second(0),
      toDate: dayjs(e.toDate).hour(8).minute(0).second(0),
    });
  };

  return (
    <Box
      sx={{
        mt: "75px",
        paddingX: "2vw",
        display: "flex",
        justifyContent: "center",
      }}
      datatest-id="page-border"
    >
      <Box sx={{ width: "min(1344px, 100%)" }}>
        <Box sx={{ mb: "10px" }}>
          <Typography sx={styles.titleText}>{t("calendar")}</Typography>
        </Box>
        <Box sx={styles.calendarBox}>
          <DateRange
            handleDateChange={handleStatDate}
            startDate={statsDates.fromDate.format("YYYY-MM-DD")}
            endDate={statsDates.toDate.format("YYYY-MM-DD")}
            shortcuts="full"
            sky={true}
          />
          <Typography sx={styles.timestampText}>
            {t("time_captured")}:{" "}
            {statsDates.fromDate.format("YYYY/MM/DD HH:mm:ss")} {" - "}
            {statsDates.toDate.format("YYYY/MM/DD HH:mm:ss")}
          </Typography>
        </Box>
        <Typography sx={styles.topTitleText}>{t("project_summary")}</Typography>
        <ProjectSummaryTable
          fromDate={statsDates.fromDate.format("YYYY/MM/DD")}
          toDate={statsDates.toDate.format("YYYY/MM/DD")}
        />
        <ProjectSummaryGraph
          fromDate={statsDates.fromDate.format("YYYY/MM/DD")}
          toDate={statsDates.toDate.format("YYYY/MM/DD")}
        />
        <Typography sx={styles.low_performance_text}>
          {t("low_performance")}
        </Typography>
        <Box sx={styles.low_performance_box}>
          <LowMachinePerformanceTable
            businessSegment={id === 1 ? "AE" : "AS"}
            fromDate={statsDates.fromDate.format("YYYY/MM/DD")}
            toDate={statsDates.toDate.format("YYYY/MM/DD")}
          />
          <LowMachinePerformanceGraph
            businessSegment={id === 1 ? "AE" : "AS"}
            fromDate={statsDates.fromDate.format("YYYY/MM/DD")}
            toDate={statsDates.toDate.format("YYYY/MM/DD")}
          />
        </Box>
      </Box>
    </Box>
  );
};
