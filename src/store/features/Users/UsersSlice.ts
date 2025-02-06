"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface UserSliceProps {
  employeeId: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface TransFormedProps {
  id: string;
  display: string;
}

export const fetchUsers = createAsyncThunk(
  "users",
  async (_, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/auth/getAllEmployees`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      return res.data;
      // return UsersJson;
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
      return rejectWithValue(e.response.data);
    }
  }
);

export const usersInitialStage = {
  users: [] as TransFormedProps[],
  loading: false,
  error: null,
};

const UsersSlice = createSlice({
  name: "users",
  initialState: usersInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      const transformed = payload.data.map((user: UserSliceProps) => {
        return {
          id: user.employeeId,
          display: `${user.firstName}${user.lastName}${
            user.email.length > 0 ? `(${user.email})` : ""
          }`,
        };
      });
      state.users = transformed;
      state.loading = false;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = false;
      return usersInitialStage;
    });
  },
});

export default UsersSlice.reducer;
export const UsersActions = UsersSlice.actions;
