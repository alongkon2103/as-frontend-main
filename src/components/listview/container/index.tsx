import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { ListViewCard, ListViewCardProps } from "@/components/listview/card";
import {
  boxPosition,
  groupLabelStyles,
  headerStyles,
  mainContainerStyle,
  TimeStyles,
} from "./styles";
import { ShopFloorMachineProps } from "@/components/dashboard/shop-floor";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";

export interface MachineContainerProps {
  rawMachineData: ShopFloorMachineProps[];
}

export const MachineContainer: React.FC<MachineContainerProps> = ({
  rawMachineData,
}) => {
  const desiredOrder: string[] = ["STOP", "RUN", "IDLE", "OFF"];
  const [currentTime, setCurrentTime] = useState<string>("");

  const { t } = useTranslation();
  useEffect(() => {
    const current = new Date();
    const formattedTime = current.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    setCurrentTime(formattedTime);
  }, []);
  const params = useSearchParams();
  const [factory, setFactory] = useState(params?.get("factory") ?? "");
  const [id, setId] = useState(params?.get("id") ?? "");

  useEffect(() => {
    // This effect will run whenever the URL parameter changes
    const newFactory = params?.get("factory");
    if (newFactory) setFactory(newFactory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.get("factory")]);

  useEffect(() => {
    // This effect will run whenever the URL parameter changes
    const newId = params?.get("id");
    if (newId) setId(newId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.get("id")]);

  const transformMachineData = (
    rawMachineData: ShopFloorMachineProps
  ): ListViewCardProps => ({
    factory: factory || "",
    machineName: rawMachineData.resourceId,
    machineLabel: rawMachineData.resourceDescription,
    problem: rawMachineData.problem,
    status: rawMachineData.status,
    spindleLoad: rawMachineData.spindleLoad
      ? rawMachineData.spindleLoad
      : undefined,
    spindleRunTime: rawMachineData.spindleRunTime
      ? rawMachineData.spindleRunTime
      : undefined,
    spindleSpeed: rawMachineData.spindleSpeed
      ? rawMachineData.spindleSpeed
      : undefined,
  });
  const machineData = rawMachineData.map(transformMachineData);

  const groupMachinesByStatus = (
    machineData: ListViewCardProps[]
  ): { [key: string]: ListViewCardProps[] } => {
    const groupedMachines: { [key: string]: ListViewCardProps[] } = {};

    machineData.forEach((card) => {
      if (groupedMachines[card.status]) {
        groupedMachines[card.status].push(card);
      } else {
        groupedMachines[card.status] = [card];
      }
    });

    return groupedMachines;
  };

  const groupedMachines = groupMachinesByStatus(machineData);

  const sortedGroupedMachines = desiredOrder.reduce<{
    [key: string]: ListViewCardProps[];
  }>((acc, status) => {
    if (groupedMachines[status]) {
      acc[status] = groupedMachines[status];
    }
    return acc;
  }, {});

  const timeStyle = TimeStyles();

  return (
    <Box sx={mainContainerStyle()}>
      <Typography sx={headerStyles()}>{t(`factory${id}`)}</Typography>
      <Typography sx={timeStyle.updatedText}>
        {t("updated_at")}:
        <Typography sx={timeStyle.timeText}>{currentTime}</Typography>
      </Typography>
      <Box sx={boxPosition()}>
        {Object.entries(sortedGroupedMachines).map(([status, cards]) => (
          <Box key={status} sx={{ mb: 2 }}>
            <Typography sx={groupLabelStyles(status)}>
              {status} ({cards.length})
            </Typography>
            {cards.map((card, index) => (
              <ListViewCard key={index} {...card} />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MachineContainer;
