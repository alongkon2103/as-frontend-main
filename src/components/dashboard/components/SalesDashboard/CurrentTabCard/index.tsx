import { Box, CircularProgress, Typography } from "@mui/material";
import { getThemedStyles } from "./styles";
import { formatNumberToComma } from "@/utils/utils";

export interface CardProps {
  title: string;
  percentage: number;
  count: number;
  total: number;
  color: string;
  loading: boolean;
}

export const CurrentTabCard = ({
  title,
  percentage,
  count,
  total,
  color,
  loading,
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
          <Box sx={styles.title}>{title}</Box>
          <Box
            sx={{
              color: color,
              marginBottom: "4px",
              fontSize: "32px",
              fontWeight: 700,
              fontFamily: "Roboto",
            }}
          >
            {percentage}%
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                color: color,
                marginRight: "5px",
                fontSize: "14px",
                fontWeight: "400",
                fontFamily: "Roboto",
                fontStyle: "normal",
              }}
            >
              {formatNumberToComma(count)}
            </Typography>
            <Typography
              color={"var(--Text-Disabled, rgba(0, 0, 0, 0.38))"}
              sx={{
                marginRight: "5px",
                fontSize: "14px",
                fontWeight: "400",
                fontFamily: "Roboto",
                fontStyle: "normal",
              }}
            >
              {" of "} {formatNumberToComma(total)}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};
