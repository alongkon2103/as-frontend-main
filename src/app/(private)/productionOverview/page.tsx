"use client";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getThemedStyles } from "./styles";
import ColumnPicker, {
  ColumnFilterObject,
} from "@/components/production_overview/column_picker";
import ProductionOverviewTable from "./productionOverview";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { TabSelector } from "@/components/production_overview/tab_selector";
import { useSearchParams } from "next/navigation";
import { usePreviousValue } from "@/utils/usePreviousValue";
import { fetchProductionOverviews } from "@/store/features/ProductionOverview/ProductionOverviewSlice";
import { UserRoles } from "@/utils/types";

export default function ProductionOverview() {
  const { t } = useTranslation();
  const [openColumnModal, setOpenColumnModal] = useState(false);
  const styles = getThemedStyles();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { role } = useAppSelector((state) => state.auth.currentUser);
  const [tab, setTab] = useState(
    role !== UserRoles.OPERATOR_MANAGER ? "planner" : "readyToShip"
  );

  const [columnFilterObject, setColumnFilterObject] = useState({
    itemDetail: {
      self: true,
      name: true,
      assemblyPart: true,
      mcPart: true,
      familyCode: true,
      price: false,
      version: "FULL",
    },
    rawMaterial: {
      self: true,
      name: true,
      stock: true,
    },
    itemStock: {
      self: true,
      version: "FULL",
    },
    itemCoverage: {
      self: true,
      version: role !== UserRoles.OPERATOR_MANAGER ? "10_WEEKS" : "2_WEEKS",
    },
  } as ColumnFilterObject);
  const [forecastSwitch, setForecastSwitch] = useState(false);

  const getType = (version: string) => {
    if (
      version === "10_WEEKS" ||
      version === "5_WEEKS" ||
      version === "2_WEEKS"
    ) {
      return "ww";
    } else {
      return "mm";
    }
  };

  const getRange = (version: string) => {
    if (version === "10_WEEKS") {
      return "10";
    } else if (version === "5_WEEKS") {
      return "5";
    } else if (version === "12_MONTHS") {
      return "12";
    } else if (version === "6_MONTHS") {
      return "6";
    } else {
      return "2";
    }
  };

  const params = {
    projectId: parseInt(searchParams.get("id") as string),
    filterRange: getRange(columnFilterObject.itemCoverage.version),
    filterType: getType(columnFilterObject.itemCoverage.version),
    isForecast: forecastSwitch ? 1 : 0,
  };

  const oldParams = usePreviousValue(params);

  useEffect(() => {
    const params = {
      projectId: parseInt(searchParams.get("id") as string),
      filterRange: getRange(columnFilterObject.itemCoverage.version),
      filterType: getType(columnFilterObject.itemCoverage.version),
      isForecast: forecastSwitch ? 1 : 0,
    };

    if (JSON.stringify(oldParams) !== JSON.stringify(params)) {
      dispatch(fetchProductionOverviews(params));
    }
  }, [dispatch, columnFilterObject, forecastSwitch, searchParams, oldParams]);

  const { productionOverviews, loading } = useAppSelector(
    (state) => state.productionOverviews
  );

  useEffect(() => {
    if (tab === "planner") {
      setColumnFilterObject({
        itemDetail: {
          self: true,
          name: true,
          assemblyPart: true,
          mcPart: true,
          familyCode: true,
          price: false,
          version: "FULL",
        },
        rawMaterial: {
          self: true,
          name: true,
          stock: true,
        },
        itemStock: {
          self: true,
          version: "FULL",
        },
        itemCoverage: {
          self: true,
          version: "10_WEEKS",
        },
      });
    } else if (tab === "sales") {
      setColumnFilterObject({
        itemDetail: {
          self: true,
          name: true,
          assemblyPart: false,
          mcPart: false,
          familyCode: false,
          price: false,
          version: "COMPACT",
        },
        rawMaterial: {
          self: true,
          name: true,
          stock: true,
        },
        itemStock: {
          self: true,
          version: "COMPACT",
        },
        itemCoverage: {
          self: true,
          version: "10_WEEKS",
        },
      });
    } else if (tab === "readyToShip") {
      setColumnFilterObject({
        itemDetail: {
          self: true,
          name: true,
          assemblyPart: false,
          mcPart: false,
          familyCode: false,
          price: false,
          version: "COMPACT",
        },
        rawMaterial: {
          self: true,
          name: true,
          stock: true,
        },
        itemStock: {
          self: true,
          version: "COMPACT",
        },
        itemCoverage: {
          self: true,
          version: "2_WEEKS",
        },
      });
      setForecastSwitch(false);
    }
  }, [tab]);

  return (
    <Box
      sx={{
        paddingX: "2vw",
      }}
    >
      <Stack spacing={2}>
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: "2vh",
          }}
        >
          <Grid
            item
            xs={8}
            spacing={4}
            sx={{
              display: "flex",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: ["column", "row"],
                justifyContent: ["center", "flex-start"],
                textAlign: ["center", "left"],
                gap: 2,
              }}
            >
              <Typography
                sx={{
                  color: "var(--text-primary, rgba(0, 0, 0, 0.87))",
                  fontFamily: "Roboto",
                  fontSize: "24px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "28px",
                }}
              >
                {t("all_items")}
              </Typography>
              {!loading && (
                <TabSelector
                  tab={tab}
                  handleTabChange={setTab}
                  disabled={role === UserRoles.OPERATOR_MANAGER}
                />
              )}
            </Box>
          </Grid>

          <Grid
            item
            xs={4}
            display={"flex"}
            justifyContent={"flex-end"}
            flexDirection={["column", "row"]}
            gap={1}
          >
            {!loading && (
              <Button
                variant="outlined"
                sx={{ borderRadius: "8px", border: "1px solid #225FA6" }}
                onClick={() => setOpenColumnModal(true)}
              >
                {t("column")}
              </Button>
            )}
          </Grid>
          {loading && (
            <Box
              sx={{
                margin: "1vw",
                padding: "15px",
                border: "1px solid rgba(0,0,0,0.15)",
              }}
            >
              <CircularProgress size={15} sx={{ marginRight: 3 }} />
              We are loading the data ... please wait.
            </Box>
          )}
          {!loading && !productionOverviews && (
            <Box
              sx={{
                margin: "1vw",
                padding: "15px",
                border: "1px solid rgba(0,0,0,0.15)",
              }}
            >
              No Data Available. Please try again later.
            </Box>
          )}
          {!loading &&
            productionOverviews &&
            productionOverviews.length > 0 && (
              <ProductionOverviewTable
                productionOverviews={productionOverviews}
                columnFilter={columnFilterObject}
                setColumnFilterObject={(
                  columnFilterObject: ColumnFilterObject
                ) => {
                  setColumnFilterObject(columnFilterObject);
                }}
                forecastSwitch={forecastSwitch}
                setForecastSwitch={(forecastSwitch: boolean) => {
                  setForecastSwitch(forecastSwitch);
                }}
              />
            )}
          {
            <Modal
              open={openColumnModal}
              onClose={() => setOpenColumnModal(false)}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={styles.columnFilterModal}>
                <ColumnPicker
                  initialFilters={columnFilterObject}
                  onClose={() => setOpenColumnModal(false)}
                  applyFilter={(columnFilterObject) => {
                    setColumnFilterObject(columnFilterObject);
                    setOpenColumnModal(false);
                  }}
                />
              </Box>
            </Modal>
          }
        </Grid>
      </Stack>
    </Box>
  );
}
