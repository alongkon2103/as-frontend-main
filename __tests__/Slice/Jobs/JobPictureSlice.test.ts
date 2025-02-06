import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  fetchJobPicture,
  jobPictureInitialStage,
  default as JobPictureReducer,
} from "@/store/features/Jobs/JobPictureSlice";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("JobPictureSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle fetchJobPicture success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      jobPicture: jobPictureInitialStage,
    });

    const mockResponse = {
      data: {
        item: "item1",
        picture: "url_to_picture",
      },
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/problemComment/getPictureByItem`
      )
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchJobPicture({
        item: "item1",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchJobPicture.pending.type);
    expect(actions[1].type).toEqual(fetchJobPicture.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const expectedState = {
      jobPicture: mockResponse.data,
      loading: false,
      error: null,
    };

    expect(JobPictureReducer(jobPictureInitialStage, actions[1])).toEqual(
      expectedState
    );
  });

  it("should handle fetchJobPicture failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      jobDetail: jobPictureInitialStage,
    });

    const mockError = {
      message: "Failed To Fetch Job Picture",
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/problemComment/getPictureByItem`
      )
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchJobPicture({
        item: "item1",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchJobPicture.pending.type);
    expect(actions[1].type).toEqual(fetchJobPicture.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    expect(JobPictureReducer(jobPictureInitialStage, actions[1])).toEqual(
      jobPictureInitialStage
    );
  });
});
