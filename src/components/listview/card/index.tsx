import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Link,
} from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import {
  getDetailText,
  getProblemStyle,
  getStopStyles,
  getViewDetailStyle,
  getInputStyle,
  getAccordionLength,
  getRunningStyles,
  getIdleStyles,
  getOffStyles,
} from "./styles";

export interface ListViewCardProps {
  factory?: string;
  machineName: string;
  machineLabel: string;
  problem?: string;
  status: string;
  spindleLoad?: number;
  spindleRunTime?: number;
  spindleSpeed?: number;
}

export const ListViewCard: React.FC<ListViewCardProps> = ({
  factory,
  machineName,
  machineLabel,
  problem,
  status,
  spindleLoad,
  spindleRunTime,
  spindleSpeed,
}: ListViewCardProps) => {
  const stop_styles = getStopStyles();
  const running_style = getRunningStyles();
  const idle_style = getIdleStyles();
  const off_style = getOffStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };
  let styles: any = {};
  switch (status) {
    case "OFF":
      styles = off_style;
      break;
    case "IDLE":
      styles = idle_style;
      break;
    case "RUN":
      styles = running_style;
      break;
    case "STOP":
      styles = stop_styles;
      break;
    default:
      styles = off_style;
      break;
  }
  const handleClick = async () => {
    const url = `/operator?machine=${machineName}${
      factory ? `&factory=${factory}` : ""
    }`;
    window.open(url, "_blank");
  };

  return (
    <Accordion
      data-testid="listview-card"
      square={true}
      sx={getAccordionLength()}
      expanded={expanded}
      onChange={handleChange}
      elevation={0}
    >
      <AccordionSummary
        expandIcon={<ArrowDropDownRoundedIcon sx={{ color: styles.color }} />}
        sx={{
          borderRadius: "10px",
          borderBottomLeftRadius: expanded ? "0px" : "10px",
          borderBottomRightRadius: expanded ? "0px" : "10px",
          backgroundColor: styles.backgroundColor,
        }}
      >
        <Box sx={{ color: styles.color }}>
          <Typography sx={styles.text_header}>{machineName}</Typography>
          {machineLabel && (
            <Typography sx={styles.text_description}>{machineLabel}</Typography>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {problem && (
          <Typography sx={getProblemStyle()}>
            Problem:{" "}
            <Typography component="span" sx={getInputStyle()}>
              {problem}
            </Typography>
          </Typography>
        )}

        {!machineName.startsWith("CMM") && (
          <>
            <Typography sx={getDetailText()}>
              Spindle Load:{" "}
              <Typography component="span" sx={getInputStyle()}>
                {spindleLoad !== undefined ? `${spindleLoad} %` : "0 %"}
              </Typography>
            </Typography>

            <Typography sx={getDetailText()}>
              Spindle Run Time:{" "}
              <Typography component="span" sx={getInputStyle()}>
                {spindleRunTime !== undefined
                  ? `${spindleRunTime} hrs`
                  : "0 hrs"}
              </Typography>
            </Typography>

            <Typography sx={getDetailText()}>
              Spindle Speed:{" "}
              <Typography component="span" sx={getInputStyle()}>
                {spindleSpeed !== undefined ? `${spindleSpeed} rpm` : "0 rpm"}
              </Typography>
            </Typography>
          </>
        )}

        <Link component="button" sx={getViewDetailStyle} onClick={handleClick}>
          View Details
        </Link>
      </AccordionDetails>
    </Accordion>
  );
};

export default ListViewCard;
