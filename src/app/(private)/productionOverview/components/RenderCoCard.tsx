import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getThemedStyles } from "./styles";
import { ReadyToShipProps } from "@/store/features/ProductionOverview/ProductionOverviewSlice";
import { Mention, MentionsInput } from "react-mentions";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsers } from "@/store/features/Users/UsersSlice";
import dayjs from "dayjs";
import { fetchCoJobs } from "@/store/features/Jobs/CoJobSlice";
import {
  CoCommentBody,
  fetchCoComments,
  postCoComment,
} from "@/store/features/Comments/CoCommentSlice";
import { CommentCard } from "@/components/layout/Header/notifications/co-card/co-comment-card";
import { greenText, orangeText, redText } from "@/utils/utils";
import { ProductionOverviewsActions } from "@/store/features/ProductionOverview/ProductionOverviewSlice";
import CloseButton from "@/components/shared/CloseButton";
import { Block } from "@mui/icons-material";

export interface CoExtraProps {
  index: number;
  itemIndex: number;
  rowIndex: number;
}
export interface CoCardProps {
  item: ReadyToShipProps;
  projectId: number;
  onClose: () => void;
  extraData?: CoExtraProps;
}

export const CoCard: React.FC<CoCardProps> = ({
  item,
  projectId,
  onClose,
  extraData,
}: CoCardProps) => {
  const styles = getThemedStyles();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const params = {
      coNum: item.coNum,
      coLine: item.coLine,
      item: item.item,
      dueDate: dayjs(item.coDate).format("YYYY/MM/DD"),
      projectId: projectId.toString(),
    };
    dispatch(fetchUsers());
    dispatch(fetchCoJobs(params));
    dispatch(fetchCoComments(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allUsers = useAppSelector((state) => state.users.users);
  const productionOverviews = useAppSelector(
    (state) => state.productionOverviews.productionOverviews
  );
  const targetItem = productionOverviews.find(
    (overview) => overview.itemDetails.name === item.item)
  const getTextColor = (item: { color: string }) => {
    switch (item.color) {
      case "red":
        return redText;
      case "green":
        return greenText;
      case "yellow":
        return orangeText;
      default:
        return "";
    }
  };

  const jobs = useAppSelector((state) => state.coJobs.coJobs);
  const { comments, loading: loadingComments } = useAppSelector(
    (state) => state.coComments
  );

  const [comment, setComment] = useState("");
  const [lastComment, setLastComment] = useState(
    comments?.length > 0 ? comments[comments.length - 1].comment : ""
  );

  const postComment = () => {
    const body: CoCommentBody = {
      coNum: item.coNum,
      coLine: item.coLine,
      item: item.item,
      dueDate: item.coDate,
      projectId: projectId.toString(),
      comment: comment,
      notificationData: {
        coNum: item.coNum,
        coLine: item.coLine,
        coDate: item.coDate,
        ordered: item.ordered,
        fg: item.fg,
        shipped: item.shipped,
        projectedDate: item.projectedDate,
        message: item.message,
        type: item.type,
        item: item.item,
        qty: item.qty,
        updateAt: item.updateAt,
        color: item.color,
        projectId: projectId.toString(),
      },
    };
    dispatch(postCoComment(body));
    dispatch(
      ProductionOverviewsActions.upsertComment({
        index: extraData?.index ?? 0,
        itemIndex: extraData?.itemIndex ?? 0,
        rowIndex: extraData?.rowIndex ?? 0,
        comment: comment,
      })
    );
    setLastComment(comment);
    setComment("");
  };

  const renderComments = () => {
    return comments.map((comment) => {
      return (
        <CommentCard
          id={1}
          key={comment.id}
          userName={comment.createdBy}
          comment={comment.comment}
          createdAt={comment.createDate}
        />
      );
    });
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{
            ...styles.boldText,
            fontSize: "24px",
          }}
        >
          Customer Order Details
        </Typography>
        <CloseButton onClose={onClose} />
      </Box>
      <Box sx={{ display: "flex", marginY: "10px" }}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            gap: "10px",
            width: "50%",
          }}
        >
          <Typography sx={{ ...styles.boldText, fontSize: "16px" }}>
            Customer Order:
          </Typography>
          <Typography>{item.coNum}</Typography>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            gap: "10px",
            width: "50%",
          }}
        >
          <Typography sx={{ ...styles.boldText, fontSize: "16px" }}>
            CO Line:
          </Typography>
          <Typography>{item.coLine}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            gap: "10px",
            width: "50%",
          }}
        >
          <Typography sx={{ ...styles.boldText, fontSize: "14px" }}>
            Due Date:
          </Typography>
          <Typography sx={{ color: getTextColor(item) }}>
            {item.coDate ? dayjs(item.coDate).format("DD/MM/YY") : "-"}
          </Typography>
        </Box>

        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            gap: "10px",
            width: "50%",
          }}
        >
          <Typography sx={{ ...styles.boldText, fontSize: "14px" }}>
            Requested Date:
          </Typography>
          <Typography>
            {item.requestedDate
              ? dayjs(item.requestedDate).format("DD/MM/YY")
              : "-"}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            gap: "10px",
            width: "50%",
          }}
        >
          <Typography sx={{ ...styles.boldText, fontSize: "14px" }}>
            Projected Date:
          </Typography>
          <Typography>
            {item.projectedDate
              ? dayjs(item.projectedDate).format("DD/MM/YY")
              : "-"}
          </Typography>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            gap: "10px",
            width: "50%",
          }}
        >
          <Typography sx={{ ...styles.boldText, fontSize: "14px" }}>
            Recovery Date::
          </Typography>

          <Typography>
            {item.recoveryDate
              ? dayjs(item.recoveryDate).format("DD/MM/YY")
              : "-"}
          </Typography>
        </Box>
      </Box>

      <Box>
        <Typography
          sx={{
            color: "rgba(0, 0, 0, 0.60)",
            fontSize: 12,
            fontStyle: "italic",
            marginTop: "-0.2vh",
          }}
        >
          Updated:{" "}
          {item.updateAt ? dayjs(item.updateAt).format("DD/MM/YY") : "-"}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", marginTop: "2vh" }}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            gap: "10px",
            width: "50%",
          }}
        >
          <Typography sx={{ ...styles.boldText, fontSize: "14px" }}>
            Item:
          </Typography>
          <Typography>
            {item.item ?? "-"}
            {targetItem?.itemDetails?.blockStatus == "1" && (
            <Chip
              size="small"
              label="Block"
              icon={<Block  color="error" />}
              sx={{
                marginLeft: "1vh",
                backgroundColor: "#FDEDED",
                color: "#D32F2F",
                fontWeight: "bold",
              }}
            />
          )}
          </Typography>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            gap: "10px",
            width: "50%",
          }}
        >
          <Typography sx={{ ...styles.boldText, fontSize: "14px" }}>
            Qty:
          </Typography>
          <Typography>{item.ordered ?? "-"}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            gap: "10px",
            width: "50%",
          }}
        >
          <Typography sx={{ ...styles.boldText, fontSize: "14px" }}>
            FG:
          </Typography>
          <Typography>{item.fg ?? "-"}</Typography>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            gap: "10px",
            width: "50%",
          }}
        >
          <Typography sx={{ ...styles.boldText, fontSize: "14px" }}>
            Ordered:
          </Typography>
          <Typography>{item.ordered ?? "-"}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            gap: "10px",
            width: "50%",
          }}
        >
          <Typography sx={{ ...styles.boldText, fontSize: "14px" }}>
            Reserved:
          </Typography>
          <Typography>{item.reserved ?? "-"}</Typography>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            gap: "10px",
            width: "50%",
          }}
        >
          <Typography sx={{ ...styles.boldText, fontSize: "14px" }}>
            Picked:
          </Typography>
          <Typography>{item.picked ?? "-"}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            gap: "10px",
            width: "50%",
          }}
        >
          <Typography sx={{ ...styles.boldText, fontSize: "14px" }}>
            Packed:
          </Typography>
          <Typography>{item.packed ?? "-"}</Typography>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            gap: "10px",
            width: "50%",
          }}
        >
          <Typography sx={{ ...styles.boldText, fontSize: "14px" }}>
            Shipped:
          </Typography>
          <Typography>{item.shipped ?? "-"}</Typography>
        </Box>
      </Box>

      <Box
        className="job-table"
        sx={{
          marginY: "20px",
          backgroundColor: "#F4F7FA",
          maxHeight: "300px",
          minHeight: "300px",
          overflow: "auto",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableCell sx={{ backgroundColor: "#F4F7FA" }}>JOB #</TableCell>
            <TableCell sx={{ backgroundColor: "#F4F7FA" }}>LOT #</TableCell>
            <TableCell sx={{ backgroundColor: "#F4F7FA" }}>Shipped</TableCell>
            <TableCell sx={{ backgroundColor: "#F4F7FA" }}>Qty</TableCell>
          </TableHead>
          <TableBody>
            {jobs &&
              jobs.length > 0 &&
              jobs.map((job, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography sx={{ color: "#225FA6" }}>
                        {job.job}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
                        {job.lot}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
                        {job.shipped
                          ? dayjs(job.shipped).format("DD/MM/YY")
                          : "-"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
                        {job.qty}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            {!jobs ||
              (jobs.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    sx={{ alignItems: "center", textAlign: "center" }}
                  >
                    No Jobs Found for this Customer Order
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
      <Grid container mt={"16px"}>
        <Typography sx={styles.detailsTitle}>
          {t("all_comments")} ({comments?.length ?? 0})
        </Typography>
        <MentionsInput
          value={comment}
          onChange={(e: any) => setComment(e.target.value)}
          placeholder={` ${t("write_a_comment")}`}
          style={{
            width: "100%",
            minHeight: "60px",
            borderRadius: "8px",
            border: "none",
            marginTop: "15px",
            suggestions: {
              list: {
                backgroundColor: "white",
                border: "1px solid rgba(0,0,0,0.15)",
                fontSize: 16,
                maxHeight: "200px",
                overflow: "scroll",
              },
              item: {
                padding: "5px 15px",
                borderBottom: "1px solid rgba(0,0,0,0.15)",
                "&focused": {
                  backgroundColor: "#cee4e5",
                },
              },
            },
          }}
        >
          <Mention
            style={{
              position: "relative",
              zIndex: 1,
              color: "blue",
              textShadow:
                "1px 1px 1px white, 1px -1px 1px white, -1px 1px 1px white, -1px -1px 1px white",
              textDecoration: "none",
              pointerEvents: "none",
            }}
            displayTransform={(id: any, display: any) => {
              return `@${display}`;
            }}
            data={allUsers}
            trigger={"@"}
            appendSpaceOnAdd
          />
        </MentionsInput>

        <Button
          variant="contained"
          sx={{ marginTop: "16px" }}
          onClick={() => postComment()}
        >
          {t("submit")}
        </Button>
      </Grid>
      <Grid
        container
        mt={"15px"}
        sx={{ maxHeight: "100px", overflowY: "scroll" }}
      >
        <Grid item xs={12}>
          {loadingComments && (
            <Box
              sx={{
                margin: "1vw",
                padding: "15px",
                border: "1px solid rgba(0,0,0,0.15)",
              }}
            >
              <CircularProgress size={15} sx={{ marginRight: 3 }} />
              We are loading the comments ... please wait.
            </Box>
          )}
          {!loadingComments && comments?.length > 0 && renderComments()}
        </Grid>
      </Grid>
    </Box>
  );
};
