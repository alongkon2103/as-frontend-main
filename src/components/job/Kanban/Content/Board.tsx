import React from "react";
import { getThemedStyles } from "./style";
import { Box, Grid, Typography } from "@mui/material";
import { ChildItem } from "@/store/features/Jobs/KanbanSlice";
import Ticket from "./Ticket";
import { redText } from "@/utils/utils";

export type BoardType = {
  title: string;
  idx: number;
  items: ChildItem[];
};
function Board({ title, items, idx }: BoardType) {
  const styles = getThemedStyles();

  const ticketsContent = items.map((item: ChildItem, id) => {
    return <Ticket item={item} key={id} />;
  });

  function getBoardBgColor(label: string) {
    if (label === "Late" || label === "Stopped" || label === "Rejected") {
      return {
        background: "#FDEDED",
      };
    }
    return {
      background: "#EAEDF1",
    };
  }

  function getBoardTitleColor(label: string) {
    if (label === "Late" || label === "Stopped" || label === "Rejected") {
      return {
        color: redText,
      };
    }
    return {};
  }

  return (
    <Box
      style={{
        ...styles.board,
        marginLeft: `${idx > 0 ? "1vw" : ""}`,
        ...getBoardBgColor(title),
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="start"
      >
        <Typography sx={{ ...styles.boardTitle, ...getBoardTitleColor(title) }}>
          {title}
        </Typography>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="start"
        >
          {ticketsContent}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Board;
