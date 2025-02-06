import * as React from "react";
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { LightBackgroundTooltip } from "../../tooltips/general";
import { getThemedStyles } from "../styles";
import Image from "next/image";
import { ReactNode } from "react";
import { ItemCoverageInfoToolTips } from "../../tooltips/item_coverage";

export interface ItemCoverageHeaderProps {
  itemCoverageDropDownValue: string;
  handleChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
}

const CoverageHeader: React.FC<ItemCoverageHeaderProps> = ({
  itemCoverageDropDownValue,
  handleChange,
}: ItemCoverageHeaderProps) => {
  const { t } = useTranslation();
  const styles = getThemedStyles();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Typography sx={styles.headerText}>{t("item_coverage")}</Typography>
      {itemCoverageDropDownValue !== "2_WEEKS" && (
        <>
          <LightBackgroundTooltip
            title={<ItemCoverageInfoToolTips />}
            minWidth={600}
          >
            <Image src="/info.svg" width={24} height={24} alt="info" />
          </LightBackgroundTooltip>

          <Select
            size="small"
            value={itemCoverageDropDownValue}
            onChange={handleChange}
          >
            <MenuItem key={"item-full"} value={"10_WEEKS"}>
              {t("10_weeks")}
            </MenuItem>
            <MenuItem key={"item-full"} value={"12_MONTHS"}>
              {t("12_months")}
            </MenuItem>
            <MenuItem key={"item-full"} value={"6_MONTHS"}>
              {t("6_months")}
            </MenuItem>
            <MenuItem key={"item-full"} value={"5_WEEKS"}>
              {t("5_weeks")}
            </MenuItem>
          </Select>
        </>
      )}
    </Box>
  );
};

export default CoverageHeader;
