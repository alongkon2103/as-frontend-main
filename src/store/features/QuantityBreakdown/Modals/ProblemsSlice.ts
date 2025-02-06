"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { ProblemsHover } from "../QuantityBreakdownSlice";

export interface ProblemParams {
    fromDate: string;
    toDate: string;
    projectId: number;
}

export const fetchQBProblems = createAsyncThunk(
  "dashboard/planner/quantityBreakdown/problems",
  async (params: ProblemParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(
        `${url}/dashboard/planner/quantityBreakdown/problems`,
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

export interface ProblemsHoverInitialStageProps {
  data: ProblemsHover[];
  loading: boolean;
  error: any;
}

export const ProblemsHoverInitialState: ProblemsHoverInitialStageProps =
  {
    data: [],
    loading: false,
    error: null,
  };

const ProblemsSlice = createSlice({
  name: "problemsItems",
  initialState: ProblemsHoverInitialState,
  reducers: {
    resetProblemsHovers: (state) => {
        state.data = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQBProblems.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchQBProblems.fulfilled, (state, { payload }) => {
      state.data = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchQBProblems.rejected, (state) => {
      state.loading = false;
      return ProblemsHoverInitialState;
    });
  },
});

export default ProblemsSlice.reducer;
export const ProblemsSliceActions = ProblemsSlice.actions;
