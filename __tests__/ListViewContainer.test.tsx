import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MachineContainer, {
  MachineContainerProps,
} from "@/components/listview/container";

const mockProps: MachineContainerProps = {
  rawMachineData: [
    {
      resourceId: "1",
      resourceDescription: "This is a factory.",
      problem: "Overheating",
      status: "STOP",
      spindleLoad: 75,
      spindleRunTime: 120,
      spindleSpeed: 1500,
      positionX: 0,
      positionY: 0,
      boxGroup: 0,
    },
  ],
};

describe("ListViewCard", () => {
  it("renders the component with props and stop status list", () => {
    render(<MachineContainer {...mockProps} />);
    expect(screen.getByText("STOP (1)")).toBeInTheDocument();
    expect(screen.getByText("This is a factory.")).toBeInTheDocument();
    expect(screen.getByText("Overheating")).toBeInTheDocument();
  });
});
