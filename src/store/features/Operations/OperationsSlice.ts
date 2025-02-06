"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface OperationsSliceProps {
  operation: number | string;
  workCenter: string;
}

export type OperationsSliceParams = {
  job: string;
  suffix: number;
};

export const fetchOperations = createAsyncThunk(
  "operations",
  async (params: OperationsSliceParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/jobs/jobOperations`, {
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

const operationsInitialStage = {
  operations: [] as OperationsSliceProps[],
  loading: false,
  error: null,
};

const OperationsSlice = createSlice({
  name: "operations",
  initialState: operationsInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOperations.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOperations.fulfilled, (state, { payload }) => {
      state.operations = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchOperations.rejected, (state) => {
      state.loading = false;
      return operationsInitialStage;
    });
  },
});

export default OperationsSlice.reducer;
export const OperationsActions = OperationsSlice.actions;
