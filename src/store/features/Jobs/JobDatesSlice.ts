"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface JobDetailDatesProps {
  machiningDate: string;
  cmmDate: string;
  finalMCDate: string;
  createdBy: string;
  lastUpdatedDate: string;
}

export type JobDetailDateParams = {
  projectId: number | null;
  job: string;
  suffix: number;
};

export const fetchJobDetailDates = createAsyncThunk(
  "jobDetailDates",
  async (params: JobDetailDateParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(
        `${url}/problemComment/getActualProductionStartDate`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          params: params,
        }
      );
      return res.data;
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
      return rejectWithValue(e.response.data);
    }
  }
);

interface jobDetailDateInitailStageProps {
  jobDetailDates: JobDetailDatesProps;
  loading: boolean;
  error: any;
}

export const jobDetailDateInitialStage: jobDetailDateInitailStageProps = {
  jobDetailDates: {} as JobDetailDatesProps,
  loading: false,
  error: null,
};

const JobDetailDateSlice = createSlice({
  name: "jobDetailDates",
  initialState: jobDetailDateInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchJobDetailDates.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchJobDetailDates.fulfilled, (state, { payload }) => {
      state.jobDetailDates = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchJobDetailDates.rejected, (state) => {
      state.loading = false;
      return jobDetailDateInitialStage;
    });
  },
});

export default JobDetailDateSlice.reducer;
export const JobDetailDateActions = JobDetailDateSlice.actions;
