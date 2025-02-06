import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  fetchProjectSummary,
  projectSummaryInitialStage,
  default as ProjectSummaryReducer,
} from "@/store/features/PerformanceReport/ProjectSummarySlice";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("ProjectSummarySlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle fetchProjectSummary success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      projectSummary: projectSummaryInitialStage,
    });

    const mockResponse = {
      data: {
        project: "mockProject",
        planAps: 1,
        planCommitOee: 1,
        actual: 1,
        machine: 1,
        performanceAps: 1,
        performance: 1,
        utilization: 1,
      },
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/performanceReport/projectSummary`
      )
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchProjectSummary({
        businessSegment: "",
        fromDate: "2021-01-01",
        toDate: "2021-12-30",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchProjectSummary.pending.type);
    expect(actions[1].type).toEqual(fetchProjectSummary.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const expectedState = {
      projectSummary: mockResponse.data,
      loading: false,
      error: null,
    };

    expect(
      ProjectSummaryReducer(projectSummaryInitialStage, actions[1])
    ).toEqual(expectedState);
  });

  it("should handle fetchProjectSummary failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      availableMachine: projectSummaryInitialStage,
    });

    const mockError = {
      message: "Failed To Fetch Project Summary",
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/performanceReport/projectSummary`
      )
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchProjectSummary({
        businessSegment: "",
        fromDate: "2021-01-01",
        toDate: "2021-12-30",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchProjectSummary.pending.type);
    expect(actions[1].type).toEqual(fetchProjectSummary.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    expect(
      ProjectSummaryReducer(projectSummaryInitialStage, actions[1])
    ).toEqual(projectSummaryInitialStage);
  });
});
