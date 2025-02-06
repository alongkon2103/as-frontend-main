"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { ReadyToShipProps } from "../ProductionOverview/ProductionOverviewSlice";

export type CustomerOrderParams = {
  coNum: string;
  coLine: number;
  dueDate: string;
  item: string;
};

export const fetchCustomerOrder = createAsyncThunk(
  "customer_order",
  async (params: CustomerOrderParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;
    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/notification/customerOrderData`, {
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

export interface customerOrderInitialStageProps {
  customerOrder: ReadyToShipProps;
  loading: boolean;
  error: any;
}
export const customerOrderInitialStage: customerOrderInitialStageProps = {
  customerOrder: {
    coNum: "",
    coLine: 0,
    coDate: "",
    ordered: 0,
    fg: 0,
    shipped: 0,
    projectedDate: "",
    message: "",
    type: "",
    item: "",
    qty: "",
    updateAt: "",
    color: "red",
    dueDate: "",
    custCo: "",
    requestedDate: "",
    recoveryDate: "",
    reserved: 0,
    picked: 0,
    packed: 0
  },
  loading: false,
  error: null,
};

const CustomerOrderSlice = createSlice({
  name: "customer_order",
  initialState: customerOrderInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCustomerOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCustomerOrder.fulfilled, (state, { payload }) => {
      state.customerOrder = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchCustomerOrder.rejected, (state) => {
      state.loading = false;
      return customerOrderInitialStage;
    });
  },
});

export default CustomerOrderSlice.reducer;
export const CustomerOrderSliceActions = CustomerOrderSlice.actions;
