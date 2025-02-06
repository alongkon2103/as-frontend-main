"use client";

import { PaginationMetadata } from "@/store/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface OperatorJobProps {
  job: string;
  suffix: number;
  item: string;
  qty: number; // as Qty
  material: string;
  progress: number;
  oper: number; // as OP
  mrr: string;
  problems: string;
  typeStatus: string;
  startDate: string; //date string
  endDate: string; //date string
  latestComment: string;
  priority: string;
}

export type OperatorJobParams = {
  machineName: string;
  toDate: string;
  fromDate: string;
  page: number;
  limit: number;
  data: string;
  // optional params for filter later
  jobStatus?: string;
  job?: string;
  item?: string;
};

export const fetchOperatorJobs = createAsyncThunk(
  "operator_jobs",
  async (params: OperatorJobParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/jobs/operatorJobs`, {
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

export interface jobsInitialStageProps {
  operatorJobs: OperatorJobProps[];
  pagination: PaginationMetadata;
  loading: boolean;
  error: any;
}

export const operatorJobsInitialStage: jobsInitialStageProps = {
  operatorJobs: [],
  pagination: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
    hasPrevious: false,
    hasNext: false,
  },
  loading: false,
  error: null,
};

const OperatorJobsSlice = createSlice({
  name: "operator_jobs",
  initialState: operatorJobsInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOperatorJobs.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOperatorJobs.fulfilled, (state, { payload }) => {
      state.operatorJobs = payload.data;
      state.pagination = payload.paginationMetadata;
      state.loading = false;
    });
    builder.addCase(fetchOperatorJobs.rejected, (state) => {
      state.loading = false;
      return operatorJobsInitialStage;
    });
  },
});

export default OperatorJobsSlice.reducer;
export const OperatorJobActions = OperatorJobsSlice.actions;
