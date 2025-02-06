import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  commentsInitialStage,
  fetchComments,
  postComment,
  resolveComment,
  default as CommentsReducer,
} from "@/store/features/Comments/ProblemCommentsSlice";
import { AnyAction } from "@reduxjs/toolkit";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("ProblemCommentsSliceSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle fetchComments success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      comments: commentsInitialStage,
    });

    const mockResponse = {
      data: {
        comments: [],
        loading: false,
        error: null,
      },
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/problemComment/getProblemComments`
      )
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchComments({
        refType: "testing",
        refNum: "testing",
        refLine: 2,
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchComments.pending.type);
    expect(actions[1].type).toEqual(fetchComments.fulfilled.type);
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

    expect(CommentsReducer(commentsInitialStage, actions[1])).toEqual(
      expectedState
    );
  });

  it("should handle fetchComments failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      comments: commentsInitialStage,
    });

    const mockError = {
      message: "Failed To Fetch Comments",
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/problemComment/getProblemComments`
      )
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchComments({
        refType: "testing",
        refNum: "testing",
        refLine: 2,
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchComments.pending.type);
    expect(actions[1].type).toEqual(fetchComments.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    expect(CommentsReducer(commentsInitialStage, actions[1])).toEqual(
      commentsInitialStage
    );
  });

  it("should handle postComment success", async () => {
    const store = mockStore({
      auth: {
        token: "mockToken",
        currentUser: {
          firstName: "mockFirstName",
          lastName: "mockLastName",
        },
      },
      comments: commentsInitialStage,
    });

    const mockResponse = {
      data: {
        comments: [],
        createdBy: "mockFirstName mockLastName",
        userName: "mockFirstName mockLastName",
        problemDescription: "mockProblemDescription",
        loading: false,
        error: null,
      },
    };

    mockAxios
      .onPost(
        `${process.env.NEXT_PUBLIC_API_URL}/problemComment/problemComments`
      )
      .reply(200, mockResponse);

    await store.dispatch<any>(
      postComment({
        userName: "mockUserName",
        refType: "mockRefType",
        refNum: "mockRefNum",
        refLine: 2,
        operation: null,
        problemCode: "mockProblemCode",
        problemType: "mockProblemType",
        comment: "mockComment",
        problemDescription: "mockProblemDescription",
        projectId: "mockProjectId",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(postComment.pending.type);
    expect(actions[1].type).toEqual(postComment.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const newState = CommentsReducer(
      commentsInitialStage,
      actions[1] as AnyAction
    );

    expect(newState.comments).toEqual([mockResponse.data]);
    expect(newState.loading).toBe(false);
  });

  it("should handle postComment failure", async () => {
    const store = mockStore({
      auth: {
        token: "mockToken",
        currentUser: {
          firstName: "testing",
          lastName: "testing",
        },
      },
      comments: commentsInitialStage,
    });

    const mockError = {
      message: "Failed To Post A Comment",
    };

    mockAxios
      .onPost(
        `${process.env.NEXT_PUBLIC_API_URL}/problemComment/problemComments`
      )
      .reply(400, mockError);

    await store.dispatch<any>(
      postComment({
        refType: "testing",
        refNum: "testing",
        refLine: 2,
        operation: null,
        problemCode: "testing",
        problemType: "testing",
        comment: "testing",
        problemDescription: "testing",
        projectId: "testing",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(postComment.pending.type);
    expect(actions[1].type).toEqual(postComment.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    const newState = CommentsReducer(commentsInitialStage, {
      type: postComment.rejected.type,
    });

    expect(newState.loading).toBe(false);
    expect(newState).toEqual(commentsInitialStage);
  });

  it("should handle resolveComment success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      comments: [
        {
          id: 2,
          refType: "testing",
          refNum: "testing",
          refLine: 2,
          operation: 2,
          problemDescription: "testing",
          isResolved: 2,
          comment: "testing",
          createdBy: "testing",
          updatedBy: "testing",
          createDate: "testing",
          recordDate: "testing",
        },
      ],
    });

    const mockResponse = {
      data: {
        comments: [],
        pagination: {
          currentPage: 1,
          totalCount: 0,
          totalPages: 0,
          hasPrevious: false,
          hasNext: false,
        },
        loading: false,
        error: null,
      },
    };

    mockAxios
      .onPut(
        `${process.env.NEXT_PUBLIC_API_URL}/problemComment/updateProblemResolved/2?isResolved=1`
      )
      .reply(200, mockResponse);

    await store.dispatch<any>(
      resolveComment({
        id: 2,
        isResolved: 1,
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(resolveComment.pending.type);
    expect(actions[1].type).toEqual(resolveComment.fulfilled.type);
    expect(actions[1].payload.data).toEqual(mockResponse);
  });

  it("should handle resolveComment failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      comments: commentsInitialStage,
    });

    const mockError = {
      message: "Failed To Resolve Comments",
    };

    mockAxios
      .onPut(
        `${process.env.NEXT_PUBLIC_API_URL}/problemComment/updateProblemResolved/2?isResolved=1`
      )
      .reply(200, mockError);

    await store.dispatch<any>(
      resolveComment({
        id: 2,
        isResolved: 1,
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(resolveComment.pending.type);
    expect(actions[1].type).toEqual(resolveComment.fulfilled.type);
    expect(actions[1].payload.data).toEqual(mockError);
  });
});
