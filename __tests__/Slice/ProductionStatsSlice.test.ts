import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  fetchProductionStats,
  default as ProductionStatsReducer,
  productionStatsInitialState,
} from "../../src/store/features/ProductionStats/ProductionStatsSlice";
import { AnyAction } from "@reduxjs/toolkit";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("ProductionStatsSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle production stats success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      quanityBreakdown: productionStatsInitialState,
    });

    const mockResponse = {
      data: [
        {
          onGoing: 2,
          finishedGoods: 2,
          totalFinishedGoods: 2,
          delayed: 2,
          problems: 2,
          updatedAt: "2021-01-01",
          delayedStartDate: 2,
          delayedEndDate: 2,
          utilization: 2,
        },
      ],
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/planner/productionStats`
      )
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchProductionStats({
        fromDate: "2021-01-01",
        toDate: "2021-01-31",
      })
    );

    const actions = store.getActions();
    expect(actions[0].type).toEqual(fetchProductionStats.pending.type);
    expect(actions[1].type).toEqual(fetchProductionStats.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const expectedState = {
      stats: mockResponse.data,
      loading: false,
      error: null,
    };

    const newState = ProductionStatsReducer(
      productionStatsInitialState,
      actions[1] as AnyAction
    );

    expect(newState).toEqual(expectedState);
  });

  it("should handle production stats failure", async () => {
    const store = mockStore({ auth: productionStatsInitialState });

    const mockError = {
      message: "Error fetching production stats data",
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/planner/productionStats`
      )
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchProductionStats({
        fromDate: "2021-01-01",
        toDate: "2021-01-31",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchProductionStats.pending.type);
    expect(actions[1].type).toEqual(fetchProductionStats.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    expect(
      ProductionStatsReducer(productionStatsInitialState, actions[1])
    ).toEqual(productionStatsInitialState);
  });
});
