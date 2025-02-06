import { FilterItemProps } from "@/store/features/Filters/FilterSlice";
import {
  getPriorityColor,
  generateJobUrl,
  getStatusColor,
  getStatusBackgroundColor,
  getProblemColor,
  getProblemBackgroundColor,
  createFiltersObject,
  generateSidebarUrl,
  redText,
  greenText,
  orangeText,
  dangerText,
  mapFieldToSortKey,
  orangeBackground,
  formatMonth,
  removeEmail,
  getCurrencySign,
  formatNumberToComma,
  formatSuffix,
  addQueryToUrl,
  addPageToUrl,
  isWeek2BeforeWeek1,
  parseMonthYearString,
  parseWeekYearString,
  formatWeek,
  removeQueryFromUrl,
  calculateProgressColors,
  redBackground,
  lightGreenBackground,
  lightGreenText,
  greenBackground,
  hasUserRole,
  findJobDetailByNodeId,
} from "./utils";
import { SidebarDropDownTypes, UserRoles } from "./types";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { StyledTreeItemProps } from "@/components/job/Treeview/StyledTreeItem";
import { ReactNode } from "react";

dayjs.extend(weekOfYear);
const mockT = jest.fn((key: string) => key);

describe("generateProjectUrl", () => {
  test("generates correct URL with project id and name", () => {
    const project = { id: 1, projectName: "Sample Project" };
    const expectedUrl = "/projects?id=1&name=Sample Project&page=1";
    expect(
      generateSidebarUrl(project, SidebarDropDownTypes.PROJECTS)
    ).toStrictEqual(expectedUrl);
  });
});

describe("generateProductionOverviewUrl", () => {
  test("generates correct URL with project id and name", () => {
    const project = { id: 1, projectName: "Sample Project" };
    const expectedUrl = "/productionOverview?id=1&name=Sample Project&page=1";
    expect(
      generateSidebarUrl(project, SidebarDropDownTypes.PRODUCTION_OVERVIEW)
    ).toStrictEqual(expectedUrl);
  });
});

describe("generatePerformanceSkys", () => {
  test("generates correct URL with project id and name", () => {
    const project = { id: 1, projectName: "Sample Project" };
    const expectedUrl = "/performanceSkys?id=1&name=Sample Project";
    expect(
      generateSidebarUrl(project, SidebarDropDownTypes.PERFORMANCE_SKYS)
    ).toStrictEqual(expectedUrl);
  });
});

describe("generateSalesDashboardUrl", () => {
  test("generates correct URL with project id and name", () => {
    const project = { id: 1, projectName: "SampleProject" };
    const expectedUrl = "/salesDashboard?id=1&name=SampleProject";
    expect(
      generateSidebarUrl(project, SidebarDropDownTypes.SALES_DASHBOARD)
    ).toStrictEqual(expectedUrl);
  });
});

describe("generateJobUrl", () => {
  test("generates correct job URL with input values", () => {
    const row = { job: "Job1", suffix: "123", oper: "Oper1", item: "Item1" };
    const projectId = 1;
    const projectName = "SampleProject";
    const fromDate = "2023-01-01";
    const toDate = "2023-12-31";

    const expectedUrl =
      "/job?project=1&projectName=SampleProject&job=Job1&suffix=123&fromDate=2023-01-01&toDate=2023-12-31&oper=Oper1&item=Item1";

    expect(
      generateJobUrl(row, projectId, projectName, fromDate, toDate)
    ).toStrictEqual(expectedUrl);
  });
});

describe("getPriorityColor", () => {
  test('returns correct color for "Urgent"', () => {
    expect(getPriorityColor("Urgent")).toBe(dangerText);
  });

  test('returns correct color for "High"', () => {
    expect(getPriorityColor("High")).toBe(redText);
  });

  test('returns correct color for "Medium"', () => {
    expect(getPriorityColor("Medium")).toBe(orangeText);
  });

  test('returns correct color for "Low"', () => {
    expect(getPriorityColor("Low")).toBe(greenText);
  });

  test("returns default color for unknown priority", () => {
    expect(getPriorityColor("Unknown")).toBe("black");
  });
});

describe("getStatusColor", () => {
  test('returns correct color for "Complete"', () => {
    expect(getStatusColor("Complete")).toBe("rgba(46, 125, 50, 1)");
  });

  test('returns correct color for "On going"', () => {
    expect(getStatusColor("Released")).toBe("rgba(237, 108, 2, 1)");
  });

  test("returns correct color for unknown status", () => {
    expect(getStatusColor("Unknown")).toBe("rgba(211, 47, 47, 1)");
  });

  test("returns correct color for late,stopped,rejected status", () => {
    expect(getStatusColor("Late")).toBe("rgba(211, 47, 47, 1)");
    expect(getStatusColor("Stopped")).toBe("rgba(211, 47, 47, 1)");
    expect(getStatusColor("Rejected")).toBe("rgba(211, 47, 47, 1)");
  });

  test("returns correct color for firmed status", () => {
    expect(getStatusColor("Firmed")).toBe("rgba(0, 0, 0, 0.6)");
  });
});

describe("getStatusBackgroundColor", () => {
  test('returns correct background color for "Complete", "Accepted" and "Firmed"', () => {
    const color = "rgba(237, 247, 237, 1)";
    expect(getStatusBackgroundColor("Complete")).toBe(color);
    expect(getStatusBackgroundColor("Accepted")).toBe(color);
    expect(getStatusBackgroundColor("Firmed")).toBe("rgba(214, 217, 221, 1)");
  });

  test('returns correct background color for "Released", "Pending"', () => {
    expect(getStatusBackgroundColor("Released")).toBe(orangeBackground);
    expect(getStatusBackgroundColor("Pending")).toBe(orangeBackground);
  });

  test('returns correct background color for "Late", "Stopped", "Rejected"', () => {
    const color = "rgba(253, 237, 237, 1)";
    expect(getStatusBackgroundColor("Late")).toBe(color);
    expect(getStatusBackgroundColor("Stopped")).toBe(color);
    expect(getStatusBackgroundColor("Rejected")).toBe(color);
  });

  test("returns default background color for unknown status", () => {
    expect(getStatusBackgroundColor("Unknown")).toBe("rgba(253, 237, 237, 1)");
  });
});

describe("getProblemColor", () => {
  test('returns correct color for problem "None"', () => {
    expect(getProblemColor("None")).toBe("rgba(0, 0, 0, 0.60)");
  });

  test("returns default color for other problems", () => {
    expect(getProblemColor("SomeProblem")).toBe("rgba(211, 47, 47, 1)");
  });
});

describe("getProblemBackgroundColor", () => {
  test('returns correct background color for problem "None"', () => {
    expect(getProblemBackgroundColor("None")).toBe("#EFF2F6");
  });

  test("returns default background color for other problems", () => {
    expect(getProblemBackgroundColor("SomeProblem")).toBe(
      "rgba(253, 237, 237, 1)"
    );
  });
});

describe("createFiltersObject", () => {
  test("creates correct FiltersObject for valid input", () => {
    const filters: FilterItemProps[] = [
      {
        id: 1,
        columnValueKey: "oper",
        textValueKey: "",
        fromValue: "1",
        toValue: "5",
      },
      { id: 2, columnValueKey: "status", textValueKey: "InProgress" },
      { id: 3, columnValueKey: "name", textValueKey: "ExampleName" },
    ];

    const expectedFiltersObject = {
      oper: "1-5",
      status: "InProgress",
      name: "ExampleName",
    };

    expect(createFiltersObject(filters)).toEqual(expectedFiltersObject);
  });

  test("creates empty FiltersObject for empty input", () => {
    const filters: FilterItemProps[] = [];

    const expectedFiltersObject = {};

    expect(createFiltersObject(filters)).toEqual(expectedFiltersObject);
  });

  test("handles undefined and empty values properly", () => {
    const filters: FilterItemProps[] = [
      { id: 1, columnValueKey: "oper", textValueKey: "", toValue: "0" },
      { id: 2, columnValueKey: "status", textValueKey: "" },
      { id: 3, columnValueKey: "name", textValueKey: "" },
    ];

    const expectedFiltersObject = {
      oper: "0-0",
      status: "",
      name: "",
    };

    expect(createFiltersObject(filters)).toEqual(expectedFiltersObject);
  });
});

describe("mapFieldToSortKey", () => {
  test("mapFieldToSortKey maps fields correctly", () => {
    expect(mapFieldToSortKey("project", mockT)).toBe("projectName");
    expect(mapFieldToSortKey("firmed", mockT)).toBe("planned");
    expect(mapFieldToSortKey("released", mockT)).toBe("onGoing");
    expect(mapFieldToSortKey("qty", mockT)).toBe("qty");
    expect(mapFieldToSortKey("job_#", mockT)).toBe("job");
    expect(mapFieldToSortKey("projected_date", mockT)).toBe("endDate");
    expect(mapFieldToSortKey("start_date", mockT)).toBe("startDate");
    expect(mapFieldToSortKey("op", mockT)).toBe("oper");
    expect(mapFieldToSortKey("random", mockT)).toBe("random");
  });
});

describe("formatDateToMonth", () => {
  test("formats date to month correctly", () => {
    const date = dayjs("2023-01-01");
    expect(formatMonth(date)).toBe("01/2023");
  });
});

describe("removeEmail", () => {
  test("removes email from comment correctly", () => {
    const comment = "This is a test comment ([email protected])";

    expect(removeEmail(comment)).toBe("This is a test comment ");
  });
});

describe("getCurrencySign", () => {
  test("returns correct currency sign for USD", () => {
    expect(getCurrencySign("USD")).toBe("$");
  });
  test("returns correct currency sign for THB", () => {
    expect(getCurrencySign("THB")).toBe("฿");
  });
});

describe("formatNumberToComma", () => {
  test("formats number to comma correctly", () => {
    expect(formatNumberToComma(1234567)).toBe("1,234,567");
  });
});

describe("formatSuffix", () => {
  test("formats suffix correctly", () => {
    expect(formatSuffix("123")).toBe("00123");
    expect(formatSuffix("3")).toBe("00003");
    expect(formatSuffix("3333")).toBe("03333");
    expect(formatSuffix("")).toBe("00000");
    expect(formatSuffix("12345")).toBe("12345");
  });
});

describe("removeQueryFromUrl", () => {
  let originalHref: string;
  let replaceStateSpy: jest.SpyInstance;

  beforeAll(() => {
    originalHref = window.location.href;
  });

  beforeEach(() => {
    // Mock window.location.href
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: {
        href: "http://example.com?param1=value1&param2=value2&param3=value3",
      },
    });

    // Mock window.history.replaceState
    replaceStateSpy = jest
      .spyOn(window.history, "replaceState")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore the original href and mocks
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: {
        href: originalHref,
      },
    });

    replaceStateSpy.mockRestore();
  });

  it("should remove a single query parameter from the URL", () => {
    removeQueryFromUrl("param1");
    expect(window.history.replaceState).toHaveBeenCalledWith(
      { path: "http://example.com/?param2=value2&param3=value3" },
      "",
      "http://example.com/?param2=value2&param3=value3"
    );
  });

  it("should remove multiple query parameters from the URL", () => {
    removeQueryFromUrl(["param1", "param2"]);
    expect(window.history.replaceState).toHaveBeenCalledWith(
      { path: "http://example.com/?param3=value3" },
      "",
      "http://example.com/?param3=value3"
    );
  });

  it("should handle non-existing query parameters gracefully", () => {
    removeQueryFromUrl("nonexistent");
    expect(window.history.replaceState).toHaveBeenCalledWith(
      { path: "http://example.com/?param1=value1&param2=value2&param3=value3" },
      "",
      "http://example.com/?param1=value1&param2=value2&param3=value3"
    );
  });

  it("should handle an empty array gracefully", () => {
    removeQueryFromUrl([]);
    expect(window.history.replaceState).toHaveBeenCalledWith(
      { path: "http://example.com/?param1=value1&param2=value2&param3=value3" },
      "",
      "http://example.com/?param1=value1&param2=value2&param3=value3"
    );
  });

  it("should handle an empty string gracefully", () => {
    removeQueryFromUrl("");
    expect(window.history.replaceState).toHaveBeenCalledWith(
      { path: "http://example.com/?param1=value1&param2=value2&param3=value3" },
      "",
      "http://example.com/?param1=value1&param2=value2&param3=value3"
    );
  });
});

describe("addQueryToUrl", () => {
  let originalLocation: Location;
  let pushStateMock: jest.Mock;

  beforeEach(() => {
    originalLocation = window.location;

    const locationMock: Partial<Location> = {
      href: "http://example.com?foo=bar",
      protocol: "http:",
      host: "example.com",
      hostname: "example.com",
      port: "",
      pathname: "/",
      search: "?foo=bar",
      hash: "",
      assign: jest.fn(),
      reload: jest.fn(),
      replace: jest.fn(),
      toString: function () {
        return this.href!;
      },
    };
    Object.defineProperty(window, "location", {
      value: locationMock,
      writable: true,
    });

    pushStateMock = jest.fn((state: any, title: string, url: string | null) => {
      if (url !== null) {
        (window.location as any).href = url;
      }
    });
    window.history.pushState = pushStateMock;
  });

  afterEach(() => {
    Object.defineProperty(window, "location", {
      value: originalLocation,
      writable: true,
    });
  });

  it("should update the URL with the given query parameter and value", () => {
    // Run the function
    addQueryToUrl("test", "value");

    // Verify the pushState call
    expect(pushStateMock).toHaveBeenCalledWith(
      { path: "http://example.com/?foo=bar&test=value" },
      "",
      "http://example.com/?foo=bar&test=value"
    );

    // Verify the URL was updated
    expect(window.location.href).toBe("http://example.com/?foo=bar&test=value");
  });
});

describe("addPageToUrl", () => {
  let originalLocation: Location;
  let pushStateMock: jest.Mock;

  beforeEach(() => {
    originalLocation = window.location;

    const locationMock: Partial<Location> = {
      href: "http://example.com?foo=bar",
      protocol: "http:",
      host: "example.com",
      hostname: "example.com",
      port: "",
      pathname: "/",
      search: "?foo=bar",
      hash: "",
      assign: jest.fn(),
      reload: jest.fn(),
      replace: jest.fn(),
      toString: function () {
        return this.href!;
      },
    };
    Object.defineProperty(window, "location", {
      value: locationMock,
      writable: true,
    });

    pushStateMock = jest.fn((state: any, title: string, url: string | null) => {
      if (url !== null) {
        (window.location as any).href = url;
      }
    });
    window.history.pushState = pushStateMock;
  });

  afterEach(() => {
    // Restore the original location
    Object.defineProperty(window, "location", {
      value: originalLocation,
      writable: true,
    });
  });
  it("should update the URL with the page parameter 1", () => {
    // Run the function
    addPageToUrl("");

    // Verify the pushState call
    expect(pushStateMock).toHaveBeenCalledWith(
      { path: "http://example.com/?foo=bar&page=1" },
      "",
      "http://example.com/?foo=bar&page=1"
    );

    // Verify the URL was updated
    expect(window.location.href).toBe("http://example.com/?foo=bar&page=1");
  });
  it("should update the URL with the given page parameter", () => {
    // Run the function
    addPageToUrl("2");

    // Verify the pushState call
    expect(pushStateMock).toHaveBeenCalledWith(
      { path: "http://example.com/?foo=bar&page=2" },
      "",
      "http://example.com/?foo=bar&page=2"
    );

    // Verify the URL was updated
    expect(window.location.href).toBe("http://example.com/?foo=bar&page=2");
  });
});

describe("isWeek2BeforeWeek1", () => {
  test("returns true if week1 is before week2", () => {
    const week1 = "01/2023";
    const week2 = "02/2023";
    expect(isWeek2BeforeWeek1(week1, week2)).toBe(false);
  });

  test("returns false if week1 is before week2", () => {
    const week1 = "02/2023";
    const week2 = "01/2023";
    expect(isWeek2BeforeWeek1(week1, week2)).toBe(true);
  });
});

describe("parseMonthYearString", () => {
  test('parses "01/2023" correctly', () => {
    const result = parseMonthYearString("01/2023");
    expect(result.year()).toBe(2023);
    expect(result.month()).toBe(0); // January is 0 in dayjs
  });

  test('parses "12/2024" correctly', () => {
    const result = parseMonthYearString("12/2024");
    expect(result.year()).toBe(2024);
    expect(result.month()).toBe(11); // December is 11 in dayjs
  });

  test('parses "07/2020" correctly', () => {
    const result = parseMonthYearString("07/2020");
    expect(result.year()).toBe(2020);
    expect(result.month()).toBe(6); // July is 6 in dayjs
  });

  test("returns Invalid Date for incorrect format", () => {
    const result = parseMonthYearString("invalid/format");
    expect(result.isValid()).toBe(false);
  });

  test("handles single-digit months correctly", () => {
    const result = parseMonthYearString("3/2021");
    expect(result.year()).toBe(2021);
    expect(result.month()).toBe(2);
  });

  test("handles leading zeros in months correctly", () => {
    const result = parseMonthYearString("03/2021");
    expect(result.year()).toBe(2021);
    expect(result.month()).toBe(2);
  });
});

describe("parseWeekYearString", () => {
  test('parses "25/2023" correctly', () => {
    const result = parseWeekYearString("25/2023");
    expect(result.year()).toBe(2023);
    expect(result.week()).toBe(25);
  });

  test('parses "12/2024" correctly', () => {
    const result = parseWeekYearString("12/2024");
    expect(result.year()).toBe(2024);
    expect(result.week()).toBe(12);
  });

  test('parses "33/2020" correctly', () => {
    const result = parseWeekYearString("33/2020");
    expect(result.year()).toBe(2020);
    expect(result.week()).toBe(33);
  });

  test("returns Invalid Date for incorrect format", () => {
    const result = parseWeekYearString("invalid/format");
    expect(result.isValid()).toBe(false);
  });

  test("handles single-digit weeks correctly", () => {
    const result = parseWeekYearString("3/2021");
    expect(result.year()).toBe(2021);
    expect(result.week()).toBe(3);
  });

  test("handles leading zeros in weeks correctly", () => {
    const result = parseWeekYearString("03/2021");
    expect(result.year()).toBe(2021);
    expect(result.week()).toBe(3);
  });
});

describe("formatWeek", () => {
  test("handles week formatting correctly", () => {
    const date = dayjs("2023-01-01");
    expect(formatWeek(date)).toBe("01/2023");
  });
});

describe("calculateProgressColors", () => {
  it("should return scrapped styles if scrapped > 0", () => {
    const result = calculateProgressColors(50, 1);
    expect(result).toEqual({
      backgroundColor: "#EAEDF1",
      color: "rgba(0, 0, 0, 0.38)",
      padding: "12px",
    });
  });

  it("should return styles for 100% progress", () => {
    const result = calculateProgressColors(100, 0);
    expect(result).toEqual({
      backgroundColor: greenBackground,
      color: greenText,
      padding: "12px",
    });
  });

  it("should return styles for progress between 66 and 99", () => {
    const result = calculateProgressColors(75, 0);
    expect(result).toEqual({
      backgroundColor: lightGreenBackground,
      color: lightGreenText,
      padding: "12px",
    });
  });

  it("should return styles for progress between 34 and 66", () => {
    const result = calculateProgressColors(50, 0);
    expect(result).toEqual({
      backgroundColor: "rgba(255, 249, 230, 1)",
      color: "rgba(233, 175, 0, 1)",
      padding: "12px",
    });
  });

  it("should return styles for progress between 1 and 33", () => {
    const result = calculateProgressColors(25, 0);
    expect(result).toEqual({
      backgroundColor: orangeBackground,
      color: orangeText,
      padding: "12px",
    });
  });

  it("should return styles for 0% progress", () => {
    const result = calculateProgressColors(0, 0);
    expect(result).toEqual({
      backgroundColor: redBackground,
      color: redText,
      padding: "12px",
    });
  });
});

describe("hasUserRole", () => {
  it("should return true when the role matches the userRole", () => {
    expect(hasUserRole("Admin", UserRoles.ADMIN)).toBe(true);
    expect(hasUserRole("Planner", UserRoles.PLANNER)).toBe(true);
    expect(hasUserRole("Operator", UserRoles.OPERATOR)).toBe(true);
  });

  it("should return false when the role does not match the userRole", () => {
    expect(hasUserRole("Admin", UserRoles.PLANNER)).toBe(false);
    expect(hasUserRole("Sales", UserRoles.OPERATOR_MANAGER)).toBe(false);
    expect(hasUserRole("Planner", UserRoles.ADMIN)).toBe(false);
  });

  it("should return false when the role is an invalid string", () => {
    expect(hasUserRole("InvalidRole", UserRoles.ADMIN)).toBe(false);
  });
});

describe("findJobDetailByNodeId", () => {
  const treeData: StyledTreeItemProps[] = [
    {
      nodeId: "1",
      materialId: "1",
      subOrderId: "1",
      qty: 10,
      totalQty: "100",
      status: "active",
      children: [
        {
          nodeId: "1.1",
          materialId: "1.1",
          subOrderId: "1.1",
          qty: 5,
          totalQty: "50",
          status: "active",
          children: [],
        },
        {
          nodeId: "1.2",
          materialId: "1.2",
          subOrderId: "1.2",
          qty: 5,
          totalQty: "50",
          status: "active",
          children: [
            {
              nodeId: "1.2.1",
              materialId: "1.2.1",
              subOrderId: "1.2.1",
              qty: 2,
              totalQty: "20",
              status: "active",
              children: [],
            },
          ],
        },
      ] as Iterable<ReactNode>,
    },
    {
      nodeId: "2",
      materialId: "2",
      subOrderId: "2",
      qty: 15,
      totalQty: "150",
      status: "inactive",
      children: [],
    },
  ];

  it("should return the item with the matching materialId", () => {
    const result = findJobDetailByNodeId(treeData, "1.2.1");
    expect(result).toEqual({
      nodeId: "1.2.1",
      materialId: "1.2.1",
      subOrderId: "1.2.1",
      qty: 2,
      totalQty: "20",
      status: "active",
      children: [],
    });
  });

  it("should return null if no item with the matching materialId is found", () => {
    const result = findJobDetailByNodeId(treeData, "3");
    expect(result).toBeNull();
  });

  it("should return the item when materialId is found at the top level", () => {
    const result = findJobDetailByNodeId(treeData, "2");
    expect(result).toEqual({
      nodeId: "2",
      materialId: "2",
      subOrderId: "2",
      qty: 15,
      totalQty: "150",
      status: "inactive",
      children: [],
    });
  });

  it("should return the item when materialId is found at the second level", () => {
    const result = findJobDetailByNodeId(treeData, "1.2");
    expect(result).toEqual({
      nodeId: "1.2",
      materialId: "1.2",
      subOrderId: "1.2",
      qty: 5,
      totalQty: "50",
      status: "active",
      children: [
        {
          nodeId: "1.2.1",
          materialId: "1.2.1",
          subOrderId: "1.2.1",
          qty: 2,
          totalQty: "20",
          status: "active",
          children: [],
        },
      ],
    });
  });

  it("should return null for an empty tree", () => {
    const result = findJobDetailByNodeId([], "1");
    expect(result).toBeNull();
  });
});
