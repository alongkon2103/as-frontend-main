import React, { useEffect } from "react";
import CustomTab from "./CustomTab";
import { Tab, Tabs, Typography } from "@mui/material";
import { useAppSelector } from "@/store/hooks";

function TabGroup({ updatedtab }: { updatedtab: (stage: any) => void }) {
  const [value, setValue] = React.useState(0);
  const { kanban } = useAppSelector((state) => state.kanban);
  const { stages } = kanban || { stages: [] };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    updatedtab(stages[newValue]);
    setValue(newValue);
  };

  const mappedTabs = stages?.map((stage, i) => {
    return <Tab key={i} label={<CustomTab stage={stage} />} />;
  });

  useEffect(() => {
    updatedtab(stages[0]);
    setValue(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stages]);

  return (
    <div className="kanban">
      {stages.length > 0 && (
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          visibleScrollbar={true}
        >
          {mappedTabs}
        </Tabs>
      )}
    </div>
  );
}

export default TabGroup;
