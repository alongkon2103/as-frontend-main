import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import TabGroup from "./Tabs/TabGroup";
import {
  Stage,
  fetchOnTreeViewDependenciesDetails,
} from "@/store/features/Jobs/KanbanSlice";
import TabsContent from "./Content/TabsContent";

function Kanban({
  suffix,
  projectId,
  selectedBlock,
}: {
  suffix: string;
  projectId: string;
  selectedBlock: any;
}) {
  const dispatch = useAppDispatch();
  const [currentStage, setCurrentStage] = useState<Stage | {}>({});

  function handleTabUpdate(stage: Stage) {
    setCurrentStage(stage);
  }

  useEffect(() => {
    if (Object.keys(selectedBlock).length > 0) {
      dispatch(
        fetchOnTreeViewDependenciesDetails({
          job: selectedBlock.refNum,
          matltag: selectedBlock.matltag,
          suffix,
          projectId,
        })
      );
    }
  }, [dispatch, projectId, selectedBlock, suffix]);
  return (
    <Box sx={{ marginTop: "2vh" }}>
      <TabGroup updatedtab={handleTabUpdate} />
      {currentStage && <TabsContent stage={currentStage as Stage} />}
    </Box>
  );
}

export default Kanban;
