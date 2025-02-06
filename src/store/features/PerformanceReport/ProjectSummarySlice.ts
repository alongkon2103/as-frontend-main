"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface ProjectSummaryProps {
  project: string;
  planAps: number;
  planCommitOee: number;
  actual: number;
  machine: number;
  performanceAps: number;
  performance: number;
  utilization: number;
}

export type ProjectSummaryParams = {
  businessSegment: string;
  fromDate: string;
  toDate: string;
  equipmentType: string;
};

export const fetchProjectSummary = createAsyncThunk(
  "projectSummary",
  async (params: ProjectSummaryParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/performanceReport/projectSummary`, {
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

interface ProjectSummaryInitialStageProps {
  projectSummary: ProjectSummaryProps[];
  loading: boolean;
  error: any;
}

export const projectSummaryInitialStage: ProjectSummaryInitialStageProps = {
  projectSummary: [],
  loading: false,
  error: null,
};

const ProjectSummarySlice = createSlice({
  name: "projectSummary",
  initialState: projectSummaryInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjectSummary.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProjectSummary.fulfilled, (state, { payload }) => {
      state.projectSummary = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchProjectSummary.rejected, (state) => {
      state.loading = false;
      return projectSummaryInitialStage;
    });
  },
});

export default ProjectSummarySlice.reducer;
export const ProjectSummaryActions = ProjectSummarySlice.actions;
