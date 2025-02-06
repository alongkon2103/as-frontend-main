import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  fetchSalesDashboard,
  default as salesDashboardReducer,
  salesDashboardInitialState,
} from "../../../src/store/features/SalesDashboard/SalesDashboardSlice";
import { AnyAction } from "@reduxjs/toolkit";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockResponse = {
  data: {
    overall: {
      actualRevenue: {
        title: "Revenue",
        percentage: 50,
        count: 200,
        forecast: 400,
        total: 600,
        currency: "USD",
      },
      ordered: {
        title: "Ordered",
        percentage: 30,
        count: 150,
        forecast: 500,
        total: 650,
      },
      shipped: {
        title: "Shipped",
        percentage: 20,
        count: 100,
        forecast: 300,
        total: 400,
      },
      overdue: {
        title: "Overdue",
        percentage: 10,
        count: 50,
        forecast: 100,
        total: 150,
      },
    },
    breakdown: [
      {
        groupBy: "2024-01-01",
        actualRevenue: {
          orderedQty: 10,
          qty: 15,
          forecast: 20,
        },
        ordered: {
          qty: 25,
          forecast: 30,
        },
        shipped: 35,
        overdue: 40,
        criteriaDateFrom: "2024-01-01",
        criteriaDateTo: "2024-01-31",
      },
      {
        groupBy: "2024-01-02",
        actualRevenue: {
          orderedQty: 20,
          qty: 25,
          forecast: 30,
        },
        ordered: {
          qty: 35,
          forecast: 40,
        },
        shipped: 45,
        overdue: 50,
        criteriaDateFrom: "2024-01-01",
        criteriaDateTo: "2024-01-31",
      },
    ],
  },
};

describe("SalesDashboardSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle sales dashboard success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      salesDashboard: salesDashboardInitialState,
    });

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/salesDashboard`)
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchSalesDashboard({
        projectId: "1",
        fromDate: "2024-01-01",
        toDate: "2024-01-31",
        breakdownBy: "month",
        dateFilter: "custom",
        dateAhead: "0",
      })
    );

    const actions = store.getActions();
    expect(actions[0].type).toEqual(fetchSalesDashboard.pending.type);
    expect(actions[1].type).toEqual(fetchSalesDashboard.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    // Reducer test for fulfilled state
    const expectedState = {
      ...salesDashboardInitialState,
      data: mockResponse.data,
      loading: false,
    };

    const newState = salesDashboardReducer(
      salesDashboardInitialState,
      actions[1] as AnyAction
    );
    expect(newState).toEqual(expectedState);
  });

  it("should handle sales dashboard failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      salesDashboard: salesDashboardInitialState,
    });

    const mockError = {
      message: "Error fetching sales dashboard data",
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/salesDashboard`)
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchSalesDashboard({
        projectId: "1",
        fromDate: "2024-01-01",
        toDate: "2024-01-31",
        breakdownBy: "month",
        dateFilter: "custom",
        dateAhead: "0",
      })
    );

    const actions = store.getActions();
    expect(actions[0].type).toEqual(fetchSalesDashboard.pending.type);
    expect(actions[1].type).toEqual(fetchSalesDashboard.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    // Reducer test for rejected state
    const expectedState = {
      ...salesDashboardInitialState,
      loading: false,
      error: null,
    };

    const newState = salesDashboardReducer(
      salesDashboardInitialState,
      actions[1] as AnyAction
    );
    expect(newState).toEqual(expectedState);
  });
});
