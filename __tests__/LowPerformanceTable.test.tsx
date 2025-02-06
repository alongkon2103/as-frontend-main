import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { LowMachinePerformanceTable } from "@/components/performance_skys/lowperformace/table";

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("LowMachinePerformanceTable", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      lowPerformance: {
        lowPerformance: [
          {
            resourceId: "Resource1",
            resourceLocation: "Location1",
            percentage: 75,
            reasons: "Some reasons",
          },
          {
            resourceId: "Resource2",
            resourceLocation: "Location2",
            percentage: 80,
            reasons: "Other reasons",
          },
        ],
      },
    });

    store.dispatch = jest.fn();
  });

  it("renders the component with correct headers", () => {
    render(
      <Provider store={store}>
        <LowMachinePerformanceTable businessSegment={""} fromDate={""} toDate={""} />
      </Provider>
    );

    expect(screen.getByText("low_m_performance")).toBeInTheDocument();
    expect(screen.getByTestId("R/M")).toHaveTextContent("R/M");
    expect(screen.getByTestId("percentage")).toHaveTextContent("percentage");
    expect(screen.getByTestId("reason(s)")).toHaveTextContent("reason(s)");
  });

  it("renders the correct number of rows", () => {
    render(
      <Provider store={store}>
        <LowMachinePerformanceTable businessSegment={""} fromDate={""} toDate={""} />
      </Provider>
    );

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(3);
  });

  it("displays correct data in table cells", () => {
    render(
      <Provider store={store}>
        <LowMachinePerformanceTable businessSegment={""} fromDate={""} toDate={""} />
      </Provider>
    );

    expect(screen.getByText("Resource1")).toBeInTheDocument();
    expect(screen.getByText("Location1")).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(screen.getByText("Some reasons")).toBeInTheDocument();

    expect(screen.getByText("Resource2")).toBeInTheDocument();
    expect(screen.getByText("Location2")).toBeInTheDocument();
    expect(screen.getByText("80%")).toBeInTheDocument();
    expect(screen.getByText("Other reasons")).toBeInTheDocument();
  });

  it("dispatches fetchLowPerformance on mount", async () => {
    render(
      <Provider store={store}>
        <LowMachinePerformanceTable businessSegment={""} fromDate={""} toDate={""} />
      </Provider>
    );

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
    });
  });
});
