"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export type TreeViewParams = {
  job: string;
  suffix: number;
};

export const fetchOnTreeViewDependencies = createAsyncThunk(
  "kanbanBoard/planner/dependencies",
  async (params: TreeViewParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/kanbanBoard/planner/dependencies`, {
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

interface treeViewInitialStageProps {
  treeview: any[];
  loading: boolean;
  error: any;
}

export const treeViewInitialStage: treeViewInitialStageProps = {
  treeview: [],
  loading: false,
  error: null,
};

const TreeViewSliceSlice = createSlice({
  name: "treeview",
  initialState: treeViewInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOnTreeViewDependencies.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchOnTreeViewDependencies.fulfilled,
      (state, { payload }) => {
        state.treeview = payload.data;
        state.loading = false;
      }
    );
    builder.addCase(fetchOnTreeViewDependencies.rejected, (state) => {
      state.loading = false;
      return treeViewInitialStage;
    });
  },
});

export default TreeViewSliceSlice.reducer;
export const TreeViewkActions = TreeViewSliceSlice.actions;
