"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface OutsourceProps {
  preOutsourceIns: number;
  outsourceAtSupplier: number;
  inspectAfterOutsource: number;
}
export interface OverallStatsProps {
  projectName: string;
  totalQuantity: number;
  onGoing: number;
  notStarted: number;
  delayed: number;
  problems: number;
  stopped: number;
  outsource: OutsourceProps;
}

export type OverallStatsParams = {
  id: number;
  toDate: string;
  fromDate: string;
};

export const fetchOverallStats = createAsyncThunk(
  "dashboard/projects/:id/overallStats",
  async (params: OverallStatsParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(
        `${url}/dashboard/projects/${params.id}/overallStats`,
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

const overallStatsInitialStage = {
  overallStats: {
    projectName: "",
    totalQuantity: 0,
    onGoing: 0,
    notStarted: 0,
    delayed: 0,
    problems: 0,
    stopped: 0,
    outsource: {
      preOutsourceIns: 0,
      outsourceAtSupplier: 0,
      inspectAfterOutsource: 0,
    },
  },
  loading: false,
  error: null,
};

const OverallStatsSlice = createSlice({
  name: "overallStats",
  initialState: overallStatsInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOverallStats.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOverallStats.fulfilled, (state, { payload }) => {
      state.overallStats = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchOverallStats.rejected, (state) => {
      state.loading = false;
      return overallStatsInitialStage;
    });
  },
});

export default OverallStatsSlice.reducer;
export const OverallStatsActions = OverallStatsSlice.actions;
