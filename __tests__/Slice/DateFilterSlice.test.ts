import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  filtersInitialState,
  default as DateRangeFilterReducer,
  DateRangeFilterActions,
} from "@/store/features/DateFilters/DateFilterSlice";
import { AnyAction } from "@reduxjs/toolkit";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("DataFilterSlice", () => {
  let store: ReturnType<typeof mockStore>;

  afterEach(() => {
    mockAxios.reset();
  });

  beforeEach(() => {
    store = mockStore({
      auth: { token: "mockToken" },
      dateRangeFilters: filtersInitialState,
    });
  });

  it("should have an initial state", () => {
    const actions = store.getActions();
    const state = DateRangeFilterReducer(undefined, {} as AnyAction);
    expect(state).toEqual({
      dashboardDateFilters: {},
      projectedDateFilters: {},
      weeklyDetailFilters: {},
    });
  });

  it("should handle updateDashBoardFilters action", () => {
    store.dispatch(
      DateRangeFilterActions.updateDashBoardFilters({
        userId: "user1",
        filters: { startDate: "2023-01-01", endDate: "2023-01-31" },
      })
    );

    const actions = store.getActions();
    const expectedAction = DateRangeFilterActions.updateDashBoardFilters({
      userId: "user1",
      filters: { startDate: "2023-01-01", endDate: "2023-01-31" },
    });

    expect(actions).toContainEqual(expectedAction);
  });

  it("should handle updateProjectFilters action", () => {
    store.dispatch(
      DateRangeFilterActions.updateProjectFilters({
        userId: "user2",
        filters: { startDate: "2023-02-01", endDate: "2023-02-28" },
      })
    );

    const actions = store.getActions();
    const expectedAction = DateRangeFilterActions.updateProjectFilters({
      userId: "user2",
      filters: { startDate: "2023-02-01", endDate: "2023-02-28" },
    });

    expect(actions).toContainEqual(expectedAction);
  });

  it("should handle updateWeeklyDetailFilters action", () => {
    store.dispatch(
      DateRangeFilterActions.updateWeeklyDetailFilters({
        userId: "user3",
        filters: { startDate: "2023-03-01", endDate: "2023-03-07" },
      })
    );

    const actions = store.getActions();
    const expectedAction = DateRangeFilterActions.updateWeeklyDetailFilters({
      userId: "user3",
      filters: { startDate: "2023-03-01", endDate: "2023-03-07" },
    });

    expect(actions).toContainEqual(expectedAction);
  });
});
