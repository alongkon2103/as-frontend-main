import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  fetchOnTreeViewDependenciesDetails,
  kanbanInitialStage,
  default as KanbanReducer,
} from "@/store/features/Jobs/KanbanSlice";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("KanbanSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle fetchOnTreeViewDependenciesDetails success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      treeView: kanbanInitialStage,
    });

    const mockResponse = {
      data: {
        stages: [
          {
            name: "Stage1",
            percent: 50,
            sortOrder: 1,
            status: "Active",
            total: 100,
          },
        ],
        childItems: [
          {
            item: "Item1",
            operNum: 1,
            qty: 10,
            refLine: 1,
            refNum: "Ref1",
            refType: "Type1",
            stage: "Stage1",
            status: "Active",
            subOrderId: "Sub1",
            totalQty: 100,
          },
        ],
      },
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/kanbanBoard/planner/dependenciesDetails`
      )
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchOnTreeViewDependenciesDetails({
        projectId: "mockProjectId",
        matltag: "mockMatltag",
        job: "mockJob",
        suffix: "mockSuffix",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(
      fetchOnTreeViewDependenciesDetails.pending.type
    );
    expect(actions[1].type).toEqual(
      fetchOnTreeViewDependenciesDetails.fulfilled.type
    );
    expect(actions[1].payload).toEqual(mockResponse);

    const expectedState = {
      kanban: mockResponse.data,
      loading: false,
      error: null,
    };

    expect(KanbanReducer(kanbanInitialStage, actions[1])).toEqual(
      expectedState
    );
  });

  it("should handle fetchOnTreeViewDependenciesDetails failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      treeView: kanbanInitialStage,
    });

    const mockError = {
      message: "Failed To Fetch Kanban",
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/kanbanBoard/planner/dependenciesDetails`
      )
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchOnTreeViewDependenciesDetails({
        projectId: "mockProjectId",
        matltag: "mockMatltag",
        job: "mockJob",
        suffix: "mockSuffix",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(
      fetchOnTreeViewDependenciesDetails.pending.type
    );
    expect(actions[1].type).toEqual(
      fetchOnTreeViewDependenciesDetails.rejected.type
    );
    expect(actions[1].payload).toEqual(mockError);

    expect(KanbanReducer(kanbanInitialStage, actions[1])).toEqual(
      kanbanInitialStage
    );
  });
});
