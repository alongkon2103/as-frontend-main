import React from "react";
import { DateRangeProps } from "@/store/features/ProductionOverview/ProductionOverviewSlice";
import { LightBackgroundTooltip } from "@/components/production_overview/tooltips/general";
import { ItemCoverageToolTips } from "@/components/production_overview/tooltips/item_coverage";
import { SaleTableCell } from "@/components/production_overview/sale_table_cell";
import { Button } from "rsuite";
import { getBackgroundColor, getTextColor } from "./utils";
import WarningFillIcon from "@mui/icons-material/Warning";
import { redBackground, redText } from "@/utils/utils";
import { showBoat } from "../utils";

export interface TopLevelRowProps {
  item: DateRangeProps;
  forecast: boolean;
  stockQty: number;
}

function RenderCoverageHovers({ item, forecast, stockQty }: TopLevelRowProps) {
  const calculateWarning = (item: DateRangeProps) => {
    return item.alertSymbol === 1;
  };

  const renderHovers = (
    item: DateRangeProps,
    forecast: boolean,
    stockQty: number
  ) => {
    if (item) {
      if (item.hover.length > 0) {
        return (
          <LightBackgroundTooltip
            minWidth={940}
            title={<ItemCoverageToolTips itemCoverageHoverData={item.hover} />}
          >
            <Button
              style={{
                padding: "0px",
                border: "none",
                width: "100%",
                borderRadius: "0px",
              }}
            >
              <SaleTableCell
                backgroundColor={getBackgroundColor(item)}
                numerator={item.coQty > 0 ? item.quantity : "-"}
                denominator={item.coQty > 0 ? item.coQty : "-"}
                numeratorColor={getTextColor(item)}
                denominatorColor={item?.coQty > 0 ? "#225FA6" : "grey"}
                iconType="default"
                forecast={forecast}
                forecastQty={item.forecastQty}
                specialIcon={
                  getBackgroundColor(item) === redBackground &&
                  calculateWarning(item) && (
                    <WarningFillIcon
                      style={{ color: redText, marginLeft: "10px" }}
                    />
                  )
                }
                boatIcon={showBoat(item?.hover)}
              />
            </Button>
          </LightBackgroundTooltip>
        );
      }
    }
    return (
      <SaleTableCell
        backgroundColor={getBackgroundColor(item)}
        numerator={item?.coQty > 0 ? item.quantity : "-"}
        denominator={item?.coQty > 0 ? item.coQty : "-"}
        numeratorColor={getTextColor(item)}
        denominatorColor={item?.coQty > 0 ? "#225FA6" : "grey"}
        iconType="default"
        forecast={forecast}
        forecastQty={item?.forecastQty}
      />
    );
  };

  return <div>{renderHovers(item, forecast, stockQty)}</div>;
}

export default RenderCoverageHovers;
