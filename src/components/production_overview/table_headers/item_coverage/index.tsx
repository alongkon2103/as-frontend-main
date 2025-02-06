import * as React from "react";

import { Box, TableCell, Typography } from "@mui/material";
import Forecast from "./forecast";
import ItemCoverageHeader from "./coverage";
import { ColumnFilterObject } from "../../column_picker";

export interface TopLevelHeaderProps {
  itemCoverageDropdown: string;
  forecastSwitch: boolean;
  handleItemCoverageDropdown: (
    value: "10_WEEKS" | "12_MONTHS" | "6_MONTHS" | "5_WEEKS"
  ) => void;
  handleForecastSwitch: (value: boolean) => void;
  columnFilterObject: ColumnFilterObject;
}

const TopLevelHeaderCoverage: React.FC<TopLevelHeaderProps> = ({
  itemCoverageDropdown,
  forecastSwitch,
  handleItemCoverageDropdown,
  handleForecastSwitch,
  columnFilterObject,
}: TopLevelHeaderProps) => {
  const [itemCoverage] = React.useState(itemCoverageDropdown);
  const [foreCastSwitch] = React.useState(forecastSwitch);

  const itemCoverageColumnSpan = () => {
    if (columnFilterObject.itemCoverage.version === "5_WEEKS") {
      return 6;
    } else if (columnFilterObject.itemCoverage.version === "6_MONTHS") {
      return 7;
    } else if (columnFilterObject.itemCoverage.version === "10_WEEKS") {
      return 11;
    } else if (columnFilterObject.itemCoverage.version === "12_MONTHS") {
      return 13;
    } else {
      return 3;
    }
  };

  return (
    <>
      <TableCell
        sx={{
          borderLeft: "1px solid rgba(214, 217, 221, 1)",
          borderTop: "1px solid rgba(214, 217, 221, 1)",
          paddingY: 0,
        }}
        colSpan={itemCoverageColumnSpan()}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ItemCoverageHeader
            itemCoverageDropDownValue={itemCoverage}
            handleChange={(e) =>
              handleItemCoverageDropdown(
                e.target.value as
                  | "10_WEEKS"
                  | "12_MONTHS"
                  | "6_MONTHS"
                  | "5_WEEKS"
              )
            }
          />
          {columnFilterObject.itemCoverage.version !== "2_WEEKS" && (
            <Forecast
              forecast={foreCastSwitch}
              handleChange={() => handleForecastSwitch(!foreCastSwitch)}
            />
          )}
        </Box>
      </TableCell>
    </>
  );
};

export default TopLevelHeaderCoverage;
