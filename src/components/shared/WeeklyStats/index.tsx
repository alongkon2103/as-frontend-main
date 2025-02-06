"use client";
import {
  Button,
  Modal,
  Grid,
  Typography,
  Box,
  Tooltip,
  List,
  ListItem,
} from "@mui/material";
import Image from "next/image";
import { getThemedStyles } from "./styles";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  WeeklyStatsProps,
  fetchOnThisWeek,
} from "@/store/features/OnThisWeek/OnThisWeekSlice";
import WeekPicker from "@/components/shared/WeekPicker2";
import dayjs from "dayjs";
import JobStatusTable from "../../job_tables/JobStatusTable";
import { useTranslation } from "react-i18next";
import {
  addQueryToUrl,
  greenText,
  redText,
  removeQueryFromUrl,
} from "@/utils/utils";
import { UserRoles } from "@/utils/types";
import { useSearchParams } from "next/navigation";

export interface WeeklyStatsContextProps {
  id: number;
  projectName: string;
}

const WeeklyStats: React.FC<WeeklyStatsContextProps> = ({
  id,
  projectName,
}) => {
  const styles = getThemedStyles();
  const dispatch = useAppDispatch();
  const params = useSearchParams();

  const [week, setWeek] = useState(dayjs());
  const [startDate, setStartDate] = useState(week.startOf("week"));
  const [endDate, setEndDate] = useState(week.endOf("week"));
  const [openDetail, setOpenDetail] = useState(false);
  const { t } = useTranslation();
  const role = useAppSelector((state) => state.auth.currentUser.role);

  useEffect(() => {
    setStartDate(week.startOf("week"));
    setEndDate(week.endOf("week"));
  }, [week]);

  useEffect(() => {
    dispatch(
      fetchOnThisWeek({
        id: id,
        fromDate: startDate.format("YYYY-MM-DD"),
        toDate: endDate.format("YYYY-MM-DD"),
      })
    );
  }, [dispatch, id, startDate, endDate]);

  useEffect(() => {
    if (params.get("open") && params.get("open") === "modal")
      setOpenDetail(true);
  }, [params]);

  const weeklyStats: WeeklyStatsProps = useAppSelector(
    (state) => state.onThisWeek.weeklyStats
  );

  const handleClose = () => {
    removeQueryFromUrl(["open", "tab"]);
    setOpenDetail(false);
  };

  const onThisWeekToolTip = () => {
    return (
      <Box p={1}>
        <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
          {t("whats_on_this_week")}
        </Typography>
        <List sx={{ listStyleType: "disc" }}>
          <ListItem>
            <Typography sx={{ fontSize: "12px" }}>
              <b>{t("firmed")}: </b>
              {t("planned_tooltip")}
            </Typography>
          </ListItem>
          <Box ml={3}>
            <ListItem>
              <Typography sx={{ fontSize: "12px" }}>
                <b>{t("released")}: </b>
                {t("on_going_tooltip_description")}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography sx={{ fontSize: "12px" }}>
                <b>{t("plan_to_start")}: </b>
                {t("plan_to_start_tooltip")}
              </Typography>
            </ListItem>
          </Box>
          <ListItem>
            <Typography sx={{ fontSize: "12px" }}>
              <b>{t("finished")}: </b>
              {t("completed_job")}
            </Typography>
          </ListItem>
          <Box ml={3}>
            <ListItem>
              <Typography sx={{ fontSize: "12px" }}>
                <b>{t("finished")}: </b>
                {t("job_quantity_completed")}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography sx={{ fontSize: "12px" }}>
                <b>{t("goal_to_finish")}: </b>
                {t("goal_to_finish_tooltip")}
              </Typography>
            </ListItem>
          </Box>
        </List>
      </Box>
    );
  };

  return (
    <>
      <Grid container sx={styles.onThisWeekWrapper} rowGap={2}>
        <Grid container direction={"row"} justifyContent={"space-between"}>
          <div style={{ display: "flex" }}>
            <Typography sx={styles.title}>{t("on_this_week")}</Typography>
            <Tooltip title={onThisWeekToolTip()}>
              <Image src="/info.svg" width={32} height={32} alt="info" />
            </Tooltip>
          </div>
          <div>
            <WeekPicker value={week} onChange={setWeek} />
          </div>
        </Grid>
        <Grid
          item
          xs={6}
          pt={0}
          sx={{
            borderRight: "1px solid #E0E0E0",
            paddingRight: "10px",
          }}
        >
          <Grid container direction={"row"} justifyContent={"space-between"}>
            <Grid item xs={12} md={5} xl={6} lg={5}>
              <Typography sx={styles.defaultText}>{t("firmed")}</Typography>
              <Typography sx={styles.fadedText}>
                ({t("items_quantity")})
              </Typography>
            </Grid>
            <Grid item xs={12} md={7} xl={6} lg={7}>
              <Grid
                container
                direction={"row"}
                justifyContent={"space-between"}
              >
                <div style={{ textAlign: "center" }}>
                  <Typography sx={styles.plannedNumber} color={"#014361"}>
                    {weeklyStats?.onGoing ?? 0}
                  </Typography>
                  <Typography sx={styles.fadedText}>{t("released")}</Typography>
                </div>
                <Typography sx={styles.plannedNumber} color={"#014361"}>
                  /
                </Typography>
                <div style={{ textAlign: "center" }}>
                  <Typography sx={styles.plannedNumber} color={"#014361"}>
                    {weeklyStats?.planToStart ?? 0}
                  </Typography>
                  <Typography sx={styles.fadedText}>
                    {t("plan_to_start")}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid container mt={2}>
            <Grid item md={9} sx={styles.detailTextWrapper}>
              <Typography sx={styles.detailTextBold}>
                {t("started")}{" "}
              </Typography>
              <Typography sx={styles.detailTextNormal}>
                {t("before_start_date")}
              </Typography>
            </Grid>
            <Grid item md={3}>
              <Typography sx={styles.detailNumber} color={"#014361"}>
                {weeklyStats?.startedBeforeStartDate ?? 0}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6} sx={{ paddingLeft: "16px" }}>
          <Grid container direction={"row"} justifyContent={"space-between"}>
            <Grid item xs={12} md={5} xl={5} lg={5}>
              <Typography sx={styles.defaultText}>{t("fg")}</Typography>
              <Typography sx={styles.fadedText}>
                ({t("items_quantity")})
              </Typography>
            </Grid>
            <Grid item xs={12} md={7} xl={7} lg={7}>
              <Grid
                container
                direction={"row"}
                justifyContent={"space-between"}
              >
                <div style={{ textAlign: "center" }}>
                  <Typography sx={styles.plannedNumber} color={greenText}>
                    {weeklyStats?.finished ?? 0}
                  </Typography>
                  <Typography sx={styles.fadedText}>{t("finished")}</Typography>
                </div>
                <Typography sx={styles.plannedNumber} color={greenText}>
                  /
                </Typography>
                <div style={{ textAlign: "center" }}>
                  <Typography sx={styles.plannedNumber} color={greenText}>
                    {weeklyStats?.goalToFinish ?? 0}
                  </Typography>
                  <Typography sx={styles.fadedText}>
                    {t("goal_to_finish")}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid container mt={2}>
            <Grid item md={9} sx={styles.detailTextWrapper}>
              <Typography sx={styles.detailTextBold}>
                {t("finished")}{" "}
              </Typography>
              <Typography sx={styles.detailTextNormal}>
                {t("before_end_date")}
              </Typography>
            </Grid>
            <Grid item md={3}>
              <Typography sx={styles.detailNumber} color={"#014361"}>
                {weeklyStats?.finishedBeforeEndDate ?? 0}
              </Typography>
            </Grid>
          </Grid>
          <Grid container mt={2}>
            <Grid item md={9} sx={styles.detailTextWrapper}>
              <Typography sx={styles.detailTextBold}>
                {t("scrapped")}{" "}
              </Typography>
              <Typography sx={styles.detailTextNormal}>
                {t("this_week")}
              </Typography>
            </Grid>
            <Grid item md={3}>
              <Typography sx={styles.detailNumber} color={redText}>
                {weeklyStats?.scrappedThisWeek ?? 0}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={() => {
              addQueryToUrl("open", "modal");
              setOpenDetail(true);
            }}
          >
            {`${t("view_more_details")} >`}
          </Button>
        </Grid>
      </Grid>

      <Modal
        open={openDetail}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...styles.modalStyle, width: "90%", height: "90%" }}>
          <JobStatusTable
            id={id}
            title={t("weekly_details")}
            projectName={projectName}
            fromDate={startDate.format("YYYY-MM-DD")}
            toDate={endDate.format("YYYY-MM-DD")}
            onClose={() => handleClose()}
            showMachine={role === UserRoles.OPERATOR_MANAGER}
            showMaterial={role === UserRoles.OPERATOR_MANAGER}
            showPriority={role === UserRoles.OPERATOR_MANAGER}
          />
        </Box>
      </Modal>
    </>
  );
};

export default WeeklyStats;
