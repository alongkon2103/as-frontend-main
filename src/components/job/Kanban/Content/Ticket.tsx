import { ChildItem } from "@/store/features/Jobs/KanbanSlice";
import React from "react";
import { getThemedStyles } from "./style";
import { Box, Chip, Grid, Typography } from "@mui/material";

function Ticket({ item }: { item: ChildItem }) {
  const styles = getThemedStyles();
  return (
    <Box style={styles.item}>
      <Grid container direction="column" justifyContent="space-between">
        <Grid item xs={4} style={{ textAlign: "left" }}>
          <Typography sx={styles.itemTitle}>{item.item}</Typography>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{ marginTop: "1.2vh" }}
          >
            
              <Typography sx={styles.operNum}>
                <Chip
                  label={`OP ${item.operNum ? item.operNum: '####'}`}
                  size="small"
                  sx={{
                    borderRadius: "4px",
                    background: "rgba(213, 227, 255, 1)",
                  }}
                />
              </Typography>
           
            <Typography sx={styles.qty}>
              Qty: {item.qty ?item.qty : 0 }/{item.totalQty ? item.totalQty : 0}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={4}
          style={{ textAlign: "left" }}
          sx={{ marginTop: "1.2vh" }}
        >
          <Typography sx={styles.refNum}>{item.refNum}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Ticket;
