import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  fetchJobDetails,
  jobDetailInitialStage,
  default as JobDetailsReducer,
} from "@/store/features/Jobs/JobDetailSlice";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("JobDatesSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle fetchJobDetails success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      jobDetail: jobDetailInitialStage,
    });

    const mockResponse = {
      data: {
        assigned: "John Doe",
        status: "In Progress",
        problem: ["Issue 1", "Issue 2"],
        machine: "Machine 1",
        priority: "High",
        cycleTime: "2 hours",
        qty: 10,
      },
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/problemComment/getCardDetail`)
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchJobDetails({
        projectId: 1,
        refNum: "12345",
        refType: "job",
        refLine: 1,
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchJobDetails.pending.type);
    expect(actions[1].type).toEqual(fetchJobDetails.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const expectedState = {
      jobDetails: mockResponse.data,
      loading: false,
      error: null,
    };

    expect(JobDetailsReducer(jobDetailInitialStage, actions[1])).toEqual(
      expectedState
    );
  });

  it("should handle fetchJobDetails failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      jobDetail: jobDetailInitialStage,
    });

    const mockError = {
      message: "Failed To Fetch Job Details",
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/problemComment/getCardDetail`)
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchJobDetails({
        projectId: 1,
        refNum: "12345",
        refType: "job",
        refLine: 1,
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchJobDetails.pending.type);
    expect(actions[1].type).toEqual(fetchJobDetails.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    expect(JobDetailsReducer(jobDetailInitialStage, actions[1])).toEqual(
      jobDetailInitialStage
    );
  });
});
