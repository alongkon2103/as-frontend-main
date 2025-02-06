import dayjs from "dayjs";
import { getThemedStyles } from "./styles";
import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";

export interface CoCommentProps {
  id: number;
  userName: string;
  createdAt: string;
  comment?: string;
}

export const CommentCard: React.FC<CoCommentProps> = ({
  userName,
  createdAt,
  comment,
}: CoCommentProps) => {
  const styles = getThemedStyles();
  const highLightMentions = (text: string) => {
    const regex = /@\[\w+/g;

    const parts = text.split(" ");

    return parts.map((part, index) => {
      if (part.match(regex)) {
        return (
          <Typography key={index} component="span" sx={{ color: "blue" }}>
            {part + " "}
          </Typography>
        );
      }
      return (
        <Typography key={index} component="span">
          {part + " "}
        </Typography>
      );
    });
  };

  return (
    <Box mt={"16px"} sx={{ width: "100%" }}>
      <Grid container direction="row">
        <Box sx={{ width: "10%" }}>
          <Avatar>{userName && userName.length > 0 ? userName[0] : " "}</Avatar>
        </Box>
        <Box sx={{ width: "90%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "10px",
              width: "95%",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>{userName}</Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography sx={styles.createdAt}>
                {dayjs(createdAt).format("DD/MM/YY")}
              </Typography>
            </div>
          </Box>
          {comment && (
            <Typography sx={styles.description} ml={"10px"} mt={"8px"}>
              {highLightMentions(comment)}
            </Typography>
          )}
        </Box>
      </Grid>
      <Divider sx={{ marginTop: "8px", width: "100%" }} />
    </Box>
  );
};
