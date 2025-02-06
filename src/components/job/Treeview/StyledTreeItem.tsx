import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeItem, { TreeItemProps, treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import { getThemedStyles } from "./style";
import Image from "next/image";
import { orangeText, redText } from "@/utils/utils";

export type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  bgColorForDarkMode?: string;
  color?: string;
  colorForDarkMode?: string;
  materialId?: string;
  subOrderId: string;
  qty: number;
  matltag?: number;
  totalQty: string;
  status: string;
  plnStatus?: string;
  refType?: string;
  refNum?: string;
  refLine?: number;
  startdate?: string;
  enddate?: string;
  oper?: string;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

export default function StyledTreeItem(props: StyledTreeItemProps) {
  const theme = useTheme();
  const style = getThemedStyles();
  const {
    bgColor,
    color,
    materialId,
    subOrderId,
    qty,
    totalQty,
    status,
    ...other
  } = props;

  const styleProps = {
    "--tree-view-color": theme.palette.mode !== "dark" ? color : color,
    "--tree-view-bg-color": theme.palette.mode !== "dark" ? bgColor : color,
  };

  let problemStyling =
    status === "Problem" ||
    status === "Late" ||
    status === "Stopped" ||
    status === "Delayed"
      ? style.problem
      : {};

  const getSpanStyling = () => {
    if (
      status === "Problem" ||
      status === "Late" ||
      status === "Stopped" ||
      status === "Delayed"
    ) {
      return redText;
    }
    if (subOrderId.startsWith("PLN")) {
      return orangeText;
    }
    return "#225FA6";
  };

  return (
    <StyledTreeItemRoot
      label={
        <Box
          sx={{
            display: "flex",
            p: 0.5,
            pr: 0,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: "inherit",
              flexGrow: 1,
              ...style.materialId,
            }}
          >
            {materialId}{" "}
            <span style={{ ...style.subOrderId, color: getSpanStyling() }}>
              ({subOrderId})
            </span>
          </Typography>
          <Typography variant="caption" color="inherit" sx={problemStyling}>
            <span style={{ ...style.qty, ...problemStyling }}>{qty}</span>/{" "}
            <span style={{ ...style.totalQty, ...problemStyling }}>
              {totalQty}
            </span>
          </Typography>
          <Image
            src={
              status === "Done"
                ? "/jobs/success.svg"
                : status === "Problem"
                ? "/jobs/warning.svg"
                : "/jobs/schedule.svg"
            }
            width={16}
            height={16}
            style={style.icon}
            alt="info"
          />
        </Box>
      }
      {...other}
    />
  );
}
