import React from "react";
import { Box, Grid } from "@mui/material";
import { ShopFloorCardProps, ShopFloorCard } from "../card";
import { gridContentBoxStyle, gridStyle } from "./styles";
import { ShopFloorMachineProps } from "@/components/dashboard/shop-floor";

export interface ShopFloorContainerProps {
  rawMachineData: ShopFloorMachineProps[];
}

const groupMachinesByBoxGroup = (machineData: ShopFloorCardProps[]) => {
  const groupedMachines = machineData.reduce(
    (groups, machine) => {
      const { boxGroup } = machine;
      if (!groups[boxGroup]) {
        groups[boxGroup] = [];
      }
      groups[boxGroup].push(machine);
      return groups;
    },
    {} as Record<string, ShopFloorCardProps[]>
  );
  Object.keys(groupedMachines).forEach((boxGroup) => {
    groupedMachines[boxGroup].sort(
      (a, b) => Number(a.positionY) - Number(b.positionY)
    );
  });

  return groupedMachines;
};

const transformToMachineData = (
  rawMachineData: ShopFloorMachineProps
): ShopFloorCardProps => ({
  machineName: rawMachineData.resourceId,
  status: rawMachineData.status,
  machineLabel: rawMachineData.resourceDescription,
  positionX: rawMachineData.positionX,
  positionY: rawMachineData.positionY,
  boxGroup: rawMachineData.boxGroup,
});
const ShopFloorContainer: React.FC<ShopFloorContainerProps> = ({
  rawMachineData,
}) => {
  const machineData = rawMachineData.map(transformToMachineData);
  const groupedMachines = groupMachinesByBoxGroup(machineData);

  return (
    <Grid container sx={gridStyle()}>
      {Object.entries(groupedMachines).map(([boxGroup, machines], index) => {
        const firstMachine = machines[0];
        return (
          <Grid
            key={index}
            sx={{
              // Can't put this in the style.
              gridColumn: firstMachine.positionX,
              gridRow: `${firstMachine.positionY} / span ${machines.length}`,
              width: "fit-content",
            }}
            data-testid="machine-group"
          >
            <Box sx={gridContentBoxStyle()}>
              {machines.map((machine) => (
                <Box key={machine.machineName}>
                  <ShopFloorCard
                    machineName={machine.machineName}
                    status={machine.status}
                    machineLabel={machine.machineLabel}
                    positionX={machine.positionX}
                    positionY={machine.positionY}
                    boxGroup={machine.boxGroup}
                  />
                </Box>
              ))}
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ShopFloorContainer;
