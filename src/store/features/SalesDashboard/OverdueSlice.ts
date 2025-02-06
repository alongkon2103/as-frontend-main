import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface OverdueParams {
  projectId: string;
  moreThanFifteen: boolean;
}

export interface OverdueProps {
  count: number;
  total: number;
  totalOverdue: number;
  currency: string;
}

export const fetchOverdueStats = createAsyncThunk(
  "dashboard/overdueStats",
  async (params: OverdueParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/overdueStats`, {
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
  data: {
    today: OverdueProps | null;
    moreThanFifteen: OverdueProps | null;
  };
  loading: boolean;
  error: any;
}

export const overdueInitialState: OverdueStateProps = {
  data: {
    today: null,
    moreThanFifteen: null,
  },
  loading: false,
  error: null,
};

const OverdueSlice = createSlice({
  name: "overdue",
  initialState: overdueInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOverdueStats.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOverdueStats.fulfilled, (state, { meta, payload }) => {
      if (meta.arg.moreThanFifteen) {
        state.data.moreThanFifteen = payload.data;
      } else {
        state.data.today = payload.data;
      }
      state.loading = false;
    });
    builder.addCase(fetchOverdueStats.rejected, (state, { meta }) => {
      if (meta.arg.moreThanFifteen) {
        state.data.moreThanFifteen = null;
      } else {
        state.data.today = null;
      }
      state.loading = false;
      return state;
    });
  },
});

export default OverdueSlice.reducer;
export const OverdueActions = OverdueSlice.actions;
