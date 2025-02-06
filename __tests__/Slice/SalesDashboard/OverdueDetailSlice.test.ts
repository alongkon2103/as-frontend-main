import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  fetchOverdueDetails,
  default as overdueDetailReducer,
  overdueDetailInitialState,
} from "../../../src/store/features/SalesDashboard/OverdueDetailSlice";
import { AnyAction } from "@reduxjs/toolkit";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockResponse = {
  data: [
    {
      order: "string",
      orderLine: 1,
      customerPO: "string",
      item: "string",
      dueDate: "string",
      requestedDate: "string",
      status: "string",
      orderedQuantity: 1,
      shippedQuantity: 1,
      remainQuantity: 1,
      netPrice: 1,
      currency: "string",
    },
  ],
};

describe("Sales Dashboard - OverdueDetail Slice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle sales dashboard success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      overdueDetail: overdueDetailInitialState,
    });

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/overdueDetails`)
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchOverdueDetails({
        projectId: "1",
        moreThanFifteen: false,
      })
    );

    const actions = store.getActions();
    expect(actions[0].type).toEqual(fetchOverdueDetails.pending.type);
    expect(actions[1].type).toEqual(fetchOverdueDetails.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    // Reducer test for fulfilled state
    const expectedState = {
      data: mockResponse.data,
      loading: false,
      error: null,
    };

    const newState = overdueDetailReducer(
      overdueDetailInitialState,
      actions[1] as AnyAction
    );

    expect(newState).toEqual(expectedState);
  });

  it("should handle sales dashboard failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      overdueDetail: overdueDetailInitialState,
    });

    const mockError = {
      message: "Error fetching sales dashboard OverdueDetail data",
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/overdueDetails`)
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchOverdueDetails({
        projectId: "1",
        moreThanFifteen: false,
      })
    );

    const actions = store.getActions();
    expect(actions[0].type).toEqual(fetchOverdueDetails.pending.type);
    expect(actions[1].type).toEqual(fetchOverdueDetails.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    // Reducer test for rejected state
    const expectedState = {
      ...overdueDetailInitialState,
      loading: false,
      error: null,
    };

    const newState = overdueDetailReducer(
      overdueDetailInitialState,
      actions[1] as AnyAction
    );
    expect(newState).toEqual(expectedState);
  });
});
