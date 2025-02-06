import { PaginationMetadata } from "@/store/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

interface BreakdownParams {
  projectId: string;
  groupBy: string;
  groupByType: string;
  fromDate: string;
  toDate: string;
  dateFilter: string;
}

export type BreakdownDetailProps = {
  order: string;
  orderLine: number;
  customerPO: string;
  item: string;
  dueDate: string;
  requestedDate: string;
  status: string;
  orderedQuantity: number;
  shippedQuantity: number;
  remainQuantity: number;
  netPrice: number;
  currency: string;
};

export const fetchBreakdownDetails = createAsyncThunk(
  "dashboard/breakdownDetails",
  async (params: BreakdownParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/breakdownDetails`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          projectId: params.projectId,
          groupBy: params.groupBy,
          groupByType: params.groupByType,
          fromDate: params.fromDate,
          toDate: params.toDate,
          dateFilter: params.dateFilter,
        },
      });
      return res.data;
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
      return rejectWithValue(e.response.data);
    }
  }
);

export interface BreakdownStateProps {
  data: BreakdownDetailProps[];
  pagination: PaginationMetadata;
  loading: boolean;
  error: any;
}

export const breakdownDetailInitialState: BreakdownStateProps = {
  data: [],
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

const BreakdownDetailSlice = createSlice({
  name: "breakdownDetails",
  initialState: breakdownDetailInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBreakdownDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBreakdownDetails.fulfilled, (state, { payload }) => {
      state.data = payload.data;
      state.pagination = payload.pagination;
      state.loading = false;
    });
    builder.addCase(fetchBreakdownDetails.rejected, (state, { meta }) => {
      state.loading = false;
      return breakdownDetailInitialState;
    });
  },
});

export default BreakdownDetailSlice.reducer;
export const BreakdownDetailActions = BreakdownDetailSlice.actions;
