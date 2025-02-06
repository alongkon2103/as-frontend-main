"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export type JobDetailParams = {
  operation?: number;
  projectId: number;
  refNum: string; // job or po id
  refType: string; // type
  refLine: number; // suffix
};

export type JobDetailProps = {
  assigned: string;
  status: string;
  problem: string[];
  machine: string;
  priority: string;
  cycleTime: string;
  qty: number;
};

export const fetchJobDetails = createAsyncThunk(
  "job_details",
  async (params: JobDetailParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/problemComment/getCardDetail`, {
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

interface jobDetailDateInitailStageProps {
  jobDetails: JobDetailProps;
  loading: boolean;
  error: any;
}

export const jobDetailInitialStage: jobDetailDateInitailStageProps = {
  jobDetails: {} as JobDetailProps,
  loading: false,
  error: null,
};

const JobDetailsSlice = createSlice({
  name: "job_details",
  initialState: jobDetailInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchJobDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchJobDetails.fulfilled, (state, { payload }) => {
      state.jobDetails = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchJobDetails.rejected, (state) => {
      state.loading = false;
      return jobDetailInitialStage;
    });
  },
});

export default JobDetailsSlice.reducer;
export const JobDetailActions = JobDetailsSlice.actions;
