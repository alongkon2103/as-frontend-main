import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface OverallStatsProps {
  title: string;
  percentage: number;
  count: number;
  forecast: number;
  total: number;
  currency?: string;
}

type actualRevenueValue = {
  orderedQty: number;
  qty: number;
  forecast: number;
};

type orderValue = {
  qty: number;
  forecast: number;
};

export interface BreakdownProps {
  groupBy: string;
  actualRevenue: actualRevenueValue;
  ordered: orderValue;
  shipped: number;
  overdue: number;
  criteriaDateFrom: string;
  criteriaDateTo: string;
}
export interface SalesDashboardProps {
  overall: {
    actualRevenue: OverallStatsProps;
    ordered: OverallStatsProps;
    shipped: OverallStatsProps;
    overdue: OverallStatsProps;
  } | null;
  breakdown: BreakdownProps[];
}

export type SalesDashboardParams = {
  projectId: string;
  fromDate: string;
  toDate: string;
  breakdownBy: string;
  dateFilter: string;
  dateAhead?: string;
};

export const fetchSalesDashboard = createAsyncThunk(
  "dashboard/sales",
  async (params: SalesDashboardParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/salesDashboard`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          projectId: params.projectId,
          fromDate: params.fromDate,
          toDate: params.toDate,
          breakdownBy: params.breakdownBy,
          dateFilter: params.dateFilter,
          dateAhead: params.dateAhead,
        },
      });
      //   const res = await getMockSalesDashboardData(params)
      return res.data;
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
      return rejectWithValue(e.response.data);
    }
  }
);

export interface salesDashboardStateProps {
  data: SalesDashboardProps;
  loading: boolean;
  error: any;
}

export const salesDashboardInitialState: salesDashboardStateProps = {
  data: {
    overall: null,
    breakdown: [],
  },
  loading: false,
  error: null,
};

const SalesDashboard = createSlice({
  name: "salesDashboard",
  initialState: salesDashboardInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSalesDashboard.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSalesDashboard.fulfilled, (state, { payload }) => {
      state.data = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchSalesDashboard.rejected, (state) => {
      state.loading = false;
      return salesDashboardInitialState;
    });
  },
});

export default SalesDashboard.reducer;
export const SalesDashboardActions = SalesDashboard.actions;
