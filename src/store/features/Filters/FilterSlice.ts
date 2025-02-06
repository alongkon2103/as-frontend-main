import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

export interface FilterItemProps {
  id: number;
  columnValueKey: string;
  textValueKey: string;
  toValue?: string;
  fromValue?: string;
}

interface jobsInitialStageProps {
  jobFilters: FilterItemProps[];
  jobStatusFilters: FilterItemProps[];
  operatorFilters: FilterItemProps[];
  operatorManagerFilters: FilterItemProps[];
}

export const filtersInitialStage: jobsInitialStageProps = {
  jobFilters: [
    {
      id: 1,
      columnValueKey: "",
      textValueKey: "",
    },
  ],
  jobStatusFilters: [
    {
      id: 1,
      columnValueKey: "",
      textValueKey: "",
    },
  ],
  operatorFilters: [
    {
      id: 1,
      columnValueKey: "",
      textValueKey: "",
    },
  ],
  operatorManagerFilters: [
    {
      id: 1,
      columnValueKey: "",
      textValueKey: "",
    },
  ],
};

const FilterSlice = createSlice({
  name: "filters",
  initialState: filtersInitialStage,
  reducers: {
    updateJobFilters: (state, action: PayloadAction<FilterItemProps[]>) => {
      state.jobFilters = action.payload;
    },
    updateJobStatusFilters: (
      state,
      action: PayloadAction<FilterItemProps[]>
    ) => {
      state.jobStatusFilters = action.payload;
    },
    updateOperatorFilters: (
      state,
      action: PayloadAction<FilterItemProps[]>
    ) => {
      state.operatorFilters = action.payload;
    },
    updateOperatorManagerFilters: (
      state,
      action: PayloadAction<FilterItemProps[]>
    ) => {
      state.operatorManagerFilters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return filtersInitialStage;
    });
  },
});

export default FilterSlice.reducer;
export const FilterActions = FilterSlice.actions;
