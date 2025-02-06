"use client";

import { PerformanceSkysDashboard } from "@/components/dashboard/performance-skys";

export default function PerformanceSkys() {
  const displayDashBoard = () => {
    return <PerformanceSkysDashboard />;
  };

  return <>{displayDashBoard()}</>;
}
