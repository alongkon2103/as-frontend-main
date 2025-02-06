import { DateType, DateRange } from "@/components/shared/DateRange";
import { useState } from "react";
import { getThemedStyles } from "./styles";
import { Box, Stack, Grid, Typography } from "@mui/material";
import OperatorStatsDeck from "../components/OperatorStatsDeck";
import QuantityBreakdown from "../components/QuantityBreakdown";
import { AvailableMachines } from "../components/AvailableMachines";
import { useTranslation } from "react-i18next";

const OperatorManagerDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [statsDates, setStatsDate] = useState<DateType>({
    fromDate: "",
    toDate: "",
  });
  const [quantityBreakdownDate, setQuantityBreakdownDate] = useState<DateType>({
    fromDate: "",
    toDate: "",
  });

  const styles = getThemedStyles();

  function handleStatsDate(e: DateType) {
    setStatsDate(e);
  }
  function handleQuantityBreakdownDate(e: DateType) {
    setQuantityBreakdownDate(e);
  }

  return (
    <Box
      sx={{
        paddingX: "1vw",
        marginTop: "24px",
      }}
    >
      <Stack spacing={2}>
        <Grid container direction={"row"} justifyContent={"space-between"}>
          <Grid item xs={12} sm={12} md={5.5}>
            <Grid
              container
              spacing={2}
              sx={styles.titleWrapper}
              direction={"row"}
              justifyContent={"space-around"}
            >
              <Grid item xs={8}>
                <Typography sx={styles.titleText}>
                  {t("overall_production_stats")}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <DateRange handleDateChange={handleStatsDate} />
              </Grid>
              <OperatorStatsDeck {...statsDates} />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Grid container spacing={2} sx={styles.titleWrapper}>
              <Grid item xs={12} ml={2}>
                <AvailableMachines />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container sx={styles.titleWrapper}>
          <Grid item xs={8}>
            <Typography sx={styles.titleText}>
              {t("quantity_breakdown")}
            </Typography>
          </Grid>
          <Grid
            xs={4}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            item={true}
          >
            <DateRange handleDateChange={handleQuantityBreakdownDate} />
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <QuantityBreakdown {...quantityBreakdownDate} />
        </Grid>
      </Stack>
    </Box>
  );
};

export default OperatorManagerDashboard;
