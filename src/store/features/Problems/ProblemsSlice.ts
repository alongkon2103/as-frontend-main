"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface ProblemSliceProps {
  code: string;
  description: string;
  type: string;
}

export type ProblemSliceParams = {
  code?: string;
  description?: string;
};

export const fetchProblems = createAsyncThunk(
  "problems",
  async (params: ProblemSliceParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/problem/problems`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: params,
      });
      return res.data;
      // return problemsJson;
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
      return rejectWithValue(e.response.data);
    }
  }
);

const problemsInitialStage = {
  problems: [] as ProblemSliceProps[],
  loading: false,
  error: null,
};

const ProblemsSlice = createSlice({
  name: "problems",
  initialState: problemsInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProblems.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProblems.fulfilled, (state, { payload }) => {
      state.problems = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchProblems.rejected, (state) => {
      state.loading = false;
      return problemsInitialStage;
    });
  },
});

export default ProblemsSlice.reducer;
export const ProblemsActions = ProblemsSlice.actions;
