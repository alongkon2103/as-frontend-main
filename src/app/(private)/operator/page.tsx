"use client";

import { OperatorDashboard } from "@/components/dashboard/operator";

export default function Operator() {
  const displayDashBoard = () => {
    return <OperatorDashboard />;
  };

  return <>{displayDashBoard()}</>;
}
