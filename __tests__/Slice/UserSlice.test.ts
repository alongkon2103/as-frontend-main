import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  fetchUsers,
  default as usersReducer,
  usersInitialStage,
} from "../../src/store/features/Users/UsersSlice";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("UsersSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle fetchUsers success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      users: usersInitialStage,
    });

    const mockResponse = {
      data: [
        {
          employeeId: "E001",
          role: "admin",
          firstName: "User",
          lastName: "One",
          email: "userone@example.com",
        },
        {
          employeeId: "E002",
          role: "user",
          firstName: "User",
          lastName: "Twp",
          email: "usertwo@example.com",
        },
      ],
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/auth/getAllEmployees`)
      .reply(200, mockResponse);

    await store.dispatch<any>(fetchUsers());

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchUsers.pending.type);
    expect(actions[1].type).toEqual(fetchUsers.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const expectedUsers = mockResponse.data.map((user) => ({
      id: user.employeeId,
      display: `${user.firstName}${user.lastName}${
        user.email.length > 0 ? `(${user.email})` : ""
      }`,
    }));

    const newState = usersReducer(usersInitialStage, actions[1]);
    expect(newState.users).toEqual(expectedUsers);
    expect(newState.loading).toBe(false);
  });

  it("should handle fetchUsers failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      users: usersInitialStage,
    });

    const mockError = {
      message: "Error fetching users",
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/auth/getAllEmployees`)
      .reply(400, mockError);

    await store.dispatch<any>(fetchUsers());

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchUsers.pending.type);
    expect(actions[1].type).toEqual(fetchUsers.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    const newState = usersReducer(usersInitialStage, actions[1]);
    expect(newState).toEqual(usersInitialStage);
  });
});
