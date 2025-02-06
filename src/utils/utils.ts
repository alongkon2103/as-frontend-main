import { StyledTreeItemProps } from "@/components/job/Treeview/StyledTreeItem";
import { FilterItemProps } from "@/store/features/Filters/FilterSlice";
import { SidebarDropDownTypes, UserRoles } from "./types";
import dayjs, { Dayjs } from "dayjs";

export interface Project {
  id: string | number;
  projectName: string;
  businessSegment?: string;
}

export const generateSidebarUrl = (
  project: Project,
  type: SidebarDropDownTypes
) => {
  switch (type) {
    case SidebarDropDownTypes.PROJECTS:
      return `/projects?id=${project.id}&name=${project.projectName}&page=1`;
    case SidebarDropDownTypes.PRODUCTION_OVERVIEW:
      return `/productionOverview?id=${project.id}&name=${project.projectName}&page=1`;
    case SidebarDropDownTypes.SALES_DASHBOARD:
      return `/salesDashboard?id=${project.id}&name=${project.projectName}`;
    case SidebarDropDownTypes.PERFORMANCE_SKYS:
      return `/performanceSkys?id=${project.id}&name=${project.projectName}`;
    case SidebarDropDownTypes.SHOPFLOOR:
      return `/shopFloor?id=${project.id}&factory=${project.projectName}`;
  }
};

export const generateJobUrl = (
  row: { job: string; suffix: string; oper: string; item: string },
  projectId: number,
  projectName: string,
  fromDate: string,
  toDate: string
) => {
  return `/job?project=${projectId}&projectName=${projectName}&job=${row.job}&suffix=${row.suffix}&fromDate=${fromDate}&toDate=${toDate}&oper=${row.oper}&item=${row.item}`;
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Urgent":
      return dangerText;
    case "High":
      return redText;
    case "Medium":
      return orangeText;
    case "Low":
      return greenText;
    default:
      return "black";
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Complete":
    case "Accepted":
      return greenText;
    case "Released":
    case "Pending":
      return orangeText;
    case "Late":
    case "Stopped":
    case "Rejected":
      return redText;
    case "Firmed":
      return grayText;
    default:
      return redText;
  }
};

export const getStatusBackgroundColor = (status: string) => {
  switch (status) {
    case "Complete":
    case "Accepted":
      return greenBackground;
    case "Released":
    case "Pending":
      return orangeBackground;
    case "Late":
    case "Stopped":
    case "Rejected":
      return redBackground;
    case "Firmed":
      return grayBackground;
    default:
      return redBackground;
  }
};

export const getProblemColor = (problem: string) => {
  if (problem === "None") {
    return "rgba(0, 0, 0, 0.60)";
  } else {
    return redText;
  }
};

export const getProblemBackgroundColor = (problem: string) => {
  if (problem === "None") {
    return "#EFF2F6";
  } else {
    return redBackground;
  }
};

export const findJobDetailByNodeId = (
  data: StyledTreeItemProps[],
  materialIdToFind: string
): StyledTreeItemProps | null => {
  for (const item of data) {
    if (item.materialId === materialIdToFind) {
      return item;
    }
    if (item.children && (item.children as StyledTreeItemProps[]).length > 0) {
      const foundInChildren = findJobDetailByNodeId(
        item.children as StyledTreeItemProps[],
        materialIdToFind
      );
      if (foundInChildren) {
        return foundInChildren;
      }
    }
  }
  return null;
};

export const hasUserRole = (role: string, userRole: UserRoles) => {
  return role === userRole;
};

export const calculateProgressColors = (progress: number, scrapped: number) => {
  if (scrapped > 0) {
    return {
      backgroundColor: "#EAEDF1",
      color: "rgba(0, 0, 0, 0.38)",
      padding: "12px",
    };
  }
  if (progress === 100) {
    return {
      backgroundColor: greenBackground,
      color: greenText,
      padding: "12px",
    };
  } else if (progress > 66 && progress < 100) {
    return {
      backgroundColor: lightGreenBackground,
      color: lightGreenText,
      padding: "12px",
    };
  } else if (progress > 33 && progress < 66) {
    return {
      backgroundColor: "rgba(255, 249, 230, 1)",
      color: "rgba(233, 175, 0, 1)",
      padding: "12px",
    };
  } else if (progress > 0 && progress < 33) {
    return {
      backgroundColor: orangeBackground,
      color: orangeText,
      padding: "12px",
    };
  } else if (progress === 0) {
    return {
      backgroundColor: redBackground,
      color: redText,
      padding: "12px",
    };
  }
};

type FiltersObject = Record<string, string>;

export const createFiltersObject = (filters: FilterItemProps[]) => {
  const newFiltersObject: FiltersObject = {};
  filters.length > 0
    ? filters.forEach((filter) => {
        if (filter?.columnValueKey == "oper") {
          let fromValue = filter.fromValue ? filter.fromValue : "";
          let toValue = filter.toValue ? filter.toValue : "";

          if (
            (fromValue && fromValue?.length > 0) ||
            (toValue && toValue?.length > 0)
          ) {
            fromValue = fromValue?.length === 0 ? toValue : fromValue;
            toValue = toValue?.length === 0 ? fromValue : toValue;

            newFiltersObject[filter.columnValueKey] = `${fromValue}-${toValue}`;
          }
        } else if (filter?.columnValueKey !== "") {
          newFiltersObject[filter.columnValueKey] = filter.textValueKey;
        }
      })
    : {};
  return newFiltersObject;
};

export const removeQueryFromUrl = (query: string | string[]) => {
  const url = window.location.href;
  const r = new URL(url);
  if (typeof query === "string") r.searchParams.delete(query);
  else query.map((item) => r.searchParams.delete(item));
  const newUrl = r.href;
  window.history.replaceState({ path: newUrl }, "", newUrl);
};

export const addQueryToUrl = (query: string, value: string) => {
  const url = window.location.href;
  const r = new URL(url);
  r.searchParams.set(query, value);
  const newUrl = r.href;
  window.history.pushState({ path: newUrl }, "", newUrl);
};

export const addPageToUrl = (page: string) => {
  const url = window.location.href;
  const r = new URL(url);
  r.searchParams.set("page", page || "1");
  const newUrl = r.href;
  window.history.pushState({ path: newUrl }, "", newUrl);
};

export function formatSuffix(suffix: string) {
  let numStr = suffix.toString();
  while (numStr.length < 5) {
    numStr = "0" + numStr;
  }
  return numStr;
}

export const formatWeek = (date: Dayjs) => {
  return `${date.week().toString().padStart(2, "0")}/${date.year()}`;
};

export const formatMonth = (date: Dayjs) => {
  return date.format("MM/YYYY");
};

export const parseWeekYearString = (weekYearString: string) => {
  const [week, year] = weekYearString.split("/");
  const date = dayjs()
    .year(parseInt(year))
    .week(parseInt(week, 10))
    .startOf("week");
  return date;
};

export const parseMonthYearString = (monthYearString: string) => {
  const [month, year] = monthYearString.split("/");
  const date = dayjs()
    .year(parseInt(year))
    .month(parseInt(month, 10) - 1);
  return date;
};

export const isWeek2BeforeWeek1 = (week1: string, week2: string) => {
  const parseWeekYearString = (weekYearString: string) => {
    const [week, year] = weekYearString.split("/");
    return dayjs()
      .year(parseInt(year))
      .week(parseInt(week, 10))
      .startOf("week");
  };

  const date1 = parseWeekYearString(week1);
  const date2 = parseWeekYearString(week2);

  return date2.isBefore(date1);
};

export const formatNumberToComma = (number: number) => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getCurrencySign = (currency: string) => {
  return currency === "USD" ? "$" : "฿";
};

export const removeEmail = (comment: string): string => {
  const regex = /\([^)]*\)|[[\]\\]/g;
  return comment.replaceAll(regex, "");
};

export const mapFieldToSortKey = (
  field: string,
  t: (key: string) => string
): string => {
  switch (field.toLowerCase()) {
    case t("project").toLowerCase():
      return "projectName";
    case t("firmed").toLowerCase():
      return "planned";
    case t("released").toLowerCase():
      return "onGoing";
    case t("op").toLowerCase():
      return "oper";
    case t("qty").toLowerCase():
      return "qty";
    case t("job_#").toLowerCase():
      return "job";
    case t("projected_date").toLowerCase():
      return "endDate";
    case t("start_date").toLowerCase():
      return "startDate";
    default:
      return field;
  }
};

export const greenText = "rgba(46, 125, 50, 1)";
export const orangeText = "rgba(237, 108, 2, 1)";
export const redText = "rgba(211, 47, 47, 1)";
export const dangerText = "rgba(152, 27, 37, 1)";
export const lightGreenText = "rgba(99, 142, 38, 1)";
export const yellowText = "rgba(233, 175, 0, 1)";
export const purpleText = "rgba(156, 39, 176, 1)";
export const grayText = "rgba(0, 0, 0, 0.6)";

export const greenBackground = "rgba(237, 247, 237, 1)";
export const orangeBackground = "rgba(255, 244, 229, 1)";
export const redBackground = "rgba(253, 237, 237, 1)";
export const lightGreenBackground = "rgba(240, 244, 234, 1)";
export const yellowBackground = "rgba(255, 249, 230, 1)";
export const grayBackground = "rgba(214, 217, 221, 1)";

export const monthShorten = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const groupBy = (array: any[], key: string) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
}