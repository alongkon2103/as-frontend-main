import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface HeaderProps {
  job: string | undefined;
}

interface jobsInitialStageProps {
  header: HeaderProps;
}

export const headerInitialStage: jobsInitialStageProps = {
  header: {
    job: undefined,
  },
};

const HeaderSlice = createSlice({
  name: "header",
  initialState: headerInitialStage,
  reducers: {
    upsertHeaders: (state, action: PayloadAction<HeaderProps>) => {
      state.header = action.payload;
    },
    removeHeaders: (state) => {
      state.header = {
        job: undefined,
      };
    },
  },
});

export default HeaderSlice.reducer;
export const HeaderActions = HeaderSlice.actions;
