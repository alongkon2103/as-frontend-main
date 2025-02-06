import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  fetchProjects,
  default as ProjectReducer,
  projectInitialState,
} from "../../src/store/features/Project/ProjectSlice";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("ProjectSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle fetchProjects success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      projects: projectInitialState,
    });

    const mockResponse = {
      data: [
        {
          id: 1,
          projectName: "Project 1",
          planned: 2,
          onGoing: 2,
          progress: 2,
          delayed: 2,
          problems: 2,
        },
      ],
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/projects`)
      .reply(200, mockResponse);

    await store.dispatch<any>(fetchProjects());

    const actions = store.getActions();
    expect(actions[0].type).toEqual(fetchProjects.pending.type);
    expect(actions[1].type).toEqual(fetchProjects.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const expectedState = {
      projects: mockResponse.data,
      loading: false,
      error: null,
    };

    expect(ProjectReducer(projectInitialState, actions[1])).toEqual(
      expectedState
    );
  });

  it("should handle fetchProjects failure", async () => {
    const store = mockStore({ auth: projectInitialState });

    const mockError = {
      message: "Error fetching projects data",
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/projects`)
      .reply(400, mockError);

    await store.dispatch<any>(fetchProjects());

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchProjects.pending.type);
    expect(actions[1].type).toEqual(fetchProjects.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    expect(ProjectReducer(projectInitialState, actions[1])).toEqual(
      projectInitialState
    );
  });
});
