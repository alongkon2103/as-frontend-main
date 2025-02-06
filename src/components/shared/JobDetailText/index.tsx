import { Avatar, Box, SxProps, Typography } from "@mui/material";
import { getThemedStyles } from "./styles";

export interface JobDetailTextProps {
  title: string;
  avatarText?: string;
  description: string;
  sxProps?: SxProps;
  titleFontSize?: string;
}
export const JobDetailText: React.FC<JobDetailTextProps> = ({
  title,
  avatarText,
  description,
  sxProps,
  titleFontSize,
}: JobDetailTextProps) => {
  const styles = getThemedStyles();
  const boxProps = sxProps
    ? ({ ...sxProps, display: "flex", direction: "row" } as SxProps)
    : ({ display: "flex", direction: "row" } as SxProps);

  return (
    <Box sx={boxProps}>
      <Typography sx={styles.descriptionTitle}>{title}</Typography>
      {avatarText && (
        <Avatar
          sx={{
            marginLeft: "10px",
            width: "20px",
            height: "20px",
            bgcolor: "#001C3B",
          }}
        >
          {avatarText}
        </Avatar>
      )}
      <Typography sx={styles.description}>{description}</Typography>
    </Box>
  );
};
