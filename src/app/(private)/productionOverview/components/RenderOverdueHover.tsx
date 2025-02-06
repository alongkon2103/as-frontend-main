import { SaleTableCell } from "@/components/production_overview/sale_table_cell";
import { LightBackgroundTooltip } from "@/components/production_overview/tooltips/general";
import { ItemCoverageToolTips } from "@/components/production_overview/tooltips/item_coverage";
import { OverdueProps } from "@/store/features/ProductionOverview/ProductionOverviewSlice";
import { Button } from "@mui/material";
import React from "react";
import { getBackgroundColor, getTextColor, showErrorIcon } from "./utils";
import WarningFillIcon from "@mui/icons-material/Warning";
import { redBackground, redText } from "@/utils/utils";
import { showBoat } from "../utils";

function RenderOverdueHover({
  overdue,
  forecast,
  stockQty,
}: {
  overdue: OverdueProps;
  forecast: boolean;
  stockQty: number;
}) {
  const calculateWarning = (overdue: OverdueProps) => {
    return overdue.alertSymbol === 1;
  };

  const renderOverdue = (overdue: OverdueProps) => {
    if (overdue?.hover.length > 0) {
      return (
        <LightBackgroundTooltip
          minWidth={940}
          title={<ItemCoverageToolTips itemCoverageHoverData={overdue.hover} />}
        >
          <Button sx={{ padding: 0, width: "100%" }}>
            <SaleTableCell
              backgroundColor={getBackgroundColor(overdue)}
              numerator={overdue.coQty > 0 ? overdue.quantity : "-"}
              denominator={overdue.coQty > 0 ? overdue.coQty : "-"}
              numeratorColor={getTextColor(overdue)}
              denominatorColor={overdue.coQty > 0 ? "#225FA6" : "grey"}
              iconType="default"
              forecast={forecast}
              forecastQty={0}
              specialIcon={
                getBackgroundColor(overdue) === redBackground &&
                calculateWarning(overdue) && (
                  <WarningFillIcon
                    style={{ color: redText, marginLeft: "10px" }}
                  />
                )
              }
              boatIcon={showBoat(overdue?.hover)}
            />
          </Button>
        </LightBackgroundTooltip>
      );
    } else {
      return (
        <>
          <SaleTableCell
            backgroundColor={getBackgroundColor(overdue)}
            numerator={overdue?.coQty > 0 ? overdue?.quantity : "-"}
            denominator={overdue?.coQty > 0 ? overdue?.coQty : "-"}
            numeratorColor={getTextColor(overdue)}
            denominatorColor={overdue?.coQty > 0 ? "#225FA6" : "grey"}
            iconType="default"
            forecast={forecast}
            forecastQty={overdue?.quantity}
          />
        </>
      );
    }
  };
  return <div>{renderOverdue(overdue)}</div>;
}

export default RenderOverdueHover;
