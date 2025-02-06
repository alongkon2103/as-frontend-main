import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { ReasonsBreakdownProps } from "@/store/features/PerformanceReport/ReasonsBreakdownSlice";
import LowMachinePerformanceGraph from "@/components/performance_skys/lowperformace/graph";

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  CircularProgress: () => <div data-testid="loading-spinner" />,
}));

jest.mock("@mui/x-charts", () => ({
  LinePlot: () => null,
  MarkPlot: () => null,
  ChartsGrid: () => null,
  ChartsYAxis: () => null,
  ChartsXAxis: () => null,
  BarPlot: () => null,
  ChartsTooltip: () => null,
  ResponsiveChartContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="chart-container">{children}</div>
  ),
}));

const mockReasonsBreakdown: ReasonsBreakdownProps[] = [
  {
    reasons: "Reason A",
    project: "Project X",
    minutes: 100,
  },
  {
    reasons: "Reason B",
    project: "Project Y",
    minutes: 80,
  },
];

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("LowMachinePerformanceGraph", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      reasonsBreakdown: {
        reasonsBreakdown: mockReasonsBreakdown,
        loading: false,
      },
    });
  });

  it("renders the component with correct data", () => {
    render(
      <Provider store={store}>
        <LowMachinePerformanceGraph
          businessSegment="AE"
          fromDate="2023-01-01"
          toDate="2023-12-31"
        />
      </Provider>
    );

    expect(screen.getByText("By Reasons")).toBeInTheDocument();
    expect(screen.getByText("By Projects")).toBeInTheDocument();
    expect(
      screen.getByText("Top reasons for low performance")
    ).toBeInTheDocument();
    expect(screen.getByText("See Top 5")).toBeInTheDocument();
    expect(screen.getByTestId("chart-container")).toBeInTheDocument();
  });

  it("shows loading spinner when data is being fetched", () => {
    store = mockStore({
      reasonsBreakdown: {
        reasonsBreakdown: [],
        loading: true,
      },
    });

    render(
      <Provider store={store}>
        <LowMachinePerformanceGraph
          businessSegment="AE"
          fromDate="2023-01-01"
          toDate="2023-12-31"
        />
      </Provider>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("changes tab when clicked", () => {
    render(
      <Provider store={store}>
        <LowMachinePerformanceGraph
          businessSegment="AE"
          fromDate="2023-01-01"
          toDate="2023-12-31"
        />
      </Provider>
    );

    fireEvent.click(screen.getByText("By Projects"));
    expect(
      screen.getByText("Top projects for low performance")
    ).toBeInTheDocument();
  });

  it("changes top value when button is clicked", () => {
    render(
      <Provider store={store}>
        <LowMachinePerformanceGraph
          businessSegment="AE"
          fromDate="2023-01-01"
          toDate="2023-12-31"
        />
      </Provider>
    );

    fireEvent.click(screen.getByText("See Top 5"));
    expect(screen.getByText("See Top 10")).toBeInTheDocument();
  });
});
