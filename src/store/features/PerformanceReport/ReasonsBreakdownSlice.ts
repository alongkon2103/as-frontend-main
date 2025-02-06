"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface ReasonsBreakdownParams {
  selectTop: string;
  businessSegment: string;
  byType: string;
  fromDate: string;
  toDate: string;
}

export const fetchReasonsBreakdown = createAsyncThunk(
  "reasons_breakdown",
  async (params: ReasonsBreakdownParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/performanceReport/reasonsBreakdown`, {
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

export interface ReasonsBreakdownProps {
  project?: string;
  reasons?: string;
  minutes: number;
}

export interface ReasonsBreakdownInitialStageProps {
  reasonsBreakdown: ReasonsBreakdownProps[];
  loading: boolean;
  error: any;
}

export const reasonBreakdownInitialStage: ReasonsBreakdownInitialStageProps = {
  reasonsBreakdown: [],
  loading: false,
  error: null,
};

const ReasonsBreakdownSlice = createSlice({
  name: "reasons_breakdown",
  initialState: reasonBreakdownInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReasonsBreakdown.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchReasonsBreakdown.fulfilled, (state, { payload }) => {
      state.reasonsBreakdown = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchReasonsBreakdown.rejected, (state) => {
      state.loading = false;
      return reasonBreakdownInitialStage;
    });
  },
});

export default ReasonsBreakdownSlice.reducer;
export const ReasonsBreakdownActions = ReasonsBreakdownSlice.actions;
