import { Box, Chip, Grid, LinearProgress, Typography } from "@mui/material";
import React from "react";
import { getThemedStyles } from "../style";
import { Stage } from "@/store/features/Jobs/KanbanSlice";
import { getStatusBackgroundColor, getStatusColor } from "@/utils/utils";

function CustomTab({ stage }: { stage: Stage }) {
  const styles = getThemedStyles();
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        spacing={2}
      >
        <Grid item xs={10} style={{ textAlign: "left" }}>
          <Typography sx={styles.title}>
            {stage.name} ({stage.total})
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={styles.percent}>{stage.percent}%</Typography>
        </Grid>
      </Grid>
      <Box sx={styles.bar}>
        <LinearProgress variant="determinate" value={stage.percent} />
      </Box>
      <Box sx={styles.badge}>
        <Chip
          label={stage.status}
          variant="outlined"
          sx={{
            borderRadius: "4px",
            border: "none",
            background: getStatusBackgroundColor(stage.status),
            color: getStatusColor(stage.status),
          }}
        />
      </Box>
    </Grid>
  );
}

export default CustomTab;
