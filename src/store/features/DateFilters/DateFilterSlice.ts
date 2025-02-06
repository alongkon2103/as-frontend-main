import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface DateRangeFilterItemProps {
  startDate: string;
  endDate: string;
}

interface UsersDateFilters {
  [userId: string]: DateRangeFilterItemProps;
}

interface DateRangeFiltersState {
  dashboardDateFilters: UsersDateFilters;
  projectedDateFilters: UsersDateFilters;
  weeklyDetailFilters: UsersDateFilters;
}

export const filtersInitialState: DateRangeFiltersState = {
  dashboardDateFilters: {},
  projectedDateFilters: {},
  weeklyDetailFilters: {},
};

const DateRangeFilterSlice = createSlice({
  name: "date_range_filters",
  initialState: filtersInitialState,
  reducers: {
    updateDashBoardFilters: (
      state,
      action: PayloadAction<{
        userId: string;
        filters: DateRangeFilterItemProps;
      }>
    ) => {
      const { userId, filters } = action.payload;
      if (!state.dashboardDateFilters) {
        state.dashboardDateFilters = {};
      }
      state.dashboardDateFilters[userId] = filters;
    },
    updateProjectFilters: (
      state,
      action: PayloadAction<{
        userId: string;
        filters: DateRangeFilterItemProps;
      }>
    ) => {
      const { userId, filters } = action.payload;
      if (!state.projectedDateFilters) {
        state.projectedDateFilters = {};
      }
      state.projectedDateFilters[userId] = filters;
    },
    updateWeeklyDetailFilters: (
      state,
      action: PayloadAction<{
        userId: string;
        filters: DateRangeFilterItemProps;
      }>
    ) => {
      const { userId, filters } = action.payload;
      if (!state.weeklyDetailFilters) {
        state.weeklyDetailFilters = {};
      }
      state.weeklyDetailFilters[userId] = filters;
    },
  },
});

export default DateRangeFilterSlice.reducer;
export const DateRangeFilterActions = DateRangeFilterSlice.actions;
