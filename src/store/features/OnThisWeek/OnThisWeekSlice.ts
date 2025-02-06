"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface WeeklyStatsProps {
  projectName: string;
  onGoing: number;
  planToStart: number;
  finished: number;
  goalToFinish: number;
  startedBeforeStartDate: number;
  finishedBeforeEndDate: number;
  scrappedThisWeek: number;
}

export type OnThisWeekParams = {
  id: number;
  toDate: string;
  fromDate: string;
};

export const fetchOnThisWeek = createAsyncThunk(
  "dashboard/projects/id/weeklyStats",
  async (params: OnThisWeekParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(
        `${url}/dashboard/projects/${params.id}/weeklyStats`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          params: {
            toDate: params.toDate,
            fromDate: params.fromDate,
          },
        }
      );
      return res.data;
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
      return rejectWithValue(e.response.data);
    }
  }
);

const onThisWeekInitialStage = {
  weeklyStats: {
    projectName: "",
    onGoing: 0,
    planToStart: 0,
    finished: 0,
    goalToFinish: 0,
    startedBeforeStartDate: 0,
    finishedBeforeEndDate: 0,
    scrappedThisWeek: 0,
  },
  loading: false,
  error: null,
};

const OnThisWeekSlice = createSlice({
  name: "weeklyStats",
  initialState: onThisWeekInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOnThisWeek.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOnThisWeek.fulfilled, (state, { payload }) => {
      state.weeklyStats = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchOnThisWeek.rejected, (state) => {
      state.loading = false;
      return onThisWeekInitialStage;
    });
  },
});

export default OnThisWeekSlice.reducer;
export const OnThisWeekActions = OnThisWeekSlice.actions;
