import { PaginationMetadata } from "@/store/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

interface OverdueParams {
  projectId: string;
  moreThanFifteen: boolean;
}

export type OverdueDetailProps = {
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

export const fetchOverdueDetails = createAsyncThunk(
  "dashboard/overdueDetails",
  async (params: OverdueParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/overdueDetails`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          projectId: params.projectId,
          moreThanFifteen: params.moreThanFifteen,
        },
      });
      return res.data;
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
      return rejectWithValue(e.response.data);
    }
  }
);

export interface OverdueStateProps {
  data: OverdueDetailProps[];
  pagination: PaginationMetadata;
  loading: boolean;
  error: any;
}

export const overdueDetailInitialState: OverdueStateProps = {
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

const OverdueDetailSlice = createSlice({
  name: "overdueDetails",
  initialState: overdueDetailInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOverdueDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOverdueDetails.fulfilled, (state, { payload }) => {
      state.data = payload.data;
      state.pagination = payload.pagination;
      state.loading = false;
    });
    builder.addCase(fetchOverdueDetails.rejected, (state, { meta }) => {
      state.loading = false;
      return overdueDetailInitialState;
    });
  },
});

export default OverdueDetailSlice.reducer;
export const OverdueDetailActions = OverdueDetailSlice.actions;
