import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  fetchOperatorJobs,
  operatorJobsInitialStage,
  default as OperatorJobsReducer,
} from "@/store/features/Jobs/OperatorJobSlice";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("OperatorJobSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle fetchOperatorJobs success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      operatorJobs: operatorJobsInitialStage,
    });

    const mockResponse = {
      data: {
        job: "job1",
        suffix: 1,
        item: "item1",
        qty: 100,
        material: "material1",
        progress: 50,
        oper: 1,
        problems: "None",
        typeStatus: "Active",
        startDate: "2023-01-01",
        endDate: "2023-01-10",
        latestComment: "Comment",
        priority: "High",
      },
      paginationMetadata: {
        currentPage: 1,
        totalCount: 1,
        totalPages: 1,
        hasPrevious: false,
        hasNext: false,
      },
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/jobs/operatorJobs`)
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchOperatorJobs({
        machineName: "machine1",
        toDate: "2024-01-01",
        fromDate: "2023-01-01",
        page: 1,
        limit: 10,
        data: "data1",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchOperatorJobs.pending.type);
    expect(actions[1].type).toEqual(fetchOperatorJobs.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const expectedState = {
      operatorJobs: mockResponse.data,
      pagination: mockResponse.paginationMetadata,
      loading: false,
      error: null,
    };

    expect(OperatorJobsReducer(operatorJobsInitialStage, actions[1])).toEqual(
      expectedState
    );
  });

  it("should handle fetchOperatorJobs failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      operatorJobs: operatorJobsInitialStage,
    });

    const mockError = {
      message: "Failed To Fetch Operator Job",
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/jobs/operatorJobs`)
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchOperatorJobs({
        machineName: "machine1",
        toDate: "2024-01-01",
        fromDate: "2023-01-01",
        page: 1,
        limit: 10,
        data: "data1",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchOperatorJobs.pending.type);
    expect(actions[1].type).toEqual(fetchOperatorJobs.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    expect(OperatorJobsReducer(operatorJobsInitialStage, actions[1])).toEqual(
      operatorJobsInitialStage
    );
  });
});
