"use client";
import GaugeComponent from "react-gauge-component";

import { getThemedStyles } from "./styles";

function GaugeChart({ value }: { value: number }) {
  const styles = getThemedStyles();
  let arrowColor;
  if (value < 25) {
    arrowColor = "#D32F2F";
  }
  if (value >= 25 && value < 50) {
    arrowColor = "#DE6F18";
  }
  if (value >= 50 && value < 75) {
    arrowColor = "#E9AF00";
  }
  if (value >= 75 && value < 100) {
    arrowColor = "#88BD20";
  }
  if (value >= 100) {
    arrowColor = "#27CA40";
  }
  return (
    <GaugeComponent
      style={{
        width: "55%",
      }}
      id="gauge-component4"
      type="semicircle"
      arc={{
        gradient: true,
        width: 0.15,
        padding: 0,
        subArcs: [
          {
            limit: 0,
            color: "#D32F2F",
            showTick: true,
          },
          {
            limit: 25,
            color: "#DE6F18",
            showTick: true,
          },
          {
            limit: 50,
            color: "#E9AF00",
            showTick: true,
          },
          {
            limit: 75,
            color: "#88BD20",
            showTick: true,
          },
          {
            limit: 100,
            color: "#27CA40",
            showTick: true,
          },
        ],
      }}
      value={value}
      pointer={{ type: "arrow", elastic: false, color: arrowColor }}
      labels={{
        valueLabel: {
          style:{
            fill: "#000000"
          }
        }
      }}
    />
  );
}

export default GaugeChart;
