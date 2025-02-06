"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export type JobPictureParams = {
  item: string;
};

export type JobPictureProps = {
  item: string;
  picture: string;
};

export const fetchJobPicture = createAsyncThunk(
  "job_picture",
  async (params: JobPictureParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${url}/problemComment/getPictureByItem`, {
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

interface jobPictureInitialStageProps {
  jobPicture: JobPictureProps;
  loading: boolean;
  error: any;
}

export const jobPictureInitialStage: jobPictureInitialStageProps = {
  jobPicture: {} as JobPictureProps,
  loading: false,
  error: null,
};

const JobPictureSlice = createSlice({
  name: "job_picture",
  initialState: jobPictureInitialStage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchJobPicture.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchJobPicture.fulfilled, (state, { payload }) => {
      state.jobPicture = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchJobPicture.rejected, (state) => {
      state.loading = false;
      return jobPictureInitialStage;
    });
  },
});

export default JobPictureSlice.reducer;
export const JobPictureActions = JobPictureSlice.actions;
