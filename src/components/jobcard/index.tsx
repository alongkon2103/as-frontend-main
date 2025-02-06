import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { getThemedStyles } from "./styles";
import { JobDetailText } from "@/components/shared/JobDetailText";
import {
  getPriorityColor,
  getProblemColor,
  getProblemBackgroundColor,
  getStatusBackgroundColor,
  getStatusColor,
} from "@/utils/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import {
  ProblemSliceProps,
  fetchProblems,
} from "@/store/features/Problems/ProblemsSlice";
import {
  OperationsSliceProps,
  fetchOperations,
} from "@/store/features/Operations/OperationsSlice";
import { CommentCard } from "@/components/layout/Header/notifications/job-card/comment-card";
import ControlledTreeView from "../job/Treeview";
import { StyledTreeItemProps } from "../job/Treeview/StyledTreeItem";
import {
  CommentBody,
  ProblemCommentProps,
  fetchComments,
  postComment,
} from "@/store/features/Comments/ProblemCommentsSlice";
import dayjs from "dayjs";
import {
  JobDetailDatesProps,
  fetchJobDetailDates,
} from "@/store/features/Jobs/JobDatesSlice";
import {
  JobDetailParams,
  JobDetailProps,
  fetchJobDetails,
} from "@/store/features/Jobs/JobDetailSlice";
import { fetchJobPicture } from "@/store/features/Jobs/JobPictureSlice";
import { useTranslation } from "react-i18next";
import { MentionsInput, Mention } from "react-mentions";
import { fetchUsers } from "@/store/features/Users/UsersSlice";
import CloseButton from "../shared/CloseButton";

export interface JobCardProps {
  jobId: string;
  suffix: number;
  item: string;
  qty: number;
  oper: number;
  startDate: string;
  endDate: string;
  onClose: () => void;
  notiProjectName?: string;
  notiProjectId?: string;
}

export const JobCard: React.FC<JobCardProps> = ({
  jobId,
  suffix,
  item,
  qty,
  oper,
  startDate,
  endDate,
  onClose,
  notiProjectName,
  notiProjectId,
}: JobCardProps) => {
  const name = useSearchParams().get("name");
  const projectName = notiProjectName ? notiProjectName : name ?? "";
  const projectIdFromJob = useSearchParams().get("project");
  const projectIdFromProject = useSearchParams().get("id");
  const styles = getThemedStyles();
  const { t } = useTranslation();
  const projectId = notiProjectId
    ? notiProjectId
    : projectIdFromJob || projectIdFromProject || null;
  const [problem, setProblem] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [reload, setReload] = React.useState(false);
  const dispatch = useAppDispatch();
  const [jobDependency, setJobDependency] =
    React.useState<StyledTreeItemProps | null>();
  const [showLinkedDependency, setShowLinkedDependency] = React.useState(true);

  useEffect(() => {
    dispatch(fetchUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchJobPicture({ item: jobDependency?.materialId ?? item }));
  }, [item, dispatch, jobDependency?.materialId]);

  useEffect(() => {
    dispatch(
      fetchJobDetailDates({
        job: jobId,
        suffix: suffix,
        projectId: projectId ? parseInt(projectId as string) : null,
      })
    );
    dispatch(fetchProblems({}));
    setReload(true);
  }, [dispatch, jobId, suffix, projectId]);

  useEffect(() => {
    if (reload) {
      dispatch(
        fetchOperations({
          job: jobDependency?.refNum ?? jobId,
          suffix: jobDependency?.refLine ?? suffix,
        })
      );
      dispatch(
        fetchComments({
          refLine: jobDependency?.refLine ?? suffix,
          refNum: jobDependency?.refNum ?? jobId,
          refType: jobDependency?.refType ?? "JOB",
        })
      );
      setReload(false);
    }
  }, [dispatch, jobDependency, reload, jobId, suffix]);

  const jobDetailDates: JobDetailDatesProps = useAppSelector(
    (state) => state.jobDetailDates.jobDetailDates
  );

  const allUsers = useAppSelector((state) => state.users.users);

  const jobPicture = useAppSelector((state) => state.jobPicture.jobPicture);
  const userName = jobDetailDates.createdBy ?? "";
  const firstInitials = userName.length > 0 ? userName[0] : "";

  const problems: ProblemSliceProps[] =
    useAppSelector((state) => state.problems.problems) ?? [];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const comments: ProblemCommentProps[] =
    useAppSelector((state) => state.comments.comments) ?? [];

  const operationItems: OperationsSliceProps[] = useAppSelector(
    (state) => state.operations.operations
  ) ?? [{ operation: "N/A", workCenter: "" }];

  const operations = operationItems?.map((operation) => operation.operation);
  const [operation, setOperation] = React.useState(
    oper ? oper : operationItems.length > 0 ? operationItems[0].operation : ""
  );

  const preselectOp = operationItems.find((op) => {
    return op.operation === oper;
  });

  const [selectedOperation, setSelectedOperation] = React.useState(preselectOp);

  useEffect(() => {
    let jobDetailParams = {
      projectId: projectId ? parseInt(projectId as string) : null,
      refLine: jobDependency?.refLine ?? suffix,
      refNum: jobDependency?.refNum ?? jobId,
      refType: jobDependency?.refType ?? "JOB",
    } as JobDetailParams;
    if (selectedOperation) {
      if (typeof selectedOperation?.operation === "number") {
        jobDetailParams.operation = selectedOperation?.operation;
      }
    }
    dispatch(fetchJobDetails(jobDetailParams));
  }, [
    selectedOperation,
    jobDependency,
    dispatch,
    projectId,
    suffix,
    jobId,
    preselectOp,
    operation,
  ]);

  const jobDetails: JobDetailProps = useAppSelector(
    (state) => state.jobDetails.jobDetails
  );

  const renderOperations = () => {
    return operations.map((operation, index) => {
      return (
        <MenuItem key={index} value={operation}>
          {operation}
        </MenuItem>
      );
    });
  };

  const renderComments = useCallback(() => {
    return comments.map((comment) => {
      return (
        <CommentCard
          key={comment.id}
          id={comment.id}
          userName={comment.createdBy}
          operation={comment.operation}
          problemDescription={comment.problemDescription}
          description={comment.comment}
          createdAt={dayjs(comment.createDate).format("DD/MM/YYYY hh:mm a")}
          resolved={comment.isResolved === 0 ? false : true}
          updatedBy={comment.updatedBy}
          reload={() => setReload(true)}
        />
      );
    });
  }, [comments]);

  useEffect(() => {
    if (preselectOp) {
      setSelectedOperation(preselectOp);
    }
  }, [preselectOp]);

  const addComment = () => {
    const selectedProblem = problems.find((p) => p.description === problem);
    const op =
      selectedOperation?.operation === "N/A" ||
      selectedOperation?.operation === ""
        ? null
        : selectedOperation?.operation;
    const body: CommentBody = {
      refType: jobDependency?.refType ?? "JOB",
      refNum: jobDependency?.refNum ?? jobId,
      refLine: jobDependency?.refLine ?? suffix,
      operation: op as number | null,
      problemCode: selectedProblem?.code ?? "",
      problemType: selectedProblem?.type ?? "",
      problemDescription: selectedProblem?.description ?? "",
      projectId: projectId as string,
      comment: comment,
    };

    dispatch(postComment(body));
    setComment("");
  };

  const renderJobDetailProblems = () => {
    if (jobDetails?.problem?.length > 0) {
      return jobDetails?.problem?.map((problemD, index) => {
        return (
          <Typography
            sx={styles.operationDetailChip}
            borderRadius={1}
            key={"problem-" + index}
            mb={"10px"}
            color={getProblemColor(problemD)}
            bgcolor={getProblemBackgroundColor(problemD)}
          >
            {problemD}
          </Typography>
        );
      });
    } else {
      return (
        <Typography
          sx={styles.operationDetailChip}
          borderRadius={1}
          key={"problemN"}
          mb={"10px"}
          color={getProblemColor("None")}
          bgcolor={getProblemBackgroundColor("None")}
        >
          None
        </Typography>
      );
    }
  };

  return (
    <Box height="100%">
      <Grid container direction={"row"} height={"100%"}>
        <Box
          sx={{
            width: "30%",
            background: "#F4F7FA",
            height: "100%",
            padding: "24px",
            overflow: "scroll",
          }}
        >
          <Typography sx={styles.title}>{projectName}</Typography>
          <Typography sx={styles.dateDescription}>
            {t("updated")}:{" "}
            {jobDetailDates.lastUpdatedDate
              ? dayjs(jobDetailDates.lastUpdatedDate).format(
                  "DD/MM/YYYY hh:mm a"
                )
              : "-"}
          </Typography>
          <Typography sx={styles.detailsTitle}>{t("details")}</Typography>
          <JobDetailText
            title={`${t("created_by")}:`}
            avatarText={firstInitials}
            description={userName}
            sxProps={{ marginTop: "20px" }}
          />
          <JobDetailText
            title={`${t("job_#")}:`}
            description={jobId}
            sxProps={{ marginTop: "20px" }}
          />
          <JobDetailText
            title={`${t("suffix")}:`}
            description={suffix.toString()}
            sxProps={{ marginTop: "8px" }}
          />
          <JobDetailText
            title={`${t("item")}:`}
            description={item}
            sxProps={{ marginTop: "8px" }}
          />
          <JobDetailText
            title={`${t("qty")}:`}
            description={qty.toString()}
            sxProps={{ marginTop: "8px" }}
          />
          <JobDetailText
            title={`${t("start_date")}:`}
            description={dayjs(startDate).format("DD/MM/YYYY")}
            sxProps={{ marginTop: "8px" }}
          />
          <JobDetailText
            title={`${t("end_date")}:`}
            description={dayjs(endDate).format("DD/MM/YYYY")}
            sxProps={{ marginTop: "8px" }}
          />
          <Typography sx={styles.descriptionTitle} mt={"16px"}>
            {t("actual_production_start_date")}
          </Typography>
          <ul>
            <li
              style={{
                marginLeft: "25px",
              }}
            >
              <JobDetailText
                title={`${t("machining")}:`}
                description={
                  jobDetailDates.machiningDate
                    ? dayjs(jobDetailDates.machiningDate).format("DD/MM/YYYY")
                    : "TBD"
                }
                sxProps={{ marginTop: "8px" }}
              />
            </li>
            <li
              style={{
                marginLeft: "25px",
              }}
            >
              <JobDetailText
                title={`${t("cmm")}:`}
                description={
                  jobDetailDates.cmmDate
                    ? dayjs(jobDetailDates.cmmDate).format("DD/MM/YYYY")
                    : "TBD"
                }
                sxProps={{ marginTop: "8px" }}
              />
            </li>
            <li
              style={{
                marginLeft: "25px",
              }}
            >
              <JobDetailText
                title={`${t("final_mc")}:`}
                description={
                  jobDetailDates.finalMCDate
                    ? dayjs(jobDetailDates.finalMCDate).format("DD/MM/YYYY")
                    : "TBD"
                }
                sxProps={{ marginTop: "8px" }}
              />
            </li>
          </ul>
          {showLinkedDependency && (
            <Typography sx={styles.detailsTitle}>
              {t("linked_dependencies")}
            </Typography>
          )}
          <ControlledTreeView
            job={jobId}
            suffix={suffix}
            setSelectedBlock={(selectedDependency: StyledTreeItemProps) => {
              setJobDependency(selectedDependency);
              if (selectedDependency?.oper) {
                setOperation(selectedDependency?.oper ?? "");
                const op = operationItems.find((op) => {
                  return (
                    op.operation === parseInt(selectedDependency?.oper ?? "")
                  );
                });
                setSelectedOperation(
                  op ?? { operation: "N/A", workCenter: "" }
                );
              }
              setReload(true);
            }}
            hasData={(data: boolean) => setShowLinkedDependency(data)}
          />
        </Box>
        <Box
          sx={{
            width: "70%",
            height: "100%",
            background: "#FFFFFF",
            padding: "24px",
            overflow: "scroll",
          }}
        >
          <Grid container direction={"row"} justifyContent={"space-between"}>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ marginTop: "20px", ...styles.detailsTitle }}>
                {t("operation")}
              </Typography>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  id="operation-id-selector"
                  value={operation}
                  onChange={(e: any) => {
                    setOperation(e.target.value);
                    const op = operationItems.find((op) => {
                      return op.operation === e.target.value;
                    });
                    setSelectedOperation(
                      op ?? { operation: "N/A", workCenter: "" }
                    );
                  }}
                  sx={{
                    height: "50px",
                    marginLeft: "10px",
                  }}
                  MenuProps={{
                    slotProps: {
                      paper: { sx: { maxHeight: "400px", width: "100px" } },
                    },
                  }}
                >
                  {renderOperations()}
                </Select>
              </FormControl>
            </Box>
            <CloseButton onClose={onClose} />
          </Grid>
          <Box sx={{ marginTop: "20px", display: "flex" }}>
            <Box
              sx={{
                width: "200px",
                height: "200px",
                border: "1px solid #F4F7FA",
              }}
            >
              <Image
                src={
                  jobPicture?.picture
                    ? `data:image/png;base64, ${jobPicture?.picture}`
                    : "/no-img.svg"
                }
                alt="Job Detail Image"
                width={200}
                height={200}
              />
            </Box>
            <Box sx={{ width: "75%", marginLeft: "24px" }}>
              <Box sx={{ display: "flex", direction: "row", marginTop: "8px" }}>
                <Typography sx={styles.operationDetailTitle}>
                  Assigned:
                </Typography>
                <Avatar
                  sx={{
                    marginLeft: "10px",
                    width: "20px",
                    height: "20px",
                    bgcolor: "#001C3B",
                  }}
                >
                  {jobDetails?.assigned && jobDetails?.assigned.length > 0
                    ? jobDetails.assigned[0]
                    : ""}
                </Avatar>
                <Typography sx={styles.operationDetail}>
                  {jobDetails?.assigned ? jobDetails.assigned : ""}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", direction: "row", marginTop: "30px" }}
              >
                <Typography sx={styles.operationDetailTitle} paddingTop="5px">
                  {t("status")}:
                </Typography>
                <Typography
                  sx={styles.operationDetailChip}
                  borderRadius={1}
                  color={getStatusColor(jobDetails?.status)}
                  bgcolor={getStatusBackgroundColor(jobDetails?.status)}
                >
                  {jobDetails?.status ?? "-"}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", direction: "row", marginTop: "30px" }}
              >
                <Typography sx={styles.operationDetailTitle} paddingTop={"5px"}>
                  {t("problem")}:
                </Typography>
                <Box sx={{ display: "flex-1", direction: "column" }}>
                  {renderJobDetailProblems()}
                </Box>
              </Box>
              <Box
                sx={{ display: "flex", direction: "row", marginTop: "30px" }}
              >
                <Typography sx={styles.operationDetailTitle}>
                  {t("machine")}:
                </Typography>
                <Typography sx={styles.operationDetail}>
                  {jobDetails?.machine ? jobDetails.machine : "-"}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", direction: "row", marginTop: "30px" }}
              >
                <Typography sx={styles.operationDetailTitle}>
                  {t("priority")}:
                </Typography>
                <Typography
                  sx={styles.operationDetailNoColor}
                  color={getPriorityColor(jobDetails?.priority ?? "-")}
                >
                  {jobDetails?.priority ? jobDetails.priority : "-"}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", direction: "row", marginTop: "30px" }}
              >
                <Typography sx={styles.operationDetailTitle}>
                  {t("cycle_time")}:
                </Typography>
                <Typography sx={styles.operationDetail}>
                  {jobDetails?.cycleTime ? jobDetails.cycleTime : "-"}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", direction: "row", marginTop: "30px" }}
              >
                <Typography sx={styles.operationDetailTitle}>Qty:</Typography>
                <Typography sx={styles.operationDetail}>
                  {jobDetails?.qty ? jobDetails.qty : 0}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Grid container>
            <Typography sx={{ marginTop: "24px", ...styles.detailsTitle }}>
              {t("comment")}
            </Typography>
          </Grid>
          <Grid container direction="row" mt="16px">
            <Box width={"50%"}>
              <Typography sx={styles.commentDetailTitle}>
                {t("operation")} [{t("op")}]
              </Typography>
              <TextField
                disabled
                label={`${selectedOperation?.operation ?? ""} - ${
                  selectedOperation?.workCenter ?? ""
                }`}
                sx={{
                  marginTop: "8px",
                  width: "90%",
                  borderRadius: "8px",
                }}
              />
            </Box>
            <Box width={"50%"}>
              <Typography sx={styles.commentDetailTitle}>
                {t("problem")}
              </Typography>
              <Autocomplete
                id="problem-select"
                sx={{ width: "100%", marginTop: "8px" }}
                options={problems}
                getOptionLabel={(problem) =>
                  problem.description + " ( " + problem.code + " )"
                }
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.description} ( {option.code} )
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("select_problem_type")}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
                onChange={(e: any, value: any) => {
                  setProblem(value?.description);
                }}
              />
            </Box>
          </Grid>
          <Grid container mt={"16px"}>
            <MentionsInput
              value={comment}
              onChange={(e: any) => setComment(e.target.value)}
              placeholder={` ${t("write_a_comment")}`}
              style={{
                width: "100%",
                minHeight: "60px",
                borderRadius: "8px",
                border: "none",
                suggestions: {
                  list: {
                    backgroundColor: "white",
                    border: "1px solid rgba(0,0,0,0.15)",
                    fontSize: 16,
                    maxHeight: "200px",
                    overflow: "scroll",
                  },
                  item: {
                    padding: "5px 15px",
                    borderBottom: "1px solid rgba(0,0,0,0.15)",
                    "&focused": {
                      backgroundColor: "#cee4e5",
                    },
                  },
                },
              }}
            >
              <Mention
                style={{
                  position: "relative",
                  zIndex: 1,
                  color: "blue",
                  textShadow:
                    "1px 1px 1px white, 1px -1px 1px white, -1px 1px 1px white, -1px -1px 1px white",
                  textDecoration: "none",
                  pointerEvents: "none",
                }}
                displayTransform={(id: any, display: any) => {
                  return `@${display}`;
                }}
                data={allUsers}
                trigger={"@"}
                appendSpaceOnAdd
              />
            </MentionsInput>

            <Button
              variant="contained"
              sx={{ marginTop: "16px" }}
              onClick={() => addComment()}
            >
              {t("submit")}
            </Button>
          </Grid>

          <Grid container mt={"24px"}>
            <Grid item xs={12}>
              <Typography sx={styles.detailsTitle}>
                {t("all_comments")} ({comments.length})
              </Typography>
            </Grid>
            {comments.length > 0 && renderComments()}
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};
