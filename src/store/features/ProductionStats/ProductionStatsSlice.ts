"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface ProductionStatsProps {
  onGoing: number;
  finishedGoods: number;
  totalFinishedGoods: number;
  delayed: number;
  problems: number;
  updatedAt: string;
  delayedStartDate: number;
  delayedEndDate: number;
  utilization: number;
}

export type ProductionStatsParams = {
  toDate: string;
  fromDate: string;
};

export const fetchProductionStats = createAsyncThunk(
  "dashboard/planner/productionStats",
  async (params: ProductionStatsParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/dashboard/planner/productionStats`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          toDate: params.toDate,
          fromDate: params.fromDate,
        },
      });
      return res.data;
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
      return rejectWithValue(e.response.data);
    }
  }
);

export const productionStatsInitialState = {
  stats: {
    onGoing: 0,
    finishedGoods: 0,
    totalFinishedGoods: 0,
    delayed: 0,
    problems: 0,
    updatedAt: "",
    delayedStartDate: 0,
    delayedEndDate: 0,
    utilization: 0,
  },
  loading: false,
  error: null,
};

const ProductionStatSlice = createSlice({
  name: "productionStats",
  initialState: productionStatsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductionStats.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductionStats.fulfilled, (state, { payload }) => {
      state.stats = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchProductionStats.rejected, (state) => {
      state.loading = false;
      return productionStatsInitialState;
    });
  },
});

export default ProductionStatSlice.reducer;
export const ProductionActions = ProductionStatSlice.actions;
