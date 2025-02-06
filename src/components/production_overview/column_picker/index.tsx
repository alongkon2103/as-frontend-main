import CloseButton from "@/components/shared/CloseButton";
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface ColumnPickerProps {
  initialFilters: ColumnFilterObject;
  onClose: () => void;
  applyFilter: (filterObject: ColumnFilterObject) => void;
}

export interface ColumnFilterObject {
  itemDetail: {
    self: boolean;
    name: boolean;
    assemblyPart: boolean;
    mcPart: boolean;
    familyCode: boolean;
    price: boolean;
    version: "FULL" | "COMPACT";
  };
  rawMaterial: {
    self: boolean;
    name: boolean;
    stock: boolean;
  };
  itemStock: {
    self: boolean;
    version: "FULL" | "COMPACT";
  };
  itemCoverage: {
    self: boolean;
    version: "10_WEEKS" | "12_MONTHS" | "6_MONTHS" | "5_WEEKS" | "2_WEEKS";
  };
}

export default function ColumnPicker({
  initialFilters,
  onClose,
  applyFilter,
}: ColumnPickerProps) {
  /* Item Details */
  const [itemDetailsSwitch, setItemDetailsSwitch] = useState(
    initialFilters.itemDetail.self
  );
  const [itemDetailNameSwitch, setItemDetailNameSwitch] = useState(
    initialFilters.itemDetail.name
  );
  const [assemblyPartSwitch, setAssemblyPartSwitch] = useState(
    initialFilters.itemDetail.assemblyPart
  );
  const [mcPartSwitch, setMCPartSwitch] = useState(
    initialFilters.itemDetail.mcPart
  );
  const [familyCodeSwitch, setFamilyCodeSwitch] = useState(
    initialFilters.itemDetail.familyCode
  );
  const [priceSwitch, setPriceSwitch] = useState(
    initialFilters.itemDetail.price
  );

  const [itemDetailsDropdownValue, setItemDetailsDropdownValue] = useState(
    initialFilters.itemDetail.version
  );
  const [itemStocksDropdownValue, setItemStocksDropdownValue] = useState(
    initialFilters.itemStock.version
  );
  const [itemCoverageDropdownValue, setItemCoverageDropdownValue] = useState(
    initialFilters.itemCoverage.version
  );

  /* Raw Material */
  const [rawMaterialSwitch, setRawMaterialSwitch] = useState(
    initialFilters.rawMaterial.self
  );
  const [rawMaterialNameSwitch, setRawMaterialNameSwitch] = useState(
    initialFilters.rawMaterial.name
  );
  const [stockSwitch, setStockSwitch] = useState(
    initialFilters.rawMaterial.stock
  );

  const [itemStockSwitch, setItemStockSwitch] = useState(
    initialFilters.itemStock.self
  );
  const [itemCoverageSwitch, setItemCoverageSwitch] = useState(
    initialFilters.itemCoverage.self
  );

  const { t } = useTranslation();

  const handleSubmit = () => {
    const filterObject = {
      itemDetail: {
        self: itemDetailsSwitch,
        name: itemDetailNameSwitch,
        assemblyPart: assemblyPartSwitch,
        mcPart: mcPartSwitch,
        familyCode: familyCodeSwitch,
        price: priceSwitch,
        version: itemDetailsDropdownValue,
      },
      rawMaterial: {
        self: rawMaterialSwitch,
        name: rawMaterialNameSwitch,
        stock: stockSwitch,
      },
      itemStock: {
        self: itemStockSwitch,
        version: itemStocksDropdownValue,
      },
      itemCoverage: {
        self: itemCoverageSwitch,
        version: itemCoverageDropdownValue,
      },
    } as ColumnFilterObject;
    applyFilter(filterObject);
  };

  return (
    <Box
      sx={{
        padding: "1vw",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          borderBottom={"1px solid var(--neutral-300, #E0E0E0)"}
        >
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "normal",
            }}
          >
            {t("column_selection")}
          </Typography>
          <CloseButton onClose={onClose} />
        </Grid>
        <Grid item xs={12}>
          <Box paddingX={"1vw"}>
            <FormGroup sx={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked
                      checked={itemDetailsSwitch}
                      onChange={() => {
                        setItemDetailNameSwitch(!itemDetailsSwitch);
                        setAssemblyPartSwitch(!itemDetailsSwitch);
                        setMCPartSwitch(!itemDetailsSwitch);
                        setFamilyCodeSwitch(!itemDetailsSwitch);
                        if (itemCoverageDropdownValue !== "2_WEEKS") {
                          setPriceSwitch(!itemDetailsSwitch);
                        }
                        setItemDetailsSwitch(!itemDetailsSwitch);
                      }}
                    />
                  }
                  label={<b>{t("item_details")}</b>}
                />
                <Select
                  size="small"
                  value={itemDetailsDropdownValue}
                  onChange={(e) => {
                    if (e.target.value === "FULL") {
                      setItemDetailNameSwitch(true);
                      setAssemblyPartSwitch(true);
                      setMCPartSwitch(true);
                      setFamilyCodeSwitch(true);
                      if (itemCoverageDropdownValue !== "2_WEEKS") {
                        setPriceSwitch(true);
                      }
                    } else {
                      setItemDetailNameSwitch(true);
                      setAssemblyPartSwitch(false);
                      setMCPartSwitch(false);
                      setFamilyCodeSwitch(false);
                      setPriceSwitch(false);
                    }
                    setItemDetailsDropdownValue(
                      e.target.value as "FULL" | "COMPACT"
                    );
                  }}
                >
                  <MenuItem key={"item-full"} value={"FULL"}>
                    {t("full_version")}
                  </MenuItem>
                  <MenuItem key={"item-full"} value={"COMPACT"}>
                    {t("compact_version")}
                  </MenuItem>
                </Select>
              </Box>
              <Box
                paddingX={"1vw"}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked
                      checked={itemDetailNameSwitch}
                      onChange={() =>
                        setItemDetailNameSwitch(!itemDetailNameSwitch)
                      }
                    />
                  }
                  label={t("name")}
                />
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked
                      checked={assemblyPartSwitch}
                      onChange={() =>
                        setAssemblyPartSwitch(!assemblyPartSwitch)
                      }
                    />
                  }
                  label={t("assembly_part")}
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="M/C Part"
                  checked={mcPartSwitch}
                  onChange={() => setMCPartSwitch(!mcPartSwitch)}
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label={t("family_code")}
                  checked={familyCodeSwitch}
                  onChange={() => setFamilyCodeSwitch(!familyCodeSwitch)}
                />
                {itemCoverageDropdownValue !== "2_WEEKS" && (
                  <FormControlLabel
                    control={<Switch />}
                    label={t("prices")}
                    checked={priceSwitch}
                    onChange={() => setPriceSwitch(!priceSwitch)}
                  />
                )}
              </Box>
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    checked={rawMaterialSwitch}
                    onChange={() => {
                      setRawMaterialNameSwitch(!rawMaterialSwitch);
                      setStockSwitch(!rawMaterialSwitch);
                      setRawMaterialSwitch(!rawMaterialSwitch);
                    }}
                  />
                }
                label={<b>{t("raw_material")}</b>}
              />
              <Box
                paddingX={"1vw"}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked
                      checked={rawMaterialNameSwitch}
                      onChange={() =>
                        setRawMaterialNameSwitch(!rawMaterialNameSwitch)
                      }
                    />
                  }
                  label={t("name")}
                />
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked
                      checked={stockSwitch}
                      onChange={() => setStockSwitch(!stockSwitch)}
                    />
                  }
                  label={t("stock")}
                />
              </Box>
            </FormGroup>
            <FormGroup>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked
                      checked={itemStockSwitch}
                      onChange={() => setItemStockSwitch(!itemStockSwitch)}
                    />
                  }
                  label={<b>{t("item_stock")}</b>}
                />
                <Select
                  size="small"
                  value={itemStocksDropdownValue}
                  onChange={(e) => {
                    if (e.target.value === "FULL") {
                    } else {
                    }
                    setItemStocksDropdownValue(
                      e.target.value as "FULL" | "COMPACT"
                    );
                  }}
                >
                  <MenuItem key={"item-full"} value={"FULL"}>
                    {t("full_version")}
                  </MenuItem>
                  <MenuItem key={"item-full"} value={"COMPACT"}>
                    {t("compact_version")}
                  </MenuItem>
                </Select>
              </Box>
            </FormGroup>
            {itemCoverageDropdownValue !== "2_WEEKS" && (
              <FormGroup>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: "10px",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        defaultChecked
                        checked={itemCoverageSwitch}
                        onChange={() =>
                          setItemCoverageSwitch(!itemCoverageSwitch)
                        }
                      />
                    }
                    label={<b>{t("item_coverage")}</b>}
                  />
                  <Select
                    size="small"
                    value={itemCoverageDropdownValue}
                    onChange={(e) => {
                      if (e.target.value === "FULL") {
                      } else {
                      }
                      setItemCoverageDropdownValue(
                        e.target.value as
                          | "10_WEEKS"
                          | "12_MONTHS"
                          | "6_MONTHS"
                          | "5_WEEKS"
                      );
                    }}
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
                </Box>
              </FormGroup>
            )}
          </Box>
        </Grid>
      </Grid>
      <Box flexGrow={1} />
      <Grid container>
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          {t("apply_selection")}
        </Button>
      </Grid>
    </Box>
  );
}
