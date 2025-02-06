import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { getThemedStyles } from "./styles";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import {
  AvailableMachineProps,
  fetchAvailableMachines,
} from "@/store/features/AvailableMachines/AvailableMachineSlice";
import { useTranslation } from "react-i18next";

export const AvailableMachines = () => {
  const styles = getThemedStyles();
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAvailableMachines());
  }, [dispatch]);

  const { availableMachines, loading } = useAppSelector(
    (state) => state.availableMachines
  ) as any;
  return (
    <Box sx={styles.wrapper}>
      <Typography sx={styles.title}>
        {t("available_machines")} ({availableMachines.length ?? 0})
      </Typography>
      <Typography sx={styles.description}>
        {t("today")} {dayjs().format("DD/MM/YYYY")}
      </Typography>
      {loading ? (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          py={10}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <List sx={styles.listWrapper}>
          {availableMachines.map(
            (machine: AvailableMachineProps, index: number) => (
              <ListItem key={machine.machineId} sx={styles.listDetails}>
                <Typography sx={styles.machineDetails}>
                  {machine.machineId}
                </Typography>
                <Divider />
              </ListItem>
            )
          )}
        </List>
      )}
    </Box>
  );
};
