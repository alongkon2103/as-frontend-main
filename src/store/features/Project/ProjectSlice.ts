"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

type ProjectParams = {
  businessSegment: string;
};

export const fetchProjects = createAsyncThunk(
  "dashboard/projects",
  async (params: ProjectParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/dashboard/projects`, {
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

export interface ProjectProps {
  id: string;
  projectName: string;
  salesDateBy: string;
}

export interface ProjectInitialStateProps {
  projects: ProjectProps[];
  loading: boolean;
  error: any;
}

export const projectInitialState = {
  projects: [],
  loading: false,
  error: null,
};

const ProjectSlice = createSlice({
  name: "projects",
  initialState: projectInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProjects.fulfilled, (state, { payload }) => {
      state.projects = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchProjects.rejected, (state, { payload }) => {
      state.loading = false;
      return projectInitialState;
    });
  },
});

export default ProjectSlice.reducer;
export const ProjectActions = ProjectSlice.actions;
