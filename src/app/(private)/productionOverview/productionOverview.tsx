/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */

import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import {
  TreeDataState,
  CustomTreeData,
  FilteringState,
  IntegratedFiltering,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableBandHeader,
  TableHeaderRow,
  TableTreeColumn,
  TableFilterRow,
  TableFixedColumns,
} from "@devexpress/dx-react-grid-material-ui";
import { createFlatData } from "./format-production-overview/formatProductionOverview";

import { CircularProgress, Box, Chip } from "@mui/material";
import dayjs from "dayjs";

import TopLevelHeaderDetails from "@/components/production_overview/table_headers/item_details";
import TopLevelHeaderRawMaterial from "@/components/production_overview/table_headers/raw_meterial";
import TopLevelHeaderStock from "@/components/production_overview/table_headers/item_stock";
import TopLevelHeaderCoverage from "@/components/production_overview/table_headers/item_coverage";
import { calculateWorkWeek } from "./utils";
import { filterCell, columnFilterExtensions } from "./Filters";
import {
  calculateColumnBands,
  calculateColumns,
} from "./utils/calculateColumns";
import { tableHeaderRowCellStyle } from "./TableHeaders";
import TableCellStyle from "./TableCellStyle";
import { ColumnFilterObject } from "@/components/production_overview/column_picker";
import { ProductionOverviewProps } from "@/store/features/ProductionOverview/ProductionOverviewSlice";
import { Block } from "@mui/icons-material";

const getChildRows = (row: any, rootRows: any) => {
  const childRows = rootRows.filter(
    (r: any) => r.parent === (row ? row.name : null)
  );
  return childRows.length ? childRows : null;
};

export interface ProductionOverviewTableProps {
  productionOverviews: ProductionOverviewProps[];
  columnFilter: ColumnFilterObject;
  setColumnFilterObject: (columnfilter: ColumnFilterObject) => void;
  forecastSwitch: boolean;
  setForecastSwitch: (forecast: boolean) => void;
}

const ProductionOverviewTable: React.FC<ProductionOverviewTableProps> = ({
  productionOverviews,
  columnFilter,
  setColumnFilterObject,
  forecastSwitch,
  setForecastSwitch,
}: ProductionOverviewTableProps) => {
  const [columns, setColumns] = useState<any[]>([]);
  const [columnBands] = useState(calculateColumnBands());
  const [loading, setLoading] = useState(false);

  const workWeek = dayjs().week();
  const [filteringColumnExtensions] = useState(columnFilterExtensions());

  useEffect(() => {
    if (data.length > 125) {
      setLoading(true);
    }
    setColumns(calculateColumns(columnFilter, workWeek));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [columnFilter, workWeek, setColumns]);

  const [data, setData] = useState<any[]>([]);
  const isReadyToShip = columnFilter?.itemCoverage?.version === "2_WEEKS";

  useEffect(() => {
    const md = createFlatData(productionOverviews, !isReadyToShip);

    setData(md);
  }, [productionOverviews, columnFilter]);

  const [tableColumnExtensions] = useState(
    [
      { columnName: "name", width: 320 },
      { columnName: "assemblyPart", width: 140 },
      { columnName: "mcPart", width: 140 },
      { columnName: "familyCode", width: 140 },
      { columnName: "material", width: 140 },
      {
        columnName: "overdue",
        width: isReadyToShip ? 875 : null,
      },
      isReadyToShip
        ? {
            columnName: calculateWorkWeek(workWeek % 52),
            width: isReadyToShip ? 875 : null,
          }
        : null,
      isReadyToShip
        ? {
            columnName: calculateWorkWeek((workWeek + 1) % 52),
            width: isReadyToShip ? 875 : null,
          }
        : null,
    ].filter(Boolean)
  );

  const [defaultExpandedRowIds] = useState([]);

  const tableCellStyle = (props: any) => {
    return (
      <TableCellStyle
        props={props}
        isReadyToShip={isReadyToShip}
        forecastSwitch={forecastSwitch}
        workWeek={workWeek}
      />
    );
  };

  const CustomContent = ({ column, row, children, ...restProps }: any) => {
    let blockStatus = "0";
    try {
      const item = productionOverviews.find((item) => item.itemDetails.name === children);
      if (item) { 
        blockStatus = item.itemDetails.blockStatus;
      }
    } catch (e) {
      blockStatus = "0";
    }
    
    return (
      <TableTreeColumn.Content
        column={column}
        row={row}
        {...restProps}
        ContentProps={{
          ...restProps.ContentProps,
        }}
      >
        {children}{" "}
        {blockStatus === "1" && (
          <Chip
            size="small"
            label="Block"
            icon={<Block color="error" />}
            sx={{
              marginLeft: "1vh",
              backgroundColor: "#FDEDED",
              color: "#D32F2F",
              fontWeight: "bold",
            }}
          />
        )}
      </TableTreeColumn.Content>
    );
  };

  const tableHeaderCellStyle = (props: any) => {
    if (props.column) {
      if (props.column.title === "Item Detail") {
        return (
          <TopLevelHeaderDetails
            itemDetailCompact={columnFilter.itemDetail.version !== "COMPACT"}
            columnFilterObject={columnFilter}
            props={props}
            handleItemDetailCompact={(full) => {
              if (data.length > 125) {
                setLoading(true);
              }
              if (full) {
                setColumnFilterObject({
                  ...columnFilter,
                  itemDetail: {
                    self: true,
                    name: true,
                    assemblyPart: true,
                    mcPart: true,
                    familyCode: true,
                    price: isReadyToShip ? false : true,
                    version: "FULL",
                  },
                });
              } else {
                setColumnFilterObject({
                  ...columnFilter,
                  itemDetail: {
                    self: true,
                    name: true,
                    assemblyPart: false,
                    mcPart: false,
                    familyCode: false,
                    price: false,
                    version: "COMPACT",
                  },
                });
              }
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            }}
          />
        );
      } else if (props.column.title === "Raw Material") {
        return <TopLevelHeaderRawMaterial columnFilterObject={columnFilter} />;
      } else if (props.column.title === "Item Stock") {
        return (
          <TopLevelHeaderStock
            itemStockCompact={columnFilter.itemStock.version !== "COMPACT"}
            columnFilterObject={columnFilter}
            handleItemStockCompact={(full) => {
              if (data.length > 125) {
                setLoading(true);
              }
              if (full) {
                setColumnFilterObject({
                  ...columnFilter,
                  itemStock: {
                    self: true,
                    version: "FULL",
                  },
                });
              } else {
                setColumnFilterObject({
                  ...columnFilter,
                  itemStock: {
                    self: true,
                    version: "COMPACT",
                  },
                });
              }
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            }}
          />
        );
      } else if (props.column.title === "Item Coverage") {
        return (
          <TopLevelHeaderCoverage
            itemCoverageDropdown={columnFilter.itemCoverage.version}
            forecastSwitch={forecastSwitch}
            columnFilterObject={columnFilter}
            handleItemCoverageDropdown={(value) => {
              setColumnFilterObject({
                ...columnFilter,
                itemCoverage: {
                  ...columnFilter.itemCoverage,
                  version: value,
                },
              });
            }}
            handleForecastSwitch={(value) => setForecastSwitch(value)}
          />
        );
      }
    }
  };

  const filterColumns = columns.map(({ filteringEnabled, name }) => ({
    filteringEnabled,
    columnName: name,
  }));

  const getRowId = (row: any) => row.name;

  return (
    <Box>
      <Paper
        sx={{
          marginTop: "25px",
          marginLeft: "1vw",
          "& td": {
            padding: "0px 0px 0px 10px",
            borderLeft: "1px solid rgba(0,0,0,0.15)",
          },
          maxWidth: "2000px",
          overflow: "auto",
          border: "none",
          boxShadow: "none",
        }}
      >
        {loading && (
          <Box
            sx={{
              margin: "1vw",
              padding: "15px",
              border: "1px solid rgba(0,0,0,0.15)",
            }}
          >
            <CircularProgress size={15} sx={{ marginRight: 3 }} />
            Rerendering huge amounts of data, please wait...
          </Box>
        )}
        {!loading && (
          <Grid rows={data} columns={columns} getRowId={getRowId}>
            <TreeDataState defaultExpandedRowIds={defaultExpandedRowIds} />
            <CustomTreeData getChildRows={getChildRows} />
            <FilteringState
              defaultFilters={[]}
              columnExtensions={filterColumns}
            />
            <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
            <Table
              columnExtensions={tableColumnExtensions}
              cellComponent={tableCellStyle}
            />
            <TableHeaderRow cellComponent={tableHeaderRowCellStyle} />
            <TableBandHeader
              columnBands={columnBands}
              cellComponent={tableHeaderCellStyle}
            />
            <TableFilterRow cellComponent={filterCell} />
            <TableTreeColumn for="name" contentComponent={CustomContent} />
            <TableFixedColumns
              leftColumns={[
                "name",
                "assemblyPart",
                "mcPart",
                "familyCode",
                "price",
              ]}
            />
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default ProductionOverviewTable;
