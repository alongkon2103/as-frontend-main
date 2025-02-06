import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  commentsInitialStage,
  fetchCoComments,
  postCoComment,
  default as CoCommentsReducer,
} from "@/store/features/Comments/CoCommentSlice";
import { AnyAction } from "@reduxjs/toolkit";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("CoCommentSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle fetchCoComments success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      coComment: commentsInitialStage,
    });

    const mockResponse = {
      data: {
        comments: ["testing"],
        loading: false,
        error: null,
      },
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/productionOverview/co/comments`
      )
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchCoComments({
        coNum: "2",
        coLine: 2,
        item: "2",
        dueDate: "2021-01-01",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchCoComments.pending.type);
    expect(actions[1].type).toEqual(fetchCoComments.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const expectedState = {
      comments: {
        comments: mockResponse.data.comments,
        loading: false,
        error: null,
      },
      pagination: undefined,
      loading: false,
      error: null,
    };

    expect(CoCommentsReducer(commentsInitialStage, actions[1])).toEqual(
      expectedState
    );
  });

  it("should handle fetchCoComments failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      coComment: commentsInitialStage,
    });

    const mockError = {
      message: "Failed To Fetch Co Comments",
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/productionOverview/co/comments`
      )
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchCoComments({
        coNum: "2",
        coLine: 2,
        item: "2",
        dueDate: "2021-01-01",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchCoComments.pending.type);
    expect(actions[1].type).toEqual(fetchCoComments.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    expect(CoCommentsReducer(commentsInitialStage, actions[1])).toEqual(
      commentsInitialStage
    );
  });

  it("should handle postCoComment success", async () => {
    const store = mockStore({
      auth: {
        token: "mockToken",
        currentUser: {
          firstName: "testing",
          lastName: "testing",
        },
      },
      coComment: commentsInitialStage,
    });

    const mockResponse = {
      data: {
        comments: ["testing"],
        loading: false,
        error: null,
      },
    };

    mockAxios
      .onPost(
        `${process.env.NEXT_PUBLIC_API_URL}/productionOverview/co/comment`
      )
      .reply(200, mockResponse);

    await store.dispatch<any>(
      postCoComment({
        coNum: "testing",
        coLine: 2,
        item: "testing",
        dueDate: "testing",
        comment: "testing",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(postCoComment.pending.type);
    expect(actions[1].type).toEqual(postCoComment.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const newState = CoCommentsReducer(
      commentsInitialStage,
      actions[1] as AnyAction
    );

    expect(newState.comments).toEqual([mockResponse.data]);
    expect(newState.loading).toBe(false);
  });

  it("should handle postCoComments failure", async () => {
    const store = mockStore({
      auth: {
        token: "mockToken",
        currentUser: {
          firstName: "testing",
          lastName: "testing",
        },
      },
      coComment: commentsInitialStage,
    });

    const mockError = {
      message: "Failed To Post Co Comments",
    };

    mockAxios
      .onPost(
        `${process.env.NEXT_PUBLIC_API_URL}/productionOverview/co/comment`
      )
      .reply(400, mockError);

    await store.dispatch<any>(
      postCoComment({
        coNum: "testing",
        coLine: 2,
        item: "testing",
        dueDate: "testing",
        comment: "testing",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(postCoComment.pending.type);
    expect(actions[1].type).toEqual(postCoComment.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    const newState = CoCommentsReducer(commentsInitialStage, {
      type: postCoComment.rejected.type,
    });

    expect(newState.loading).toBe(false);
    expect(newState).toEqual(commentsInitialStage);
  });
});
