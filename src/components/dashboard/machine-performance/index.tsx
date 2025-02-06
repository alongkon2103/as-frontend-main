"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useTranslation } from "react-i18next";
import { getThemedStyles } from "./styles";
import { MachinePerformanceTabs } from "./tabs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import MachinePerformanceTable from "./machinePerformanceTable";
import {
  MachinePerformanceByProjectsProps,
  fetchMachineIssues,
  fetchMachinePerformanceByProjects,
  fetchMachinePerformances,
} from "@/store/features/MachinePerformance/MachinePerformanceSlice";
import {
  greenBackground,
  greenText,
  lightGreenBackground,
  lightGreenText,
  orangeBackground,
  orangeText,
  redBackground,
  redText,
  yellowBackground,
  yellowText,
} from "@/utils/utils";

const getPercentageBackgroundColor = (percentage: number) => {
  if (percentage === 100) {
    return greenBackground;
  } else if (percentage >= 67 && percentage < 100) {
    return lightGreenBackground;
  } else if (percentage >= 34 && percentage < 67) {
    return yellowBackground;
  } else if (percentage >= 1 && percentage < 34) {
    return orangeBackground;
  } else if (percentage === 0) {
    return redBackground;
  }
};

const getPercentageTextColor = (percentage: number) => {
  if (percentage === 100) {
    return greenText;
  } else if (percentage >= 67 && percentage < 100) {
    return lightGreenText;
  } else if (percentage >= 34 && percentage < 67) {
    return yellowText;
  } else if (percentage >= 1 && percentage < 34) {
    return orangeText;
  } else if (percentage === 0) {
    return redText;
  }
};

export const MachinePerformanceDashboard: React.FC = () => {
  const defaultDate = dayjs().subtract(1, "days");
  const [defaultDay, setDefaultDay] = useState(defaultDate);
  const { t } = useTranslation();
  const styles = getThemedStyles();
  const dispatch = useAppDispatch();

  function loadMachinePerformance() {
    dispatch(
      fetchMachinePerformances({
        fromDate: defaultDay.format("YYYY-MM-DD"),
        toDate: defaultDay.format("YYYY-MM-DD"),
      })
    );
  }

  useEffect(() => {
    setProjectName("");
    loadMachinePerformance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultDay]);

  let { machinePerformance, machinePerformanceLoading } = useAppSelector(
    (state: any) => state.machinePerformance
  );

  const [projectName, setProjectName] = useState(
    !machinePerformanceLoading && machinePerformance?.length > 0
      ? machinePerformance[0].name
      : ""
  );

  useEffect(() => {
    if (machinePerformance?.length > 0) {
      setProjectName(machinePerformance[0].name);
      if (projectName.length > 0) {
        dispatch(
          fetchMachinePerformanceByProjects({
            name: projectName,
            fromDate: defaultDay.format("YYYY-MM-DD"),
            toDate: defaultDay.format("YYYY-MM-DD"),
          })
        );
        dispatch(
          fetchMachineIssues({
            name: projectName,
            fromDate: defaultDay.format("YYYY-MM-DD"),
            toDate: defaultDay.format("YYYY-MM-DD"),
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [machinePerformance]);

  useEffect(() => {
    if (projectName.length > 0) {
      dispatch(
        fetchMachinePerformanceByProjects({
          name: projectName,
          fromDate: defaultDay.format("YYYY-MM-DD"),
          toDate: defaultDay.format("YYYY-MM-DD"),
        })
      );
      dispatch(
        fetchMachineIssues({
          name: projectName,
          fromDate: defaultDay.format("YYYY-MM-DD"),
          toDate: defaultDay.format("YYYY-MM-DD"),
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectName]);

  let { machinePerformanceByProjects, machinePerformanceByProjectsLoading } =
    useAppSelector((state: any) => state.machinePerformance);

  let { machineIssues, machineIssuesLoading } = useAppSelector(
    (state: any) => state.machinePerformance
  );

  const loading = (text: string) => {
    return (
      <Box
        sx={{
          marginX: "2vw",
          marginTop: "5rem",
          padding: "15px",
          border: "1px solid rgba(0,0,0,0.15)",
        }}
      >
        <CircularProgress size={15} sx={{ marginRight: 3 }} />
        {text}
      </Box>
    );
  };

  if (machinePerformanceLoading) {
    return loading("We are loading the data ... please wait.");
  }

  if (!machinePerformanceLoading && machinePerformance?.length === 0) {
    return (
      <Box
        sx={{
          marginX: "2vw",
          marginTop: "5rem",
          padding: "15px",
          border: "1px solid rgba(0,0,0,0.15)",
        }}
      >
        No available data found at this moment
      </Box>
    );
  }

  return (
    <Box
      sx={{
        marginX: "2vw",
        marginTop: "3rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={styles.topTitle}>{t("machine_performance")}</Typography>
        <DatePicker
          value={defaultDay}
          format="DD/MM/YYYY"
          onChange={(newValue) => setDefaultDay(dayjs(newValue) ?? defaultDate)}
          disableHighlightToday={true}
          slotProps={{
            inputAdornment: {
              position: "start",
            },
            textField: {
              size: "small",
            },
          }}
        />
      </Box>
      <MachinePerformanceTabs
        tabsData={machinePerformance}
        handleTabChange={(value) => setProjectName(value)}
      />
      {machinePerformanceByProjectsLoading &&
        loading("We are loading projects ... please wait.")}
      {!machinePerformanceByProjectsLoading && (
        <Box
          display="flex"
          flexWrap="wrap"
          mt={"20px"}
          flexDirection={["column", "column", "row"]}
          sx={{
            alignItems: ["center", "center", "flex-start"],
            padding: "0px",
          }}
        >
          {machinePerformanceByProjects &&
          machinePerformanceByProjects.length > 0 ? (
            machinePerformanceByProjects.map(
              (item: MachinePerformanceByProjectsProps, index: number) => (
                <Box
                  key={index}
                  width={["100%", "100%", "calc(33.33% - 8px)"]}
                  textAlign={"center"}
                  p={1}
                  sx={{
                    borderRight: [
                      "none",
                      "none",
                      (index + 1) % 3 !== 0 ? "1px solid #E0E0E0" : "none",
                    ],
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Box sx={{ width: "100px" }}>
                    <Typography sx={{ fontWeight: 700, fontFamily: "Roboto" }}>
                      {item.projectName}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      background: getPercentageBackgroundColor(item.percentage),
                      borderRadius: "5px",
                      padding: "10px",
                      gap: "5px",
                      minWidth: "250px",
                      justifyContent: "center",
                      textAlign: "center",
                      width: "300px",
                      maxWidth: "300px",
                    }}
                  >
                    <Typography
                      color={getPercentageTextColor(item.percentage)}
                      fontWeight={700}
                    >
                      {item.actualQty}{" "}
                    </Typography>
                    <Typography
                      color={"rgba(0, 0, 0, 0.38)"}
                      fontStyle={"italic"}
                      fontSize={14}
                      pt={0.5}
                    >
                      Actual
                    </Typography>
                    /<Typography fontWeight={700}>{item.plannedQty}</Typography>{" "}
                    <Typography
                      color={"rgba(0, 0, 0, 0.38)"}
                      fontStyle={"italic"}
                      fontSize={14}
                      pt={0.5}
                    >
                      Planned
                    </Typography>
                    <Typography
                      color={getPercentageTextColor(item.percentage)}
                      fontWeight={700}
                    >
                      ({item.percentage}%)
                    </Typography>
                  </Box>
                </Box>
              )
            )
          ) : (
            <></>
          )}
        </Box>
      )}
      {machineIssuesLoading &&
        loading("We are loading machine issues ... please wait.")}
      {!machineIssuesLoading && (
        <>
          <Typography
            mt="2rem"
            fontSize={"20px"}
            fontWeight={700}
            color={"rgba(0, 0, 0, 0.6)"}
          >
            {t("all_machine_issues")}
          </Typography>
          <MachinePerformanceTable machinePerformances={machineIssues} />
        </>
      )}
    </Box>
  );
};
