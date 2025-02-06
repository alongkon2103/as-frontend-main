"use client";

import { useAppSelector } from "@/store/hooks";
import { MachinePerformanceDashboard } from "@/components/dashboard/machine-performance";
import { UserRoles } from "@/utils/types";

export default function Operator() {
  const { role } = useAppSelector((state) => state.auth.currentUser);

  const displayDashBoard = () => {
    if (role === UserRoles.ADMIN || role === UserRoles.OPERATOR_MANAGER) {
      return <MachinePerformanceDashboard />;
    }
  };

  return <>{displayDashBoard()}</>;
}
