import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface JobTabProps {
  handleJobTabChange: (value: string) => void;
  defaultValue?: string;
  planned: number;
  finishedGoods: number;
  scrapped: number;
  delayed: number;
  notStarted: number;
}

const JobTabs: React.FC<JobTabProps> = ({
  defaultValue = "planned",
  planned,
  finishedGoods,
  scrapped,
  delayed,
  notStarted,
  handleJobTabChange,
}) => {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    handleJobTabChange(newValue);
  };
  const { t } = useTranslation();

  return (
    <Tabs value={value} onChange={handleChange} aria-label="job tabs">
      <Tab label={`${t("firmed/released")} (${planned})`} value="planned" />
      <Tab label={`${t("complete")} (${finishedGoods})`} value="complete" />
      <Tab label={`${t("scrapped")} (${scrapped})`} value="scrapped" />
      <Tab label={`${t("delayed")} (${delayed})`} value="delayed" />
      <Tab label={`${t("not_started")} (${notStarted})`} value="not_started" />
    </Tabs>
  );
};

export default JobTabs;
