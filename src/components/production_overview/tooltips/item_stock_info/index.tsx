import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getThemedStyles } from "./styles";
import Image from "next/image";
export const ItemStockInfoToolTips: React.FC = () => {
  const { t } = useTranslation();
  const styles = getThemedStyles();
  return (
    <Box sx={{ padding: "10px" }}>
      <Typography sx={styles.infoTitle} gutterBottom>
        Edit WIP / Item Stock Data
      </Typography>
      <Image
        src="/item_stock_info.png"
        width={450}
        height={500}
        alt="item_stock_info"
      />
    </Box>
  );
};
