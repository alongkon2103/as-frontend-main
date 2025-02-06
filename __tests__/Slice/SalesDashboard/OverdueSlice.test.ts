import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  fetchOverdueStats,
  default as overdueStatsReducer,
  overdueInitialState,
} from "../../../src/store/features/SalesDashboard/OverdueSlice";
import { AnyAction } from "@reduxjs/toolkit";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockResponse = {
  data: {
    count: 1,
    total: 1,
    totalOverdue: 1,
    currency: "usd",
  },
};

describe("Sales Dashboard - Overdue Stats Slice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle sales dashboard - overdue stats success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      breakdown: overdueInitialState,
    });

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/overdueStats`)
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchOverdueStats({
        projectId: "1",
        moreThanFifteen: false,
      })
    );

    const actions = store.getActions();
    expect(actions[0].type).toEqual(fetchOverdueStats.pending.type);
    expect(actions[1].type).toEqual(fetchOverdueStats.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const expectedState = {
      data: {
        today: mockResponse.data,
        moreThanFifteen: null,
      },
      loading: false,
      error: null,
    };

    const newState = overdueStatsReducer(
      overdueInitialState,
      actions[1] as AnyAction
    );

    expect(newState).toEqual(expectedState);

    // Additional test for 'moreThanFifteen' flag true
    await store.dispatch<any>(
      fetchOverdueStats({
        projectId: "1",
        moreThanFifteen: true,
      })
    );

    const actionsForMoreThanFifteen = store.getActions().slice(2); // Skip the initial actions

    const expectedStateForMoreThanFifteen = {
      data: {
        today: mockResponse.data,
        moreThanFifteen: mockResponse.data,
      },
      loading: false,
      error: null,
    };

    const newStateForMoreThanFifteen = overdueStatsReducer(
      newState, // Use the state from the previous dispatch
      actionsForMoreThanFifteen[1] as AnyAction
    );

    expect(newStateForMoreThanFifteen).toEqual(expectedStateForMoreThanFifteen);
  });

  it("should handle sales dashboard - overdue stats failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      breakdown: overdueInitialState,
    });

    const mockError = {
      message: "Error fetching sales dashboard overdue stats data",
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/overdueStats`)
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchOverdueStats({
        projectId: "1",
        moreThanFifteen: true,
      })
    );

    const actions = store.getActions();
    expect(actions[0].type).toEqual(fetchOverdueStats.pending.type);
    expect(actions[1].type).toEqual(fetchOverdueStats.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    // Reducer test for rejected state
    const expectedState = {
      ...overdueInitialState,
      loading: false,
      error: null,
    };

    const newState = overdueStatsReducer(
      overdueInitialState,
      actions[1] as AnyAction
    );
    expect(newState).toEqual(expectedState);
  });
});
