"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface ProcessMachineProps {
  machineName: string;
}

interface ProcessMachineParams {
  factory: string;
}

export const fetchProcessMachines = createAsyncThunk(
  "process_machines",
  async (params: ProcessMachineParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/operator/processMachines`, {
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

export interface processMachinesInitialStageProps {
  processMachines: [];
  loading: boolean;
  error: any;
}

export const processMachinesInitialStage: processMachinesInitialStageProps = {
  processMachines: [],
  loading: false,
  error: null,
};

const ProcessMachinesSlice = createSlice({
  name: "process_machines",
  initialState: processMachinesInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProcessMachines.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProcessMachines.fulfilled, (state, { payload }) => {
      state.processMachines = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchProcessMachines.rejected, (state) => {
      state.loading = false;
      return processMachinesInitialStage;
    });
  },
});

export default ProcessMachinesSlice.reducer;
export const ProcessMachinesActions = ProcessMachinesSlice.actions;
