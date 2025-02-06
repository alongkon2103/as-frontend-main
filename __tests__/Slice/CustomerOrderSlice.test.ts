import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  customerOrderInitialStage,
  fetchCustomerOrder,
  default as CustomerOrderReducer,
} from "@/store/features/CustomerOrder/CustomerOrderSlice";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("CustomerOrderSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle fetchCustomerOrder success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      customerOrder: customerOrderInitialStage,
    });

    const mockResponse = {
      data: {
        customerOrder: {
          coNum: "mockCoNum",
          coLine: 2,
          coDate: "mockCoDate",
          ordered: 3,
          fg: 4,
          shipped: 5,
          projectedDate: "mockProjectedDate",
          message: "mockMessage",
          type: "mockType",
          item: "mockItem",
          qty: "mockQty",
          updateAt: "mockUpdateAt",
          color: "red",
        },
        loading: false,
        error: null,
      },
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/notification/customerOrderData`
      )
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchCustomerOrder({
        coNum: "mockCoNum",
        coLine: 2,
        item: "mockItem",
        dueDate: "2021-01-01",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchCustomerOrder.pending.type);
    expect(actions[1].type).toEqual(fetchCustomerOrder.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const expectedState = {
      customerOrder: {
        customerOrder: mockResponse.data.customerOrder,
        loading: false,
        error: null,
      },
      loading: false,
      error: null,
    };

    expect(CustomerOrderReducer(customerOrderInitialStage, actions[1])).toEqual(
      expectedState
    );
  });

  it("should handle fetchCustomerOrder failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      customerOrder: customerOrderInitialStage,
    });

    const mockError = {
      message: "Failed To Fetch Customer Order",
    };

    mockAxios
      .onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/notification/customerOrderData`
      )
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchCustomerOrder({
        coNum: "mockCoNum",
        coLine: 2,
        item: "mockItem",
        dueDate: "2021-01-01",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchCustomerOrder.pending.type);
    expect(actions[1].type).toEqual(fetchCustomerOrder.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    expect(CustomerOrderReducer(customerOrderInitialStage, actions[1])).toEqual(
      customerOrderInitialStage
    );
  });
});
