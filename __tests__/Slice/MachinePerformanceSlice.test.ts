import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  machinePerformanceInitialStage,
  fetchMachinePerformances,
  fetchMachineIssues,
  fetchMachinePerformanceByProjects,
  default as MachineOperatorReducer,
} from "@/store/features/MachinePerformance/MachinePerformanceSlice";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("MachineOperatorSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle fetchMachinePerformances success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
    });

    const mockResponse = {
      data: {
        machineName: "machine",
      },
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/machinePerformance`)
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchMachinePerformances({
        fromDate: "2021-01-01",
        toDate: "2021-01-01",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchMachinePerformances.pending.type);
    expect(actions[1].type).toEqual(fetchMachinePerformances.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const expectedState = {
      machinePerformance: mockResponse.data,
    };

    expect(
      MachineOperatorReducer(machinePerformanceInitialStage, actions[1])
        .machinePerformance
    ).toEqual(expectedState.machinePerformance);
  });

  it("should handle fetchMachinePerformances failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      availableMachine: machinePerformanceInitialStage,
    });

    const mockError = {
      message: "Failed To Fetch Machine Performances",
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/machinePerformance`)
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchMachinePerformances({
        fromDate: "2021-01-01",
        toDate: "2021-01-01",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchMachinePerformances.pending.type);
    expect(actions[1].type).toEqual(fetchMachinePerformances.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    expect(
      MachineOperatorReducer(machinePerformanceInitialStage, actions[1])
    ).toEqual(machinePerformanceInitialStage);
  });

  it("should handle fetchMachineIssues success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
    });

    const mockResponse = {
      data: {
        machineName: "machine",
        project: "project",
        job: "job",
        item: "it1",
        qty: 11,
        suffix: 0,
        problem: "",
      },
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/machinePerformance/machineIssues`
      )
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchMachineIssues({
        name: "machine",
        fromDate: "2021-01-01",
        toDate: "2021-01-01",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchMachineIssues.pending.type);
    expect(actions[1].type).toEqual(fetchMachineIssues.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const expectedState = {
      machineIssues: mockResponse.data,
    };

    expect(
      MachineOperatorReducer(machinePerformanceInitialStage, actions[1])
        .machineIssues
    ).toEqual(expectedState.machineIssues);
  });

  it("should handle fetchMachineIssues failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      availableMachine: machinePerformanceInitialStage,
    });

    const mockError = {
      message: "Failed To Fetch Machine Issues",
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/machinePerformance/machineIssues`
      )
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchMachineIssues({
        name: "machine",
        fromDate: "2021-01-01",
        toDate: "2021-01-01",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchMachineIssues.pending.type);
    expect(actions[1].type).toEqual(fetchMachineIssues.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    expect(
      MachineOperatorReducer(machinePerformanceInitialStage, actions[1])
    ).toEqual(machinePerformanceInitialStage);
  });

  it("should handle fetchMachinePerformanceByProjects success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
    });

    const mockResponse = {
      data: {
        projectName: "pr",
        actualQty: 11,
        plannedQty: 11,
        percentage: 11,
      },
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/machinePerformance/projects`)
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchMachinePerformanceByProjects({
        name: "machine",
        fromDate: "2021-01-01",
        toDate: "2021-01-01",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(
      fetchMachinePerformanceByProjects.pending.type
    );
    expect(actions[1].type).toEqual(
      fetchMachinePerformanceByProjects.fulfilled.type
    );
    expect(actions[1].payload).toEqual(mockResponse);

    const expectedState = {
      machinePerformanceByProjects: mockResponse.data,
    };

    expect(
      MachineOperatorReducer(machinePerformanceInitialStage, actions[1])
        .machinePerformanceByProjects
    ).toEqual(expectedState.machinePerformanceByProjects);
  });

  it("should handle fetchMachinePerformanceByProjects failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      availableMachine: machinePerformanceInitialStage,
    });

    const mockError = {
      message: "Failed To Fetch Machine Performance By Projects",
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/machinePerformance/projects`)
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchMachinePerformanceByProjects({
        name: "machine",
        fromDate: "2021-01-01",
        toDate: "2021-01-01",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(
      fetchMachinePerformanceByProjects.pending.type
    );
    expect(actions[1].type).toEqual(
      fetchMachinePerformanceByProjects.rejected.type
    );
    expect(actions[1].payload).toEqual(mockError);

    expect(
      MachineOperatorReducer(machinePerformanceInitialStage, actions[1])
    ).toEqual(machinePerformanceInitialStage);
  });
});
