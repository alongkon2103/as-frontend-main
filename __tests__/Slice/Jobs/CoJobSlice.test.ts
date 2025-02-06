import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  coJobsInitialStage,
  fetchCoJobs,
  default as CoJobsReducer,
} from "@/store/features/Jobs/CoJobSlice";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("CoJobSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle fetchCoJobs success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      cojob: coJobsInitialStage,
    });

    const mockResponse = {
      data: {
        job: "job1",
        lot: "lot1",
        shipped: "yes",
        qty: 100,
      },
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/productionOverview/co/jobs`)
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchCoJobs({
        coNum: "123",
        coLine: 1,
        item: "item1",
        dueDate: "2024-01-01",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchCoJobs.pending.type);
    expect(actions[1].type).toEqual(fetchCoJobs.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const expectedState = {
      coJobs: mockResponse.data,
      loading: false,
      error: null,
    };

    expect(CoJobsReducer(coJobsInitialStage, actions[1])).toEqual(
      expectedState
    );
  });

  it("should handle fetchCoJobs failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      cojob: coJobsInitialStage,
    });

    const mockError = {
      message: "Failed To Fetch Co Job",
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/productionOverview/co/jobs`)
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchCoJobs({
        coNum: "123",
        coLine: 1,
        item: "item1",
        dueDate: "2024-01-01",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchCoJobs.pending.type);
    expect(actions[1].type).toEqual(fetchCoJobs.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    expect(CoJobsReducer(coJobsInitialStage, actions[1])).toEqual(
      coJobsInitialStage
    );
  });
});
