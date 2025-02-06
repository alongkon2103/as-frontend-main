"use client";

import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Pagination,
  Typography,
  CircularProgress,
  Button,
  Box,
  TextField,
  InputAdornment,
  Modal,
} from "@mui/material";

import {
  JobProps,
  TabJobsPaginationMetadata,
  TypeStatusEnum,
  fetchJobsByJobStatus,
  jobParams,
} from "@/store/features/Jobs/JobSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getThemedStyles } from "./styles";
import SearchIcon from "@mui/icons-material/Search";
import dayjs from "dayjs";
import JobTabs from "@/components/shared/Tabs";
import WeekPicker from "@/components/shared/WeekPicker2";
import CustomFilter, { JobFilterProps } from "@/components/shared/Filter";
import { FilterItemProps } from "@/store/features/Filters/FilterSlice";
import { HeaderActions } from "@/store/features/Header/HeaderSlice";
import { useRouter, useSearchParams } from "next/navigation";
import {
  addQueryToUrl,
  calculateProgressColors,
  createFiltersObject,
  generateJobUrl,
  mapFieldToSortKey,
} from "@/utils/utils";

import { UserRoles } from "@/utils/types";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { JobCard } from "@/components/jobcard";
import { CustomJobTableHeader } from "../CustomJobTable";
import { Comment } from "@/components/shared/Comment";
import FilterButton from "@/components/shared/FilterButton";
import CloseButton from "@/components/shared/CloseButton";
export interface JobStatusTableProps {
  id: number;
  title: string;
  projectName: string;
  fromDate: string;
  toDate: string;
  onClose: () => void;
  showPriority: boolean;
  showMachine: boolean;
  showMaterial: boolean;
}

const JobsTable: React.FC<JobStatusTableProps> = ({
  id,
  title,
  projectName,
  onClose,
  fromDate,
  toDate,
  showPriority = false,
  showMachine = false,
  showMaterial = false,
}) => {
  const styles = getThemedStyles();
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchInput, setSearchInput] = useState<string>("");
  const [jobStatus, setJobStatus] = useState<string>(
    params.get("tab") || "planned"
  );
  const [week, setWeek] = useState(dayjs(fromDate));
  const [startDate, setStartDate] = useState(fromDate);
  const [endDate, setEndDate] = useState(toDate);
  const initialJobStatusFilters = useAppSelector(
    (state) => state.filters.jobStatusFilters
  );
  const [filters, setFilters] = useState<FilterItemProps[]>(
    initialJobStatusFilters
  );
  const [filterCount, setFilterCount] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);
  const [openJobDetail, setOpenJobDetail] = useState<boolean>(false);
  const [currentJob, setCurrentJob] = useState<JobProps>({} as JobProps);
  const { role } = useAppSelector((state) => state.auth.currentUser);
  const { t } = useTranslation();

  useEffect(() => {
    setStartDate(week.startOf("week").format("YYYY-MM-DD"));
    setEndDate(week.endOf("week").format("YYYY-MM-DD"));
  }, [week]);

  function loadData() {
    const transformedFilters = createFiltersObject(filters);
    setFilterCount(Object.keys(transformedFilters).length);
    const params: jobParams = {
      projectId: id,
      fromDate: startDate,
      toDate: endDate,
      jobStatus: jobStatus,
      page: page,
      limit: 100,
      ...transformedFilters,
      job:
        searchInput.length > 0
          ? searchInput
          : (transformedFilters.job as string),
      item:
        searchInput.length > 0
          ? searchInput
          : (transformedFilters.item as string),
    };
    if (jobStatus !== "") {
      params.jobStatus = jobStatus;
    }
    dispatch(fetchJobsByJobStatus(params));
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setPage(1);
  }, [id]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    projectName,
    page,
    startDate,
    endDate,
    jobStatus,
    filters,
    searchInput,
  ]);

  useEffect(() => {
    if (openJobDetail) {
      window.addEventListener("popstate", function (e) {
        setOpenJobDetail(false);
      });
    }
  }, [openJobDetail]);

  const jobs: JobProps[] = useAppSelector((state) => state.jobs.tabJobs);
  const pagination: TabJobsPaginationMetadata = useAppSelector(
    (state) => state.jobs.tabJobsPagniation
  );

  const { tabJobsLoading } = useAppSelector((state) => state.jobs);
  useEffect(() => {
    setCount(pagination?.totalPages ?? 1);
    setPage(pagination?.currentPage ?? 1);
  }, [pagination]);

  const headers = [
    t("priority"),
    t("job_#"),
    t("suffix"),
    t("item"),
    t("qty"),
    t("material"),
    t("progress"),
    t("machines"),
    t("op"),
    t("status"),
    t("mrr_number"),
    t("problem_type"),
    t("start_date"),
    t("projected_date"),
    t("latest_comment"),
    t("action"),
  ];

  const getHiddenHeaders = () => {
    const hiddenHeaders: string[] = [];
    if (!showPriority) hiddenHeaders.push(t("priority").toLowerCase());
    if (!showMachine) hiddenHeaders.push(t("machines").toLowerCase());
    if (!showMaterial) hiddenHeaders.push(t("material").toLowerCase());
    return hiddenHeaders;
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const sortedJobs = jobs?.slice().sort((a: JobProps, b: JobProps) => {
    if (sortBy === "") return 0;

    const aValue = a[sortBy as keyof JobProps];
    const bValue = b[sortBy as keyof JobProps];
    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field: string) => {
    field = mapFieldToSortKey(field, t);
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const handleJobDetailClose = () => {
    window.history.back();
    setOpenJobDetail(false);
  };

  const goToKanbanBoard = (row: any) => {
    dispatch(HeaderActions.removeHeaders());
    addQueryToUrl("tab", jobStatus);
    window.open(generateJobUrl(row, id, projectName, startDate, endDate));
  };

  const goToJobCard = (job: JobProps) => {
    // add url to job detail
    addQueryToUrl("open", "jobdetail");
    setCurrentJob(job);
    setOpenJobDetail(true);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <Typography sx={{ ...styles.tableTitleText, marginBottom: "10px" }}>
            {title}
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "10px",
              alignSelf: "flex-end",
              marginRight: "20px",
            }}
          >
            <CloseButton onClose={onClose} />
          </Box>
        </Grid>
        <Grid
          container
          sx={{
            overflow: "scroll",
            maxHeight: "calc(100vh - 300px)",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            <WeekPicker value={week} onChange={setWeek} />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FilterButton
                filterCount={filterCount}
                setOpenFilter={(filterState: boolean) =>
                  setOpenFilter(filterState)
                }
              />
              <TextField
                variant="standard"
                placeholder={t("search_text")}
                fullWidth
                value={searchInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <JobTabs
              defaultValue={jobStatus}
              planned={pagination?.paginationExtraData?.plannedTotalCount ?? 0}
              finishedGoods={
                pagination?.paginationExtraData?.finishedGoodsTotalCount ?? 0
              }
              scrapped={
                pagination?.paginationExtraData?.scrappedTotalCount ?? 0
              }
              delayed={pagination?.paginationExtraData?.delayedTotalCount ?? 0}
              notStarted={
                pagination?.paginationExtraData?.notStartedTotalCount ?? 0
              }
              handleJobTabChange={(value) => {
                setPage(1);
                setJobStatus(value);
              }}
            />
          </Grid>
          <Grid item xs={12} mt="10px">
            {pagination.totalCount > 0 && (
              <TableContainer
                component={Paper}
                sx={{
                  background: "#F4F7FA",
                  "& td": {
                    padding: "0px 0px 0px 10px",
                  },
                }}
              >
                <Table>
                  {headers && (
                    <CustomJobTableHeader
                      headers={headers}
                      hiddenHeaders={getHiddenHeaders()}
                      sortBy={sortBy}
                      sortDirection={sortDirection}
                      handleSort={handleSort}
                    />
                  )}
                  <TableBody>
                    {tabJobsLoading ? (
                      <TableRow>
                        <TableCell colSpan={12} align="center">
                          <CircularProgress sx={{ marginY: "15px" }} />
                        </TableCell>
                      </TableRow>
                    ) : (
                      sortedJobs?.map((row, index) => (
                        <TableRow key={index}>
                          {showPriority && (
                            <TableCell>{row.priority ?? "-"}</TableCell>
                          )}
                          <TableCell>{row.job ?? "-"}</TableCell>
                          <TableCell>
                            {row.suffix >= 0 ? `[${row.suffix}]` : "-"}
                          </TableCell>
                          <TableCell>{row.item ?? "-"}</TableCell>
                          <TableCell>{row.qtyReleased ?? "-"}</TableCell>
                          {showMaterial && (
                            <TableCell>{row.material ?? "-"}</TableCell>
                          )}
                          <TableCell align="center">
                            <Box
                              sx={calculateProgressColors(
                                row.progress,
                                row.qtyScrapped
                              )}
                            >
                              {row.progress >= 0
                                ? `${row.progress.toFixed(2)}%`
                                : "-"}
                            </Box>
                          </TableCell>
                          {showMachine && (
                            <TableCell>{row.machine ?? "-"}</TableCell>
                          )}
                          <TableCell>{row.oper ?? "-"}</TableCell>
                          <TableCell>
                            <Typography
                              color={row.status === "Stopped" ? "red" : ""}
                            >
                              {row.status ?? "-"}{" "}
                            </Typography>
                          </TableCell>
                          <TableCell>{row.mrr ?? "-"}</TableCell>
                          <TableCell>{row.problems ?? "-"}</TableCell>
                          <TableCell>
                            <Typography
                              color={
                                row.typeStatus === TypeStatusEnum.START_DELAY ||
                                row.typeStatus === TypeStatusEnum.BOTH
                                  ? "red"
                                  : ""
                              }
                            >
                              {row.startDate
                                ? dayjs(row.startDate).format("DD/MM/YYYY")
                                : "-"}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              color={
                                row.typeStatus === TypeStatusEnum.END_DELAY ||
                                row.typeStatus === TypeStatusEnum.BOTH
                                  ? "red"
                                  : ""
                              }
                            >
                              {row.endDate
                                ? dayjs(row.endDate).format("DD/MM/YYYY")
                                : "-"}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Comment
                              comment={row.latestComment}
                              isCell={true}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="text"
                              color={"primary"}
                              onClick={() => {
                                if (
                                  role === UserRoles.ADMIN ||
                                  role === UserRoles.PLANNER
                                ) {
                                  goToKanbanBoard(row);
                                } else {
                                  goToJobCard(row);
                                }
                              }}
                              sx={{
                                textTransform: "none",
                              }}
                            >
                              {role === UserRoles.ADMIN ||
                              role === UserRoles.PLANNER
                                ? t("view_board")
                                : t("view_card")}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {pagination.totalCount === 0 && (
              <Grid
                item
                xs={12}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image
                  src="/no_results_found.svg"
                  width={800}
                  height={500}
                  alt="No Results Found"
                />
              </Grid>
            )}
            {pagination.totalCount > 10 && (
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "16px",
                }}
              >
                <Pagination
                  count={count}
                  page={page}
                  shape="rounded"
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      {
        <>
          <Modal
            open={openFilter}
            onClose={() => setOpenFilter(false)}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={styles.filterModal}>
              <CustomFilter
                columns={["job", "item", "suffix", "oper", "status"]}
                onClose={() => setOpenFilter(false)}
                isJob={JobFilterProps.STATUS}
                applyFilter={(filters: FilterItemProps[], _statsDates) => {
                  filters = filters.filter(
                    (filter) => filter.columnValueKey !== ""
                  );
                  setFilters(filters);
                  setOpenFilter(false);
                }}
                dateFilter={false}
              />
            </Box>
          </Modal>

          <Modal
            open={openJobDetail}
            onClose={() => handleJobDetailClose()}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={styles.jobDetailFilterModal}>
              <JobCard
                jobId={currentJob?.job}
                suffix={currentJob?.suffix}
                item={currentJob?.item}
                qty={currentJob?.qtyReleased}
                oper={parseInt(currentJob?.oper?.toString())}
                startDate={currentJob?.startDate}
                endDate={currentJob?.endDate}
                onClose={() => handleJobDetailClose()}
              />
            </Box>
          </Modal>
        </>
      }
    </>
  );
};

export default JobsTable;
