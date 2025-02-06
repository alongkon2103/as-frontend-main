import {
  Alert,
  Autocomplete,
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getThemedStyles } from "./styles";
import JobsTable from "@/components/job_tables/OperatorJobsTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  ProcessMachineProps,
  fetchProcessMachines,
} from "@/store/features/ProcessMachine/ProcessMachineSlice";
import { fetchMachineOperator } from "@/store/features/MachineOperator/MachineOperatorSlice";
import { useTranslation } from "react-i18next";
import { AccessTimeFilledOutlined, ShowChart } from "@mui/icons-material";
import { DateRange, DateType } from "@/components/shared/DateRange";
import { getStatusBoxStyle } from "./utils";

export const OperatorDashboard: React.FC = () => {
  const styles = getThemedStyles();
  const { t } = useTranslation();

  // default to today + 1 week.
  const [statsDates, setStatsDate] = useState<DateType>({
    fromDate: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
    toDate: dayjs().format("YYYY-MM-DD"),
  });
  const [isLoading, setIsLoading] = useState(false);
  const updatedAt = dayjs().format("YYYY-MM-DD HH:mm:ss");

  const params = new URLSearchParams(location.search);
  const machineParam = params?.get("machine");
  const factoryOptions: { label: string; value: string }[] = [
    { label: "OP Task", value: "OP_TASK" },
    { label: "Factory 4", value: "F4" },
  ];

  const factoryParam = params?.get("factory");
  const [factorySelected, setFactorySelected] = useState<string>(
    factoryParam === "Factory 4" ? "F4": "OP_TASK"
  );

  useEffect(() => {
    dispatch(fetchProcessMachines({ factory: factorySelected }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [factorySelected]);

  const [machine, setMachine] = useState(machineParam ?? "");
  const dispatch = useAppDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const machines: ProcessMachineProps[] =
    useAppSelector((state) => state.processMachines.processMachines) || [];

  function handleStatsDate(e: DateType) {
    setStatsDate(e);
  }

  useEffect(() => {
    if (machine.length > 0) {
      fetchMachineOperatorData(machine);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [machine]);

  useEffect(() => {
    if (machines.length > 0) {
      if (machines.find((m) => m.machineName === machine) === undefined) {
        setMachine("");
      }
    }
  }, [machines, machine]);

  function fetchMachineOperatorData(machine: string) {
    setIsLoading(true);
    dispatch(
      fetchMachineOperator({
        machineName: machine,
      })
    ).then(() => {
      setIsLoading(false);
    });
  }

  const machineOperator = useAppSelector(
    (state) => state.machineOperator.machineOperator
  );

  const statusBoxStyle = getStatusBoxStyle(machineOperator?.status);

  return (
    <Box
      sx={{
        marginTop: "65px",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          paddingX: "2vw",
          pb: "11px",
          borderBottom: "1px solid #D6D9DD",
        }}
      >
        <Grid item xs={10} sx={styles.titleBar}>
          <Autocomplete
            id="machine-select"
            sx={{
              width: "300px",
            }}
            size="small"
            options={machines}
            value={machine ? machines.find((m) => m.machineName === machine) : null}
            getOptionLabel={(ml) => {
              return ml.machineName;
            }}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.machineName}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("machine_or_process")}
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
            onChange={(e: any, value: any) => {
              if (value === null) {
                setMachine("");
              } else {
                setMachine(value.machineName);
              }
            }}
          />
          <Autocomplete
            id="data-select"
            sx={{
              width: "300px",
            }}
            size="small"
            options={factoryOptions}
            defaultValue={
              factorySelected
                ? factoryOptions.find((m) => m.value === factorySelected)
                : factoryOptions.find((m) => m.value === "OP_TASK")
            }
            getOptionLabel={(data) => data.label}
            disableClearable
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.label}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("factory_or_task")}
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
            onChange={async (e: any, value: any) => {
              fetchMachineOperatorData(machine);
              const newFactorySelected = value.value;
              setFactorySelected(newFactorySelected);
              await dispatch(
                fetchProcessMachines({ factory: newFactorySelected })
              );
              setMachine("");
            }}
          />
          <Box>
            <DateRange
              handleDateChange={handleStatsDate}
              startDate={statsDates.fromDate}
              endDate={statsDates.toDate}
              shortcuts="mini"
            />
          </Box>
        </Grid>
        <Grid item xs={2} sx={{ alignContent: "center" }}>
          <Typography sx={styles.dateText}>
            {t("updated_at")}: {updatedAt}
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ px: "2vw" }}>
        {machine.length <= 0 && (
          <>
            <Box
              sx={{
                marginTop: "5vh",
              }}
            >
              <Alert severity="error">{t("select_machine_message")}</Alert>
            </Box>
          </>
        )}
        <Grid
          container
          sx={styles.machineDetailContainer}
          datatest-id="machineDetailContainer"
        >
          <Grid container item sx={styles.machineDetail} xs>
            {isLoading ? (
              <CircularProgress sx={{ margin: "auto" }} />
            ) : (
              <>
                <Grid item datatest-id="image" sx={styles.machineImage}>
                  <Image
                    src={"/no-img.svg"}
                    alt="Job Detail Image"
                    layout="fill"
                  />
                </Grid>
                <Grid
                  item
                  sx={styles.machineDetailTypos}
                  datatest-id="machineDetailTypos"
                  xs
                >
                  <Box
                    sx={{ ...styles.machineDetailTypo, width: "100%" }}
                    datatest-id="machineName"
                  >
                    <Typography
                      sx={{
                        ...styles.topTitle,
                        ...(machine.length <= 0 && { color: "#00000061" }),
                      }}
                    >
                      {machines.find((m) => m.machineName === machine)
                        ? machineOperator?.machineName || "-"
                        : "Machine Name -"}
                    </Typography>
                  </Box>
                  <Box sx={styles.machineDetailTypo} datatest-id="description">
                    <Typography
                      sx={{
                        ...styles.titleText,
                        ...(machine.length <= 0 && { color: "#00000061" }),
                      }}
                    >
                      {t("description")}:
                    </Typography>
                    <Typography
                      sx={{
                        ...styles.normalText,
                        ...(machine.length <= 0 && { color: "#00000061" }),
                      }}
                    >
                      {machineOperator?.description?.length > 0 && machine
                        ? machineOperator?.description
                        : "-"}
                    </Typography>
                  </Box>
                  <Box
                    sx={styles.machineDetailTypo}
                    datatest-id="machineStatus"
                  >
                    <Typography
                      sx={{
                        ...styles.titleText,
                        ...(machine.length <= 0 && { color: "#00000061" }),
                      }}
                    >
                      {t("machine_status")}:
                    </Typography>
                    {machineOperator?.status?.length > 0 && machine ? (
                      <Box sx={statusBoxStyle}>{machineOperator.status}</Box>
                    ) : (
                      "-"
                    )}
                  </Box>
                  <Box sx={styles.machineDetailTypo} datatest-id="MCID">
                    <Typography
                      sx={{
                        ...styles.titleText,
                        ...(machine.length <= 0 && { color: "#00000061" }),
                      }}
                    >
                      {t("MCID")}:{" "}
                    </Typography>
                    <Typography
                      sx={{
                        ...styles.normalText,
                        ...(machine.length <= 0 && { color: "#00000061" }),
                      }}
                    >
                      {machineOperator?.mcid?.length > 0 && machine
                        ? machineOperator.mcid
                        : "-"}
                    </Typography>
                  </Box>
                  <Box sx={styles.machineDetailTypo} datatest-id="problem">
                    <Typography
                      sx={{
                        ...styles.titleText,
                        ...(machine.length <= 0 && { color: "#00000061" }),
                      }}
                    >
                      {t("problem")}:{" "}
                    </Typography>
                    <Typography
                      sx={{
                        ...styles.normalText,
                        ...(machine.length <= 0 && { color: "#00000061" }),
                      }}
                    >
                      {machineOperator?.problem?.length > 0 && machine ? (
                        <Box sx={styles.stopBox}>
                          <Typography sx={styles.statusText}>
                            {machineOperator.problem}
                          </Typography>
                        </Box>
                      ) : (
                        "-"
                      )}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ ...styles.machineDetailTypo, width: "100%" }}
                    datatest-id="assign"
                  >
                    <Typography
                      sx={{
                        ...styles.titleText,
                        ...(machine.length <= 0 && { color: "#00000061" }),
                      }}
                    >
                      {t("assigned")}:{" "}
                    </Typography>
                    {machineOperator?.assigned?.length > 0 && machine && (
                      <Avatar sx={styles.assigneeAvatar}>
                        {machineOperator?.assigned?.length > 0 && machine ? (
                          <Typography sx={{ fontSize: "13px" }}>
                            {machineOperator.assigned[0]}
                          </Typography>
                        ) : (
                          ""
                        )}
                      </Avatar>
                    )}
                    <Typography
                      sx={{
                        ...styles.normalText,
                        ...(machine.length <= 0 && { color: "#00000061" }),
                      }}
                    >
                      {machineOperator?.assigned?.length > 0 && machine
                        ? machineOperator.assigned
                        : "-"}
                    </Typography>
                  </Box>
                </Grid>
              </>
            )}
          </Grid>
          <Grid
            direction="column"
            rowSpacing={2}
            sx={{ width: "340px", display: "flex" }}
            datatest-id="machineDetailCardContainer"
          >
            <Card
              elevation={0}
              sx={styles.totalCycleTimeCard}
              datatest-id="totalCycleTimeCard"
            >
              {isLoading ? (
                <CircularProgress sx={{ margin: "auto" }} />
              ) : (
                <CardContent sx={{ p: "8px 24px !important" }}>
                  <Stack direction="row" spacing={1}>
                    <AccessTimeFilledOutlined sx={{ color: " #014361" }} />
                    <Typography>{t("total_cycle_time")}</Typography>
                  </Stack>
                  <Typography datatest-id="totalCycleTime">
                    {machineOperator?.totalCycleTime?.length > 0 && machine
                      ? machineOperator?.totalCycleTime
                      : "00hrs 00mins"}
                  </Typography>
                </CardContent>
              )}
            </Card>
            <Card
              elevation={0}
              sx={styles.spindleStatsCard}
              datatest-id="spindleStatsCard"
            >
              {isLoading ? (
                <CircularProgress sx={{ margin: "auto" }} />
              ) : (
                <CardContent sx={{ p: "24px 16px !important" }}>
                  <Stack direction="row" spacing={1} sx={{ mb: "16px" }}>
                    <ShowChart sx={{ color: " #014361" }} />
                    <Typography>{t("spindle_stats")}</Typography>
                  </Stack>
                  <Typography datatest-id="load">
                    <b>{t("operator_machines_load")}:</b>{" "}
                    {(machineOperator?.spindleLoad ?? 0) > 0 && machineOperator
                      ? `${machineOperator.spindleLoad} %`
                      : "-"}
                  </Typography>
                  <Typography datatest-id="runTime">
                    <b>{t("operator_machines_runtime")}:</b>{" "}
                    {(machineOperator?.spindleRuntime ?? 0) > 0 &&
                    machineOperator
                      ? `${machineOperator.spindleRuntime} hrs`
                      : "-"}
                  </Typography>
                  <Typography datatest-id="speed">
                    <b>{t("operator_machines_speed")}:</b>{" "}
                    {(machineOperator?.spindleSpeed ?? 0) > 0 && machineOperator
                      ? `${machineOperator.spindleSpeed} rpm`
                      : "-"}
                  </Typography>
                </CardContent>
              )}
            </Card>
          </Grid>
        </Grid>
        {machine.length > 0 && (
          <Grid item xs={12} sx={{ mt: "0px !important" }}>
            <JobsTable
              title={"All Jobs"}
              showPriority
              fromDate={statsDates.fromDate}
              toDate={statsDates.toDate}
              machineName={machine}
              data={factorySelected}
            />
          </Grid>
        )}
      </Box>
    </Box>
  );
};
