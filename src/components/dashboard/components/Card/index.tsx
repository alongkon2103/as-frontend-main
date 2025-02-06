"use client";

import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { getThemedStyles } from "./styles";
import Image from "next/image";

interface CardProps {
  title: string;
  updatedAt: string;
  count: number;
  message: string;
  showTotal?: boolean;
  total?: number;
  color: string;
  loading: boolean;
  percentage?: boolean;
  toolTip: React.ReactNode;
}

function DashboardCard({
  title,
  updatedAt,
  count,
  showTotal,
  total,
  message,
  color,
  loading,
  percentage = false,
  toolTip,
}: CardProps) {
  const styles = getThemedStyles();
  return (
    <Card sx={styles.card}>
      {loading ? (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Grid>
      ) : (
        <CardContent>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignContent="center"
            gap={1}
          >
            <Grid item xs={9}>
              <Typography variant="h5" component="div" sx={styles.title}>
                {title}
              </Typography>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              xs={2}
              item={true}
            >
              <Tooltip title={toolTip || ""}>
                <Image
                  src="/card_info.svg"
                  width={24}
                  height={24}
                  alt="inf-icon"
                />
              </Tooltip>
            </Grid>
          </Grid>
          <Typography color="text.secondary" sx={styles.date}>
            {updatedAt}
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            sx={{ ...styles.count, color }}
          >
            {count} {percentage && "%"}
            {showTotal && (
              <>
                / <span style={styles.total}> {total}</span>
              </>
            )}
          </Typography>
          <Typography color="text.secondary" sx={styles.descp}>
            {message}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
}

export default DashboardCard;
