import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  filtersInitialStage,
  default as FilterReducer,
  FilterActions,
} from "@/store/features/Filters/FilterSlice";
import { AnyAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("FilterSlice", () => {
  let store: ReturnType<typeof mockStore>;

  afterEach(() => {
    mockAxios.reset();
  });

  beforeEach(() => {
    store = mockStore({
      auth: { token: "mockToken" },
      filters: filtersInitialStage,
    });
  });

  it("should have an initial state", () => {
    const state = FilterReducer(undefined, {} as AnyAction);
    expect(state).toEqual(filtersInitialStage);
  });

  it("should handle updateJobFilters action", () => {
    const newFilters = [
      { id: 2, columnValueKey: "jobKey", textValueKey: "jobValue" },
    ];

    store.dispatch(FilterActions.updateJobFilters(newFilters));
    const actions = store.getActions();

    expect(actions).toContainEqual(FilterActions.updateJobFilters(newFilters));

    const state = FilterReducer(
      undefined,
      FilterActions.updateJobFilters(newFilters)
    );
    expect(state.jobFilters).toEqual(newFilters);
  });

  it("should handle updateJobStatusFilters action", () => {
    const newFilters = [
      { id: 2, columnValueKey: "statusKey", textValueKey: "statusValue" },
    ];

    store.dispatch(FilterActions.updateJobStatusFilters(newFilters));
    const actions = store.getActions();

    expect(actions).toContainEqual(
      FilterActions.updateJobStatusFilters(newFilters)
    );

    const state = FilterReducer(
      undefined,
      FilterActions.updateJobStatusFilters(newFilters)
    );
    expect(state.jobStatusFilters).toEqual(newFilters);
  });

  it("should handle updateOperatorFilters action", () => {
    const newFilters = [
      { id: 2, columnValueKey: "operatorKey", textValueKey: "operatorValue" },
    ];

    store.dispatch(FilterActions.updateOperatorFilters(newFilters));
    const actions = store.getActions();

    expect(actions).toContainEqual(
      FilterActions.updateOperatorFilters(newFilters)
    );

    const state = FilterReducer(
      undefined,
      FilterActions.updateOperatorFilters(newFilters)
    );
    expect(state.operatorFilters).toEqual(newFilters);
  });

  it("should handle updateOperatorManagerFilters action", () => {
    const newFilters = [
      { id: 2, columnValueKey: "managerKey", textValueKey: "managerValue" },
    ];

    store.dispatch(FilterActions.updateOperatorManagerFilters(newFilters));
    const actions = store.getActions();

    expect(actions).toContainEqual(
      FilterActions.updateOperatorManagerFilters(newFilters)
    );

    const state = FilterReducer(
      undefined,
      FilterActions.updateOperatorManagerFilters(newFilters)
    );
    expect(state.operatorManagerFilters).toEqual(newFilters);
  });

  it("should handle PURGE action", () => {
    const state = FilterReducer(undefined, { type: PURGE });
    expect(state).toEqual(filtersInitialStage);
  });
});
