import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  fetchMonthlyForecast,
  default as monthlyForecastReducer,
  monthlyForecastlInitialState,
} from "../../../src/store/features/SalesDashboard/MonthlyForecastSlice";
import { AnyAction } from "@reduxjs/toolkit";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockResponse = {
  data: [
    {
      month: "FEB",
      monthYear: "02/24",
      partNo: "1",
      qty: {
        value: 1,
        forecast: 2,
      },
      price: {
        value: 1,
        forecast: 2,
      },
    },
  ],
};

describe("Sales Dashboard - MonthlyForecast Slice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle sales dashboard success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      monthlyForecast: monthlyForecastlInitialState,
    });

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/monthlyForecastBreakdown`)
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchMonthlyForecast({
        projectId: "1",
        fromDate: "2024-01-01",
        toDate: "2024-01-31",
        dateAhead: "0",
      })
    );

    const actions = store.getActions();
    expect(actions[0].type).toEqual(fetchMonthlyForecast.pending.type);
    expect(actions[1].type).toEqual(fetchMonthlyForecast.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    // Reducer test for fulfilled state
    const expectedState = {
      data: mockResponse.data,
      loading: false,
      error: null,
    };

    const newState = monthlyForecastReducer(
      monthlyForecastlInitialState,
      actions[1] as AnyAction
    );

    expect(newState).toEqual(expectedState);
  });

  it("should handle sales dashboard failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      monthlyForecast: monthlyForecastlInitialState,
    });

    const mockError = {
      message: "Error fetching sales dashboard monthlyForecast data",
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/monthlyForecastBreakdown`)
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchMonthlyForecast({
        projectId: "1",
        fromDate: "2024-01-01",
        toDate: "2024-01-31",
        dateAhead: "0",
      })
    );

    const actions = store.getActions();
    expect(actions[0].type).toEqual(fetchMonthlyForecast.pending.type);
    expect(actions[1].type).toEqual(fetchMonthlyForecast.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    // Reducer test for rejected state
    const expectedState = {
      ...monthlyForecastlInitialState,
      loading: false,
      error: null,
    };

    const newState = monthlyForecastReducer(
      monthlyForecastlInitialState,
      actions[1] as AnyAction
    );
    expect(newState).toEqual(expectedState);
  });
});
