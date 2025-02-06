import { Typography, IconButton, Badge } from "@mui/material";
import { t } from "i18next";
import FilterListIcon from "@mui/icons-material/FilterList";

export interface FilterButtonProps {
  filterCount: number;
  setOpenFilter: (filterState: boolean) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  filterCount,
  setOpenFilter,
}: FilterButtonProps) => {
  return (
    <IconButton
      sx={{
        borderRadius: "8px",
        border: "1px solid #225FA6",
        marginRight: "10px",
        alignItems: "flex-end",
        color: "primary",
        padding: "10px 15px",
        minWidth: "110px",
      }}
      onClick={() => setOpenFilter(true)}
    >
      <Badge badgeContent={filterCount} overlap="circular" color="primary">
        <FilterListIcon color={"primary"} />
      </Badge>
      <Typography ml={1} color={"primary"}>
        {t("filter")}
      </Typography>
    </IconButton>
  );
};

export default FilterButton;
