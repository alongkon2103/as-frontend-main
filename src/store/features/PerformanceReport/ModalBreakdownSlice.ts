"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface ModalBreakdownParams {
  businessSegment: string;
  equipmentType: string;
  projectName: string;
  fromDate: string;
  toDate: string;
  resourceType: string;
}

export const fetchModalBreakdown = createAsyncThunk(
  "modal_breakdown",
  async (params: ModalBreakdownParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/performanceReport/modalBreakdown`, {
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

export interface MetricsType {
  performance: number;
  utilization: number;
}

export interface MachineType {
  id: string;
  metrics: MetricsType;
}

export interface ModalBreakdownProps {
  machineType: string;
  metrics: MetricsType;
  machines: MachineType[];
}

export interface ModalBreakdownInitialStageProps {
  modalBreakdown: ModalBreakdownProps[];
  loading: boolean;
  error: any;
}

export const modalBreakdownInitialStage: ModalBreakdownInitialStageProps = {
  modalBreakdown: [],
  loading: false,
  error: null,
};

const ModalBreakdownSlice = createSlice({
  name: "low_performance",
  initialState: modalBreakdownInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchModalBreakdown.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchModalBreakdown.fulfilled, (state, { payload }) => {
      state.modalBreakdown = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchModalBreakdown.rejected, (state) => {
      state.loading = false;
      return modalBreakdownInitialStage;
    });
  },
});

export default ModalBreakdownSlice.reducer;
export const ModalBreakdownActions = ModalBreakdownSlice.actions;
