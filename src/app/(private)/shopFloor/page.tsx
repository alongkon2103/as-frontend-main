"use client";
import { ShopFloorDashboard } from "@/components/dashboard/shop-floor";

export default function ShopFloor() {
  const displayDashBoard = () => {
    return <ShopFloorDashboard factoryName="F4" />;
  };

  return <>{displayDashBoard()}</>;
}
