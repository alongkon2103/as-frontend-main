import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  HeaderActions,
  headerInitialStage,
  HeaderProps,
  default as HeaderReducer,
} from "@/store/features/Header/HeaderSlice";
import { AnyAction } from "@reduxjs/toolkit";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("HeaderSlice", () => {
  let store: ReturnType<typeof mockStore>;

  afterEach(() => {
    mockAxios.reset();
  });

  beforeEach(() => {
    store = mockStore({
      auth: { token: "mockToken" },
      header: headerInitialStage,
    });
  });

  it("should have an initial state", () => {
    const state = HeaderReducer(undefined, {} as AnyAction);
    expect(state).toEqual(headerInitialStage);
  });

  it("should handle upsertHeaders action", () => {
    const newHeader: HeaderProps = {
      job: "Engineer",
    };

    store.dispatch(HeaderActions.upsertHeaders(newHeader));
    const actions = store.getActions();

    expect(actions).toContainEqual(HeaderActions.upsertHeaders(newHeader));

    const state = HeaderReducer(
      undefined,
      HeaderActions.upsertHeaders(newHeader)
    );
    expect(state.header).toEqual(newHeader);
  });

  it("should handle removeHeaders action", () => {
    store.dispatch(HeaderActions.removeHeaders());
    const actions = store.getActions();

    expect(actions).toContainEqual(HeaderActions.removeHeaders());

    const state = HeaderReducer(undefined, HeaderActions.removeHeaders());
    expect(state.header).toEqual({
      job: undefined,
    });
  });
});
