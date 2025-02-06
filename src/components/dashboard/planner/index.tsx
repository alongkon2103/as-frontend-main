import { DateType, DateRange } from "@/components/shared/DateRange";
import { useState } from "react";
import { getThemedStyles } from "./styles";
import { Box, Stack, Grid, Typography } from "@mui/material";
import PlannerStatsDeck from "../components/PlannerStatsDeck";
import QuantityBreakdown from "../components/QuantityBreakdown";
import { useTranslation } from "react-i18next";

const PlannerDashboard: React.FC = () => {
  const [statsDates, setStatsDate] = useState<DateType>({
    fromDate: "",
    toDate: "",
  });
  const [quantityBreakdownDate, setQuantityBreakdownDate] = useState<DateType>({
    fromDate: "",
    toDate: "",
  });

  const styles = getThemedStyles();
  const { t } = useTranslation();

  function handleStatsDate(e: DateType) {
    setStatsDate(e);
  }
  function handleQuantityStatsDate(e: DateType) {
    setQuantityBreakdownDate(e);
  }

  return (
    <Box
      sx={{
        paddingX: "2vw",
      }}
    >
      <Stack spacing={2}>
        <Grid container spacing={2} sx={styles.titleWrapper}>
          <Grid item xs={8}>
            <Typography sx={styles.titleText}>
              {t("overall_production_stats")}
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
            <DateRange handleDateChange={handleStatsDate} />
          </Grid>
        </Grid>
        <PlannerStatsDeck {...statsDates} />
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
            <DateRange handleDateChange={handleQuantityStatsDate} />
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

export default PlannerDashboard;
