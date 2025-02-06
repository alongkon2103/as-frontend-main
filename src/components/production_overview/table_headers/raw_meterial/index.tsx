import * as React from "react";

import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getThemedStyles } from "./../styles";
import { ColumnFilterObject } from "../../column_picker";

export interface TopLevelHeaderProps {
  columnFilterObject: ColumnFilterObject;
}

const TopLevelHeaderRawMaterial: React.FC<TopLevelHeaderProps> = ({
  columnFilterObject,
}: TopLevelHeaderProps) => {
  const { t } = useTranslation();
  const styles = getThemedStyles();

  const rawMaterialColumnSpan = () => {
    let count = 0;
    if (columnFilterObject.rawMaterial.name) count++;
    if (columnFilterObject.rawMaterial.stock) count++;
    return count;
  };

  return (
    <>
      {columnFilterObject.rawMaterial.self && rawMaterialColumnSpan() > 0 && (
        <TableCell
          sx={{
            borderLeft: "1px solid rgba(214, 217, 221, 1)",
            borderTop: "1px solid rgba(214, 217, 221, 1)",
          }}
          colSpan={rawMaterialColumnSpan()}
        >
          <Typography sx={styles.headerText}>{t("raw_material")}</Typography>
        </TableCell>
      )}
    </>
  );
};

export default TopLevelHeaderRawMaterial;
