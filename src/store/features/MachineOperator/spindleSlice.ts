"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface SpindleParams {
  machineName: string;
}

export const fetchSpindle = createAsyncThunk(
  "spindle",
  async (params: SpindleParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/operator/spindle`, {
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

export interface SpindleProps {
  load: number;
  runTime: number;
  speed: number;
}

export interface SpindleInitialStageProps {
  spindle: SpindleProps;
  loading: boolean;
  error: any;
}

const spindleInitialStage: SpindleInitialStageProps = {
  spindle: {
    load: 0,
    runTime: 0,
    speed: 0,
  },
  loading: false,
  error: null,
};

const SpindleSlice = createSlice({
  name: "spindle",
  initialState: spindleInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSpindle.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSpindle.fulfilled, (state, { payload }) => {
      state.spindle = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchSpindle.rejected, (state) => {
      state.loading = false;
      return spindleInitialStage;
    });
  },
});

export default SpindleSlice.reducer;
export const SpindleActions = SpindleSlice.actions;
