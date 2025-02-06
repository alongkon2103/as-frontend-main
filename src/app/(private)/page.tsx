"use client";

import { useAppSelector } from "@/store/hooks";
import PlannerDashboard from "@/components/dashboard/planner";
import OperatorManagerDashboard from "@/components/dashboard/operator-manager";
import { OperatorDashboard } from "@/components/dashboard/operator";
import { UserRoles } from "@/utils/types";

export default function Home() {
  const { role } = useAppSelector((state) => state.auth.currentUser);

  const displayDashBoard = () => {
    if (role === UserRoles.ADMIN || role === UserRoles.PLANNER) {
      return <PlannerDashboard />;
    } else if (role === UserRoles.OPERATOR_MANAGER) {
      return <OperatorManagerDashboard />;
    } else {
      return <OperatorDashboard />;
    }
  };

  return <>{displayDashBoard()}</>;
}
