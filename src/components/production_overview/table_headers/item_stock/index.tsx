import * as React from "react";

import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getThemedStyles } from "../styles";
import { ColumnFilterObject } from "../../column_picker";
import { CompactButton } from "../../compact_button";
import { LightBackgroundTooltip } from "../../tooltips/general";
import Image from "next/image";
import { ItemStockInfoToolTips } from "../../tooltips/item_stock_info";
export interface TopLevelHeaderProps {
  itemStockCompact: boolean;
  handleItemStockCompact: (full: boolean) => void;
  columnFilterObject: ColumnFilterObject;
}

const TopLevelHeaderStock: React.FC<TopLevelHeaderProps> = ({
  itemStockCompact,
  handleItemStockCompact,
  columnFilterObject,
}: TopLevelHeaderProps) => {
  const { t } = useTranslation();
  const styles = getThemedStyles();

  const [itemStock, setItemStock] = React.useState(itemStockCompact);

  const itemStockColumnSpan = () => {
    return columnFilterObject.itemStock.version === "FULL" ? 8 : 2;
  };

  return (
    <>
      <TableCell
        sx={{
          borderLeft: "1px solid rgba(214, 217, 221, 1)",
          borderTop: "1px solid rgba(214, 217, 221, 1)",
        }}
        colSpan={itemStockColumnSpan()}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ ...styles.headerText, marginRight: "10px" }}>
              {t("item_stock")}
            </Typography>
            <LightBackgroundTooltip
              title={<ItemStockInfoToolTips />}
              minWidth={480}
            >
              <Image src="/info.svg" width={24} height={24} alt="info" />
            </LightBackgroundTooltip>
          </Box>
          <CompactButton
            isCompact={itemStock}
            handleCompact={handleItemStockCompact}
          />
        </Box>
      </TableCell>
    </>
  );
};

export default TopLevelHeaderStock;
