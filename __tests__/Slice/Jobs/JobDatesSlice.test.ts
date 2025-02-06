import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  fetchJobDetailDates,
  jobDetailDateInitialStage,
  default as JobDetailDateReducer,
} from "@/store/features/Jobs/JobDatesSlice";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("JobDatesSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle fetchJobDetailDates success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      cojob: jobDetailDateInitialStage,
    });

    const mockResponse = {
      data: {
        machiningDate: "2021-1-1",
        cmmDate: "2021-1-2",
        finalMCDate: "2021-1-3",
        createdBy: "2021-1-4",
        lastUpdatedDate: "2021-1-5",
      },
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/problemComment/getActualProductionStartDate`
      )
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchJobDetailDates({
        projectId: 2,
        job: "mockJob",
        suffix: 3,
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchJobDetailDates.pending.type);
    expect(actions[1].type).toEqual(fetchJobDetailDates.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const expectedState = {
      jobDetailDates: mockResponse.data,
      loading: false,
      error: null,
    };

    expect(JobDetailDateReducer(jobDetailDateInitialStage, actions[1])).toEqual(
      expectedState
    );
  });

  it("should handle fetchJobDetailDates failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      cojob: jobDetailDateInitialStage,
    });

    const mockError = {
      message: "Failed To Fetch Job Detail Dates",
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/problemComment/getActualProductionStartDate`
      )
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchJobDetailDates({
        projectId: 2,
        job: "mockJob",
        suffix: 3,
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchJobDetailDates.pending.type);
    expect(actions[1].type).toEqual(fetchJobDetailDates.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    expect(JobDetailDateReducer(jobDetailDateInitialStage, actions[1])).toEqual(
      jobDetailDateInitialStage
    );
  });
});
