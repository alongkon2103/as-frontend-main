import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  lowPerformanceInitialStage,
  fetchLowPerformance,
  default as LowPerformanceReducer,
  LowPerformanceParams,
} from "@/store/features/PerformanceReport/LowPerformanceSlice";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock("react-hot-toast");

describe("LowPerformanceSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle fetchLowPerformance success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      lowPerformance: lowPerformanceInitialStage,
    });

    const mockParams: LowPerformanceParams = {
      selectTop: "10",
      businessSegment: "Segment1",
      fromDate: "2023-01-01",
      toDate: "2023-12-31",
    };

    const mockResponse = {
      data: {
        ResourceId: "Resource1",
        ResourceLocation: "Location1",
        Percentage: 75,
        Reasons: "Some reasons",
      },
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/performanceReport/lowPerformance`
      )
      .reply(200, mockResponse);

    await store.dispatch<any>(fetchLowPerformance(mockParams));

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchLowPerformance.pending.type);
    expect(actions[1].type).toEqual(fetchLowPerformance.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const expectedState = {
      lowPerformance: mockResponse.data,
      loading: false,
      error: null,
    };

    expect(
      LowPerformanceReducer(lowPerformanceInitialStage, actions[1])
    ).toEqual(expectedState);
  });

  it("should handle fetchLowPerformance failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      lowPerformance: lowPerformanceInitialStage,
    });

    const mockParams: LowPerformanceParams = {
      selectTop: "10",
      businessSegment: "Segment1",
      fromDate: "2023-01-01",
      toDate: "2023-12-31",
    };

    const mockError = {
      message: "Failed to fetch low performance data",
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/performanceReport/lowPerformance`
      )
      .reply(400, mockError);

    await store.dispatch<any>(fetchLowPerformance(mockParams));

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchLowPerformance.pending.type);
    expect(actions[1].type).toEqual(fetchLowPerformance.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    expect(
      LowPerformanceReducer(lowPerformanceInitialStage, actions[1])
    ).toEqual(lowPerformanceInitialStage);
  });

  it("should set loading to true when fetchLowPerformance is pending", () => {
    const action = { type: fetchLowPerformance.pending.type };
    const state = LowPerformanceReducer(lowPerformanceInitialStage, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it("should update state correctly when fetchLowPerformance is fulfilled", () => {
    const mockData = {
      ResourceId: "Resource1",
      ResourceLocation: "Location1",
      Percentage: 75,
      Reasons: "Some reasons",
    };
    const action = {
      type: fetchLowPerformance.fulfilled.type,
      payload: { data: mockData },
    };
    const state = LowPerformanceReducer(lowPerformanceInitialStage, action);
    expect(state.loading).toBe(false);
    expect(state.lowPerformance).toEqual(mockData);
  });
});
