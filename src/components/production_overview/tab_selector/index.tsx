import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export interface TabSelectorProps {
  tab: string;
  handleTabChange: (tab: string) => void;
  disabled?: boolean;
}

export const TabSelector: React.FC<TabSelectorProps> = ({
  tab,
  handleTabChange,
  disabled = false,
}: TabSelectorProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Button
        variant={tab === "sales" ? "contained" : "outlined"}
        onClick={() => handleTabChange("sales")}
        disabled={disabled}
        sx={{
          marginX: "1rem",
          color: tab !== "sales" ? "black" : ``,
          border:
            tab !== "sales" ? "1px solid var(--neutral-300, #E0E0E0)" : ``,
        }}
      >
        {t("sales_view")}
      </Button>
      <Button
        variant={tab === "planner" ? "contained" : "outlined"}
        onClick={() => handleTabChange("planner")}
        sx={{
          marginX: "1rem",
          color: tab !== "planner" ? "black" : ``,
          border:
            tab !== "planner" ? "1px solid var(--neutral-300, #E0E0E0)" : ``,
        }}
      >
        {t("planner_view")}
      </Button>
      <Button
        variant={tab === "readyToShip" ? "contained" : "outlined"}
        onClick={() => handleTabChange("readyToShip")}
        sx={{
          marginX: "1rem",
          color: tab !== "readyToShip" ? "black" : ``,
          border:
            tab !== "readyToShip"
              ? "1px solid var(--neutral-300, #E0E0E0)"
              : ``,
        }}
      >
        {t("ready_to_ship_view")}
      </Button>
    </>
  );
};
