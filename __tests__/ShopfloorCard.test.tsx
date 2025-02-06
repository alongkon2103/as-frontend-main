import React from "react";
import { render, screen } from "@testing-library/react";
import { ShopFloorCard } from "@/components/shopfloor/card";

describe("ShopFloorCard", () => {
  const hexToRgb = (hex: string) => {
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    let bigint = parseInt(hex.substring(1), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
  };

  it("renders without crashing", () => {
    render(
      <ShopFloorCard
        machineName="shopfloor1"
        status="OFF"
        machineLabel="Test machineLabel"
        positionX={1}
        positionY={1}
        boxGroup={1}
      />
    );
    expect(screen.getByTestId("shopfloor-card")).toBeInTheDocument();
  });

  it("displays correct data for Off status", () => {
    const { getByText, getByTestId } = render(
      <ShopFloorCard
        machineName="shopfloor1"
        status="OFF"
        machineLabel="Test machineLabel"
        positionX={1}
        positionY={1}
        boxGroup={1}
      />
    );

    expect(getByText("shopfloor1")).toBeInTheDocument();
    expect(getByText("Test machineLabel")).toBeInTheDocument();

    const cardElement = getByTestId("shopfloor-card");
    expect(cardElement).toHaveStyle(`backgroundColor: ${hexToRgb("#3E4552")}`);

    const iconElement = getByTestId("test-icon");
    expect(iconElement).toBeInTheDocument();
  });

  it("displays correct data for Idle status", () => {
    const { getByText, getByTestId } = render(
      <ShopFloorCard
        machineName="shopfloor1"
        status="IDLE"
        machineLabel="Test machineLabel"
        positionX={1}
        positionY={1}
        boxGroup={1}
      />
    );

    expect(getByText("shopfloor1")).toBeInTheDocument();
    expect(getByText("Test machineLabel")).toBeInTheDocument();

    const cardElement = getByTestId("shopfloor-card");
    expect(cardElement).toHaveStyle(`backgroundColor: ${hexToRgb("#FFF9E6")}`);

    const iconElement = getByTestId("test-icon");
    expect(iconElement).toBeInTheDocument();
  });

  it("displays correct data for Running status", () => {
    const { getByText, getByTestId } = render(
      <ShopFloorCard
        machineName="shopfloor1"
        status="RUN"
        machineLabel="Test machineLabel"
        positionX={1}
        positionY={1}
        boxGroup={1}
      />
    );

    expect(getByText("shopfloor1")).toBeInTheDocument();
    expect(getByText("Test machineLabel")).toBeInTheDocument();

    const cardElement = getByTestId("shopfloor-card");
    expect(cardElement).toHaveStyle(`backgroundColor: ${hexToRgb("#2E7D32")}`);

    const iconElement = getByTestId("test-icon");
    expect(iconElement).toBeInTheDocument();
  });

  it("displays correct data for Stop status", () => {
    const { getByText, getByTestId } = render(
      <ShopFloorCard
        machineName="shopfloor1"
        status="STOP"
        machineLabel="Test machineLabel"
        positionX={1}
        positionY={1}
        boxGroup={1}
      />
    );

    expect(getByText("shopfloor1")).toBeInTheDocument();
    expect(getByText("Test machineLabel")).toBeInTheDocument();

    const cardElement = getByTestId("shopfloor-card");
    expect(cardElement).toHaveStyle(`backgroundColor: ${hexToRgb("#D32F2F")}`);

    const iconElement = getByTestId("test-icon");
    expect(iconElement).toBeInTheDocument();
  });
});
