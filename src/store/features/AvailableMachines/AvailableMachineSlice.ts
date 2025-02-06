"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface AvailableMachineProps {
  machineId: string;
  machineName: string;
}

export const fetchAvailableMachines = createAsyncThunk(
  "available_machines",
  async (_, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(
        `${url}/dashboard/operator/availableMachines`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
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

export interface availableMachinesInitialStageProps {
  availableMachines: [];
  loading: boolean;
  error: any;
}

export const availableMachinesInitialStage: availableMachinesInitialStageProps =
  {
    availableMachines: [],
    loading: false,
    error: null,
  };

const AvailableMachinesSlice = createSlice({
  name: "available_machines",
  initialState: availableMachinesInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAvailableMachines.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAvailableMachines.fulfilled, (state, { payload }) => {
      state.availableMachines = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchAvailableMachines.rejected, (state) => {
      state.loading = false;
      return availableMachinesInitialStage;
    });
  },
});

export default AvailableMachinesSlice.reducer;
export const AvailableMachinesActions = AvailableMachinesSlice.actions;
