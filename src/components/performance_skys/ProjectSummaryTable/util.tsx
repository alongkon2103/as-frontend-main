import { ProjectSummaryProps } from "@/store/features/PerformanceReport/ProjectSummarySlice";

export const headers: (keyof ProjectSummaryProps)[] = [
  "planAps",
  "actual",
  "performance",
  "utilization",
];

const businessSegmentMap: Record<number, string> = {
  1: "AE",
  2: "AS",
};

export const getBusinessSegment = (id: number): string => {
  return businessSegmentMap[id] || "";
};
