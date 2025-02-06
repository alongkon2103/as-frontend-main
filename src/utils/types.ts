import { ReactElement } from "react";

export const enum SidebarDropDownTypes {
  PROJECTS = "projects",
  PRODUCTION_OVERVIEW = "production_overview",
  SALES_DASHBOARD = "sales_dashboard",
  PERFORMANCE_SKYS = "performance_skys",
  SHOPFLOOR = "shopfloor",
}

export interface TableHeader {
  title: string;
  name: string;
  type: "text" | "custom";
  align: "right" | "left" | "center" | undefined;
  valign?: "top" | "bottom" | "center";
  customCell?: (data: any) => ReactElement;
  action?: (data: any) => void;
  filter?: (
    filterValue: string,
    handleFilterChange: (
      fieldName: string,
      value: string,
      customCellFilter?: string
    ) => void
  ) => JSX.Element;
  width?: string; // pixels
}

export enum UserRoles {
  ADMIN = "Admin",
  PLANNER = "Planner",
  OPERATOR_MANAGER = "Operator Manager",
  OPERATOR = "Operator",
  SALES = "Sales",
}

export type TableData = Record<string, any>;
