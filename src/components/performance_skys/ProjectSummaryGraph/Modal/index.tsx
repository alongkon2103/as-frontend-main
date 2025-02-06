import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Button,
  Grid,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import {
  ResponsiveChartContainer,
  ChartsGrid,
  BarPlot,
  ChartsXAxis,
  ChartsYAxis,
  ChartsLegend,
  ChartsTooltip,
} from "@mui/x-charts";
import CloseIcon from "@mui/icons-material/Close";
import GaugeChart from "../../GaugeChart";
import { getThemedStyles } from "../styles";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchModalBreakdown } from "@/store/features/PerformanceReport/ModalBreakdownSlice";

export interface MetricsType {
  performance: number;
  utilization: number;
}

export interface MachineType {
  id: string;
  metrics: MetricsType;
}

export interface ModalBreakdownType {
  machineType: string;
  metrics: MetricsType;
  machines: MachineType[];
}

export interface ProjectSummaryGraphModalProps {
  projectName: string;
  businessSegment: string;
  equipmentType: string;
  fromDate: string;
  toDate: string;
  onClose: () => void;
}

const ITEMS_PER_PAGE = 8;

const ProjectSummaryGraphModal: React.FC<ProjectSummaryGraphModalProps> = ({
  projectName,
  businessSegment,
  equipmentType,
  fromDate,
  toDate,
  onClose,
}) => {
  const styles = getThemedStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [resourceType, setResourceType] = useState("resourceId");

  const dispatch = useAppDispatch();

  const { modalBreakdown, loading } = useAppSelector(
    (state) => state.modalBreakdown
  );

  useEffect(() => {
    dispatch(
      fetchModalBreakdown({
        businessSegment,
        equipmentType,
        projectName,
        fromDate,
        toDate,
        resourceType,
      })
    );
  }, [
    dispatch,
    businessSegment,
    equipmentType,
    projectName,
    fromDate,
    toDate,
    resourceType,
  ]);

  const currentBreakdown: ModalBreakdownType | undefined =
    modalBreakdown[tabIndex];

  const paginatedData = currentBreakdown
    ? currentBreakdown.machines.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
      )
    : [];

  const showPrevButton = currentPage > 0;
  const showNextButton = currentBreakdown
    ? (currentPage + 1) * ITEMS_PER_PAGE < currentBreakdown.machines.length
    : false;

  const handlePageChange = (isNext: boolean) => {
    if (isNext) {
      setCurrentPage((prev) =>
        Math.min(
          prev + 1,
          Math.ceil((currentBreakdown?.machines.length || 0) / ITEMS_PER_PAGE) -
            1
        )
      );
    } else {
      setCurrentPage((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    setCurrentPage(0);
  };

  return (
    <Box sx={styles.modalBox}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress size={40} />
        </Box>
      ) : (
        <>
          <Box sx={styles.modalContentBox}>
            <Box sx={{ display: "flex-1", width: "3%", whiteSpace: "nowrap" }}>
              <Typography sx={styles.modalTextHeader}>Project:</Typography>
              <Typography sx={styles.modalProjectName}>
                {projectName}
              </Typography>
            </Box>
            <Box>
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                aria-label="project details tabs"
                scrollButtons="auto"
              >
                {modalBreakdown.map((breakdown, index) => (
                  <Tab label={breakdown.machineType} key={index} />
                ))}
              </Tabs>
            </Box>
            <Box>
              <IconButton
                onClick={onClose}
                aria-label="close"
                sx={styles.modalCloseIcon}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          {currentBreakdown && (
            <>
              <Box sx={{ width: "100%", marginBottom: "2vh" }}>
                <Grid container>
                  <Grid xs={6} md={6} lg={6}>
                    <Box sx={styles.modalPerformanceGauge}>
                      <Typography sx={styles.gaugeTitle}>
                        PERFORMANCE %
                      </Typography>
                      <GaugeChart
                        value={currentBreakdown.metrics.performance}
                      />
                    </Box>
                  </Grid>
                  <Grid xs={6} md={6} lg={6}>
                    <Box sx={styles.modalUtilizationGauge}>
                      <Typography sx={styles.gaugeTitle}>
                        UTILIZATION %
                      </Typography>
                      <GaugeChart
                        value={currentBreakdown.metrics.utilization}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={styles.modalGraphBox}>
                <Box sx={styles.modalTextPostion}>
                  <Typography sx={styles.modalMachine}>Machine</Typography>
                  <Box>
                    <FormControl sx={styles.selectbox}>
                      <Select
                        value={resourceType}
                        onChange={(e) =>
                          setResourceType(e.target.value as string)
                        }
                        fullWidth
                        size="small"
                      >
                        <MenuItem value="resourceId">ResourceId</MenuItem>
                        <MenuItem value="mcMaker">MC Maker</MenuItem>
                        <MenuItem value="mcModel">MC Model</MenuItem>
                      </Select>
                    </FormControl>
                    {showPrevButton && (
                      <Button onClick={() => handlePageChange(false)}>
                        Previous
                      </Button>
                    )}
                    {showNextButton && (
                      <Button onClick={() => handlePageChange(true)}>
                        Next
                      </Button>
                    )}
                  </Box>
                </Box>
                <ResponsiveChartContainer
                  series={[
                    {
                      data: paginatedData.map(
                        (machine) => machine.metrics.performance
                      ),
                      label: "Performance %",
                      type: "bar",
                      color: "#0288D1",
                      valueFormatter: (value) => `${value}%`,
                    },
                    {
                      data: paginatedData.map(
                        (machine) => machine.metrics.utilization
                      ),
                      label: "Utilization %",
                      type: "bar",
                      color: "#014361",
                      valueFormatter: (value) => `${value}%`,
                    },
                    {
                      data: Array(paginatedData.length).fill(100),
                      label: "Target",
                      type: "line",
                      color: "#E9AF00",
                      valueFormatter: (value) => `${value}%`,
                    },
                  ]}
                  xAxis={[
                    {
                      data: paginatedData.map((machine) => machine.id),
                      scaleType: "band",
                      disableLine: true,
                      disableTicks: true,
                      categoryGapRatio: 0.3,
                      barGapRatio: 0.5,
                    } as any,
                  ]}
                  yAxis={[
                    {
                      id: "percentage",
                      min: 0,
                      max: 120,
                      valueFormatter: (value) => `${value}%`,
                    },
                  ]}
                  sx={styles.invisible_line}
                  height={370}
                >
                  <ChartsGrid horizontal={true} vertical={true} />
                  <BarPlot
                    barLabel="value"
                    slotProps={{
                      barLabel: {
                        style: {
                          fontSize: "12px",
                          fill: "white",
                          fontWeight: 700,
                        },
                      },
                    }}
                  />
                  <ChartsXAxis
                    position="bottom"
                    tickLabelStyle={styles.modalMachineLabel}
                  />
                  <ChartsYAxis
                    position="right"
                    tickInterval={[0, 25, 50, 75, 100, 120]}
                    tickNumber={5}
                    tickMinStep={20}
                    tickMaxStep={20}
                  />
                  <ChartsLegend
                    position={{ vertical: "bottom", horizontal: "middle" }}
                    slotProps={styles.chartLegend}
                  />
                  <ChartsTooltip trigger="axis" />
                </ResponsiveChartContainer>
                <Box
                  sx={{
                    ...styles.modalTargetLine,
                    top: showNextButton ? "71.8%" : "72.8%",
                  }}
                />
              </Box>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default ProjectSummaryGraphModal;
