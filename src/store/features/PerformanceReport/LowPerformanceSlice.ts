"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface LowPerformanceParams {
  selectTop: string;
  businessSegment: string;
  fromDate: string;
  toDate: string;
}

export const fetchLowPerformance = createAsyncThunk(
  "low_performance",
  async (params: LowPerformanceParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/performanceReport/lowPerformance`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params,
      });
      return res.data;
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
      return rejectWithValue(e.response.data);
    }
  }
);

export interface LowPerformanceProps {
  resourceId: string;
  resourceLocation: string;
  percentage: number;
  reasons?: string;
  machineLocation: string;
  cimcoPercentage: number;
}

export interface LowPerformanceInitialStageProps {
  lowPerformance: LowPerformanceProps[];
  loading: boolean;
  error: any;
}

export const lowPerformanceInitialStage: LowPerformanceInitialStageProps = {
  lowPerformance: [],
  loading: false,
  error: null,
};

const LowPerformanceSlice = createSlice({
  name: "low_performance",
  initialState: lowPerformanceInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLowPerformance.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchLowPerformance.fulfilled, (state, { payload }) => {
      state.lowPerformance = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchLowPerformance.rejected, (state) => {
      state.loading = false;
      return lowPerformanceInitialStage;
    });
  },
});

export default LowPerformanceSlice.reducer;
export const LowPerformanceActions = LowPerformanceSlice.actions;
