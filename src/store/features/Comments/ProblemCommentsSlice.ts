"use client";

import { PaginationMetadata } from "@/store/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface ProblemCommentProps {
  id: number;
  refType: string;
  refNum: string;
  refLine: number;
  operation: number;
  problemDescription: string;
  isResolved: number;
  comment: string;
  createdBy: string;
  updatedBy: string;
  createDate: string;
  recordDate: string;
}

export type CommentParams = {
  refType: string;
  refNum: string;
  refLine: number;
};

export type ResolveCommentParams = {
  id: number;
  isResolved: number;
};

export type CommentBody = {
  userName?: string;
  refType: string;
  refNum: string;
  refLine: number;
  operation: number | null;
  problemCode: string;
  problemType: string;
  comment: string;
  problemDescription: string;
  projectId: string;
};

export const fetchComments = createAsyncThunk(
  "getComments",
  async (params: CommentParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/problemComment/getProblemComments`, {
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

export const postComment = createAsyncThunk(
  "postComments",
  async (body: CommentBody, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;
    body.userName =
      auth.currentUser.firstName + " " + auth.currentUser.lastName;
    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.post(
        `${url}/problemComment/problemComments`,
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

export const resolveComment = createAsyncThunk(
  "resolveComment",
  async (params: ResolveCommentParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;
    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.put(
        `${url}/problemComment/updateProblemResolved/${params.id}?isResolved=${params.isResolved}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      return res;
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
      return rejectWithValue(e.response.data);
    }
  }
);

export interface CommentsInitialStageProps {
  comments: ProblemCommentProps[];
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

const CommentsSlice = createSlice({
  name: "comments",
  initialState: commentsInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchComments.fulfilled, (state, { payload }) => {
      state.comments = payload.data;
      state.pagination = payload.paginationMetadata;
      state.loading = false;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.loading = false;
      return commentsInitialStage;
    });
    builder.addCase(postComment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      const data = action.payload.data;
      data.createdBy = action.meta.arg.userName;
      data.userName = action.meta.arg.userName;
      action.payload.data.problemDescription =
        action.meta.arg.problemDescription;
      const total = state.pagination?.totalCount;
      state.comments ? state.comments.unshift(data) : (state.comments = [data]);
      state.pagination = {
        ...state.pagination,
        totalCount: total,
      };
      state.loading = false;
    });
    builder.addCase(postComment.rejected, (state) => {
      state.loading = false;
      return commentsInitialStage;
    });
    builder.addCase(resolveComment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(resolveComment.fulfilled, (state, { meta, payload }) => {
      state.comments = state.comments.map((comment) => {
        if (comment.id === meta.arg.id) {
          comment.isResolved = meta.arg.isResolved;
        }
        return comment;
      });
      state.loading = false;
      state.error = null;
    });
    builder.addCase(resolveComment.rejected, (state) => {
      state.loading = false;
      return commentsInitialStage;
    });
  },
});

export default CommentsSlice.reducer;
export const CommentActions = CommentsSlice.actions;
