import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import { DateRange } from "../src/components/shared/DateRange";

describe("DateRange component", () => {
  test("renders without crashing", () => {
    // Render the component
    render(
      <Provider store={store}>
        <DateRange handleDateChange={() => {}} />
      </Provider>
    );

    expect(screen.getByTestId("date-range-picker")).toBeInTheDocument();
  });
});
