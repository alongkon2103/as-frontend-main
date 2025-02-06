import {
  Box,
  Button,
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
import { Mention, MentionsInput } from "react-mentions";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsers } from "@/store/features/Users/UsersSlice";
import { CommentCard } from "./co-comment-card";
import dayjs from "dayjs";
import { fetchCoJobs } from "@/store/features/Jobs/CoJobSlice";
import {
  CoCommentBody,
  fetchCoComments,
  postCoComment,
} from "@/store/features/Comments/CoCommentSlice";
import {
  CustomerOrderParams,
  fetchCustomerOrder,
} from "@/store/features/CustomerOrder/CustomerOrderSlice";
import { ReadyToShipProps } from "@/store/features/ProductionOverview/ProductionOverviewSlice";
import { greenText, orangeText, redText } from "@/utils/utils";
import Image from "next/image";
import CloseButton from "@/components/shared/CloseButton";
export interface NotificationCoCardProps {
  params: CustomerOrderParams;
  onClose: () => void;
}

export const NotificationCoCard: React.FC<NotificationCoCardProps> = ({
  params,
  onClose,
}: NotificationCoCardProps) => {
  const styles = getThemedStyles();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchCustomerOrder(params));
    dispatch(fetchCoJobs(params));
    dispatch(fetchCoComments(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allUsers = useAppSelector((state) => state.users.users);
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
  const customerOrder = useAppSelector(
    (state) => state.customerOrder.customerOrder
  );
  const jobs = useAppSelector((state) => state.coJobs.coJobs);
  const { comments, loading: loadingComments } = useAppSelector(
    (state) => state.coComments
  );

  const [comment, setComment] = useState("");

  if (!customerOrder)
    return (
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontSize: "24px",
          }}
        >
          Error Occurred while loading Customer Order Details
        </Typography>
        <CloseButton onClose={onClose} />
      </Box>
    );
  const item = customerOrder as ReadyToShipProps;

  const postComment = () => {
    const body: CoCommentBody = {
      coNum: item.coNum,
      coLine: item.coLine,
      item: item.item,
      dueDate: item.dueDate || "",
      comment: comment,
    };
    dispatch(postCoComment(body));
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
        <Image
          src="/close.svg"
          width={30}
          height={30}
          alt="close"
          style={{ cursor: "pointer" }}
          onClick={onClose}
        />
      </Box>
      <Box
        sx={{
          marginY: "10px",
          alignItems: "center",
          display: "flex",
          gap: "10px",
        }}
      >
        <Typography sx={{ ...styles.boldText, fontSize: "18px" }}>
          Customer Order:
        </Typography>
        <Typography>{item.coNum}</Typography>
        <Typography sx={{ ...styles.boldText, fontSize: "18px" }}>
          CO Line:
        </Typography>
        <Typography>{item.coLine}</Typography>
      </Box>
      <Box
        sx={{
          marginY: "10px",
          alignItems: "center",
          display: "flex",
          gap: "10px",
        }}
      >
        <Typography sx={{ ...styles.boldText, fontSize: "18px" }}>
          Due Date:
        </Typography>
        <Typography sx={{ fontSize: "18px", color: getTextColor(item) }}>
          {item.dueDate ? dayjs(item.dueDate).format("DD/MM/YY") : "-"}
        </Typography>
      </Box>
      <Box
        sx={{
          marginY: "10px",
          alignItems: "center",
          display: "flex",
          gap: "10px",
        }}
      >
        <Typography sx={{ ...styles.boldText, fontSize: "18px" }}>
          Projected Date:
        </Typography>
        <Typography>
          {item.projectedDate
            ? dayjs(item.projectedDate).format("DD/MM/YY")
            : "-"}
        </Typography>
        <Typography
          sx={{
            color: "rgba(0, 0, 0, 0.60)",
            fontSize: 12,
            fontStyle: "italic",
          }}
        >
          Updated:{" "}
          {item.updateAt ? dayjs(item.updateAt).format("DD/MM/YY") : "-"}
        </Typography>
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
          <Typography sx={{ ...styles.boldText, fontSize: "18px" }}>
            Item:
          </Typography>
          <Typography>{item.item ?? "-"}</Typography>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            gap: "10px",
            width: "50%",
          }}
        >
          <Typography sx={{ ...styles.boldText, fontSize: "18px" }}>
            Qty:
          </Typography>
          <Typography>{item.ordered ?? "-"}</Typography>
        </Box>
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
          <Typography sx={{ ...styles.boldText, fontSize: "18px" }}>
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
          <Typography sx={{ ...styles.boldText, fontSize: "18px" }}>
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
                        {dayjs(job.shipped).format("DD/MM/YY")}
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
