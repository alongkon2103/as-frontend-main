"use client";

import JobsTable from "@/components/job_tables/JobsTable";
import OverallStats from "@/components/shared/OverallStats";
import WeeklyStats from "@/components/shared/WeeklyStats";
import { DateType } from "@/components/shared/DateRange";
import { useAppSelector } from "@/store/hooks";
import { Box, Grid, Stack } from "@mui/material";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePreviousValue } from "@/utils/usePreviousValue";
import { UserRoles } from "@/utils/types";

export default function ProjectDetail() {
  const params = useSearchParams();
  const { role } = useAppSelector((state) => state.auth.currentUser);
  const { t } = useTranslation();
  const [id, setId] = useState(Number(params.get("id")));

  useEffect(() => {
    // This effect will run whenever the URL parameter changes
    const newId = Number(params.get("id"));
    setId(newId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.get("id")]);
  const userId = useAppSelector((state) => state.auth.currentUser.employeeId);

  const dateFilterInitial = useAppSelector(
    (state) => state.dateRangeFilters?.projectedDateFilters
  );

  const dateFilter = dateFilterInitial ? dateFilterInitial[userId] : undefined;
  const prevId = usePreviousValue(id);

  const [startDate, setStartDate] = useState<string>(
    dateFilter && dateFilter.startDate.length > 0
      ? dateFilter.startDate
      : dayjs().subtract(7, "days").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState<string>(
    dateFilter && dateFilter.endDate.length > 0
      ? dateFilter.endDate
      : dayjs().format("YYYY-MM-DD")
  );

  useEffect(() => {
    if (prevId !== undefined && prevId !== id) {
      const startDate = dayjs().subtract(7, "days").format("YYYY-MM-DD");
      const endDate = dayjs().format("YYYY-MM-DD");
      setStartDate(startDate);
      setEndDate(endDate);
    }
  }, [id, prevId]);

  const displayProjects = () => {
    if (
      role === UserRoles.ADMIN ||
      role === UserRoles.PLANNER ||
      role === UserRoles.OPERATOR_MANAGER
    ) {
      return (
        <Box
          sx={{
            paddingX: "2vw",
          }}
        >
          <Stack spacing={2}>
            <Grid container spacing={2} sx={{ marginTop: "2vh" }}>
              <Grid item xs={12} md={7}>
                <WeeklyStats
                  id={Number(params.get("id"))}
                  projectName={params.get("name") as string}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <OverallStats
                  id={Number(params.get("id"))}
                  fromDate={startDate}
                  toDate={endDate}
                  handleDateChange={(e: DateType) => {
                    setStartDate(e.fromDate);
                    setEndDate(e.toDate);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <JobsTable
                  id={Number(params.get("id"))}
                  projectName={params.get("name") as string}
                  title={t("all_jobs")}
                  startDate={startDate}
                  endDate={endDate}
                  showPriority={role === UserRoles.OPERATOR_MANAGER}
                  showMachine={role === UserRoles.OPERATOR_MANAGER}
                  showMaterial={role === UserRoles.OPERATOR_MANAGER}
                />
              </Grid>
            </Grid>
          </Stack>
        </Box>
      );
    } else {
      return <div>Unauthorized Page</div>;
    }
  };

  return <>{displayProjects()}</>;
}
