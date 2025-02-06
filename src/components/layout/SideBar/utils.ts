import { SidebarDropDownTypes } from "@/utils/types";

export const activeRoute = (
  pathname: string,
  routeName?: string,
  type?: SidebarDropDownTypes,
  searchParams?: any
) => {
  if (routeName === "/") {
    return routeName === pathname;
  }
  if (routeName === "projects") {
    return pathname.includes("project") || pathname.includes("job");
  }
  if (routeName === "production_overview") {
    return pathname.includes("productionOverview");
  }
  if (routeName === "sales_dashboard") {
    return pathname.includes("salesDashboard");
  }
  if (routeName === "/operator") {
    return pathname.includes("operator");
  }
  if (routeName === "/machinePerformance") {
    return pathname.includes("machinePerformance");
  }
  if (routeName === "/shopFloor") {
    return pathname.includes("shopFloor");
  }
  if (routeName === "/performanceSkys") {
    return pathname.includes("performanceSkys");
  }

  if (type) {
    switch (type) {
      case SidebarDropDownTypes.PROJECTS:
        return (
          (pathname.includes("project") &&
            searchParams.get("id") === routeName) ||
          (pathname.includes("job") &&
            searchParams.get("project") === routeName)
        );
      case SidebarDropDownTypes.PRODUCTION_OVERVIEW:
        return (
          pathname.includes("productionOverview") &&
          searchParams.get("id") === routeName
        );
      case SidebarDropDownTypes.SALES_DASHBOARD:
        return (
          pathname.includes("salesDashboard") &&
          searchParams.get("id") === routeName
        );
      case SidebarDropDownTypes.PERFORMANCE_SKYS:
        return (
          pathname.includes("performanceSkys") &&
          searchParams.get("id") === routeName
        );
      default:
        break;
    }
  }
  return false;
};
