"use client";

import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface MachinePerformanceProps {
  name: string;
  totalOutput: number;
}

interface MachinePerformanceTabsProps {
  tabsData: MachinePerformanceProps[];
  handleTabChange: (value: string) => void;
}

export const MachinePerformanceTabs: React.FC<MachinePerformanceTabsProps> = ({
  tabsData,
  handleTabChange,
}: MachinePerformanceTabsProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(
    tabsData?.length > 0 ? tabsData[0].name : ""
  );
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    handleTabChange(newValue);
  };

  if (!tabsData) return null;

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons={true}
      aria-label="machine-performance-tabs"
      sx={{
        display: "flex",
        width: "100%",
        marginTop: "24px",
        "& .MuiTab-root.Mui-selected": {
          color: "#225FA6",
        },
      }}
    >
      {tabsData.map((tab: MachinePerformanceProps, index: number) => {
        return (
          <Tab
            key={index}
            label={
              <Box>
                <Box>{tab.name}</Box>
                <Box>{tab.totalOutput}</Box>
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "12px",
                    fontStyle: "italic",
                    fontWeight: 400,
                    lineHeight: "16px",
                    textTransform: "none",
                  }}
                >
                  {t("total_output")}
                </Typography>
              </Box>
            }
            value={tab.name}
            style={{ minWidth: "250px" }}
          />
        );
      })}
    </Tabs>
  );
};
