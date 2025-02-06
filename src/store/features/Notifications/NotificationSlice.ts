"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface NotificationProps {
  id: string;
  message: string;
  comment?: string;
  referenceId: string;
  notificationData: any;
  notificationType: "co" | "job_card";
  userName: string;
  createDate: string;
  isRead: boolean;
}

export interface NotificationParams {}

export const fetchNotifications = createAsyncThunk(
  "notifications",
  async (_: NotificationParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/notifications`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return res.data;
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
      return rejectWithValue(e.response.data);
    }
  }
);

export const readNotification = createAsyncThunk(
  "read notifications",
  async (body: { id: string }, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.patch(`${url}/notification/${body.id}`, body, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return res.data;
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
      return rejectWithValue(e.response.data);
    }
  }
);

export const markAllAsRead = createAsyncThunk(
  "mark all as read",
  async (_, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.post(`${url}/notifications/markAllAsRead`, null, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return res.data;
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
      return rejectWithValue(e.response.data);
    }
  }
);

export interface NotificationInitialStageProps {
  notifications: NotificationProps[];
  loading: boolean;
  error: any;
}

export const notificationsInitialStage: NotificationInitialStageProps = {
  notifications: [],
  loading: false,
  error: null,
};

const NotificationsSlice = createSlice({
  name: "notifications",
  initialState: notificationsInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload.data;
      state.loading = false;
    });
    builder.addCase(fetchNotifications.rejected, (state, action) => {
      state.loading = false;
      return state;
    });
    builder.addCase(markAllAsRead.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(markAllAsRead.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(markAllAsRead.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(readNotification.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(readNotification.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(readNotification.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default NotificationsSlice.reducer;
export const NotificationActions = NotificationsSlice.actions;
