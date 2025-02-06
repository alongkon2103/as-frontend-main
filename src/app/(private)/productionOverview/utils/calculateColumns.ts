import { ColumnFilterObject } from "@/components/production_overview/column_picker";
import { t } from "i18next";
import {
  calculateDateRangeFromWeek,
  calculateWorkWeek,
  renderTableCells,
  validWeeks,
} from ".";

export function calculateColumns(
  columnFilter: ColumnFilterObject,
  workWeek: number
) {
  const columns = [];
  if (columnFilter.itemDetail.name === true) {
    columns.push({ name: "name", title: "Name", filteringEnabled: true });
  }
  if (columnFilter.itemDetail.assemblyPart === true) {
    columns.push({
      name: "assemblyPart",
      title: "Assembly Part",
      filteringEnabled: true,
    });
  }
  if (columnFilter.itemDetail.mcPart === true) {
    columns.push({
      name: "mcPart",
      title: "M/C Part",
      filteringEnabled: true,
    });
  }
  if (columnFilter.itemDetail.familyCode === true) {
    columns.push({
      name: "familyCode",
      title: "Family Code",
      filteringEnabled: true,
    });
  }
  if (columnFilter.itemDetail.price === true) {
    columns.push({
      name: "price",
      title: "Price",
      filteringEnabled: false,
    });
  }
  if (columnFilter.rawMaterial.name === true) {
    columns.push({
      name: "material",
      title: "Name",
      filteringEnabled: true,
    });
  }
  if (columnFilter.rawMaterial.stock === true) {
    columns.push({
      name: "stock",
      title: "Stock",
      filteringEnabled: false,
    });
  }
  if (columnFilter.itemStock.version === "FULL") {
    columns.push({ name: "firm", title: "Firm", filteringEnabled: false });
    columns.push({ name: "mc", title: "Mc'g", filteringEnabled: false });
    columns.push({
      name: "outsource",
      title: "Outsource",
      filteringEnabled: false,
    });
    columns.push({ name: "sp", title: "SP", filteringEnabled: false });
    columns.push({
      name: "semiFG",
      title: "Semi FG",
      filteringEnabled: false,
    });
    columns.push({ name: "assy", title: "Assy", filteringEnabled: false });
    columns.push({
      name: "packing",
      title: "Packing",
      filteringEnabled: false,
    });
    columns.push({ name: "fg", title: "FG", filteringEnabled: false });
  } else {
    columns.push({ name: "wip", title: "Wip", filteringEnabled: false });
    columns.push({ name: "fg", title: "FG", filteringEnabled: false });
  }
  if (columnFilter.itemCoverage.version === "5_WEEKS") {
    columns.push({
      name: "overdue",
      title: t("overdue"),
      filteringEnabled: true,
    });
    columns.push({
      name: calculateWorkWeek(workWeek % 52),
      title: t(`${calculateWorkWeek(workWeek % 52)}`),
      filteringEnabled: true,
    });
    columns.push({
      name: calculateWorkWeek((workWeek + 1) % 52),
      title: t(`${calculateWorkWeek((workWeek + 1) % 52)}`),
      filteringEnabled: true,
    });
    columns.push({
      name: calculateWorkWeek((workWeek + 2) % 52),
      title: t(`${calculateWorkWeek((workWeek + 2) % 52)}`),
      filteringEnabled: true,
    });
    columns.push({
      name: calculateWorkWeek((workWeek + 3) % 52),
      title: t(`${calculateWorkWeek((workWeek + 3) % 52)}`),
      filteringEnabled: true,
    });
    columns.push({
      name: calculateWorkWeek((workWeek + 4) % 52),
      title: t(`${calculateWorkWeek((workWeek + 4) % 52)}`),
      filteringEnabled: true,
    });
  } else if (columnFilter.itemCoverage.version === "10_WEEKS") {
    columns.push({
      name: "overdue",
      title: t("overdue"),
      filteringEnabled: true,
    });
    columns.push({
      name: calculateWorkWeek(workWeek),
      title: t(`${calculateWorkWeek(workWeek)}`),
      filteringEnabled: true,
    });
    columns.push({
      name: calculateWorkWeek((workWeek + 1) % 52),
      title: t(`${calculateWorkWeek((workWeek + 1) % 52)}`),
      filteringEnabled: true,
    });
    columns.push({
      name: calculateWorkWeek((workWeek + 2) % 52),
      title: t(`${calculateWorkWeek((workWeek + 2) % 52)}`),
      filteringEnabled: true,
    });
    columns.push({
      name: calculateWorkWeek((workWeek + 3) % 52),
      title: t(`${calculateWorkWeek((workWeek + 3) % 52)}`),
      filteringEnabled: true,
    });
    columns.push({
      name: calculateWorkWeek((workWeek + 4) % 52),
      title: t(`${calculateWorkWeek((workWeek + 4) % 52)}`),
      filteringEnabled: true,
    });
    columns.push({
      name: calculateWorkWeek((workWeek + 5) % 52),
      title: t(`${calculateWorkWeek((workWeek + 5) % 52)}`),
      filteringEnabled: true,
    });
    columns.push({
      name: calculateWorkWeek((workWeek + 6) % 52),
      title: t(`${calculateWorkWeek((workWeek + 6) % 52)}`),
      filteringEnabled: true,
    });
    columns.push({
      name: calculateWorkWeek((workWeek + 7) % 52),
      title: t(`${calculateWorkWeek((workWeek + 7) % 52)}`),
      filteringEnabled: true,
    });
    columns.push({
      name: calculateWorkWeek((workWeek + 8) % 52),
      title: t(`${calculateWorkWeek((workWeek + 8) % 52)}`),
      filteringEnabled: true,
    });
    columns.push({
      name: calculateWorkWeek((workWeek + 9) % 52),
      title: t(`${calculateWorkWeek((workWeek + 9) % 52)}`),
      filteringEnabled: true,
    });
  } else if (columnFilter.itemCoverage.version === "12_MONTHS") {
    columns.push({
      name: "overdue",
      title: t("overdue"),
      filteringEnabled: true,
    });
    let monthsData = renderTableCells(12);
    columns.push(...monthsData);
  } else if (columnFilter.itemCoverage.version === "6_MONTHS") {
    columns.push({
      name: "overdue",
      title: t("overdue"),
      filteringEnabled: true,
    });
    let monthsData = renderTableCells(6);
    columns.push(...monthsData);
  } else {
    columns.push({
      name: "overdue",
      title: t("overdue"),
      filteringEnabled: false,
    });
    columns.push({
      name: calculateWorkWeek(workWeek),
      title: t(
        `${calculateWorkWeek(workWeek)} (${calculateDateRangeFromWeek(
          workWeek
        )})`
      ),
      filteringEnabled: false,
    });
    columns.push({
      name: calculateWorkWeek((workWeek + 1) % 52),
      title: t(
        `${calculateWorkWeek(
          (workWeek + 1) % 52
        )} (${calculateDateRangeFromWeek((workWeek + 1) % 52)})`
      ),
      filteringEnabled: false,
    });
  }
  return columns;
}

export const calculateColumnBands = () => {
  return [
    {
      title: "Item Detail",
      name: "details",
      children: [
        { columnName: "name" },
        { columnName: "assemblyPart" },
        { columnName: "mcPart" },
        { columnName: "familyCode" },
        { columnName: "price" },
      ],
    },
    {
      title: "Raw Material",
      name: "rawMaterial",
      children: [{ columnName: "material" }, { columnName: "stock" }],
    },
    {
      title: "Item Stock",
      name: "stock",
      children: [
        { columnName: "firm" },
        { columnName: "mc" },
        { columnName: "outsource" },
        { columnName: "sp" },
        { columnName: "packing" },
        { columnName: "semiFG" },
        { columnName: "assy" },
        { columnName: "fg" },
        { columnName: "wip" },
      ],
    },
    {
      title: "Item Coverage",
      name: "coverage",
      children: [
        { columnName: "overdue" },
        { columnName: "0" },
        { columnName: "1" },
        { columnName: "2" },
        { columnName: "3" },
        { columnName: "4" },
        { columnName: "5" },
        { columnName: "6" },
        { columnName: "7" },
        { columnName: "8" },
        { columnName: "9" },
        { columnName: "10" },
        { columnName: "11" },
        ...validWeeks.map((columnNumber) => ({ columnName: columnNumber })),
      ],
    },
  ];
};
