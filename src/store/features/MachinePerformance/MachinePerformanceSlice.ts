"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface MachinePerformanceProps {
  name: string;
  totalOutput: number;
}

export interface MachinePerformanceParams {
  fromDate: string;
  toDate: string;
}

export const fetchMachinePerformances = createAsyncThunk(
  "fetchMachinePerformance",
  async (params: MachinePerformanceParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/machinePerformance`, {
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

export interface MachinePerformanceByProjectsProps {
  projectName: string;
  actualQty: number;
  plannedQty: number;
  percentage: number;
}

export interface MachinePerformanceByProjectsParams {
  name: string;
  fromDate: string;
  toDate: string;
}

export const fetchMachinePerformanceByProjects = createAsyncThunk(
  "fetchMachinePerformanceByProjects",
  async (
    params: MachinePerformanceByProjectsParams,
    { rejectWithValue, getState }
  ) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/machinePerformance/projects`, {
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

export interface MachineIssuesProps {
  machineName: string;
  project: string;
  job: string;
  item: string;
  qty: number;
  suffix: number;
  problem: string;
}

export interface MachineIssuesParams {
  name: string;
  fromDate: string;
  toDate: string;
}

export const fetchMachineIssues = createAsyncThunk(
  "fetchMachineIssues",
  async (params: MachineIssuesParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/machinePerformance/machineIssues`, {
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
export interface MachinePerformanceInitialStageProps {
  machinePerformance: MachinePerformanceProps[];
  machinePerformanceByProjects: MachinePerformanceByProjectsProps[];
  machineIssues: any[];
  machinePerformanceLoading: boolean;
  machinePerformanceByProjectsLoading: boolean;
  machineIssuesLoading: boolean;
  machinePerformanceError: any;
  machinePerformanceByProjectsError: any;
  machineIssuesError: any;
}

export const machinePerformanceInitialStage: MachinePerformanceInitialStageProps =
  {
    machinePerformance: [],
    machinePerformanceByProjects: [],
    machineIssues: [],
    machinePerformanceLoading: false,
    machinePerformanceByProjectsLoading: false,
    machineIssuesLoading: false,
    machinePerformanceError: null,
    machinePerformanceByProjectsError: null,
    machineIssuesError: null,
  };

const MachinePerformancesSlice = createSlice({
  name: "machinePerformance",
  initialState: machinePerformanceInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMachinePerformances.pending, (state) => {
      state.machinePerformanceLoading = true;
      state.machinePerformanceError = null;
    });
    builder.addCase(fetchMachinePerformances.fulfilled, (state, action) => {
      state.machinePerformance = action.payload.data;
      state.machinePerformanceByProjects = [];
      state.machineIssues = [];
      state.machinePerformanceLoading = false;
    });
    builder.addCase(fetchMachinePerformances.rejected, (state, action) => {
      state.machinePerformanceLoading = false;
      state.machinePerformance = [];
      return state;
    });
    builder.addCase(
      fetchMachinePerformanceByProjects.pending,
      (state, action) => {
        state.machinePerformanceByProjectsLoading = true;
        state.machinePerformanceByProjectsError = null;
      }
    );
    builder.addCase(
      fetchMachinePerformanceByProjects.fulfilled,
      (state, action) => {
        state.machinePerformanceByProjects = action.payload.data;
        state.machinePerformanceByProjectsLoading = false;
      }
    );
    builder.addCase(
      fetchMachinePerformanceByProjects.rejected,
      (state, action) => {
        state.machinePerformanceByProjectsLoading = false;
        state.machinePerformanceByProjects = [];
        return state;
      }
    );
    builder.addCase(fetchMachineIssues.pending, (state, action) => {
      state.machineIssuesLoading = true;
      state.machineIssuesError = null;
    });
    builder.addCase(fetchMachineIssues.fulfilled, (state, action) => {
      state.machineIssues = action.payload.data;
      state.machineIssuesLoading = false;
    });
    builder.addCase(fetchMachineIssues.rejected, (state, action) => {
      state.machineIssuesLoading = false;
      state.machineIssues = [];
      return state;
    });
  },
});

export default MachinePerformancesSlice.reducer;
export const MachinePerformanceActions = MachinePerformancesSlice.actions;
