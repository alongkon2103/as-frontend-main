"use client";

import { PaginationMetadata } from "@/store/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface JobProps {
  job: string;
  suffix: number;
  item: string;
  qtyReleased: number; // as Qty
  qtyScrapped: number;
  progress: number;
  oper: number; // as OP
  status: string;
  typeStatus: string; // Start Delay, End Delay, Both
  mrr: string;  
  problems: string;
  startDate: string; //date string
  endDate: string; //date string
  latestComment: string;
  priority: string;
  machine: string;
  material: string;
}

export type jobParams = {
  projectId: number;
  toDate: string;
  fromDate: string;
  page: number;
  limit: number;

  // optional params for filter later
  jobStatus?: string;
  job?: string;
  item?: string;
};

export type jobByIdParams = {
  projectId: string;
  job: string;
  suffix: number;
  oper: number;
};

export type SingleJobProps = {
  job: string;
  suffix: number;
  item: string;
  oper: string;
  qty: number;
  startDate: string;
  endDate: string;
  projectName: string;
};

export enum TypeStatusEnum {
  START_DELAY = "Start Delay",
  END_DELAY = "End Delay",
  BOTH = "Both",
}

export const fetchJobs = createAsyncThunk(
  "jobs",
  async (params: jobParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/jobs`, {
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

export const fetchNotiJob = createAsyncThunk(
  "notification_jobs",
  async (params: jobByIdParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/notification/jobData`, {
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

export const fetchJobsByJobStatus = createAsyncThunk(
  "jobs_by_job_status",
  async (params: jobParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/jobs`, {
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

export interface TabJobsPaginationMetadata extends PaginationMetadata {
  paginationExtraData: {
    plannedTotalCount: number;
    finishedGoodsTotalCount: number;
    scrappedTotalCount: number;
    delayedTotalCount: number;
    notStartedTotalCount: number;
  };
}

export interface jobsInitialStageProps {
  jobs: JobProps[];
  tabJobs: JobProps[];
  pagination: PaginationMetadata;
  tabJobsPagniation: TabJobsPaginationMetadata;
  notiJobs: SingleJobProps | null;
  loading: boolean;
  error: any;
  tabJobsLoading: boolean;
  tabJobsError: any;
}

export const jobsInitialStage: jobsInitialStageProps = {
  jobs: [],
  pagination: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
    hasPrevious: false,
    hasNext: false,
  },
  tabJobsPagniation: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
    hasPrevious: false,
    hasNext: false,
    paginationExtraData: {
      plannedTotalCount: 0,
      finishedGoodsTotalCount: 0,
      scrappedTotalCount: 0,
      delayedTotalCount: 0,
      notStartedTotalCount: 0,
    },
  },
  tabJobs: [],
  notiJobs: null,
  loading: false,
  error: null,
  tabJobsLoading: false,
  tabJobsError: null,
};

const JobsSlice = createSlice({
  name: "jobs",
  initialState: jobsInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchJobs.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchJobs.fulfilled, (state, { payload }) => {
      state.jobs = payload.data;
      state.pagination = payload.paginationMetadata;
      state.loading = false;
    });
    builder.addCase(fetchJobs.rejected, (state) => {
      state.loading = false;
      return jobsInitialStage;
    });
    builder.addCase(fetchJobsByJobStatus.pending, (state) => {
      state.tabJobsLoading = true;
      state.tabJobsError = null;
    });
    builder.addCase(fetchJobsByJobStatus.fulfilled, (state, { payload }) => {
      state.tabJobs = payload.data;
      state.tabJobsPagniation = payload.paginationMetadata;
      state.tabJobsLoading = false;
    });
    builder.addCase(fetchJobsByJobStatus.rejected, (state) => {
      state.tabJobsLoading = false;
      return jobsInitialStage;
    });
    builder.addCase(fetchNotiJob.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchNotiJob.fulfilled, (state, { payload }) => {
      state.notiJobs = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchNotiJob.rejected, (state) => {
      state.loading = false;
      state.notiJobs = null;
    });
  },
});

export default JobsSlice.reducer;
export const JobActions = JobsSlice.actions;
