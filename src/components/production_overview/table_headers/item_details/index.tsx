/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";

import { Box, IconButton, TableCell, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getThemedStyles } from "./../styles";
import { ColumnFilterObject } from "../../column_picker";
import { Compress, Expand } from "@mui/icons-material";
import { CompactButton } from "../../compact_button";

export interface ItemDetailHeaderProps {
  itemDetailCompact: boolean;
  handleItemDetailCompact: (full: boolean) => void;
  columnFilterObject: ColumnFilterObject;
  props: any;
}

const TopLevelHeaderDetails: React.FC<ItemDetailHeaderProps> = ({
  itemDetailCompact,
  handleItemDetailCompact,
  columnFilterObject,
  props,
}: ItemDetailHeaderProps) => {
  const { t } = useTranslation();
  const styles = getThemedStyles();
  const [itemDetail, setItemDetail] = React.useState(itemDetailCompact);

  const itemDetailsColumnSpan = () => {
    let count = 0;
    if (columnFilterObject.itemDetail.name) count++;
    if (columnFilterObject.itemDetail.assemblyPart) count++;
    if (columnFilterObject.itemDetail.mcPart) count++;
    if (columnFilterObject.itemDetail.familyCode) count++;
    if (columnFilterObject.itemDetail.price) count++;
    return count;
  };

  return (
    <>
      {columnFilterObject.itemDetail.self && itemDetailsColumnSpan() > 0 && (
        <TableCell
          sx={{
            borderLeft: "1px solid rgba(214, 217, 221, 1)",
            borderTop: "1px solid rgba(214, 217, 221, 1)",
          }}
          colSpan={itemDetailsColumnSpan()}
          {...props}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={styles.headerText}>{t("item_details")}</Typography>
            <CompactButton
              isCompact={itemDetail}
              handleCompact={handleItemDetailCompact}
            />
          </Box>
        </TableCell>
      )}
    </>
  );
};

export default TopLevelHeaderDetails;
