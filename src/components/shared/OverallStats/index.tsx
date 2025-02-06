"use client";
import { Box, Grid, List, ListItem, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import { getThemedStyles } from "./styles";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  OutsourceProps,
  OverallStatsProps,
  fetchOverallStats,
} from "@/store/features/OverallStats/OverAllStatsSlice";
import { DateType, DateRange } from "@/components/shared/DateRange";
import { useTranslation } from "react-i18next";
import { greenText, redText } from "@/utils/utils";
import { LightBackgroundTooltip } from "@/components/production_overview/tooltips/general";
import { OutsourceToolTip } from "./OutsourceTooltip";

export interface OverallStatsContextProps {
  id: number;
  fromDate: string;
  toDate: string;
  handleDateChange: (e: DateType) => void;
}

const OverallStats: React.FC<OverallStatsContextProps> = ({
  id,
  fromDate,
  toDate,
  handleDateChange,
}) => {
  const styles = getThemedStyles();
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(
      fetchOverallStats({
        id: id,
        fromDate: fromDate,
        toDate: toDate,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, fromDate, toDate]);

  const overallStats: OverallStatsProps = useAppSelector(
    (state) => state.overallStats.overallStats
  );

  const overallQtyToolTip = () => {
    return (
      <Box p={1}>
        <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
          {t("whats_overall_qty")}
        </Typography>
        <List sx={{ listStyleType: "disc" }}>
          <ListItem>
            <Typography sx={{ fontSize: "12px" }}>
              <b>{t("in_progress")}:</b> {t("in_progress_overall_tooltip")}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography sx={{ fontSize: "12px" }}>
              <b>{t("released")}: </b> {t("on_going_overall_tooltip")}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography sx={{ fontSize: "12px" }}>
              <b>{t("delayed")}: </b> {t("delayed_overall_tooltip")}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography sx={{ fontSize: "12px" }}>
              <b>{t("problems")}: </b> {t("problems_tooltip_description")}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography sx={{ fontSize: "12px" }}>
              <b>{t("stopped")}: </b> {t("stopped_overall_tooltip")}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography sx={{ fontSize: "12px" }}>
              <b>{t("not_started")}: </b> {t("not_started_overall_tooltip")}
            </Typography>
          </ListItem>
        </List>
      </Box>
    );
  };

  const data = [
    {
      name: t("released"),
      value: overallStats?.onGoing ?? 0,
      color: greenText,
    },
    {
      name: t("outsource"),
      value: getOutsourceTotal(overallStats?.outsource),
      color: "#014361",
    },
    {
      name: t("delayed"),
      value: overallStats?.delayed ?? 0,
      color: redText,
    },
    {
      name: t("not_started"),
      value: overallStats?.notStarted ?? 0,
      color: redText,
    },
    {
      name: t("problems"),
      value: overallStats?.problems ?? 0,
      color: redText,
    },
    {
      name: t("stopped"),
      value: overallStats?.stopped ?? 0,
      color: redText,
    },
  ];

  return (
    <Grid container sx={styles.onThisWeekWrapper}>
      <Grid container direction={"row"} justifyContent={"space-between"}>
        <div style={{ display: "flex" }}>
          <Typography sx={styles.title}>{t("overall_qty")}</Typography>
          <Tooltip title={overallQtyToolTip()}>
            <Image src="/info.svg" width={32} height={32} alt="info" />
          </Tooltip>
        </div>
        <div>
          <DateRange
            startDate={fromDate}
            endDate={toDate}
            handleDateChange={handleDateChange}
            from={"project"}
          />
        </div>
      </Grid>
      <Grid container mb={3}>
        <Grid
          item
          xs={4}
          sx={{
            textAlign: "center",
            background: "var(--GreyPrimary-0, #F4F7FA)",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography sx={styles.boldNumber}>
            {overallStats?.totalQuantity ?? 0}
          </Typography>
          <Typography sx={styles.fadedText}>
            {t("total_in_progress")}
          </Typography>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={2} textAlign={"center"}>
            {data?.map((item, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                {item.name !== t("outsource") ? (
                  <Typography
                    style={styles.overAllStatDetailNumber}
                    color={item.color}
                  >
                    {item.value}
                  </Typography>
                ) : (
                  <LightBackgroundTooltip
                    title={
                      <OutsourceToolTip
                        preOutsourceIns={
                          overallStats?.outsource?.preOutsourceIns ?? 0
                        }
                        outsourceAtSupplier={
                          overallStats?.outsource?.outsourceAtSupplier ?? 0
                        }
                        inspectAfterOutsource={
                          overallStats?.outsource?.inspectAfterOutsource ?? 0
                        }
                      />
                    }
                  >
                    <Typography
                      style={styles.overAllStatDetailNumber}
                      color={item.color}
                    >
                      {item.value}
                    </Typography>
                  </LightBackgroundTooltip>
                )}
                <Typography style={styles.overallStatDetail}>
                  {item.name}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

function getOutsourceTotal(outsource: OutsourceProps) {
  if (!outsource) return 0;
  return (
    (outsource?.outsourceAtSupplier ?? 0) +
    (outsource?.inspectAfterOutsource ?? 0) +
    (outsource?.preOutsourceIns ?? 0)
  );
}

export default OverallStats;
