"use client";

import { PaginationMetadata } from "@/store/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface CoCommentProps {
  id: number;
  refNum: string;
  item: string;
  dueDate: string;
  projectId: number;
  comment: string;
  createdBy: string;
  createDate: string;
}

export type CoCommentParams = {
  coNum: string;
  coLine: number;
  item: string;
  dueDate: string;
};

export type ResolveCommentParams = {
  id: number;
  isResolved: number;
};

export type CoCommentBody = {
  coNum: string;
  coLine: number;
  item: string;
  dueDate: string;
  comment: string;
  userName?: string;
  notificationData?: object;
  projectId?: string;
};

export const fetchCoComments = createAsyncThunk(
  "getCoComments",
  async (params: CoCommentParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/productionOverview/co/comments`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: params,
      });

      return res.data;
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
      return rejectWithValue(e.response.data);
    }
  }
);

export const postCoComment = createAsyncThunk(
  "postComments",
  async (body: CoCommentBody, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;
    body.userName =
      auth.currentUser.firstName + " " + auth.currentUser.lastName;
    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.post(
        `${url}/productionOverview/co/comment`,
        body,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      return res.data;
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
      return rejectWithValue(e.response.data);
    }
  }
);

export interface CommentsInitialStageProps {
  comments: CoCommentProps[];
  pagination: PaginationMetadata;
  loading: boolean;
  error: any;
}

export const commentsInitialStage: CommentsInitialStageProps = {
  comments: [],
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

const CoCommentsSlice = createSlice({
  name: "co_comments",
  initialState: commentsInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCoComments.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCoComments.fulfilled, (state, { payload }) => {
      state.comments = payload.data;
      state.pagination = payload.paginationMetadata;
      state.loading = false;
    });
    builder.addCase(fetchCoComments.rejected, (state) => {
      state.loading = false;
      return commentsInitialStage;
    });
    builder.addCase(postCoComment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postCoComment.fulfilled, (state, action) => {
      const data = action.payload.data;
      const total = state.pagination?.totalCount;
      state.comments ? state.comments.unshift(data) : (state.comments = [data]);
      state.pagination = {
        ...state.pagination,
        totalCount: total,
      };
      state.loading = false;
    });
    builder.addCase(postCoComment.rejected, (state) => {
      state.loading = false;
      return commentsInitialStage;
    });
  },
});

export default CoCommentsSlice.reducer;
export const CoCommentActions = CoCommentsSlice.actions;
