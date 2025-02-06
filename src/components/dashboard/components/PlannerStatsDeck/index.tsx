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
  DelayedToolTip,
  FinishedToolTip,
  OnGoingToolTip,
  ProblemsToolTip,
} from "../SharedToolTips";
import { useTranslation } from "react-i18next";

function PlannerStatsDeck({ fromDate, toDate }: DateType) {
  const disptach = useAppDispatch();
  const { stats, loading } = useAppSelector((state) => state.productionStats);
  const { t } = useTranslation();

  function loadStats() {
    if (fromDate.trim() !== "")
      disptach(
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
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      gap={4}
      alignItems="center"
    >
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
      <DashboardCard
        title={t("finished")}
        updatedAt={`${t("updated")}: ${
          stats?.updatedAt == "" ? "-" : stats?.updatedAt
        }`}
        count={stats?.finishedGoods ?? "-"}
        showTotal={true}
        total={stats?.totalFinishedGoods ?? "-"}
        message={t("total_qty_finished")}
        color={colorVariables.greenMain}
        loading={loading}
        toolTip={FinishedToolTip(t)}
      />
      <DashboardCard
        title={t("delayed")}
        updatedAt={`${t("updated")}: ${
          stats?.updatedAt == "" ? "-" : stats?.updatedAt
        }`}
        count={stats?.delayed ?? "-"}
        message={t("total_qty_delayed")}
        color={colorVariables.redMain}
        loading={loading}
        toolTip={DelayedToolTip(t)}
      />
      <DashboardCard
        title={t("problems")}
        updatedAt={`${t("updated")}: ${
          stats?.updatedAt == "" ? "-" : stats?.updatedAt
        }`}
        count={stats?.problems ?? "-"}
        message={t("total_qty_have_problems")}
        color={colorVariables.redMain}
        loading={loading}
        toolTip={ProblemsToolTip(t)}
      />
    </Grid>
  );
}

export default PlannerStatsDeck;
