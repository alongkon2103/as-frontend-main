import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeView from "@mui/lab/TreeView";
import StyledTreeItem, { StyledTreeItemProps } from "./StyledTreeItem";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchOnTreeViewDependencies } from "@/store/features/Jobs/TreeViewSlice";
import { HeaderActions } from "@/store/features/Header/HeaderSlice";
export interface CustomTreeViewProps {
  job: string;
  suffix: number;
  setSelectedBlock: (block: StyledTreeItemProps) => void;
  hasData: (data: boolean) => void;
}

export default function ControlledTreeView({
  job,
  suffix,
  setSelectedBlock,
  hasData,
}: CustomTreeViewProps) {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState<string[]>([]);

  useEffect(() => {
    setExpanded([]);
    dispatch(fetchOnTreeViewDependencies({ job, suffix }));
  }, [dispatch, job, suffix]);

  const { treeview } = useAppSelector((state) => state.treeview);

  useEffect(() => {
    // Assuming `treeview` is a prop or state variable
    if (treeview && treeview.length > 0) {
      hasData(true);
    } else {
      hasData(false);
    }
  }, [treeview, hasData]);

  const [selected, setSelected] = useState<string>(
    treeview && (treeview[0] as StyledTreeItemProps)?.materialId
      ? `${(treeview[0] as StyledTreeItemProps).materialId}_${
          (treeview[0] as StyledTreeItemProps).subOrderId
        }_${(treeview[0] as StyledTreeItemProps).matltag}`
      : ""
  );

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (_event: React.SyntheticEvent, nodeId: string) => {
    const data = nodeId.split("_");
    dispatch(HeaderActions.upsertHeaders({ job: `${data[0]} (${data[1]})` }));
    setSelected(nodeId);
  };

  useEffect(() => {
    setExpanded([]);
    dispatch(fetchOnTreeViewDependencies({ job, suffix }));
  }, [dispatch, job, suffix]);

  useEffect(() => {
    if (treeview && treeview.length > 0) {
      setSelectedBlock(treeview[0] as StyledTreeItemProps);
    } else {
      setSelectedBlock({} as StyledTreeItemProps);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [treeview]);

  function handleClick(block: StyledTreeItemProps) {
    setSelectedBlock(block);
  }

  function generateCustomTreeView(
    block: StyledTreeItemProps,
    id: React.Key | null | undefined
  ) {
    return (
      <StyledTreeItem
        key={id}
        nodeId={`${block.materialId}_${block.subOrderId}_${block.matltag}`}
        materialId={block.materialId}
        subOrderId={block.subOrderId}
        qty={block.qty}
        totalQty={block.totalQty}
        status={block.status}
        onClick={() => handleClick(block)}
      >
        {block?.children &&
          (block.children as any[]).length > 0 &&
          (block.children as any[]).map((subBlock, idx) => {
            return generateCustomTreeView(subBlock, `${id}_${idx}`);
          })}
      </StyledTreeItem>
    );
  }

  const CustomTreeView =
    treeview !== null ? (
      treeview.map((block, id) => {
        return generateCustomTreeView(block, id.toString());
      })
    ) : (
      <></>
    );

  return (
    <Box sx={{ marginTop: "2vh", minWidth: "100%" }}>
      <TreeView
        aria-label="controlled"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
        defaultSelected={selected}
      >
        {CustomTreeView}
      </TreeView>
    </Box>
  );
}
