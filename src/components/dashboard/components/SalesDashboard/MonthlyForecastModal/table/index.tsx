import { TableHeader } from "@/utils/types";
import { formatNumberToComma } from "@/utils/utils";
import { CloudOutlined, StickyNote2Outlined } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ColorSelector } from "./ColorSelector";

const renderForecastItems = (value: string, forecastValue: string) => {
  return (
    <List dense disablePadding>
      <ListItem sx={{ justifyContent: "flex-start" }} disablePadding>
        <Stack direction="row" alignItems="center" gap={1}>
          <StickyNote2Outlined color="primary" width={1} height={1} />
          <ListItemText>
            <Typography color="primary" textAlign="right">
              {value}
            </Typography>
          </ListItemText>
        </Stack>
      </ListItem>
      <ListItem sx={{ justifyContent: "flex-start" }} disablePadding>
        <Stack direction="row" alignItems="center" gap={1}>
          <CloudOutlined color="secondary" width={1} height={1} />
          <ListItemText>
            <Typography color="secondary" textAlign="right">
              {forecastValue}
            </Typography>
          </ListItemText>
        </Stack>
      </ListItem>
    </List>
  );
};

const renderPartNumber = (data: any) => {
  return renderForecastItems(`Item ${data?.partNo}`, `Item ${data?.partNo}`);
};

const renderQty = (data: any) => {
  return renderForecastItems(
    `${data?.qty?.value ?? "XX"}`,
    `${data?.qty?.forecast ?? "XX"}`
  );
};

const renderValue = (value: string) => {
  return (
    <List dense disablePadding>
      <ListItem sx={{ justifyContent: "flex-start" }} disablePadding>
        <ListItemText>
          <Typography color="primary" textAlign="left">
            {value}
          </Typography>
        </ListItemText>
      </ListItem>
    </List>
  );
};

const renderPrice = (data: any, currencySign: string) => {
  return renderForecastItems(
    `${currencySign}${formatNumberToComma(data?.price?.value) ?? "XXXX"}`,
    `${currencySign}${formatNumberToComma(data?.price?.forecast) ?? "XXXX"}`
  );
};

type HigherValueResult = {
  type: "value" | "forecast" | null;
  difference: number | null;
};

export const getHigherValueAndDifference = (data: {
  value?: string;
  forecast?: string;
}): HigherValueResult => {
  const intValue = data.value != null ? parseInt(data.value, 10) : NaN;
  const intForecast = data.forecast != null ? parseInt(data.forecast, 10) : NaN;

  let result: HigherValueResult = {
    type: null,
    difference: null,
  };

  if (isNaN(intValue) && isNaN(intForecast)) {
    return result;
  }

  if (!isNaN(intValue) && !isNaN(intForecast)) {
    result.difference = Math.abs(intValue - intForecast);
  }

  if (isNaN(intValue) || intValue < intForecast) {
    result.type = "forecast";
    result.difference = isNaN(intValue) ? intForecast : result.difference;
  } else {
    result.type = "value";
    result.difference = isNaN(intForecast) ? intValue : result.difference;
  }

  return result;
};

const renderForecast = (forecast: string) => {
  return (
    <List dense disablePadding>
      <ListItem sx={{ justifyContent: "flex-start" }} disablePadding>
        <ListItemText>
          <Typography color="secondary" textAlign="left">
            {forecast}
          </Typography>
        </ListItemText>
      </ListItem>
    </List>
  );
};

const renderNetQty = (data: any, currencySign: string) => {
  const higherValue = getHigherValueAndDifference(data?.qty);
  if (higherValue.type === "value") {
    if (higherValue.difference !== null) {
      return renderValue(`${formatNumberToComma(higherValue.difference)}`);
    } else {
      return renderValue(`XX`);
    }
  } else if (higherValue.type === "forecast") {
    if (higherValue.difference !== null) {
      return renderForecast(`${formatNumberToComma(higherValue.difference)}`);
    } else {
      return renderForecast(`XX`);
    }
  } else {
    return renderValue(`XX`);
  }
};

const renderNetPrice = (data: any, currencySign: string) => {
  const higherValue = getHigherValueAndDifference(data?.price);
  if (higherValue.type === "value") {
    if (higherValue.difference !== null) {
      return renderValue(`${currencySign}${formatNumberToComma(higherValue.difference)}`);
    } else {
      return renderValue(`XX`);
    }
  } else if (higherValue.type === "forecast") {
    if (higherValue.difference !== null) {
      return renderForecast(`${currencySign}${formatNumberToComma(higherValue.difference)}`);
    } else {
      return renderForecast(`XX`);
    }
  } else {
    return renderValue(`XX`);
  }
};

export const getTableHeaders = (uniqueMonthYear: Set<any>, currencySign: string) => {
  const monthYearArray = Array.from(uniqueMonthYear);
  return [
    {
      title: "Month",
      name: "monthYear",
      align: "left",
      type: "text",
      filter: (filterValue, handleFilterChange) => (
        <Select
          value={filterValue}
          onChange={(e) => handleFilterChange("monthYear", e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Month Filter" }}
          size="small"
        >
          <MenuItem value="">All</MenuItem>
          {monthYearArray.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      title: "Part Number",
      name: "partNo",
      align: "left",
      type: "custom",
      width: "80px",
      filter: (filterValue, handleFilterChange) => (
        <TextField
          size="small"
          variant="standard"
          value={filterValue}
          onChange={(e) => handleFilterChange("partNo", e.target.value)}
          placeholder="Filter..."
          sx={{ width: "90%" }}
        />
      ),
      customCell: renderPartNumber,
    },
    {
      title: "Qty",
      name: "qty",
      align: "left",
      type: "custom",
      customCell: renderQty,
    },
    {
      title: "Net Price",
      name: "net_price",
      align: "left",
      type: "custom",
      customCell: (data: any) => renderPrice(data, currencySign),
    },
    {
      title: "Net Qty",
      name: "net_qty",
      align: "left",
      type: "custom",
      customCell: renderNetQty,
      filter: (_filterValue, handleFilterChange) => (
        <ColorSelector
          onSelect={({ value }) => {
            handleFilterChange("net_qty", value, "type");
          }}
        />
      ),
    },
    {
      title: "Dif Net Price",
      name: "net_price",
      align: "left",
      type: "custom",
      customCell: (data: any) => renderNetPrice(data, currencySign),
    },
  ] as TableHeader[];
};
