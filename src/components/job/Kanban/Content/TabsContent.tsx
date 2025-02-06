import { ChildItem, Stage } from "@/store/features/Jobs/KanbanSlice";
import { useAppSelector } from "@/store/hooks";
import React, { useEffect, useState } from "react";
import { getThemedStyles } from "./style";
import _ from "lodash";
import Board from "./Board";
import { Box, Grid } from "@mui/material";

export type Group = {
  [key: string]: ChildItem[];
};

export type BoardType = {
  title: string;
  items: ChildItem[];
};

function TabsContent({ stage }: { stage: Stage }) {
  const styles = getThemedStyles();
  const { kanban } = useAppSelector((state) => state.kanban);
  const { childItems } = kanban || { childItems: [] };
  const [currentBoardItems, setCurrentBoardItems] = useState<ChildItem[]>([]);
  const [groups, setGroups] = useState<Group[] | any>({});
  const [boards, setBoards] = useState<BoardType[] | []>([]);

  useEffect(() => {
    if (stage && Object.keys(stage).length > 0) {
      let currentItems = childItems.filter(
        (item: ChildItem) => item.stage === stage.name
      );
      setCurrentBoardItems(currentItems);
    }
  }, [stage, childItems]);

  useEffect(() => {
    let groupedItems = _.groupBy(currentBoardItems, "status");
    setGroups(groupedItems);
  }, [currentBoardItems]);

  useEffect(() => {
    let boardList: BoardType[] = [];
    for (let key in groups) {
      boardList.push({
        title: key,
        items: groups[key],
      });
    }
    setBoards(boardList);
  }, [groups]);
  let boardsContents = boards.map((board: BoardType, idx) => {
    return (
      <Board key={idx} idx={idx} title={board.title} items={board.items} />
    );
  });

  return (
    <Box style={styles.content}>
      <Grid
        container
        direction="row"
        justifyContent="start"
        style={{ flexWrap: "nowrap" }}
      >
        {boardsContents}
      </Grid>
    </Box>
  );
}

export default TabsContent;
