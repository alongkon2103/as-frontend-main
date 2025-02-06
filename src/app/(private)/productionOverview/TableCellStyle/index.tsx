import { SaleTableCell } from "@/components/production_overview/sale_table_cell";
import { LightBackgroundTooltip } from "@/components/production_overview/tooltips/general";
import {
  calculateWipStopQty,
  calculateWip,
  ItemStockWIPCompactToolTip,
  ItemStockOutsourceToolTip,
  ItemStockFullToolTip,
} from "@/components/production_overview/tooltips/item_stock";
import {
  RawMaterialNameToolTip,
  RawMaterialOpenOrderToolTip,
} from "@/components/production_overview/tooltips/raw_materials";
import { redBackground, redText } from "@/utils/utils";
import { TableCell, Button } from "@mui/material";
import RenderCoverageHovers from "../components/RenderCoverageHovers";
import RenderOverdueHover from "../components/RenderOverdueHover";
import RenderReadyToShip from "../components/RenderReadyToShip";
import { calculateWorkWeek, validWeeks, valueColumns } from "../utils";

export interface TableCellStyleProps {
  props: any;
  forecastSwitch: boolean;
  workWeek: number;
  isReadyToShip: boolean;
}

const TableCellStyle: React.FC<TableCellStyleProps> = ({
  props,
  forecastSwitch,
  workWeek,
  isReadyToShip,
}: TableCellStyleProps) => {
  if (valueColumns.includes(props.column.name)) {
    return (
      <TableCell
        sx={{ marginLeft: "3px", borderBottom: "1px solid rgba(0,0,0,0.15)" }}
        {...props}
      >
        {props.value ?? "-"}
      </TableCell>
    );
  } else if (props.column.name === "material") {
    if (props.value) {
      if (props.value?.hover?.length > 0) {
        return (
          <TableCell
            sx={{
              borderLeft: "1px solid rgba(0,0,0,0.15)",
              marginLeft: "3px",
              paddingLeft: "15px !important",
            }}
            {...props}
          >
            <LightBackgroundTooltip
              minWidth={200}
              title={
                <RawMaterialNameToolTip rawMaterials={props.value.hover} />
              }
            >
              <Button
                variant="text"
                sx={{
                  color: "rgba(0, 0, 0, 0.87)",
                  justifyContent: "left",
                  padding: 0,
                  textDecoration: "underline",
                }}
              >
                {props.value.name}
              </Button>
            </LightBackgroundTooltip>
          </TableCell>
        );
      } else {
        return (
          <TableCell
            sx={{
              borderLeft: "1px solid rgba(0,0,0,0.15)",
              marginLeft: "3px",
              paddingLeft: "15px",
            }}
            {...props}
          >
            {props.value.name || "-"}{" "}
          </TableCell>
        );
      }
    } else {
      return (
        <TableCell
          sx={{
            borderLeft: "1px solid rgba(0,0,0,0.15)",
            marginLeft: "3px",
            paddingLeft: "15px",
          }}
          {...props}
        >
          {"-"}
        </TableCell>
      );
    }
  } else if (props.column.name === "stock") {
    if (props.value && props.value.hover.length) {
      return (
        <TableCell>
          <LightBackgroundTooltip
            minWidth={800}
            title={
              <RawMaterialOpenOrderToolTip
                rawMaterialOpenOrders={props.value.hover}
              />
            }
          >
            <Button
              variant="text"
              sx={{
                color: "rgba(0, 0, 0, 0.87)",
                justifyContent: "left",
                padding: 0,
                textDecoration: "underline",
              }}
            >
              {props.value.quantity}
            </Button>
          </LightBackgroundTooltip>
        </TableCell>
      );
    } else {
      return (
        <TableCell sx={{ marginLeft: "3px" }} {...props}>
          {props.value?.quantity ?? "-"}
        </TableCell>
      );
    }
  } else if (props.column.name === "wip") {
    return (
      <TableCell
        sx={{
          borderLeft: "1px solid rgba(0,0,0,0.15)",
          paddingLeft: "0px !important",
        }}
        {...props}
      >
        {calculateWipStopQty(props.value) > 0 ? (
          <LightBackgroundTooltip
            minWidth={400}
            title={<ItemStockWIPCompactToolTip itemStocks={props.value} />}
          >
            <Button
              style={{
                padding: "0px",
                border: "none",
                width: "100%",
                textDecoration: "underline",
              }}
            >
              <SaleTableCell
                backgroundColor={redBackground}
                numerator={calculateWip(props.value)}
                denominator={calculateWipStopQty(props.value)}
                numeratorColor={"black"}
                denominatorColor={redText}
                iconType={"stopped"}
              />
            </Button>
          </LightBackgroundTooltip>
        ) : (
          <LightBackgroundTooltip
            minWidth={500}
            title={<ItemStockWIPCompactToolTip itemStocks={props.value} />}
          >
            <Button
              sx={{
                color: "rgba(0, 0, 0, 0.87)",
                justifyContent: "left",
                textDecoration: "underline",
              }}
            >
              {calculateWip(props.value)}
            </Button>
          </LightBackgroundTooltip>
        )}
      </TableCell>
    );
  } else if (props.column.name === "fg") {
    return (
      <TableCell sx={{ paddingLeft: "0px !important" }} {...props}>
        <SaleTableCell
          backgroundColor={"none"}
          numerator={props.value ? props.value.quantity : "-"}
          denominator={props.value ? props.value.safetyStock : "-"}
          numeratorColor={"black"}
          underline={false}
          denominatorColor={
            props.value?.safetyStock > props.value?.quantity
              ? "red"
              : "rgba(0, 0, 0, 0.38)"
          }
          iconType={"SS"}
        />
      </TableCell>
    );
  } else if (
    ["firm", "mc", "outsource", "sp", "packing", "semiFG", "assy"].includes(
      props.column.name
    )
  ) {
    if (props.value) {
      if (props.value.hasOwnProperty("hover") && props.value.hover.length > 0) {
        return (
          <TableCell
            sx={{
              borderLeft:
                props.column.name === "firm"
                  ? "1px solid rgba(0,0,0,0.15)"
                  : "none",
              paddingLeft: "0 !important",
            }}
            {...props}
          >
            <LightBackgroundTooltip
              minWidth={500}
              title={
                props.column.name === "outsource" ? (
                  <ItemStockOutsourceToolTip itemStocks={props.value.hover} />
                ) : (
                  <ItemStockFullToolTip itemStocks={props.value.hover} />
                )
              }
            >
              {props.value.stopQty > 0 ? (
                <Button
                  style={{
                    padding: "0px",
                    border: "none",
                    width: "100%",
                    textDecoration: "underline",
                  }}
                >
                  <SaleTableCell
                    backgroundColor={redBackground}
                    numerator={props.value.quantity}
                    denominator={props.value.stopQty}
                    numeratorColor={"black"}
                    denominatorColor={redText}
                    iconType="stopped"
                  />
                </Button>
              ) : (
                <Button
                  variant="text"
                  sx={{
                    color: "rgba(0, 0, 0, 0.87)",
                    display: "flex",
                    justifyContent: "left",
                    paddingLeft: "10px",
                    textDecoration: "underline",
                  }}
                >
                  {props.value.quantity}
                </Button>
              )}
            </LightBackgroundTooltip>
          </TableCell>
        );
      } else {
        if (props.value.stopQty > 0) {
          return (
            <TableCell
              sx={{
                borderLeft:
                  props.column.name === "firm"
                    ? "1px solid rgba(0,0,0,0.15)"
                    : "none",
                padding: "0px !important",
              }}
              {...props}
            >
              <Button style={{ padding: "0px", border: "none", width: "100%" }}>
                <SaleTableCell
                  backgroundColor={redBackground}
                  numerator={props.value?.quantity}
                  denominator={props.value?.stopQty}
                  numeratorColor={"black"}
                  denominatorColor={redText}
                  iconType="stopped"
                />
              </Button>
            </TableCell>
          );
        } else {
          return (
            <TableCell
              sx={{
                borderLeft:
                  props.column.name === "firm"
                    ? "1px solid rgba(0,0,0,0.15)"
                    : "none",
                marginLeft: "3px",
              }}
              {...props}
            >
              {props.value.quantity}
            </TableCell>
          );
        }
      }
    } else {
      return (
        <TableCell
          sx={{
            borderLeft:
              props.column.name === "firm"
                ? "1px solid rgba(0,0,0,0.15)"
                : "none",
            marginLeft: "3px",
          }}
          {...props}
        >
          -
        </TableCell>
      );
    }
  } else if (props.column.name === "overdue") {
    if (isReadyToShip) {
      return (
        <TableCell
          sx={{
            borderLeft: "1px solid rgba(0,0,0,0.15)",
            paddingLeft: "0px !important",
          }}
          {...props}
        >
          <RenderReadyToShip
            item={props.value}
            rowIndex={props.tableRow.rowId}
            itemIndex={0}
          />
        </TableCell>
      );
    } else {
      const stockQty = props.row.stockQty;
      return (
        <TableCell
          sx={{
            borderLeft: "1px solid rgba(0,0,0,0.15)",
            paddingLeft: "0px !important",
          }}
          {...props}
        >
          <RenderOverdueHover
            overdue={props.value}
            forecast={forecastSwitch}
            stockQty={stockQty}
          />
        </TableCell>
      );
    }
  } else if (
    ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"].includes(
      props.column.name
    )
  ) {
    const stockQty = props.row.stockQty;
    return (
      <TableCell sx={{ paddingLeft: "0px !important" }} {...props}>
        <RenderCoverageHovers
          item={props.value}
          forecast={forecastSwitch}
          stockQty={stockQty}
        />
      </TableCell>
    );
  } else if (validWeeks.includes(props.column.name)) {
    const stockQty = props.row.stockQty;
    if (isReadyToShip) {
      return (
        <TableCell
          sx={{
            borderLeft: "1px solid rgba(0,0,0,0.15)",
            paddingLeft: "0px !important",
          }}
          {...props}
        >
          <RenderReadyToShip
            item={props.value}
            rowIndex={props.tableRow.rowId}
            itemIndex={
              props.column.name === calculateWorkWeek(workWeek % 52) ? 1 : 2
            }
          />
        </TableCell>
      );
    } else {
      return (
        <TableCell
          sx={{
            borderLeft: "1px solid rgba(0,0,0,0.15)",
            paddingLeft: "0px !important",
          }}
          {...props}
        >
          <RenderCoverageHovers
            item={props.value}
            forecast={forecastSwitch}
            stockQty={stockQty}
          />
        </TableCell>
      );
    }
  }
};

export default TableCellStyle;
