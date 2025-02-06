import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import MuiCloseButton from "@mui/icons-material/Close";
import AddButton from "@mui/icons-material/Add";
import { useState } from "react";
import { DateType } from "../DateRange";
import {
  FilterActions,
  FilterItemProps,
} from "@/store/features/Filters/FilterSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import CloseButton from "../CloseButton";

export enum JobFilterProps {
  JOB = "job",
  STATUS = "status",
  OPERATOR = "operator",
  OPERATOR_MANAGER = "operator_manager",
}
export interface FilterProps {
  columns: string[];
  onClose: () => void;
  applyFilter: (filter: FilterItemProps[], statsDates?: DateType) => void;
  isJob: JobFilterProps;
  dateFilter?: boolean;
}

const defaultStatsDate = {
  fromDate: dayjs().startOf("week").format("YYYY-MM-DD"),
  toDate: dayjs().endOf("week").format("YYYY-MM-DD"),
};

const CustomFilter: React.FC<FilterProps> = ({
  columns,
  onClose,
  applyFilter,
  isJob,
  dateFilter = true,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const initialJobFilters = useAppSelector((state) => state.filters.jobFilters);
  const initalJobStatusFilter = useAppSelector(
    (state) => state.filters.jobStatusFilters
  );
  const initialOperatorFilter = useAppSelector(
    (state) => state.filters.operatorFilters
  );
  const initalOperatorMangerFilter = useAppSelector(
    (state) => state.filters.operatorManagerFilters
  );

  const applyInitialFilter = () => {
    switch (isJob) {
      case JobFilterProps.JOB:
        return initialJobFilters;
      case JobFilterProps.STATUS:
        return initalJobStatusFilter;
      case JobFilterProps.OPERATOR:
        return initialOperatorFilter;
      case JobFilterProps.OPERATOR_MANAGER:
        return initalOperatorMangerFilter;
    }
  };

  const [defaultFilter, setDefaultFilter] = useState(applyInitialFilter());
  function deleteFilter(id: number) {
    if (defaultFilter.length > 1) {
      const updatedFilter = defaultFilter.filter((item: any) => item.id !== id);
      setDefaultFilter(updatedFilter);
    } else {
      setDefaultFilter([
        {
          id: 1,
          columnValueKey: "",
          textValueKey: "",
        },
      ]);
    }
  }

  const updateData = () => {
    if (isJob === JobFilterProps.JOB) {
      dispatch(FilterActions.updateJobFilters(defaultFilter));
    } else if (isJob === JobFilterProps.STATUS) {
      dispatch(FilterActions.updateJobStatusFilters(defaultFilter));
    } else if (isJob === JobFilterProps.OPERATOR) {
      dispatch(FilterActions.updateOperatorFilters(defaultFilter));
    } else {
      dispatch(FilterActions.updateOperatorManagerFilters(defaultFilter));
    }
  };

  const handleChange = (e: any, index: number) => {
    const newcolumnValueKey = e.target.value || "";
    const updatedFilter = [...defaultFilter];
    updatedFilter[index] = {
      ...updatedFilter[index],
      columnValueKey: newcolumnValueKey,
    };
    setDefaultFilter(updatedFilter);
  };
  const handleTextValueChange = (e: any, index: number) => {
    const newTextValueKey = e.target.value || "";
    const updatedFilter = [...defaultFilter];
    updatedFilter[index] = {
      ...updatedFilter[index],
      textValueKey: newTextValueKey,
    };
    setDefaultFilter(updatedFilter);
  };

  const handleFromValueChange = (e: any, index: number) => {
    const newTextValueKey = e.target.value || "";
    const updatedFilter = [...defaultFilter];
    updatedFilter[index] = {
      ...updatedFilter[index],
      fromValue: newTextValueKey,
    };
    setDefaultFilter(updatedFilter);
  };

  const handleToValueChange = (e: any, index: number) => {
    const newTextValueKey = e.target.value || "";
    const updatedFilter = [...defaultFilter];
    updatedFilter[index] = {
      ...updatedFilter[index],
      toValue: newTextValueKey,
    };
    setDefaultFilter(updatedFilter);
  };

  const addFilterItem = () => {
    if (defaultFilter.length < columns.length) {
      const maxId = Math.max(...defaultFilter.map((filter) => filter.id));
      const newFilterItem = {
        id: maxId + 1,
        columnValueKey: "",
        textValueKey: "",
      };
      setDefaultFilter((prevFilters) => [...prevFilters, newFilterItem]);
    }
  };

  const statusOptions = [
    "Firmed",
    "Released",
    "Stopped",
    "Finished",
    "History",
  ];

  const filterArray = defaultFilter?.map((item, index) => {
    const isStatusColumn = item.columnValueKey === "status";
    const isOperationColumn = item.columnValueKey === "oper";

    return (
      <Box key={item.id} width={"100%"} sx={{ display: "flex" }}>
        <IconButton
          sx={{ width: "40px", height: "40px", alignSelf: "end" }}
          onClick={() => deleteFilter(item.id)}
        >
          <MuiCloseButton />
        </IconButton>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="column-label">{t("columns")}</InputLabel>
          <Select
            labelId="column-label"
            id={`column-select-${item.id}`}
            value={item.columnValueKey}
            label={t("columns")}
            sx={{ width: "100%" }}
            onChange={(e) => handleChange(e, index)}
          >
            {columns.map((column) => (
              <MenuItem
                key={column}
                value={column}
                disabled={defaultFilter.some(
                  (item) => item.columnValueKey === column
                )}
              >
                {column}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {isStatusColumn ? (
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id={`text-field-label-${item.id}`}>
              {t("value")}
            </InputLabel>
            <Select
              labelId={`text-field-label-${item.id}`}
              id={`text-field-select-${item.id}`}
              value={item.textValueKey}
              label={t("value")}
              sx={{ width: "100%" }}
              onChange={(e) => handleTextValueChange(e, index)}
            >
              {statusOptions.map((statusOption) => (
                <MenuItem key={statusOption} value={statusOption}>
                  {statusOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : isOperationColumn ? (
          // Render two text input fields for "oper" column
          <>
            <TextField
              id={`from-text-field-${item.id}`}
              label={t("from")}
              variant="standard"
              value={item.fromValue}
              onChange={(e) => handleFromValueChange(e, index)}
              sx={{ m: 1, minWidth: 60 }}
            />

            <TextField
              id={`to-text-field-${item.id}`}
              label={t("to")}
              variant="standard"
              value={item.toValue}
              onChange={(e) => handleToValueChange(e, index)}
              sx={{ m: 1, minWidth: 60 }}
            />
          </>
        ) : (
          <TextField
            id={`text-field-${item.id}`}
            label={t("value")}
            variant="standard"
            value={item.textValueKey}
            onChange={(e) => handleTextValueChange(e, index)}
            sx={{ m: 1, minWidth: 120 }}
          />
        )}
      </Box>
    );
  });

  function clearAll(): void {
    setDefaultFilter([
      {
        id: 1,
        columnValueKey: "",
        textValueKey: "",
      },
    ]);
  }

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              marginTop: "5px",
            }}
          >
            {t("filter")}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button variant="text" onClick={clearAll}>
              {t("clear_all")}
            </Button>
            <CloseButton onClose={onClose} />
          </Box>
        </Grid>
        <Divider sx={{ width: "100%", marginTop: "5px" }} />
        {dateFilter && (
          <>
            <Grid
              item
              xs={12}
              sx={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "flex-start",
                gap: "10px",
              }}
              justifyContent={"flex-start"}
            >
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "normal",
                  marginTop: "5px",
                }}
              >
                {t("date_range")}
              </Typography>
            </Grid>
            <Divider sx={{ width: "100%", marginTop: "10px" }} />
          </>
        )}
        <Box sx={{ height: "90vh", overflow: "scroll" }}>
          {filterArray}
          <IconButton
            sx={{
              marginRight: "10px",
              alignItems: "flex-end",
              ":hover": {
                background: "none",
              },
            }}
            onClick={() => addFilterItem()}
            disabled={defaultFilter.length >= columns.length}
          >
            <AddButton
              color={
                defaultFilter.length >= columns.length ? "disabled" : "primary"
              }
            />
            <Typography
              color={
                defaultFilter.length >= columns.length ? "disabled" : "primary"
              }
              ml={1}
              mt={1}
            >
              {t("add_filter")}
            </Typography>
          </IconButton>
        </Box>
        <Box
          sx={{
            position: "absolute",
            width: "85%",
            top: "98vh",
            transform: "translateY(-100%)",
          }}
        >
          <Divider sx={{ width: "100%", marginY: "15px" }} />
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              updateData();
              applyFilter(defaultFilter);
            }}
          >
            {t("apply_filter")}
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default CustomFilter;
