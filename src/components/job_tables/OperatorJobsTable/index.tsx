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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getThemedStyles } from "./styles";
import { PaginationMetadata } from "@/store/types";
import SearchIcon from "@mui/icons-material/Search";
import dayjs from "dayjs";
import CustomFilter, { JobFilterProps } from "@/components/shared/Filter";
import { FilterItemProps } from "@/store/features/Filters/FilterSlice";
import { JobCard } from "../../jobcard";
import {
  calculateProgressColors,
  createFiltersObject,
  getPriorityColor,
  mapFieldToSortKey,
} from "@/utils/utils";
import { UserRoles } from "@/utils/types";
import {
  OperatorJobParams,
  OperatorJobProps,
  fetchOperatorJobs,
} from "@/store/features/Jobs/OperatorJobSlice";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { TypeStatusEnum } from "@/store/features/Jobs/JobSlice";
import { CustomJobTableHeader } from "../CustomJobTable";
import { Comment } from "@/components/shared/Comment";
import FilterButton from "@/components/shared/FilterButton";
export interface OperatorJobTablProps {
  title: string;
  fromDate: string;
  toDate: string;
  machineName: string;
  showPriority?: boolean;
  data: string;
}

const JobsTable: React.FC<OperatorJobTablProps> = ({
  title,
  fromDate,
  toDate,
  machineName,
  showPriority = false,
  data,
}) => {
  const styles = getThemedStyles();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchInput, setSearchInput] = useState<string>("");
  const { t } = useTranslation();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const initialOperatorFilters = useAppSelector(
    (state) => state.filters.operatorFilters
  );
  const [filters, setFilters] = useState<FilterItemProps[]>(
    initialOperatorFilters
  );
  const [filterCount, setFilterCount] = useState(0);
  const [openJobDetail, setOpenJobDetail] = useState<boolean>(false);
  const [currentJob, setCurrentJob] = useState<OperatorJobProps>(
    {} as OperatorJobProps
  );

  const { role } = useAppSelector((state) => state.auth.currentUser);

  useEffect(() => {
    const transformedFilters = createFiltersObject(filters);
    setFilterCount(Object.keys(transformedFilters).length);
    const params: OperatorJobParams = {
      machineName: machineName,
      fromDate: fromDate,
      toDate: toDate,
      page: page,
      limit: 10,
      data: data as string,
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
    dispatch(fetchOperatorJobs(params));
  }, [
    dispatch,
    page,
    machineName,
    fromDate,
    toDate,
    filters,
    searchInput,
    data,
  ]);

  const { operatorJobs: jobs, loading } = useAppSelector(
    (state) => state.operatorJobs
  );
  const pagination: PaginationMetadata = useAppSelector(
    (state) => state.operatorJobs.pagination
  );

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
    t("op"),
    t("mrr_number"),
    t("problem_type"),
    t("start_date"),
    t("projected_date"),
    t("latest_comment"),
    t("action"),
  ];

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const sortedJobs = jobs
    ?.slice()
    .sort((a: OperatorJobProps, b: OperatorJobProps) => {
      if (sortBy === "") return 0;

      const aValue = a[sortBy as keyof OperatorJobProps];
      const bValue = b[sortBy as keyof OperatorJobProps];
      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const getHiddenHeaders = () => {
    const hiddenHeaders: string[] = [];
    if (!showPriority) hiddenHeaders.push(t("priority").toLowerCase());
    return hiddenHeaders;
  };

  const goToJobCard = (job: OperatorJobProps) => {
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
      {Object.keys(createFiltersObject(filters)).length === 0 &&
        pagination?.totalCount === 0 && (
          <Grid
            item
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Image
              src="/no_jobs.svg"
              width={500}
              height={500}
              alt="No Jobs Image"
            />
          </Grid>
        )}
      {!(
        Object.keys(createFiltersObject(filters)).length === 0 &&
        pagination?.totalCount === 0
      ) && (
        <Grid container mt="24px">
          <Grid item xs={8} sx={{ alignContent: "center" }}>
            <Typography sx={styles.tableTitleText}>{title}</Typography>
          </Grid>
          {!loading && (
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <Box sx={{ display: "flex" }}>
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
          )}
          <Grid item xs={12} mt="10px">
            {loading && (
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
                    <TableRow>
                      <TableCell colSpan={12} align="center">
                        <CircularProgress sx={{ marginY: "15px" }} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {!loading && pagination?.totalCount > 0 && (
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
                    {sortedJobs?.map((row, index) => (
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
                        <TableCell>{row.qty ?? "-"}</TableCell>
                        <TableCell>{row.material ?? "-"}</TableCell>
                        <TableCell align="center">
                          <Box sx={calculateProgressColors(row.progress, 0)}>
                            {row.progress >= 0
                              ? `${row.progress.toFixed(2)}%`
                              : "-"}
                          </Box>
                        </TableCell>
                        <TableCell>{row.oper ?? "-"}</TableCell>
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
                                role === UserRoles.PLANNER ||
                                role === UserRoles.OPERATOR_MANAGER ||
                                role === UserRoles.OPERATOR
                              ) {
                                goToJobCard(row);
                              }
                            }}
                            sx={{
                              textTransform: "none",
                            }}
                          >
                            {t("view_card")}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {Object.keys(createFiltersObject(filters)).length > 0 &&
              (!pagination || pagination?.totalCount === 0) && (
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
          {!loading && pagination?.totalCount > 10 && (
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
      )}
      {
        <Modal
          open={openFilter}
          onClose={() => setOpenFilter(false)}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={styles.filterModal}>
            <CustomFilter
              columns={["job", "item", "suffix", "oper"]}
              onClose={() => setOpenFilter(false)}
              isJob={JobFilterProps.OPERATOR}
              applyFilter={(filters: FilterItemProps[], statsDates) => {
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
              qty={currentJob?.qty}
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
