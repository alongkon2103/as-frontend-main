import { Box, Typography } from "@mui/material";
import { TFunction } from "i18next";

export const OnGoingToolTip = (t: TFunction<"translation", undefined>) => {
  return (
    <Box p={1}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 14,
          fontFamily: "Roboto",
          marginBottom: "10px",
        }}
      >
        {t("released")}
      </Typography>
      <Typography sx={{ fontSize: 12, fontFamily: "Roboto" }}>
        {t("on_going_tooltip_description")}
      </Typography>
    </Box>
  );
};

export const FinishedToolTip = (t: TFunction<"translation", undefined>) => {
  return (
    <Box p={1}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 14,
          fontFamily: "Roboto",
          marginBottom: "10px",
        }}
      >
        {t("finished")}
      </Typography>
      <Typography sx={{ fontSize: 12, fontFamily: "Roboto" }}>
        {t("finished_tooltip_description")}
      </Typography>
    </Box>
  );
};

export const DelayedToolTip = (t: TFunction<"translation", undefined>) => {
  return (
    <Box p={1}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 14,
          fontFamily: "Roboto",
          marginBottom: "10px",
        }}
      >
        {t("delayed")}
      </Typography>
      <Typography sx={{ fontSize: 12, fontFamily: "Roboto" }}>
        {t("delayed_tooltip_description")}
      </Typography>
    </Box>
  );
};

export const ProblemsToolTip = (t: TFunction<"translation", undefined>) => {
  return (
    <Box p={1}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 14,
          fontFamily: "Roboto",
          marginBottom: "10px",
        }}
      >
        {t("problems")}
      </Typography>
      <Typography sx={{ fontSize: 12, fontFamily: "Roboto" }}>
        {t("problems_tooltip_description")}
      </Typography>
    </Box>
  );
};

export const DelayedStartDateToolTip = (
  t: TFunction<"translation", undefined>
) => {
  return (
    <Box p={1}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 14,
          fontFamily: "Roboto",
          marginBottom: "10px",
        }}
      >
        {t("delayed_start_date")}
      </Typography>
      <Typography sx={{ fontSize: 12, fontFamily: "Roboto" }}>
        {t("delayed_start_date_tooltip_description")}
      </Typography>
    </Box>
  );
};

export const DelayedEndDateToolTip = (
  t: TFunction<"translation", undefined>
) => {
  return (
    <Box p={1}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 14,
          fontFamily: "Roboto",
          marginBottom: "10px",
        }}
      >
        {t("delayed_end_date")}
      </Typography>
      <Typography sx={{ fontSize: 12, fontFamily: "Roboto" }}>
        {t("delayed_end_date_tooltip_description")}
      </Typography>
    </Box>
  );
};

export const UtilizationToolTip = (t: TFunction<"translation", undefined>) => {
  return (
    <Box p={1}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 14,
          fontFamily: "Roboto",
          marginBottom: "10px",
        }}
      >
        {t("utilization")}
      </Typography>
      <Typography sx={{ fontSize: 12, fontFamily: "Roboto" }}>
        {t("utilization_tooltip_description")}
      </Typography>
    </Box>
  );
};
