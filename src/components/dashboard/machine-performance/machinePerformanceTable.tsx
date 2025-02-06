/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */

import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import {
  PagingState,
  IntegratedPaging,
  FilteringState,
  IntegratedFiltering,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
} from "@devexpress/dx-react-grid-material-ui";

import {
  TableCell,
  Input,
  Button,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { JobCard } from "../../jobcard";
import { getThemedStyles } from "./styles";
import { MachinePerformanceProps } from "@/store/features/MachinePerformance/MachinePerformanceSlice";
import { SingleJobProps } from "@/store/features/Jobs/JobSlice";

export interface MachinePerformanceTableProps {
  machinePerformances: MachinePerformanceProps[];
}

const MachinePerformanceTable = ({
  machinePerformances,
}: MachinePerformanceTableProps) => {
  const { t } = useTranslation();
  const styles = getThemedStyles();
  const [columns] = useState([
    { name: "machineName", title: "Machine Name", filteringEnabled: true },
    { name: "project", title: "Project", filteringEnabled: true },
    { name: "job", title: "Job #", filteringEnabled: true },
    { name: "suffix", title: "Suffix", filteringEnabled: true },
    { name: "item", title: "Item", filteringEnabled: true },
    { name: "qty", title: "Qty", filteringEnabled: false },
    { name: "problem", title: "Problem", filteringEnabled: true },
    { name: "action", title: "Action", filteringEnabled: false },
  ]);

  const [data] = useState(machinePerformances ?? []);
  const [currentJob, setCurrentJob] = useState<SingleJobProps | null>(null);
  const [openJobModal, setOpenJobModal] = useState(false);

  const [tableColumnExtensions] = useState([
    { columnName: "machineName" },
    { columnName: "project" },
    { columnName: "job" },
    { columnName: "suffix" },
    { columnName: "item" },
    { columnName: "qty" },
    { columnName: "problem" },
    { columnName: "action" },
  ]);

  const tableCellStyle = (props: any) => {
    if (props.column.name === "action") {
      return (
        <TableCell height={"50px"} {...props}>
          <Button
            size="small"
            variant="text"
            sx={{
              textTransform: "none",
              cursor: "pointer",
              color: "rgba(34, 95, 166, 1)",
            }}
            onClick={() => {
              setCurrentJob(props.row);
              setOpenJobModal(true);
            }}
          >
            {t("view_card")}
          </Button>
        </TableCell>
      );
    } else if (props.column.name === "suffix") {
      return (
        <TableCell height={"50px"} {...props}>
          [ {props.value} ]
        </TableCell>
      );
    } else {
      return (
        <TableCell height={"50px"} {...props}>
          {props.value}
        </TableCell>
      );
    }
  };

  const tableHeaderRowCellStyle = (props: any) => {
    return (
      <TableCell sx={{ border: "none", padding: "5px 0 5px 15px" }}>
        <Typography fontSize={"16px"} fontWeight={700}>
          {props.column.title}
        </Typography>
      </TableCell>
    );
  };

  const filterCell = (props: any) => {
    const { column, filter, onFilter } = props;
    if (!column.filteringEnabled)
      return (
        <TableCell
          sx={{ width: "100%", padding: "5px 0 5px 15px" }}
        ></TableCell>
      );
    return (
      <TableCell sx={{ width: "100%", padding: "5px 0 5px 15px" }}>
        <Input
          placeholder={column.filteringEnabled ? "Filter..." : "Disabled"}
          {...props}
          disabled={!column.filteringEnabled}
          value={filter ? filter.value : ""}
          onChange={(e) =>
            onFilter(e.target.value ? { value: e.target.value } : null)
          }
        />
      </TableCell>
    );
  };

  const filterColumns =
    columns?.map(({ filteringEnabled, name }) => ({
      filteringEnabled,
      columnName: name,
    })) ?? [];

  return (
    <>
      <Paper
        sx={{
          marginTop: "25px",
          "& td": {
            padding: "0px 0px 0px 10px",
          },
        }}
      >
        <Grid rows={data} columns={columns}>
          <PagingState defaultCurrentPage={0} pageSize={10} />
          <IntegratedPaging />
          <FilteringState
            defaultFilters={[]}
            columnExtensions={filterColumns}
          />
          <IntegratedFiltering />
          <Table
            columnExtensions={tableColumnExtensions}
            cellComponent={tableCellStyle}
          />
          <TableHeaderRow cellComponent={tableHeaderRowCellStyle} />
          <TableFilterRow cellComponent={filterCell} />
          <PagingPanel />
        </Grid>
      </Paper>
      {currentJob && (
        <Modal
          open={openJobModal}
          onClose={() => setOpenJobModal(false)}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={styles.jobDetailFilterModal}>
            <JobCard
              jobId={currentJob?.job}
              suffix={currentJob?.suffix}
              item={currentJob?.item}
              qty={currentJob?.qty}
              oper={parseInt(currentJob?.oper?.toString())}
              startDate={currentJob?.startDate}
              endDate={currentJob?.endDate}
              onClose={() => setOpenJobModal(false)}
            />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default MachinePerformanceTable;
