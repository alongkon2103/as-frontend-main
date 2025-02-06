import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  availableMachinesInitialStage,
  fetchAvailableMachines,
  default as AvailableMachinesReducer,
} from "@/store/features/AvailableMachines/AvailableMachineSlice";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("AvailableMachinesSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle fetchAvailableMachines success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      availableMachine: availableMachinesInitialStage,
    });

    const mockResponse = {
      data: {
        machineId: 2,
        machineName: "machine",
      },
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/operator/availableMachines`
      )
      .reply(200, mockResponse);

    await store.dispatch<any>(fetchAvailableMachines());

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchAvailableMachines.pending.type);
    expect(actions[1].type).toEqual(fetchAvailableMachines.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const expectedState = {
      availableMachines: mockResponse.data,
      loading: false,
      error: null,
    };

    expect(
      AvailableMachinesReducer(availableMachinesInitialStage, actions[1])
    ).toEqual(expectedState);
  });

  it("should handle fetchAvailableMachines failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      availableMachine: availableMachinesInitialStage,
    });

    const mockError = {
      message: "Failed To Fetch Available Machine",
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/operator/availableMachines`
      )
      .reply(400, mockError);

    await store.dispatch<any>(fetchAvailableMachines());

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchAvailableMachines.pending.type);
    expect(actions[1].type).toEqual(fetchAvailableMachines.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    expect(
      AvailableMachinesReducer(availableMachinesInitialStage, actions[1])
    ).toEqual(availableMachinesInitialStage);
  });
});
