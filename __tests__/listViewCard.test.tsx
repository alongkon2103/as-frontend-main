import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ListViewCard, { ListViewCardProps } from "@/components/listview/card";

describe("ListViewCard", () => {
  const defaultProps: ListViewCardProps = {
    factory: "FACTORY50",
    machineName: "machine1",
    machineLabel: "Test Machine Label",
    status: "OFF",
  };

  const originalOpen = window.open;
  beforeAll(() => {
    window.open = jest.fn();
  });

  afterAll(() => {
    window.open = originalOpen;
  });

  it("renders without crashing", () => {
    render(<ListViewCard {...defaultProps} />);
    expect(screen.getByTestId("listview-card")).toBeInTheDocument();
  });

  it("displays correct data for OFF status", () => {
    render(<ListViewCard {...defaultProps} />);

    expect(screen.getByText("machine1")).toBeInTheDocument();
    expect(screen.getByText("Test Machine Label")).toBeInTheDocument();

    const expandIcon = screen.getByTestId("ArrowDropDownRoundedIcon");
    expect(expandIcon).toBeInTheDocument();
  });

  it("opens operator details in new tab on View Details click", () => {
    render(<ListViewCard {...defaultProps} />);

    const viewDetailsButton = screen.getByText("View Details");
    fireEvent.click(viewDetailsButton);

    expect(window.open).toHaveBeenCalledWith(
      "/operator?machine=machine1&factory=FACTORY50",
      "_blank"
    );
  });
});
