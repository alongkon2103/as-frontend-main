import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  processMachinesInitialStage,
  fetchProcessMachines,
  default as ProcessMachineReducer,
} from "@/store/features/ProcessMachine/ProcessMachineSlice";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("ProcessMachinesSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle fetchProcessMachines success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      processMachine: processMachinesInitialStage,
    });

    const mockResponse = {
      data: {
        machineName: "machine",
      },
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/operator/processMachines`)
      .reply(200, mockResponse);

    await store.dispatch<any>(fetchProcessMachines());

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchProcessMachines.pending.type);
    expect(actions[1].type).toEqual(fetchProcessMachines.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const expectedState = {
      processMachines: mockResponse.data,
      loading: false,
      error: null,
    };

    expect(
      ProcessMachineReducer(processMachinesInitialStage, actions[1])
    ).toEqual(expectedState);
  });

  it("should handle fetchProcessMachines failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      processMachine: processMachinesInitialStage,
    });

    const mockError = {
      message: "Failed To Fetch Process Machines",
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/operator/processMachines`)
      .reply(400, mockError);

    await store.dispatch<any>(fetchProcessMachines());

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchProcessMachines.pending.type);
    expect(actions[1].type).toEqual(fetchProcessMachines.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    expect(
      ProcessMachineReducer(processMachinesInitialStage, actions[1])
    ).toEqual(processMachinesInitialStage);
  });
});
