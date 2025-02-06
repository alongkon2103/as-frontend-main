import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  fetchQuantityBreakdown,
  default as QuantityBreakdownReducer,
  quanityBreakdownInitialState,
} from "../../src/store/features/QuantityBreakdown/QuantityBreakdownSlice";
import { AnyAction } from "@reduxjs/toolkit";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("QuantityBreakdownSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle quantity breakdown success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      quanityBreakdown: quanityBreakdownInitialState,
    });

    const mockResponse = {
      data: [
        {
          id: 1,
          projectName: "Project 1",
          planned: 2,
          onGoing: 2,
          progress: 2,
          delayed: 2,
          problems: 2,
        },
      ],
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/planner/quantityBreakdown`
      )
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchQuantityBreakdown({
        fromDate: "2021-01-01",
        toDate: "2021-01-31",
      })
    );

    const actions = store.getActions();
    expect(actions[0].type).toEqual(fetchQuantityBreakdown.pending.type);
    expect(actions[1].type).toEqual(fetchQuantityBreakdown.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const expectedState = {
      data: mockResponse.data,
      loading: false,
      error: null,
    };

    const newState = QuantityBreakdownReducer(
      quanityBreakdownInitialState,
      actions[1] as AnyAction
    );

    expect(newState).toEqual(expectedState);
  });

  it("should handle quantity breakdown failure", async () => {
    const store = mockStore({ auth: quanityBreakdownInitialState });

    const mockError = {
      message: "Error fetching quantity breakdown data",
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/planner/quantityBreakdown`
      )
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchQuantityBreakdown({
        fromDate: "2021-01-01",
        toDate: "2021-01-31",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchQuantityBreakdown.pending.type);
    expect(actions[1].type).toEqual(fetchQuantityBreakdown.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    const newState = QuantityBreakdownReducer(
      quanityBreakdownInitialState,
      actions[1]
    );
    expect(newState).toEqual(quanityBreakdownInitialState);
  });
});
