"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export type kanbanViewParams = {
  projectId: string;
  matltag: string;
  job: string;
  suffix: string;
};

export type Stage = {
  name: string;
  percent: number;
  sortOrder: number;
  status: string;
  total: number;
};

export type ChildItem = {
  item: string;
  operNum: number;
  qty: number;
  refLine: number;
  refNum: string;
  refType: string;
  stage: string;
  status: string;
  subOrderId: string;
  totalQty: number;
};

export const fetchOnTreeViewDependenciesDetails = createAsyncThunk(
  "kanbanBoard/planner/dependenciesDetails",
  async (params: kanbanViewParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(
        `${url}/kanbanBoard/planner/dependenciesDetails`,
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

interface kanbanProps {
  stages: any[];
  childItems: any[];
}

interface kanbanInitialStageProps {
  kanban: kanbanProps;
  loading: boolean;
  error: null;
}

export const kanbanInitialStage: kanbanInitialStageProps = {
  kanban: {
    stages: [],
    childItems: [],
  },
  loading: false,
  error: null,
};

const KanbanSlice = createSlice({
  name: "treeview",
  initialState: kanbanInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOnTreeViewDependenciesDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchOnTreeViewDependenciesDetails.fulfilled,
      (state, { payload }) => {
        if (payload !== null) {
          state.kanban = payload.data;
        } else {
          state.kanban = {
            stages: [],
            childItems: [],
          };
        }
        state.loading = false;
      }
    );
    builder.addCase(fetchOnTreeViewDependenciesDetails.rejected, (state) => {
      state.loading = false;
      return kanbanInitialStage;
    });
  },
});

export default KanbanSlice.reducer;
export const KanbanActions = KanbanSlice.actions;
