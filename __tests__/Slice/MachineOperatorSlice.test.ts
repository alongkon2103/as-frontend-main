import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  machineOperatorInitialStage,
  fetchMachineOperator,
  default as MachineOperatorReducer,
} from "@/store/features/MachineOperator/MachineOperatorSlice";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("MachineOperatorSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle fetchMachineOperator success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      MachineOperator: machineOperatorInitialStage,
    });

    const mockResponse = {
      data: {
        machineName: "test machine",
        description: "test machine",
        status: "test machine",
        mcid: "test machine",
        problem: "test machine",
        assigned: "test machine",
        totalCycleTime: 11,
        spindleLoad: 11,
        spindleRuntime: 11,
        spindleSpeed: 11,
      },
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/operator/machineOperator`)
      .reply(200, mockResponse);

    await store.dispatch<any>(fetchMachineOperator({ machineName: "machine" }));

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchMachineOperator.pending.type);
    expect(actions[1].type).toEqual(fetchMachineOperator.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const expectedState = {
      machineOperator: mockResponse.data,
      loading: false,
      error: null,
    };

    expect(
      MachineOperatorReducer(machineOperatorInitialStage, actions[1])
    ).toEqual(expectedState);
  });

  it("should handle fetchMachineOperator failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      availableMachine: machineOperatorInitialStage,
    });

    const mockError = {
      message: "Failed To Fetch Machine Operators",
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/operator/machineOperator`)
      .reply(400, mockError);

    await store.dispatch<any>(fetchMachineOperator({ machineName: "machine" }));

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchMachineOperator.pending.type);
    expect(actions[1].type).toEqual(fetchMachineOperator.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    expect(
      MachineOperatorReducer(machineOperatorInitialStage, actions[1])
    ).toEqual(machineOperatorInitialStage);
  });
});
