"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export type CoJobParams = {
  coNum: string;
  coLine: number;
  item: string;
  dueDate: string;
};

export type CoJobProps = {
  job: string;
  lot: string;
  shipped: string;
  qty: number;
};

export const fetchCoJobs = createAsyncThunk(
  "co_jobs",
  async (params: CoJobParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/productionOverview/co/jobs`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: params,
      });
      return res.data;
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
      return rejectWithValue(e.response.data);
    }
  }
);

interface coJobsInitialStageProps {
  coJobs: CoJobProps[];
  loading: boolean;
  error: any;
}

export const coJobsInitialStage: coJobsInitialStageProps = {
  coJobs: [] as CoJobProps[],
  loading: false,
  error: null,
};

const CoJobsSlice = createSlice({
  name: "co_jobs",
  initialState: coJobsInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCoJobs.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCoJobs.fulfilled, (state, { payload }) => {
      state.coJobs = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchCoJobs.rejected, (state) => {
      state.loading = false;
      return coJobsInitialStage;
    });
  },
});

export default CoJobsSlice.reducer;
export const CoJobsActions = CoJobsSlice.actions;
