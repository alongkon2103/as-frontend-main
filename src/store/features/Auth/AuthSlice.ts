"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import i18n from "../../../../i18n";
export interface LoginRequestData {
  employeeId: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}
export const LoginRequest = createAsyncThunk(
  "auth/login",
  async (data: LoginRequestData, { rejectWithValue }) => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.post(`${url}/auth/login`, data);
      toast.success("Welcome to Aerostructures");
      return {
        ...res.data,
      };
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
      return rejectWithValue(e.response.data);
    }
  }
);

export const initialState = {
  isAuthenticated: false,
  token: "",
  currentUser: {
    id: null,
    employeeId: "",
    role: "",
    isActive: false,
    firstName: null,
    lastName: null,
    email: null,
  },
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout: () => {
      Cookies.remove("expires_in");
      localStorage.clear();
      i18n.changeLanguage("en");

      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginRequest.pending, (state) => {
      return initialState;
    });
    builder.addCase(LoginRequest.fulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.currentUser = payload.data;
      state.isAuthenticated = true;
      setCookie(30 * 60);
    });
    builder.addCase(LoginRequest.rejected, () => {
      return initialState;
    });
  },
});

function setCookie(expiresIn: number) {
  const expiryTime = new Date(new Date().getTime() + expiresIn * 1000);
  Cookies.set("expires_in", expiryTime.toString(), { expires: expiryTime });
}

export default AuthSlice.reducer;
export const AuthActions = AuthSlice.actions;
