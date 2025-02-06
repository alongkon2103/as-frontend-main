import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  fetchBreakdownDetails,
  default as breakdownReducer,
  breakdownDetailInitialState,
} from "../../../src/store/features/SalesDashboard/BreakdownSlice";
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

describe("Sales Dashboard - Breakdown Slice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle sales dashboard success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      breakdown: breakdownDetailInitialState,
    });

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/breakdownDetails`)
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchBreakdownDetails({
        projectId: "1",
        fromDate: "2024-01-01",
        toDate: "2024-01-31",
        dateFilter: "custom",
        groupBy: "Overall", // Overall || Breakdown
        groupByType: "string",
      })
    );

    const actions = store.getActions();
    expect(actions[0].type).toEqual(fetchBreakdownDetails.pending.type);
    expect(actions[1].type).toEqual(fetchBreakdownDetails.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    // Reducer test for fulfilled state
    const expectedState = {
      data: mockResponse.data,
      loading: false,
      error: null,
    };

    const newState = breakdownReducer(
      breakdownDetailInitialState,
      actions[1] as AnyAction
    );

    expect(newState).toEqual(expectedState);
  });

  it("should handle sales dashboard failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      breakdown: breakdownDetailInitialState,
    });

    const mockError = {
      message: "Error fetching sales dashboard breakdown data",
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/breakdownDetails`)
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchBreakdownDetails({
        projectId: "1",
        fromDate: "2024-01-01",
        toDate: "2024-01-31",
        dateFilter: "custom",
        groupBy: "",
        groupByType: "string",
      })
    );

    const actions = store.getActions();
    expect(actions[0].type).toEqual(fetchBreakdownDetails.pending.type);
    expect(actions[1].type).toEqual(fetchBreakdownDetails.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    // Reducer test for rejected state
    const expectedState = {
      ...breakdownDetailInitialState,
      loading: false,
      error: null,
    };

    const newState = breakdownReducer(
      breakdownDetailInitialState,
      actions[1] as AnyAction
    );
    expect(newState).toEqual(expectedState);
  });
});
