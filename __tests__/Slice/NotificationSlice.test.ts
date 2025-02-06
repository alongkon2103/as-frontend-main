import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  notificationsInitialStage,
  fetchNotifications,
  readNotification,
  markAllAsRead,
  default as NotificationReducer,
} from "@/store/features/Notifications/NotificationSlice";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("NotificationsSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle fetchNotifications success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      notifications: notificationsInitialStage,
    });

    const mockResponse = {
      data: {
        notifications: [],
        loading: false,
        error: null,
      },
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/notifications`)
      .reply(200, mockResponse);

    await store.dispatch<any>(fetchNotifications({}));

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchNotifications.pending.type);
    expect(actions[1].type).toEqual(fetchNotifications.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const expectedState = {
      notifications: mockResponse.data,
      loading: false,
      error: null,
    };

    expect(NotificationReducer(notificationsInitialStage, actions[1])).toEqual(
      expectedState
    );
  });

  it("should handle fetchNotifications failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      notifications: notificationsInitialStage,
    });

    const mockError = {
      message: "Failed To Fetch Notifications",
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/notifications`)
      .reply(400, mockError);

    await store.dispatch<any>(fetchNotifications({}));

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchNotifications.pending.type);
    expect(actions[1].type).toEqual(fetchNotifications.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    expect(NotificationReducer(notificationsInitialStage, actions[1])).toEqual(
      notificationsInitialStage
    );
  });

  it("should handle readNotification success", async () => {
    const store = mockStore({
      auth: {
        token: "mockToken",
      },
      notifications: [
        {
          id: "2",
          title: "testing",
          message: "testing",
          isRead: 0,
        },
      ],
    });

    const mockResponse = {
      data: {
        notifications: [
          {
            id: "2",
            title: "testing",
            message: "testing",
            isRead: 1,
          },
        ],
        loading: false,
        error: null,
      },
    };

    mockAxios
      .onPatch(`${process.env.NEXT_PUBLIC_API_URL}/notification/2`, {
        id: "2",
      })
      .reply(200, mockResponse);

    await store.dispatch<any>(
      readNotification({
        id: "2",
      })
    );

    const actions = store.getActions();
    expect(actions[0].type).toEqual(readNotification.pending.type);
    expect(actions[1].type).toEqual(readNotification.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);
  });

  it("should handle readNotification failure", async () => {
    const store = mockStore({
      auth: {
        token: "mockToken",
      },
      notifications: [
        {
          id: "2",
          title: "testing",
          message: "testing",
          isRead: 0,
        },
      ],
    });

    const mockError = {
      message: "Failed To Read Notification",
    };

    mockAxios
      .onPatch(`${process.env.NEXT_PUBLIC_API_URL}/notification/2`, {
        id: "2",
      })
      .reply(200, mockError);

    await store.dispatch<any>(
      readNotification({
        id: "2",
      })
    );

    const actions = store.getActions();
    expect(actions[0].type).toEqual(readNotification.pending.type);
    expect(actions[1].type).toEqual(readNotification.fulfilled.type);
    expect(actions[1].payload).toEqual(mockError);
  });

  it("should handle markAllAsRead success", async () => {
    const store = mockStore({
      auth: {
        token: "mockToken",
      },
      notifications: [
        {
          id: "2",
          title: "testing",
          message: "testing",
          isRead: 0,
        },
        {
          id: "3",
          title: "testing",
          message: "testing",
          isRead: 0,
        },
      ],
    });
    const mockResponse = {
      message: "success",
    };

    mockAxios
      .onPost(`${process.env.NEXT_PUBLIC_API_URL}/notifications/markAllAsRead`)
      .reply(200, mockResponse);

    await store.dispatch<any>(markAllAsRead());

    const actions = store.getActions();
    expect(actions[0].type).toEqual(markAllAsRead.pending.type);
    expect(actions[1].type).toEqual(markAllAsRead.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);
  });

  it("should handle markAllAsRead failure", async () => {
    const store = mockStore({
      auth: {
        token: "mockToken",
      },
      notifications: [
        {
          id: "2",
          title: "testing",
          message: "testing",
          isRead: 0,
        },
        {
          id: "3",
          title: "testing",
          message: "testing",
          isRead: 0,
        },
      ],
    });

    const mockResponse = {
      message: "failure",
    };

    mockAxios
      .onPost(`${process.env.NEXT_PUBLIC_API_URL}/notifications/markAllAsRead`)
      .reply(200, mockResponse);

    await store.dispatch<any>(markAllAsRead());

    const actions = store.getActions();
    expect(actions[0].type).toEqual(markAllAsRead.pending.type);
    expect(actions[1].type).toEqual(markAllAsRead.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);
  });
});
