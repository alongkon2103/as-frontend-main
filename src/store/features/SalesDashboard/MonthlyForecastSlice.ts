import { PaginationMetadata } from "@/store/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
export interface MonthlyForecastParams {
  projectId: string;
  fromDate: string;
  toDate: string;
  dateAhead: string;
}

export interface MonthlyForecastProps {
  month: string;
  monthYear: string;
  partNo: string;
  qty: {
    value: number;
    forecast: number;
  };
  price: {
    value: number;
    forecast: number;
  };
}

export const fetchMonthlyForecast = createAsyncThunk(
  "dashboard/monthlyForecast",
  async (params: MonthlyForecastParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/monthlyForecastBreakdown`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          projectId: params.projectId,
          fromDate: params.fromDate,
          toDate: params.toDate,
          dateAhead: params.dateAhead,
        },
      });
      return res.data;
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
      return rejectWithValue(e.response.data);
    }
  }
);

export interface MonthlyForecastState {
  data: MonthlyForecastProps[];
  pagination: PaginationMetadata;
  loading: boolean;
  error: any;
}

export const monthlyForecastlInitialState: MonthlyForecastState = {
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

const MonthlyForecastSlice = createSlice({
  name: "monthlyForecast",
  initialState: monthlyForecastlInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMonthlyForecast.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMonthlyForecast.fulfilled, (state, { payload }) => {
      state.data = payload.data;
      state.pagination = payload.pagination;
      state.loading = false;
    });
    builder.addCase(fetchMonthlyForecast.rejected, (state, { meta }) => {
      state.loading = false;
      return monthlyForecastlInitialState;
    });
  },
});

export default MonthlyForecastSlice.reducer;
export const MonthlyForecastSliceActions = MonthlyForecastSlice.actions;
