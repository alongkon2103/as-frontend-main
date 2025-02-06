import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ItemCoverageToolTips } from "../src/components/production_overview/tooltips/item_coverage/index";
import { DateRangeHoverProps } from "@/store/features/ProductionOverview/ProductionOverviewSlice";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const itemCoverageHoverDataMock: DateRangeHoverProps[] = [
  {
    co: "CO1",
    coLine: 1,
    dueDate: "2022-01-01",
    requestedDate: "2022-01-02",
    recoveryDate: "2022-01-02",
    fg: 10,
    ordered: 5,
    shipped: 7,
    assemblyPart: "AS1",
    quantity: 6,
    status: "success",
    custCo: "CUSTCO1",
    reserved: 2,
    picked: 3,
    packed: 4,
  },
];

describe("ItemCoverageHover", () => {
  it("renders without crashing", () => {
    render(<ItemCoverageToolTips itemCoverageHoverData={[]} />);
  });

  it("should have correct headers", () => {
    const { getByText } = render(
      <ItemCoverageToolTips itemCoverageHoverData={itemCoverageHoverDataMock} />
    );

    expect(screen.getByTestId("co")).toBeInTheDocument();
    expect(screen.getByTestId("co_line")).toBeInTheDocument();
    expect(screen.getByTestId("due_date")).toBeInTheDocument();
    expect(screen.getByTestId("fg")).toBeInTheDocument();
    expect(screen.getByTestId("ordered")).toBeInTheDocument();
    expect(screen.getByTestId("packed")).toBeInTheDocument();
    expect(screen.getByTestId("requested_date")).toBeInTheDocument();
    expect(screen.getByTestId("recovery_date")).toBeInTheDocument();
    expect(screen.getByTestId("picked")).toBeInTheDocument();
    expect(screen.getByTestId("packed")).toBeInTheDocument();
    expect(screen.getByTestId("shipped")).toBeInTheDocument();
    expect(screen.getByTestId("customer_co")).toBeInTheDocument();
  });

  it("displays correct data in the table", () => {
    const { getByText } = render(
      <ItemCoverageToolTips itemCoverageHoverData={itemCoverageHoverDataMock} />
    );

    // Assert that the rendered data is present in the table
    expect(getByText("CO1")).toBeInTheDocument();
    expect(getByText("01/01/2022")).toBeInTheDocument();
  });
});
