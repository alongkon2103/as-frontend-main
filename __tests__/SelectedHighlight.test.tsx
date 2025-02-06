import { activeRoute } from "../src/components/layout/SideBar/utils";
import { SidebarDropDownTypes } from "@/utils/types";

describe("activeRoute", () => {
  it("should return true when routeName is '/' and matches pathname", () => {
    const result = activeRoute("/", "/");
    expect(result).toBe(true);
  });

  it("should return false when routeName is '/' and does not match pathname", () => {
    const result = activeRoute("/home", "/");
    expect(result).toBe(false);
  });

  it("should return true for 'projects' when pathname includes 'project' or 'job'", () => {
    expect(activeRoute("/project/1", "projects")).toBe(true);
    expect(activeRoute("/job/1", "projects")).toBe(true);
    expect(activeRoute("/home", "projects")).toBe(false);
  });

  it("should return true for 'production_overview' when pathname includes 'productionOverview'", () => {
    expect(activeRoute("/productionOverview/1", "production_overview")).toBe(
      true
    );
    expect(activeRoute("/home", "production_overview")).toBe(false);
  });

  it("should return true for 'sales_dashboard' when pathname includes 'salesDashboard'", () => {
    expect(activeRoute("/salesDashboard/1", "sales_dashboard")).toBe(true);
    expect(activeRoute("/home", "sales_dashboard")).toBe(false);
  });

  it("should return true for '/operator' when pathname includes 'operator'", () => {
    expect(activeRoute("/operator/1", "/operator")).toBe(true);
    expect(activeRoute("/home", "/operator")).toBe(false);
  });

  it("should return true for '/machinePerformance' when pathname includes 'machinePerformance'", () => {
    expect(activeRoute("/machinePerformance/1", "/machinePerformance")).toBe(
      true
    );
    expect(activeRoute("/home", "/machinePerformance")).toBe(false);
  });

  it("should return true for '/shopFloor' when pathname includes 'shopFloor'", () => {
    expect(activeRoute("/shopFloor/1", "/shopFloor")).toBe(true);
    expect(activeRoute("/home", "/shopFloor")).toBe(false);
  });

  it("should return true for type 'PROJECTS' when pathname includes 'project' and searchParams match", () => {
    const searchParams = new URLSearchParams({ id: "1" });
    expect(
      activeRoute(
        "/project/1",
        "1",
        SidebarDropDownTypes.PROJECTS,
        searchParams
      )
    ).toBe(true);
    searchParams.set("project", "1");
    expect(
      activeRoute("/job/1", "1", SidebarDropDownTypes.PROJECTS, searchParams)
    ).toBe(true);
    expect(
      activeRoute("/job/1", "2", SidebarDropDownTypes.PROJECTS, searchParams)
    ).toBe(false);
  });

  it("should return true for type 'PRODUCTION_OVERVIEW' when pathname includes 'productionOverview' and searchParams match", () => {
    const searchParams = new URLSearchParams({ id: "1" });
    expect(
      activeRoute(
        "/productionOverview/1",
        "1",
        SidebarDropDownTypes.PRODUCTION_OVERVIEW,
        searchParams
      )
    ).toBe(true);
    expect(
      activeRoute(
        "/productionOverview/1",
        "2",
        SidebarDropDownTypes.PRODUCTION_OVERVIEW,
        searchParams
      )
    ).toBe(false);
  });

  it("should return true for type 'SALES_DASHBOARD' when pathname includes 'salesDashboard' and searchParams match", () => {
    const searchParams = new URLSearchParams({ id: "1" });
    expect(
      activeRoute(
        "/salesDashboard/1",
        "1",
        SidebarDropDownTypes.SALES_DASHBOARD,
        searchParams
      )
    ).toBe(true);
    expect(
      activeRoute(
        "/salesDashboard/1",
        "2",
        SidebarDropDownTypes.SALES_DASHBOARD,
        searchParams
      )
    ).toBe(false);
  });

  it("should return false when type is unknown", () => {
    const searchParams = new URLSearchParams({ id: "1" });
    expect(activeRoute("/unknown", "1", "UNKNOWN_TYPE", searchParams)).toBe(
      false
    );
  });
});
