"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface HoverProps<T> {
  hover: T[];
  moreThanFive: boolean;
}

export interface DelayedHover {
  job: string;
  suffix: number;
  qty: number;
}

export interface ProblemsHover extends DelayedHover{
  mrr: string;
}

export interface DelayedHoverProps extends HoverProps<DelayedHover> {}
export interface ProblemsHoverProps extends HoverProps<ProblemsHover> {}

export interface QuantityBreakdownProps {
  id: number;
  projectName: string;
  planned: number;
  onGoing: number;
  progress: number;
  delayed: number;
  delayedHover: DelayedHoverProps;
  problems: number;
  problemHover: ProblemsHoverProps;
}

export type QuantityBreakdownParams = {
  toDate: string;
  fromDate: string;
};

export const fetchQuantityBreakdown = createAsyncThunk(
  "dashboard/planner/quantityBreakdown",
  async (params: QuantityBreakdownParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(
        `${url}/dashboard/planner/quantityBreakdown`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          params: {
            toDate: params.toDate,
            fromDate: params.fromDate,
          },
        }
      );
      return res.data;
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
      return rejectWithValue(e.response.data);
    }
  }
);

export interface quantityBreakdownInitialStageProps {
  data: QuantityBreakdownProps[];
  loading: boolean;
  error: any;
}

export const quanityBreakdownInitialState: quantityBreakdownInitialStageProps =
  {
    data: [],
    loading: false,
    error: null,
  };

const QuantityBreakdown = createSlice({
  name: "quantityBreakdown",
  initialState: quanityBreakdownInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuantityBreakdown.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchQuantityBreakdown.fulfilled, (state, { payload }) => {
      state.data = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchQuantityBreakdown.rejected, (state) => {
      state.loading = false;
      return quanityBreakdownInitialState;
    });
  },
});

export default QuantityBreakdown.reducer;
export const QuantityBreakdownActions = QuantityBreakdown.actions;
