import { Tooltip, TooltipProps, tooltipClasses, styled } from "@mui/material";

export const LightBackgroundTooltip = styled(
  ({ className, ...props }: TooltipProps & { minWidth?: number }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  )
)(({ theme, minWidth }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
    minWidth: minWidth || "auto",
    borderRadius: "8px",
  },
}));
