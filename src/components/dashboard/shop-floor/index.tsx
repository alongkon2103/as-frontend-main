"use client";

import React, { useEffect, useMemo, useState } from "react";
import MachineContainer from "@/components/listview/container";
import { Box } from "@mui/material";
import ShopFloorContainer from "@/components/shopfloor/container";
import { useAppSelector } from "@/store/hooks";
import { pageBGStyle } from "@/app/(private)/shopFloor/styles";
import SignalRService from "@/utils/SignalRService";

interface ShopFloorDashboardProps {
  factoryName: string;
}

export interface ShopFloorMachineProps {
  resourceId: string;
  resourceDescription: string;
  problem?: string;
  status: string;
  spindleLoad?: number;
  spindleRunTime?: number;
  spindleSpeed?: number;
  positionX: number;
  positionY: number;
  boxGroup: number;
}

export const ShopFloorDashboard: React.FC<ShopFloorDashboardProps> = ({
  factoryName,
}) => {
  const { token } = useAppSelector((state) => state.auth);
  const [machineData, setMachineData] = useState<ShopFloorMachineProps[]>([]);
  const url = process.env.NEXT_PUBLIC_API_URL;

  const startShopFloorConnection = async () => {
    try {
      await SignalRService.startConnection(
        `${url}/shopFloor?factoryName=${factoryName}`,
        token
      );

      SignalRService.connection?.on("ReceiveData", (data) => {
        setMachineData(data);
      });
      SignalRService.connection?.invoke("RequestData", factoryName);
    } catch (error) {
      SignalRService.stopConnection();
      throw error;
    }
  };

  useEffect(() => {
    startShopFloorConnection();

    const fetchInterval = setInterval(() => {
      SignalRService.connection?.invoke("RequestData", factoryName);
    }, 10000);

    return () => {
      clearInterval(fetchInterval);
      SignalRService.stopConnection();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const memoizedMachineData = useMemo(() => machineData, [machineData]);

  return (
    <Box sx={pageBGStyle()}>
      <MachineContainer rawMachineData={memoizedMachineData} />
      <ShopFloorContainer rawMachineData={memoizedMachineData} />
    </Box>
  );
};
