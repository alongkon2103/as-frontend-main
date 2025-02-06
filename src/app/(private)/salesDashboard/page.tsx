"use client";

import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  IconButton,
  Typography,
} from "@mui/material";
import { getThemedStyles } from "./styles";
import ForecastToggle from "@/components/production_overview/table_headers/item_coverage/forecast";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  formatWeek,
  greenText,
  redText,
  purpleText,
  formatNumberToComma,
  getCurrencySign,
} from "@/utils/utils";
import SalesDatePicker, { WeekType } from "@/components/shared/SalesDatePicker";
import CustomTable from "@/components/shared/CustomTable";
import { TableHeader } from "@/utils/types";
import CloudOutlined from "@mui/icons-material/CloudOutlined";
import { StickyNote2Outlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";
import { CurrentTabCard } from "@/components/dashboard/components/SalesDashboard/CurrentTabCard";
import { OverallTabCard } from "@/components/dashboard/components/SalesDashboard/OverallTabCard";
import {
  BreakdownProps,
  fetchSalesDashboard,
} from "@/store/features/SalesDashboard/SalesDashboardSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { usePreviousValue } from "@/utils/usePreviousValue";
import { OverdueTabCard } from "@/components/dashboard/components/SalesDashboard/OverdueTabCard";
import CoSalesModal from "@/components/dashboard/components/SalesDashboard/CoSalesModal";
import Image from "next/image";
import OverdueModal from "@/components/dashboard/components/SalesDashboard/OverdueModal";
import { fetchOverdueStats } from "@/store/features/SalesDashboard/OverdueSlice";
import MonthlyForecastModal from "@/components/dashboard/components/SalesDashboard/MonthlyForecastModal";
import { DateFilterType, GroupByType } from "./types";
import { ProjectProps } from "@/store/features/Project/ProjectSlice";

export default function SalesDashboard() {
  const styles = getThemedStyles();
  const dispatch = useAppDispatch();
  const [forecast, setForecast] = useState(false);
  const [moreFifteen, setMoreFifteen] = useState(false);
  const [overDueOpen, setOverDueOpen] = useState(false);
  const [forecastOpen, setForecastOpen] = useState(false);

  const [weekRange, setWeekRange] = useState<WeekType>({
    fromDate: formatWeek(dayjs().startOf("week")),
    toDate: formatWeek(dayjs().add(4, "week").endOf("week")),
    filterType: DateFilterType.WEEK,
  });
  const [salesBreakdown, setSalesBreakdown] = useState<BreakdownProps | null>(
    null
  );

  const [openCoModal, setOpenCoModal] = useState(false);
  const [groupBy, setGroupBy] = useState<string>(GroupByType.TIME);
  const [forecastBy, setForecastBy] = useState<string>("0");
  const { t } = useTranslation();
  const params = useSearchParams();
  const id = params.get("id");
  const prevId = usePreviousValue(id);

  useEffect(() => {
    if (id !== prevId) {
      setGroupBy(GroupByType.TIME);
    }
    if (id) {
      dispatch(
        fetchSalesDashboard({
          fromDate: weekRange.fromDate,
          toDate: weekRange.toDate,
          projectId: id,
          breakdownBy: groupBy,
          dateFilter: weekRange.filterType,
          dateAhead: forecastBy,
        })
      );
      dispatch(
        fetchOverdueStats({ projectId: id || "", moreThanFifteen: true })
      );
      dispatch(
        fetchOverdueStats({ projectId: id || "", moreThanFifteen: false })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupBy, id, weekRange.fromDate, weekRange.toDate, forecastBy]);

  const {
    data: saleDashboardData,
    loading,
    error,
  } = useAppSelector((state) => state.salesDashboard);

  const projects = useAppSelector(
    (state) => state.project.projects
  ) as ProjectProps[];
  const label =
    projects?.find((project: ProjectProps) => project.id.toString() === id)
      ?.salesDateBy || undefined;
  const {
    data: overdueData,
    loading: overdueLoading,
    error: overdueError,
  } = useAppSelector((state) => state.overdue);

  const { today, moreThanFifteen } = overdueData;
  const { overall, breakdown } = saleDashboardData;
  const defaultCurrency = overall?.actualRevenue.currency || "USD";

  const renderActualRevenue = (data: any) => {
    return (
      <List dense disablePadding>
        <ListItem sx={{ justifyContent: "flex-end" }} disablePadding>
          <Typography>
            {getCurrencySign(defaultCurrency)}{formatNumberToComma(data.actualRevenue.qty)}
          </Typography>
        </ListItem>
        <ListItem sx={{ justifyContent: "flex-end" }} disablePadding>
          <Stack direction="row" alignItems="center" gap={1}>
            <StickyNote2Outlined color="primary" width={1} height={1} />
            <ListItemText>
              <Typography color="primary" textAlign="right">
                {getCurrencySign(defaultCurrency)}{formatNumberToComma(data.actualRevenue.orderedQty)}
              </Typography>
            </ListItemText>
          </Stack>
        </ListItem>
        {forecast && (
          <ListItem sx={{ justifyContent: "flex-end" }} disablePadding>
            <Stack direction="row" alignItems="center" gap={1}>
              <CloudOutlined color="secondary" width={1} height={1} />
              <ListItemText>
                <Typography color="secondary" textAlign="right">
                  {getCurrencySign(defaultCurrency)}{formatNumberToComma(data.actualRevenue.forecast)}
                </Typography>
              </ListItemText>
            </Stack>
          </ListItem>
        )}
      </List>
    );
  };

  const renderOrdered = (data: any) => {
    return (
      <List dense disablePadding>
        <ListItem sx={{ justifyContent: "flex-start" }} disablePadding>
          <Typography>{data.ordered.qty}</Typography>
        </ListItem>
        {forecast && (
          <>
            <ListItem disablePadding>
              <Paper sx={{ display: "block", height: "32px" }} />
            </ListItem>
            <ListItem sx={{ justifyContent: "flex-start" }} disablePadding>
              <Stack direction="row" alignItems="center" gap={1}>
                <CloudOutlined color="secondary" width={1} height={1} />
                <ListItemText>
                  <Typography color="secondary" textAlign="right">
                    {data.ordered.forecast}
                  </Typography>
                </ListItemText>
              </Stack>
            </ListItem>
          </>
        )}
      </List>
    );
  };

  const renderDetails = (data: BreakdownProps) => {
    return (
      <Button
        onClick={(e) => {
          setSalesBreakdown(data);
          setOpenCoModal(true);
        }}
      >
        {t("view_more")}
      </Button>
    );
  };

  const getGroupByTitle = (): string => {
    if (groupBy === GroupByType.TIME)
      return weekRange.filterType === DateFilterType.WEEK ? "WK" : "Month";
    if (groupBy === GroupByType.FAMILY_CODE) return "Family Code";
    else return groupBy;
  };

  const viewMore = (type: number) => {
    if (type === 1) {
      setMoreFifteen(false);
      // overdue 1-15 days
    } else {
      setMoreFifteen(true);
      // overdue > 15 days
    }
    setOverDueOpen(true);
  };

  const tableHeaders: TableHeader[] = [
    {
      title: getGroupByTitle(),
      name: "groupBy",
      align: "right",
      type: "text",
      valign: "top",
      width: groupBy === GroupByType.TIME ? "10px" : "40px",
    },
    {
      title: "Actual Revenue",
      name: "actualRevenue",
      align: "right",
      type: "custom",
      valign: "top",
      customCell: renderActualRevenue,
    },
    {
      title: "Ordered",
      name: "ordered",
      align: "left",
      type: "custom",
      valign: "top",
      customCell: renderOrdered,
      width: "30px",
    },
    {
      title: "Shipped",
      name: "shipped",
      align: "left",
      type: "text",
      valign: "top",
    },
    {
      title: "Overdue",
      name: "overdue",
      align: "left",
      type: "text",
      valign: "top",
    },
    {
      title: "Action",
      name: "action",
      align: "center",
      type: "custom",
      customCell: renderDetails,
    },
  ];
  const salesDashboard = () => {
    return (
      <Box
        sx={{
          paddingX: "2vw",
        }}
      >
        <Stack spacing={2}>
          <Grid container spacing={2} sx={styles.titleWrapper}>
            <Grid
              xs={12}
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              item={true}
            >
              <Box display={"flex"} alignItems={"center"}>
                <Typography mr={"24px"} sx={styles.titleText}>
                  {t("sales_dashboard")}
                </Typography>
                <SalesDatePicker
                  weekRange={weekRange}
                  projectLabel={label}
                  handleDateChange={(weekRange: WeekType) => {
                    setWeekRange(weekRange);
                  }}
                />
              </Box>
              <ForecastToggle
                forecast={forecast}
                handleChange={() => {
                  setForecast(!forecast);
                }}
                color={purpleText}
              />
            </Grid>
            <Grid
              xs={6}
              container
              direction="row"
              item={true}
              alignItems={"flex-start"}
              alignContent={"flex-start"}
            >
              <Grid
                xs={12}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                item
              >
                <Typography sx={styles.cardTitleText}>
                  {t("overall_stats")}
                </Typography>
                <Grid
                  item
                  xs={12}
                  display={"flex"}
                  justifyContent={["flex-start", "space-between"]}
                  flexDirection={["column", "row"]}
                  gap={"16px"}
                  mt={"16px"}
                >
                  <Grid xs={6}>
                    <OverallTabCard
                      title="Actual Revenue"
                      unit={overall?.actualRevenue.currency || ""}
                      ordered={overall?.actualRevenue.total || 0}
                      forecast={overall?.actualRevenue.forecast || 0}
                      total={overall?.actualRevenue.count || 0}
                      currencySign={getCurrencySign(
                        overall?.actualRevenue.currency || defaultCurrency
                      )}
                      loading={loading}
                      showForecast={forecast}
                    />
                  </Grid>
                  <Grid xs={6}>
                    <OverallTabCard
                      title="Ordered"
                      unit="qty"
                      total={overall?.ordered.count || 0}
                      forecast={overall?.ordered.forecast || 0}
                      showForecast={forecast}
                      loading={loading}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                display={"flex"}
                justifyContent={["flex-start", "space-between"]}
                flexDirection={["column", "row"]}
                gap={"16px"}
                mt={"16px"}
              >
                <Grid xs={6}>
                  <CurrentTabCard
                    title="Total Shipped"
                    percentage={overall?.shipped.percentage || 0}
                    count={overall?.shipped.count || 0}
                    total={overall?.shipped.total || 0}
                    color={greenText}
                    loading={loading}
                  />
                </Grid>
                <Grid xs={6}>
                  <CurrentTabCard
                    title="Total Overdue"
                    percentage={overall?.overdue.percentage || 0}
                    count={overall?.overdue.count || 0}
                    total={overall?.overdue.total || 0}
                    color={redText}
                    loading={loading}
                  />
                </Grid>
              </Grid>
              <Grid
                xs={12}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mt="48px"
                item
              >
                <Box display="flex" mb="16px" gap={"2px"} width={"100%"}>
                  <Typography sx={styles.cardTitleText}>
                    {t("overdue_today")}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: 20,
                      fontWeight: 700,
                      color: "rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    ({dayjs().format("DD/MM/YYYY")})
                  </Typography>
                </Box>
                <Grid
                  item
                  xs={12}
                  display={"flex"}
                  justifyContent={["flex-start", "space-between"]}
                  flexDirection={["column", "row"]}
                  gap={"16px"}
                  mt={"16px"}
                >
                  <Grid xs={6}>
                    <OverdueTabCard
                      title="1-15 days"
                      currencySign={getCurrencySign(
                        today?.currency ?? defaultCurrency
                      )}
                      count={today?.count || 0}
                      total={today?.total || 0}
                      totalOverdue={today?.totalOverdue || 0}
                      color={redText}
                      viewMore={() => viewMore(1)}
                    />
                  </Grid>
                  <Grid xs={6}>
                    <OverdueTabCard
                      title="> 15 days"
                      currencySign={getCurrencySign(
                        moreThanFifteen?.currency ?? defaultCurrency
                      )}
                      count={moreThanFifteen?.count || 0}
                      total={moreThanFifteen?.total || 0}
                      totalOverdue={moreThanFifteen?.totalOverdue || 0}
                      color={redText}
                      viewMore={() => viewMore(2)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={6}
              alignItems={"flex-start"}
              alignContent={"flex-start"}
            >
              <Grid
                xs={12}
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                item
              >
                <Box
                  display="flex"
                  mb="16px"
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Typography mr={"24px"} sx={styles.cardTitleText}>
                    {t("breakdown")}
                  </Typography>
                  <Box>
                    {forecast && (
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={forecastBy}
                        onChange={(e) => {
                          setForecastBy(e.target.value);
                        }}
                        size="small"
                        sx={styles.forecastDropdown}
                      >
                        <MenuItem value="0" sx={{ color: purpleText }}>
                          <Typography>{t("0days")}</Typography>
                        </MenuItem>
                        <MenuItem value="5" sx={{ color: purpleText }}>
                          <Typography>{t("5days")}</Typography>
                        </MenuItem>
                        <MenuItem value="7" sx={{ color: purpleText }}>
                          <Typography>{t("7days")}</Typography>
                        </MenuItem>
                        <MenuItem value="10" sx={{ color: purpleText }}>
                          <Typography>{t("10days")}</Typography>
                        </MenuItem>
                        <MenuItem value="60" sx={{ color: purpleText }}>
                          <Typography>{t("60days")}</Typography>
                        </MenuItem>
                      </Select>
                    )}
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={groupBy}
                      onChange={(e) => {
                        setGroupBy(e.target.value);
                      }}
                      size="small"
                    >
                      <MenuItem value={GroupByType.TIME}>
                        <Typography>{t("by_time")}</Typography>
                      </MenuItem>
                      {id === "0" && (
                        <MenuItem value={GroupByType.CUSTOMER}>
                          <Typography>{t("by_customer")}</Typography>
                        </MenuItem>
                      )}
                      <MenuItem value={GroupByType.FAMILY_CODE}>
                        <Typography>{t("by_family_code")}</Typography>
                      </MenuItem>
                    </Select>
                  </Box>
                </Box>
              </Grid>
              <CustomTable
                headers={tableHeaders}
                data={breakdown || []}
                isLoading={loading}
              />
              {weekRange.filterType === DateFilterType.MONTH &&
                forecast &&
                groupBy === GroupByType.TIME && (
                  <IconButton
                    sx={styles.forecastButton}
                    onClick={() => setForecastOpen(true)}
                  >
                    <Image
                      src="/month_cloud.svg"
                      width={20}
                      height={20}
                      alt="seniort-th-logo"
                    />
                    <Typography ml={"8px"}>
                      {t("view_forecast_breakdown")}
                    </Typography>
                  </IconButton>
                )}
            </Grid>
          </Grid>
        </Stack>
        <CoSalesModal
          projectId={id || ""}
          groupByType={groupBy}
          data={salesBreakdown as BreakdownProps}
          open={openCoModal}
          onClose={() => {
            setOpenCoModal(false);
          }}
          fromDate={weekRange.fromDate}
          toDate={weekRange.toDate}
          dateFilter={weekRange.filterType}
          currencySign={getCurrencySign(defaultCurrency)}
        />
        <OverdueModal
          open={overDueOpen}
          totalOrderedQty={
            moreFifteen ? moreThanFifteen?.total || 0 : today?.total || 0
          }
          totalNetPrice={
            moreFifteen
              ? moreThanFifteen?.totalOverdue || 0
              : today?.totalOverdue || 0
          }
          currency={moreFifteen ? moreThanFifteen?.currency ?? defaultCurrency : today?.currency ?? defaultCurrency}
          onClose={() => {
            setOverDueOpen(false);
          }}
          projectId={id || ""}
          moreThanFifteen={moreFifteen}
        />
        <MonthlyForecastModal
          open={forecastOpen}
          fromDate={weekRange.fromDate}
          toDate={weekRange.toDate}
          onClose={() => setForecastOpen(false)}
          projectId={id || ""}
          dateAhead={forecastBy}
          filterType={weekRange.filterType}
          currencySign={getCurrencySign(defaultCurrency)}
        />
      </Box>
    );
  };

  return <div>{salesDashboard()}</div>;
}
