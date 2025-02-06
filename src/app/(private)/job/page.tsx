"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { getThemedStyles } from "./styles";
import Kanban from "@/components/job/Kanban";
import ControlledTreeView from "@/components/job/Treeview";
import { useEffect, useState } from "react";
import { StyledTreeItemProps } from "@/components/job/Treeview/StyledTreeItem";
import { fetchJobs, jobParams } from "@/store/features/Jobs/JobSlice";
import dayjs from "dayjs";
import { JobCard } from "@/components/jobcard";
import LottieAnimation from "react-lottie";
import AirplaneConfettiAnimation from "../../../../public/animations/airplane_confetti.json";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { orangeBackground, orangeText } from "@/utils/utils";
import { UserRoles } from "@/utils/types";

export default function ProjectDetail() {
  const params = useSearchParams();
  const [selectedBlock, setSelectedBlock] = useState<
    StyledTreeItemProps | object
  >({});
  const { t } = useTranslation();

  const [dataChange, setDataChange] = useState(false);
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.auth.currentUser);
  const [openJobDetail, setOpenJobDetail] = useState(false);
  const styles = getThemedStyles();

  const job = params.get("job");
  const suffix = params.get("suffix");
  const project = params.get("project");
  const fromDate = params.get("fromDate");
  const toDate = params.get("toDate");

  useEffect(() => {
    const params: jobParams = {
      projectId: parseInt(project as string),
      fromDate: dayjs(fromDate).format("YYYY-MM-DD"),
      toDate: dayjs(toDate).format("YYYY-MM-DD"),
      page: 1,
      limit: 1,
      job: job as string,
    };
    dispatch(fetchJobs(params));
  }, [dispatch, job, project, fromDate, toDate]);

  const currentJob = useAppSelector((state) =>
    state.jobs.jobs?.length > 0 ? state.jobs.jobs[0] : null
  );

  if (!job || !suffix || !project) {
    return <div>Invalid Project or Job</div>;
  }

  const renderAnimation = () => {
    setTimeout(() => {
      setDataChange(false);
    }, 1500);
    return (
      <LottieAnimation
        options={{
          animationData: AirplaneConfettiAnimation,
          loop: 1,
        }}
        width="200px"
      />
    );
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const displayProjects = () => {
    if (role === UserRoles.ADMIN || role === UserRoles.PLANNER) {
      return (
        <Box style={styles.box}>
          <Grid container spacing={2}>
            <Grid item xs={4.5}>
              <Box style={styles.treeWrapper}>
                <h3 style={styles.treeTitle}>{t("linked_dependencies")}</h3>
                <ControlledTreeView
                  job={job}
                  suffix={parseInt(suffix)}
                  setSelectedBlock={(block) => {
                    setSelectedBlock(block);
                    setDataChange(true);
                  }}
                  hasData={() => {}}
                />
              </Box>
            </Grid>
            {Object.keys(selectedBlock).length > 0 && (
              <Grid item xs={7.5}>
                {(selectedBlock as StyledTreeItemProps).subOrderId ===
                  "Use Inventory" && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                      height: "100vh",
                      gap: "30px",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "10vh",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          zIndex: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: "230px",
                            height: "200px",
                            borderRadius: "100%",
                          }}
                        >
                          {dataChange && renderAnimation()}
                        </Box>
                      </Box>
                      <Image
                        src="/plane.svg"
                        width={200}
                        height={200}
                        alt="seniort-plane-logo"
                      />
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "24px",
                        fontWeight: 700,
                        lineHeight: "28.13px",
                        textAlign: "center",
                        fontFamily: "Roboto",
                      }}
                    >
                      {t("po_job_done")}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "18.75px",
                        textAlign: "center",
                        fontFamily: "Roboto",
                        color: "rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      {t("item_ready_to_use")}
                    </Typography>
                  </Box>
                )}
                {(selectedBlock as StyledTreeItemProps).subOrderId !==
                  "Use Inventory" && (
                  <>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item xs={8}>
                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                        >
                          <Typography sx={styles.itemTitle}>
                            {t("item")} #:
                            {(selectedBlock as StyledTreeItemProps).materialId}
                          </Typography>
                          <Typography sx={styles.quantity}>
                            ({t("quantity")}:{" "}
                            {(selectedBlock as StyledTreeItemProps).totalQty})
                          </Typography>
                          <Button
                            size="small"
                            variant="text"
                            sx={{
                              textTransform: "none",
                              marginLeft: "1vw",
                              cursor: currentJob ? "pointer" : "not-allowed",
                              color: "rgba(34, 95, 166, 1)",
                            }}
                            onClick={() => setOpenJobDetail(true)}
                            disabled={!currentJob}
                          >
                            {t("view_card")}
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography sx={styles.job}>
                          {t("job_#")}: {params.get("job")}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-end"
                      spacing={2}
                    >
                      <Grid item xs={8}>
                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                          sx={{ marginTop: "1vh" }}
                        >
                          <Typography sx={styles.dateTitle}>
                            {t("start_date")}:{" "}
                            <span style={styles.dateValue}>
                              {dayjs(
                                (selectedBlock as StyledTreeItemProps).startdate
                              ).format("DD/MM/YYYY")}
                            </span>{" "}
                          </Typography>
                          <Typography
                            sx={{ ...styles.dateTitle, marginLeft: "2vw" }}
                          >
                            {t("end_date")}:{" "}
                            <span style={styles.dateValue}>
                              {dayjs(
                                (selectedBlock as StyledTreeItemProps).enddate
                              ).format("DD/MM/YYYY")}
                            </span>{" "}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                )}
                {(selectedBlock as StyledTreeItemProps).subOrderId.startsWith(
                  "PLN"
                ) && (
                  <Box
                    sx={{ display: "flex", mt: "15px", alignItems: "center" }}
                  >
                    <Typography sx={styles.dateTitle}>
                      {t("status")}:{" "}
                    </Typography>
                    <Typography
                      sx={{
                        background: orangeBackground,
                        color: orangeText,
                        paddingX: "5px",
                        marginLeft: "5px",
                        borderRadius: "8px",
                      }}
                    >
                      {(selectedBlock as StyledTreeItemProps)?.plnStatus}
                    </Typography>
                  </Box>
                )}
                <Kanban
                  suffix={suffix}
                  projectId={project}
                  selectedBlock={selectedBlock}
                />
              </Grid>
            )}
          </Grid>
          <Modal
            open={openJobDetail}
            onClose={() => refreshPage()}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={styles.jobDetailFilterModal}>
              <JobCard
                jobId={
                  (selectedBlock as StyledTreeItemProps).refNum ||
                  currentJob?.job ||
                  ""
                }
                suffix={
                  (selectedBlock as StyledTreeItemProps).refLine ||
                  currentJob?.suffix ||
                  0
                }
                item={
                  (selectedBlock as StyledTreeItemProps).materialId ||
                  currentJob?.item ||
                  ""
                }
                qty={
                  (selectedBlock as StyledTreeItemProps).qty ||
                  currentJob?.qtyReleased ||
                  0
                }
                oper={
                  parseInt(params.get("oper") || "0") ||
                  parseInt(currentJob?.oper?.toString() || "0") ||
                  0
                }
                startDate={
                  (selectedBlock as StyledTreeItemProps).startdate ||
                  (currentJob?.startDate as string)
                }
                endDate={
                  (selectedBlock as StyledTreeItemProps).enddate ||
                  (currentJob?.endDate as string)
                }
                onClose={() => refreshPage()}
              />
            </Box>
          </Modal>
        </Box>
      );
    } else {
      return <div>Unauthorized Page</div>;
    }
  };

  return <>{displayProjects()}</>;
}
