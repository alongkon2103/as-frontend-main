"use client";

import React, { useEffect, useMemo, useState } from "react";
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
  TypeStatusEnum,
  fetchJobs,
  jobParams,
} from "@/store/features/Jobs/JobSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getThemedStyles } from "./styles";
import { PaginationMetadata } from "@/store/types";
import SearchIcon from "@mui/icons-material/Search";
import dayjs from "dayjs";
import CustomFilter, { JobFilterProps } from "@/components/shared/Filter";
import { FilterItemProps } from "@/store/features/Filters/FilterSlice";
import { JobCard } from "../../jobcard";
import {
  addPageToUrl,
  calculateProgressColors,
  createFiltersObject,
  generateJobUrl,
  getPriorityColor,
  mapFieldToSortKey,
} from "@/utils/utils";
import { UserRoles } from "@/utils/types";
import { useRouter, useSearchParams } from "next/navigation";
import { HeaderActions } from "@/store/features/Header/HeaderSlice";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { usePreviousValue } from "@/utils/usePreviousValue";
import { Comment } from "@/components/shared/Comment";
import { CustomJobTableHeader } from "../CustomJobTable";
import FilterButton from "@/components/shared/FilterButton";
export interface JobTableProps {
  id: number;
  title: string;
  projectName: string;
  showPriority?: boolean;
  showMachine?: boolean;
  showMaterial?: boolean;
  startDate: string;
  endDate: string;
}

const JobsTable: React.FC<JobTableProps> = ({
  id,
  title,
  projectName,
  showPriority = false,
  showMachine = false,
  showMaterial = false,
  startDate,
  endDate,
}) => {
  const styles = getThemedStyles();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(
    parseInt(searchParams.get("page") || "1") ?? 1
  );
  const [count, setCount] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchInput, setSearchInput] = useState<string>("");
  let prevSearch = usePreviousValue(searchInput);
  const { role } = useAppSelector((state) => state.auth.currentUser);
  const { t } = useTranslation();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const initialJobFilters = useAppSelector((state) => state.filters.jobFilters);
  const initalOperatorMangerFilter = useAppSelector(
    (state) => state.filters.operatorManagerFilters
  );
  const [filters, setFilters] = useState<FilterItemProps[]>(
    role === UserRoles.PLANNER || role === UserRoles.ADMIN
      ? initialJobFilters
      : initalOperatorMangerFilter
  );

  const [openJobDetail, setOpenJobDetail] = useState<boolean>(false);
  const [currentJob, setCurrentJob] = useState<JobProps>({} as JobProps);
  const [filterCount, setFilterCount] = useState(0);

  function loadData() {
    const transformmedFilters = createFiltersObject(filters);
    setFilterCount(Object.keys(transformmedFilters).length);
    const params: jobParams = {
      projectId: id,
      fromDate: startDate,
      toDate: endDate,
      page: page,
      limit: 100,
      ...transformmedFilters,
      job:
        searchInput.length > 0
          ? searchInput
          : (transformmedFilters.job as string),
      item:
        searchInput.length > 0
          ? searchInput
          : (transformmedFilters.item as string),
    };
    dispatch(fetchJobs(params));
  }

  useEffect(() => {
    if (searchInput.length > 0 && prevSearch !== searchInput) {
      setPage(1);
    }
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    page,
    projectName,
    startDate,
    endDate,
    filters,
    searchInput,
    initialJobFilters,
  ]);

  useMemo(() => {
    setSearchInput("");
    setPage(parseInt(searchParams.get("page") || "1") ?? 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const pagination: PaginationMetadata = useAppSelector(
    (state) => state.jobs.pagination
  );
  let { loading } = useAppSelector((state) => state.jobs);

  useEffect(() => {
    setCount(pagination?.totalPages ?? 1);
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
    addPageToUrl(value.toString());
    setPage(value);
  };

  const jobs: JobProps[] = useAppSelector((state) => state.jobs.jobs);

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

  const goToKanbanBoard = (row: any) => {
    dispatch(HeaderActions.removeHeaders());
    window.open(generateJobUrl(row, id, projectName, startDate, endDate));
  };

  const goToJobCard = (job: JobProps) => {
    setCurrentJob(job);
    setOpenJobDetail(true);
  };

  const handleSort = (field: string) => {
    field = mapFieldToSortKey(field, t);
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
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
            justifyContent: "flex-end",
          }}
        >
          <Box display={"flex"} alignItems={"center"}>
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
        <Grid item xs={12} mt="10px">
          {pagination.totalCount > 0 && (
            <TableContainer
              component={Paper}
              sx={{
                background: "#F4F7FA",
                "& td": {
                  padding: "0px 0px 0px 10px",
                  // textOverflow: "ellipsis",
                  // whiteSpace: "nowrap",
                  // width: "54px",
                  // maxLines: 2,
                  // overflow: "hidden",
                },
                maxHeight: "100vh",
              }}
            >
              <Table stickyHeader>
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
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={12} align="center">
                        <CircularProgress sx={{ marginY: "15px" }} />
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedJobs?.map((row, index) => (
                      <TableRow key={index}>
                        {showPriority && (
                          <TableCell>
                            <Typography color={getPriorityColor(row.priority)}>
                              {row.priority ?? "-"}
                            </Typography>
                          </TableCell>
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
                          <Comment comment={row.latestComment} isCell={true} />
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
        </Grid>
        {!loading && pagination.totalCount > 10 && (
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
      {
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
              dateFilter={false}
              isJob={
                role === UserRoles.ADMIN || role === UserRoles.PLANNER
                  ? JobFilterProps.JOB
                  : JobFilterProps.OPERATOR_MANAGER
              }
              applyFilter={(filters: FilterItemProps[], statsDates) => {
                filters = filters.filter(
                  (filter) => filter.columnValueKey !== ""
                );

                setFilters(filters);
                setOpenFilter(false);
              }}
            />
          </Box>
        </Modal>
      }
      {
        <Modal
          open={openJobDetail}
          onClose={() => setOpenJobDetail(false)}
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
              onClose={() => setOpenJobDetail(false)}
            />
          </Box>
        </Modal>
      }
    </>
  );
};

export default JobsTable;
