/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import colorVariables from "@/app/styles/variables.module.scss";
import { Grid } from "@mui/material";
import DashboardCard from "../Card";
import { DateType } from "@/components/shared/DateRange";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductionStats } from "@/store/features/ProductionStats/ProductionStatsSlice";
import {
  DelayedEndDateToolTip,
  DelayedStartDateToolTip,
  OnGoingToolTip,
  UtilizationToolTip,
} from "../SharedToolTips";
import { useTranslation } from "react-i18next";

function OperatorStatsDeck({ fromDate, toDate }: DateType) {
  const dispatch = useAppDispatch();
  const { stats, loading } = useAppSelector((state) => state.productionStats);
  const { t } = useTranslation();
  function loadStats() {
    if (fromDate.trim() !== "")
      dispatch(
        fetchProductionStats({
          fromDate,
          toDate,
        })
      );
  }

  useEffect(() => {
    loadStats();
  }, [fromDate, toDate]);
  return (
    <Grid container gap={3} mt={3} ml={3}>
      <Grid item xs={12} md={5.5}>
        <DashboardCard
          title={t("released")}
          updatedAt={`${t("updated")}: ${
            stats?.updatedAt == "" ? "-" : stats?.updatedAt
          }`}
          count={stats?.onGoing ?? "-"}
          message={t("total_qty_on_going")}
          color={colorVariables.orangeMain}
          loading={loading}
          toolTip={OnGoingToolTip(t)}
        />
      </Grid>
      <Grid item xs={12} md={5.5}>
        <DashboardCard
          title={t("delayed_start_date")}
          updatedAt={`${t("updated")}: ${
            stats?.updatedAt == "" ? "-" : stats?.updatedAt
          }`}
          count={stats?.delayedStartDate ?? "-"}
          message={t("total_qty")}
          color={colorVariables.redMain}
          loading={loading}
          toolTip={DelayedStartDateToolTip(t)}
        />
      </Grid>
      <Grid item xs={12} md={5.5}>
        <DashboardCard
          title={t("delayed_end_date")}
          updatedAt={`${t("updated")}: ${
            stats?.updatedAt == "" ? "-" : stats?.updatedAt
          }`}
          count={stats?.delayedEndDate ?? "-"}
          message={t("total_qty")}
          color={colorVariables.redMain}
          loading={loading}
          toolTip={DelayedEndDateToolTip(t)}
        />
      </Grid>
      <Grid item xs={12} md={5.5}>
        <DashboardCard
          title={t("utilization")}
          updatedAt={`${t("updated")}: ${
            stats?.updatedAt == "" ? "-" : stats?.updatedAt
          }`}
          count={stats?.utilization ?? "-"}
          message={t("total_utilization_percentage")}
          color={colorVariables.blueMain}
          loading={loading}
          percentage
          toolTip={UtilizationToolTip(t)}
        />
      </Grid>
    </Grid>
  );
}

export default OperatorStatsDeck;
