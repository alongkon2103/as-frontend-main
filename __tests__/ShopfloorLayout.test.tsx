import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import ShopFloorContainer, {
  ShopFloorContainerProps,
} from "@/components/shopfloor/container";
import { ShopFloorMachineProps } from "@/components/dashboard/shop-floor";

describe("ShopFloorContainer", () => {
  const machineData: ShopFloorMachineProps[] = [
    {
      resourceId: "Machine 1",
      status: "RUN",
      resourceDescription: "machineLabel 1",
      positionX: 1,
      positionY: 1,
      boxGroup: 1,
    },
    {
      resourceId: "Machine 2",
      status: "OFF",
      resourceDescription: "machineLabel 2",
      positionX: 1,
      positionY: 2,
      boxGroup: 1,
    },
    {
      resourceId: "Machine 3",
      status: "RUN",
      resourceDescription: "machineLabel 3",
      positionX: 2,
      positionY: 1,
      boxGroup: 2,
    },
    {
      resourceId: "Machine 4",
      status: "OFF",
      resourceDescription: "machineLabel 4",
      positionX: 2,
      positionY: 2,
      boxGroup: 2,
    },
  ];

  const renderComponent = (props: ShopFloorContainerProps) =>
    render(<ShopFloorContainer {...props} />);

  test("renders the correct number of machine groups", () => {
    const { getAllByTestId } = renderComponent({ rawMachineData: machineData });
    const machineGroups = getAllByTestId("machine-group");
    expect(machineGroups.length).toBe(2);
  });

  test("renders machines sorted by positionY within their group", () => {
    renderComponent({ rawMachineData: machineData });
    const group1 = screen.getAllByTestId("machine-group")[0];
    const machinesInGroup1 = within(group1).getAllByTestId("shopfloor-card");
    expect(machinesInGroup1[0]).toHaveTextContent("Machine 1");
    expect(machinesInGroup1[1]).toHaveTextContent("Machine 2");
    const group2 = screen.getAllByTestId("machine-group")[1];
    const machinesInGroup2 = within(group2).getAllByTestId("shopfloor-card");
    expect(machinesInGroup2[0]).toHaveTextContent("Machine 3");
    expect(machinesInGroup2[1]).toHaveTextContent("Machine 4");
  });
});
