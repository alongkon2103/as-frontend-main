/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Typography,
  Paper,
  Modal,
} from "@mui/material";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { TableSortLabel } from "@mui/material";
import QuantityBreakdownRow from "./row";
import { DateType } from "@/components/shared/DateRange";
import {
  QuantityBreakdownProps,
  fetchQuantityBreakdown,
} from "@/store/features/QuantityBreakdown/QuantityBreakdownSlice";
import { useTranslation } from "react-i18next";
import { mapFieldToSortKey } from "@/utils/utils";
import DelayedModal from "./Modals/DelayedModal";
import ProblemModal from "./Modals/ProblemModal";
import { ProblemsSliceActions } from "@/store/features/QuantityBreakdown/Modals/ProblemsSlice";
import { DelayedSliceActions } from "@/store/features/QuantityBreakdown/Modals/DelayedSlice";

const QuantityBreakdown: React.FC<DateType> = ({ fromDate, toDate }) => {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.quantityBreakdown);
  const { t } = useTranslation();
  const [sortBy, setSortBy] = React.useState("");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc"
  );
  const [openProblemModal, setOpenProlbemModal] = useState(false);
  const [openDelayedModal, setOpenDelayedModal] = useState(false);
  const [id, setId] = useState(0);
  const [projectName, setProjectName] = useState("");

  function loadData() {
    if (fromDate.trim() !== "")
      dispatch(
        fetchQuantityBreakdown({
          fromDate,
          toDate,
        })
      );
  }

  useEffect(() => {
    loadData();
  }, [fromDate, toDate]);

  const headers = [
    t("project"),
    t("firmed"),
    t("released"),
    t("progress"),
    t("delayed"),
    t("problems"),
    t("action"),
  ];

  const handleSort = (field: string) => {
    field = mapFieldToSortKey(field, t);
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const sortedData = data
    ?.slice()
    .sort((a: QuantityBreakdownProps, b: QuantityBreakdownProps) => {
      if (sortBy === "") return 0;

      const aValue = a[sortBy as keyof QuantityBreakdownProps];
      const bValue = b[sortBy as keyof QuantityBreakdownProps];

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const tableColumns = sortedData?.map((row, index) => (
    <QuantityBreakdownRow
      row={row}
      index={index}
      key={index}
      onClick={(id, type) => {
        setId(id);
        setProjectName(row.projectName);
        if (type === "delayed") {
          setOpenDelayedModal(true);
        }
        if (type === "problems") {
          setOpenProlbemModal(true);
        }
      }}
    />
  ));

  if (!sortedData) {
    return (
      <Grid
        item
        xs={12}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image
          src="/no_results_found.svg"
          width={800}
          height={500}
          alt="No Results Found"
        />
      </Grid>
    );
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} mt="10px">
          <TableContainer
            component={Paper}
            sx={{
              background: "#F4F7FA",
              "& td": {
                padding: "0px 0px 0px 10px",
              },
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map((header, index) => (
                    <TableCell key={index} sx={{ padding: "5px 5px 5px 10px" }}>
                      {header !== "Action" ? (
                        <TableSortLabel
                          active={sortBy === header.toLowerCase()}
                          direction={sortDirection}
                          onClick={() => handleSort(header.toLowerCase())}
                        >
                          <Typography
                            sx={{
                              fontFamily: "Roboto",
                              fontSize: "16px",
                              fontWeight: 800,
                            }}
                          >
                            {header}
                          </Typography>
                        </TableSortLabel>
                      ) : (
                        <Typography
                          sx={{
                            fontFamily: "Roboto",
                            fontSize: "16px",
                            fontWeight: 800,
                          }}
                        >
                          {header}
                        </Typography>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={12} align="center">
                      <CircularProgress sx={{ marginY: "15px" }} />
                    </TableCell>
                  </TableRow>
                ) : (
                  tableColumns
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Modal 
        open={openDelayedModal} 
        onClose={() => setOpenDelayedModal(false)}
        aria-labelledby="delayed-modal-title"
        aria-describedby="delayed-modal-description">
        <DelayedModal
          id={id}
          projectName={projectName}
          fromDate={fromDate}
          toDate={toDate}
          onClose={() => {
            setOpenDelayedModal(false)
            dispatch(DelayedSliceActions.resetDelayedHovers);
          }}
        />
      </Modal>
      <Modal 
        open={openProblemModal} 
        onClose={() => setOpenProlbemModal(false)}
        aria-labelledby="problem-modal-title"
        aria-describedby="problem-modal-description">
        <ProblemModal
          id={id}
          projectName={projectName}
          fromDate={fromDate}
          toDate={toDate}
          onClose={() => {
            setOpenProlbemModal(false)
            dispatch(ProblemsSliceActions.resetProblemsHovers);
          }}
        />
      </Modal>
    </>
  );
};

export default QuantityBreakdown;
