import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { getThemedStyles } from "./styles";
import { formatNumberToComma } from "@/utils/utils";
import { CloudOutlined, StickyNote2Outlined } from "@mui/icons-material";

export interface CardProps {
  title: string;
  unit: string;
  total: number;
  currencySign?: string;
  ordered?: number | undefined;
  forecast: number;
  loading: boolean;
  showForecast?: boolean;
}

export const OverallTabCard = ({
  title,
  unit,
  total,
  ordered,
  forecast,
  currencySign,
  loading,
  showForecast = false,
}: CardProps) => {
  const styles = getThemedStyles();
  return (
    <Box sx={styles.container}>
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress size={40} sx={{}} />
        </Box>
      )}
      {!loading && (
        <>
          <Box sx={styles.title}>
            {title} <span style={styles.unit}>({unit})</span>
          </Box>
          <Box sx={styles.amount}>
            {currencySign} {formatNumberToComma(total)}
          </Box>
          <Box sx={{ display: "flex" }}>
            {ordered != undefined && (
              <Stack
                direction="row"
                alignItems="center"
                gap={1}
                marginRight="16px"
              >
                <StickyNote2Outlined color="primary" width={1} height={1} />
                <Typography
                  color="primary"
                  textAlign="right"
                  style={styles.stats}
                >
                  {currencySign} {formatNumberToComma(ordered)}
                </Typography>
              </Stack>
            )}

            {showForecast && (
              <Stack direction="row" alignItems="center" gap={1}>
                <CloudOutlined color="secondary" width={1} height={1} />
                <Typography
                  color="secondary"
                  textAlign="right"
                  style={styles.stats}
                >
                  {currencySign} {formatNumberToComma(forecast)}
                </Typography>
              </Stack>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};
