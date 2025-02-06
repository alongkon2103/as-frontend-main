import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  LoginRequest,
  default as authReducer,
  AuthActions,
} from "../../src/store/features/Auth/AuthSlice";
import { initialState } from "../../src/store/features/Auth/AuthSlice";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("AuthSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle login success", async () => {
    const store = mockStore({ auth: initialState });

    const mockResponse = {
      token: "mockToken",
      data: {
        id: 1,
        employeeId: "E001",
        role: "admin",
        isActive: true,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      },
    };

    mockAxios
      .onPost(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`)
      .reply(200, mockResponse);

    await store.dispatch<any>(
      LoginRequest({
        employeeId: "E001",
        password: "password",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(LoginRequest.pending.type);
    expect(actions[1].type).toEqual(LoginRequest.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);
  });

  it("should handle login failure", async () => {
    const store = mockStore({ auth: initialState });

    const mockError = {
      message: "Invalid credentials",
    };

    mockAxios
      .onPost(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`)
      .reply(400, mockError);

    await store.dispatch<any>(
      LoginRequest({
        employeeId: "E001",
        password: "wrongpassword",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(LoginRequest.pending.type);
    expect(actions[1].type).toEqual(LoginRequest.rejected.type);
    expect(actions[1].payload).toEqual(mockError);
  });
});

describe("AuthSlice reducers", () => {
  it("should handle handleLogout", () => {
    const newState = authReducer(initialState, AuthActions.handleLogout());
    expect(newState).toEqual(initialState);
  });

  it("should handle LoginRequest.fulfilled", () => {
    const payload = {
      token: "mockToken",
      data: {
        id: 1,
        employeeId: "E001",
        role: "admin",
        isActive: true,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      },
    };

    const newState = authReducer(initialState, {
      type: LoginRequest.fulfilled.type,
      payload,
    });
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.token).toBe(payload.token);
    expect(newState.currentUser).toEqual(payload.data);
  });

  it("should handle LoginRequest.rejected", () => {
    const newState = authReducer(initialState, {
      type: LoginRequest.rejected.type,
    });
    expect(newState).toEqual(initialState);
  });
});
