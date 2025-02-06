import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  LinePlot,
  MarkPlot,
  ChartsGrid,
  ChartsYAxis,
  ChartsXAxis,
  BarPlot,
  ChartsTooltip,
  ResponsiveChartContainer,
} from "@mui/x-charts";
import {
  fetchReasonsBreakdown,
  ReasonsBreakdownProps,
} from "@/store/features/PerformanceReport/ReasonsBreakdownSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getThemedStyles } from "./graphStyles";

export interface LowMachinePerformanceGraphProps {
  businessSegment: string;
  fromDate: string;
  toDate: string;
}

const LowMachinePerformanceGraph: React.FC<LowMachinePerformanceGraphProps> = ({
  businessSegment,
  fromDate,
  toDate,
}: LowMachinePerformanceGraphProps) => {
  const [tabValue, setTabValue] = useState(0);
  const [topValue, setTopValue] = useState("10");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchReasonsBreakdown({
        selectTop: topValue,
        businessSegment: businessSegment,
        byType: tabValue === 0 ? "Reasons" : "Projects",
        fromDate: fromDate,
        toDate: toDate,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topValue, tabValue, businessSegment, fromDate, toDate]);

  const { reasonsBreakdown, loading } = useAppSelector(
    (state) => state.reasonsBreakdown
  );

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleTopValueChange = () => {
    setTopValue((prevValue) => (prevValue === "10" ? "5" : "10"));
  };

  const sortedData = reasonsBreakdown
    ? [...reasonsBreakdown].sort((a, b) => b.minutes - a.minutes)
    : [];

  const totalMinutes = sortedData.reduce((sum, item) => sum + item.minutes, 0);
  let cumulative = 0;
  const cumulativePercentages = sortedData.map((item: { minutes: number }) => {
    cumulative += item.minutes;
    return Number(((cumulative / totalMinutes) * 100).toFixed(2));
  });

  const processLabel = (label: string | undefined): string => {
    return (label ?? "").split(" ").join("\n");
  };

  const styles = getThemedStyles();

  return (
    <Box sx={styles.box}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="performance tabs"
        sx={styles.tab}
      >
        <Tab label="By Reason" />
        <Tab label="By Projects" />
      </Tabs>
      {loading ? (
        <Box sx={styles.loading}>
          <CircularProgress size={40} />
        </Box>
      ) : (
        <>
          <Box sx={styles.graphBox}>
            <Box>
              <Typography sx={styles.tabText} marginLeft={1}>
                {tabValue === 0 ? "By Reasons" : "By Projects"}
              </Typography>
              <Typography sx={styles.subHeader} marginLeft={1}>
                Top {tabValue === 0 ? "reasons" : "projects"} for low
                performance
              </Typography>
            </Box>
            <Button onClick={handleTopValueChange} sx={styles.topButton}>
              {topValue === "10" ? "See Top 5" : "See Top 10"}
            </Button>
          </Box>
          <ResponsiveChartContainer
            margin={{ left: 60, right: 50, top: 20, bottom: 80 }}
            series={[
              {
                type: "bar",
                data: sortedData.map((item: { minutes: any }) => item.minutes),
                label: "Minutes",
                yAxisKey: "minutes",
                color: "#f44336",
              },
              {
                type: "line",
                data: cumulativePercentages,
                label: "Percentage",
                yAxisKey: "percentage",
                color: "#000",
              },
            ]}
            xAxis={[
              {
                data: sortedData.map(
                  (item: ReasonsBreakdownProps) =>
                    (tabValue === 0
                      ? processLabel(item.reasons)
                      : processLabel(item.project)) || ""
                ),
                scaleType: "band",
                id: "x-axis-id",
                categoryGapRatio: 0.6,
                barGapRatio: 0.5,
              } as any,
            ]}
            yAxis={[
              { id: "minutes", scaleType: "linear", position: "left" },
              {
                id: "percentage",
                scaleType: "linear",
                position: "right",
                min: 0,
                max: 100,
                valueFormatter: (value) => `${value}%`,
              },
            ]}
            height={330}
            sx={styles.markColor}
          >
            <ChartsGrid horizontal={true} />
            <BarPlot />
            <LinePlot />
            <MarkPlot />
            <ChartsXAxis
              position="bottom"
              axisId="x-axis-id"
              tickSize={0}
              tickLabelStyle={styles.xTickLabel}
            />
            <ChartsYAxis
              label="Minutes"
              position="left"
              axisId="minutes"
              labelStyle={styles.yLabel}
              tickLabelStyle={styles.yTickLabel}
            />
            <ChartsYAxis
              position="right"
              axisId="percentage"
              tickInterval={[0, 25, 50, 75, 100]}
              tickNumber={5}
              tickMinStep={25}
              tickMaxStep={25}
            />
            <ChartsTooltip trigger="axis" />
          </ResponsiveChartContainer>
        </>
      )}
    </Box>
  );
};

export default LowMachinePerformanceGraph;
