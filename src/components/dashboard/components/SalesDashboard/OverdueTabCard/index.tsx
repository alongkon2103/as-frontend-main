import { Box, Button, Typography } from "@mui/material";
import { getThemedStyles } from "./styles";
import { formatNumberToComma } from "@/utils/utils";

export interface CardProps {
  title: string;
  count: number;
  total: number;
  color: string;
  totalOverdue: number;
  currencySign?: string;
  viewMore: () => void;
}

export const OverdueTabCard = ({
  title,
  currencySign,
  count,
  total,
  totalOverdue,
  color,
  viewMore,
}: CardProps) => {
  const styles = getThemedStyles();
  return (
    <Box sx={styles.container}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <Typography sx={styles.title}>{title}</Typography>
        <Typography
          sx={{
            cursor: "pointer",
            color: "rgba(2, 136, 209, 1)",
            fontWeight: 700,
            fontSize: "15px",
          }}
          onClick={viewMore}
        >
          View More
        </Typography>
      </Box>
      <Box sx={{ ...styles.amount, color: color }}>
        {currencySign} {formatNumberToComma(totalOverdue)}
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
    </Box>
  );
};
