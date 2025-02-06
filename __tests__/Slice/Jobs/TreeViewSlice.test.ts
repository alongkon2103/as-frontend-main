import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  fetchOnTreeViewDependencies,
  treeViewInitialStage,
  default as TreeviewReducer,
} from "@/store/features/Jobs/TreeViewSlice";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("TreeViewSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle fetchOnTreeViewDependencies success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      treeview: treeViewInitialStage,
    });

    const mockResponse = {
      data: {
        id: "1",
        name: "Item1",
      },
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/kanbanBoard/planner/dependencies`
      )
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchOnTreeViewDependencies({
        job: "mockId",
        suffix: 1,
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchOnTreeViewDependencies.pending.type);
    expect(actions[1].type).toEqual(fetchOnTreeViewDependencies.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const expectedState = {
      treeview: mockResponse.data,
      loading: false,
      error: null,
    };

    expect(TreeviewReducer(treeViewInitialStage, actions[1])).toEqual(
      expectedState
    );
  });

  it("should handle fetchOnTreeViewDependencies failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      treeview: treeViewInitialStage,
    });

    const mockError = {
      message: "Failed To Fetch Tree View",
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/kanbanBoard/planner/dependencies`
      )
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchOnTreeViewDependencies({
        job: "mockId",
        suffix: 1,
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchOnTreeViewDependencies.pending.type);
    expect(actions[1].type).toEqual(fetchOnTreeViewDependencies.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    expect(TreeviewReducer(treeViewInitialStage, actions[1])).toEqual(
      treeViewInitialStage
    );
  });
});
