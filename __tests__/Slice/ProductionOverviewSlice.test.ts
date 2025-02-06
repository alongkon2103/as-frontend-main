import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  fetchProductionOverviews,
  default as ProductionOverviewReducer,
  ProductionOverviewsInitialStage,
} from "../../src/store/features/ProductionOverview/ProductionOverviewSlice";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("ProductionOverviewSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle fetchProductionOverviews success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      productionOverviews: ProductionOverviewsInitialStage,
    });

    const mockResponse = {
      data: [
        {
          itemDetails: {},
          itemCoverage: [],
        },
      ],
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/productionOverview/productionOverview`
      )
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchProductionOverviews({
        projectId: 1,
        filterType: "mm",
        filterRange: "6",
        isForecast: 0,
      })
    );

    const actions = store.getActions();
    expect(actions[0].type).toEqual(fetchProductionOverviews.pending.type);
    expect(actions[1].type).toEqual(fetchProductionOverviews.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const expectedState = {
      productionOverviews: mockResponse.data,
      loading: false,
      error: null,
    };

    expect(
      ProductionOverviewReducer(ProductionOverviewsInitialStage, actions[1])
    ).toEqual(expectedState);
  });

  it("should handle fetchProductionOverviews failure", async () => {
    const store = mockStore({ auth: ProductionOverviewsInitialStage });

    const mockError = {
      message: "Error fetching production overview data",
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/productionOverview/productionOverview`
      )
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchProductionOverviews({
        projectId: 1,
        filterType: "mm",
        filterRange: "6",
        isForecast: 0,
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchProductionOverviews.pending.type);
    expect(actions[1].type).toEqual(fetchProductionOverviews.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    expect(
      ProductionOverviewReducer(ProductionOverviewsInitialStage, actions[1])
    ).toEqual(ProductionOverviewsInitialStage);
  });
});
