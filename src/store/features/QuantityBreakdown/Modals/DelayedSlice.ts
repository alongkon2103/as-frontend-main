"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { DelayedHover } from "../QuantityBreakdownSlice";

export interface DelayedParams {
    fromDate: string;
    toDate: string;
    projectId: number;
}

export const fetchDelayed = createAsyncThunk(
  "dashboard/planner/quantityBreakdown/delayed",
  async (params: DelayedParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(
        `${url}/dashboard/planner/quantityBreakdown/delayed`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          params: {
            toDate: params.toDate,
            fromDate: params.fromDate,
            projectId: params.projectId,
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

export interface delayedHoverInitialStageProps {
  data: DelayedHover[];
  loading: boolean;
  error: any;
}

export const delayedHoverInitialState: delayedHoverInitialStageProps =
  {
    data: [],
    loading: false,
    error: null,
  };

const DelayedSlice = createSlice({
  name: "delayedItems",
  initialState: delayedHoverInitialState,
  reducers: {
    resetDelayedHovers: (state) => {
        state.data = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDelayed.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDelayed.fulfilled, (state, { payload }) => {
      state.data = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchDelayed.rejected, (state) => {
      state.loading = false;
      return delayedHoverInitialState;
    });
  },
});

export default DelayedSlice.reducer;
export const DelayedSliceActions = DelayedSlice.actions;
