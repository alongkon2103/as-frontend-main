import { getThemedStyles } from "./styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Avatar, Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { resolveComment } from "@/store/features/Comments/ProblemCommentsSlice";
import { greenBackground, greenText } from "@/utils/utils";
import { Comment } from "@/components/shared/Comment";

export interface CommentProps {
  id: number;
  userName: string;
  operation: number;
  problemDescription: string;
  createdAt: string;
  description?: string;
  resolved: boolean;
  updatedBy: string;
  reload: () => void;
}

export const CommentCard: React.FC<CommentProps> = ({
  id,
  userName,
  operation,
  problemDescription,
  createdAt,
  description,
  resolved,
  updatedBy,
  reload,
}: CommentProps) => {
  const styles = getThemedStyles();
  const [markResolved, setMarkResolved] = useState(resolved);
  const dispatch = useAppDispatch();

  const updateResolved = (resolve: boolean) => {
    dispatch(resolveComment({ id: id, isResolved: resolve ? 1 : 0 }));
    setMarkResolved(resolve);
    reload();
  };

  const renderResolvedButton = () => {
    if (!markResolved) {
      return (
        <Button
          variant="outlined"
          sx={{ marginLeft: "10px" }}
          onClick={() => updateResolved(true)}
        >
          Mark Resolved
          <CheckCircleIcon sx={{ marginLeft: "10px" }} />
        </Button>
      );
    } else {
      return (
        <Button
          variant="outlined"
          sx={{
            marginLeft: "10px",
            backgroundColor: greenBackground,
            color: greenText,
            border: `1px solid ${greenText}`,
          }}
          onClick={() => updateResolved(false)}
        >
          Resolved
          <CheckCircleIcon sx={{ marginLeft: "10px" }} />
        </Button>
      );
    }
  };

  return (
    <Box mt={"16px"} sx={{ width: "100%" }}>
      <Grid container direction="row">
        <Box sx={{ width: "6%" }}>
          <Avatar>{userName && userName.length > 0 ? userName[0] : " "}</Avatar>
        </Box>
        <Box sx={{ width: "93%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "10px",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Typography sx={styles.title}>
              {`${userName} [${
                operation ? operation : "No Operation"
              } - ${problemDescription}]`}
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography sx={styles.createdAt}>{createdAt}</Typography>
              {problemDescription && renderResolvedButton()}
            </div>
          </Box>
          {problemDescription && updatedBy && resolved === true && (
            <Typography ml={"10px"}>Resolved By: {updatedBy}</Typography>
          )}
          {description && (
            <Typography sx={styles.description} ml={"10px"} mt={"8px"}>
              <Comment comment={description}/>
            </Typography>
          )}
        </Box>
      </Grid>
      <Divider sx={{ marginTop: "8px", width: "100%" }} />
    </Box>
  );
};
