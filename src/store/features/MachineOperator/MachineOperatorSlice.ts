"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface MachineOperatorParams {
  machineName: string;
}

export const fetchMachineOperator = createAsyncThunk(
  "machine_operator",
  async (params: MachineOperatorParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/operator/machineOperator`, {
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

export interface MachineOperatorProps {
  machineName: string;
  description: string;
  status: string;
  mcid: string;
  problem: string;
  assigned: string;
  totalCycleTime: string;
  spindleLoad: number;
  spindleRuntime: number;
  spindleSpeed: number;
}

export interface MachineOperatorInitialStageProps {
  machineOperator: MachineOperatorProps;
  loading: boolean;
  error: any;
}

export const machineOperatorInitialStage: MachineOperatorInitialStageProps = {
  machineOperator: {
    machineName: "",
    description: "",
    status: "",
    mcid: "",
    problem: "",
    assigned: "",
    totalCycleTime: "",
    spindleLoad: 0,
    spindleRuntime: 0,
    spindleSpeed: 0,
  },
  loading: false,
  error: null,
};

const MachineOperatorSlice = createSlice({
  name: "machine_operator",
  initialState: machineOperatorInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMachineOperator.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMachineOperator.fulfilled, (state, { payload }) => {
      state.machineOperator = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchMachineOperator.rejected, (state) => {
      state.loading = false;
      return machineOperatorInitialStage;
    });
  },
});

export default MachineOperatorSlice.reducer;
export const MachineOperatorActions = MachineOperatorSlice.actions;
