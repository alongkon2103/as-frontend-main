import React from "react";
import { render, screen } from "@testing-library/react";
import { SaleTableCell } from "../../src/components/production_overview/sale_table_cell";
import "@testing-library/jest-dom";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";

describe("SaleTableCell Component", () => {
  it("should render correctly with default props", () => {
    render(<SaleTableCell backgroundColor={"white"} numerator={10} denominator={20} numeratorColor={"red"} denominatorColor={"grey"} specialIcon={null}   />);
    const numeratorText = screen.getByText("10");
    expect(numeratorText).toBeInTheDocument();
    expect(numeratorText).toHaveStyle("text-decoration: underline");

    expect(screen.getByTestId("StickyNote2Icon")).toBeInTheDocument();

    const denominatorText = screen.getByText("20");
    expect(denominatorText).toBeInTheDocument();
    expect(denominatorText).toHaveStyle("color: grey");
  });

  it('should not have underline when numerator is "-"', () => {
    render(<SaleTableCell backgroundColor={"white"} numerator={"-"} denominator={20} numeratorColor={"red"} denominatorColor={"grey"} specialIcon={null}   />);


    const numeratorText = screen.getByText("-");
    expect(numeratorText).toHaveStyle("text-decoration: none");
  });

  it("should render special icon when provided", () => {
    render(<SaleTableCell backgroundColor={"white"} numerator={"-"} denominator={20} numeratorColor={"red"} denominatorColor={"grey"}  specialIcon={<StickyNote2Icon data-testid="special-icon"/>}  />);
    expect(screen.getByTestId("special-icon")).toBeInTheDocument();
  });

  it('should render BlockIcon when iconType is "stopped"', () => {
    render(<SaleTableCell backgroundColor={"white"} numerator={"-"} denominator={20} numeratorColor={"red"} denominatorColor={"grey"} iconType="stopped" />);
    
    expect(screen.getByTestId("BlockIcon")).toBeInTheDocument();
  });

  it("should render forecast elements when forecast is true", () => {
    render(<SaleTableCell backgroundColor={"white"} numerator={"-"} denominator={20} numeratorColor={"red"} denominatorColor={"grey"} iconType="stopped" forecast={true} forecastQty={30}/>);
    expect(screen.getByTestId("CloudQueueIcon")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it("should render BoatIcon when boatIcon is true", () => {
    render(<SaleTableCell backgroundColor={"white"} numerator={"-"} denominator={20} numeratorColor={"red"} denominatorColor={"grey"}  iconType="stopped" boatIcon={true} />);

    expect(screen.getByTestId("DirectionsBoatIcon")).toBeInTheDocument();
  });
});
