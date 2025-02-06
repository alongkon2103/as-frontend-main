import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Select,
  MenuItem,
  Modal,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useTranslation } from "react-i18next";
import { getBusinessSegment } from "../ProjectSummaryTable/util";
import {
  BarPlot,
  ChartsGrid,
  ChartsLegend,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  LinePlot,
  ResponsiveChartContainer,
  ChartsOnAxisClickHandler,
} from "@mui/x-charts";
import { getThemedStyles } from "./styles";
import {
  fetchProjectSummary,
  ProjectSummaryProps,
} from "@/store/features/PerformanceReport/ProjectSummarySlice";
import ProjectSummaryGraphModal from "./Modal";

interface ProjectSummaryGraphProps {
  fromDate: string;
  toDate: string;
}

export const ProjectSummaryGraph: React.FC<ProjectSummaryGraphProps> = ({
  fromDate,
  toDate,
}: ProjectSummaryGraphProps) => {
  const params = useSearchParams();
  const [id, setId] = useState(Number(params.get("id")));
  const [equipmentType, setEquipmentType] = useState("CNC");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [businessSegment, setBusinessSegment] = useState(
    getBusinessSegment(id)
  );

  useEffect(() => {
    dispatch(
      fetchProjectSummary({
        businessSegment: businessSegment,
        fromDate: fromDate,
        toDate: toDate,
        equipmentType: equipmentType,
      })
    );
  }, [dispatch, fromDate, toDate, id, equipmentType, businessSegment]);

  useEffect(() => {
    const newId = Number(params.get("id"));
    setId(newId);
    setBusinessSegment(getBusinessSegment(newId));
    setEquipmentType("CNC");
  }, [params]);

  const { projectSummary, loading } =
    useAppSelector((state) => state.projectSummary) ?? [];

  const handleChange = (event: SelectChangeEvent) => {
    setEquipmentType(event.target.value as string);
  };

  const handleAxisClick: any = (
    event: any,
    axisData: { dataIndex: number }
  ) => {
    if (axisData && axisData.dataIndex !== undefined) {
      const clickedData = chartData[axisData.dataIndex];
      setSelectedData(clickedData);
      setModalOpen(true);
    }
  };
  const styles = getThemedStyles();
  const chartData = projectSummary
    .filter((data) => data?.project.toLocaleLowerCase() !== "summary")
    .map((item: ProjectSummaryProps) => ({
      project: item.project,
      performance: item.performance,
      utilization: item.utilization,
    }));

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={styles.box}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography sx={styles.header}>Performance Report</Typography>
          <Typography sx={styles.sub_header}>
            Breakdown of each project Performance% and Utilization%.
          </Typography>
        </Box>
        <FormControl sx={styles.selectbox}>
          <InputLabel>Equipment Type</InputLabel>
          {businessSegment === "AE" ? (
            <Select
              value={equipmentType}
              onChange={handleChange}
              fullWidth
              label="Equipment Type"
            >
              <MenuItem value="CNC">CNC (Default)</MenuItem>
              <MenuItem value="CMM">CMM</MenuItem>
              <MenuItem value="EDM">EDM</MenuItem>
              <MenuItem value="MANUAL">MANUAL</MenuItem>
              <MenuItem value="PART MARK">PART MARK</MenuItem>
              <MenuItem value="ROBOT">ROBOT</MenuItem>
              <MenuItem value="SPECIAL PROCESS">SPECIAL PROCESS</MenuItem>
            </Select>
          ) : (
            <Select
              value={equipmentType}
              onChange={handleChange}
              fullWidth
              label="Equipment Type"
            >
              <MenuItem value="CNC">CNC (Default)</MenuItem>
              <MenuItem value="CMM">CMM</MenuItem>
              <MenuItem value="SPECIAL PROCESS">SPECIAL PROCESS</MenuItem>
            </Select>
          )}
        </FormControl>
      </Box>
      <Box sx={styles.chartbox}>
        <ResponsiveChartContainer
          series={[
            {
              data: chartData.map((item) => item.performance),
              label: "Performance %",
              type: "bar",
              color: "#0288D1",
              valueFormatter: (value) => `${value}%`,
            },
            {
              data: chartData.map((item) => item.utilization),
              label: "Utilization %",
              type: "bar",
              color: "#014361",
              valueFormatter: (value) => `${value}%`,
            },
            {
              data: Array(chartData.length).fill(100),
              label: "Target",
              type: "line",
              color: "#E9AF00",
              valueFormatter: (value) => `${value}%`,
            },
          ]}
          xAxis={[
            {
              data: chartData.map((item) => item.project),
              scaleType: "band",
              disableLine: true,
              disableTicks: true,
              categoryGapRatio: 0.3,
              barGapRatio: 0.8,
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
          <LinePlot />
          <ChartsXAxis
            position="bottom"
            tickLabelStyle={styles.xAxisLabelStyles}
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
          <ChartsOnAxisClickHandler onAxisClick={handleAxisClick} />
        </ResponsiveChartContainer>
        <Box sx={styles.targetLine} />
      </Box>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="chart-modal-title"
        aria-describedby="chart-modal-description"
      >
        <ProjectSummaryGraphModal
          projectName={selectedData?.project || ""}
          fromDate={fromDate}
          toDate={toDate}
          businessSegment={businessSegment}
          equipmentType={equipmentType}
          onClose={() => setModalOpen(false)}
        />
      </Modal>
    </Box>
  );
};
