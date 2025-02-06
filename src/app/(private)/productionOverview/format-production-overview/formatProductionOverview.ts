import { RawMaterialProps } from "@/store/features/ProductionOverview/ProductionOverviewSlice";

function flattenRawMaterials(
  rawMaterials: RawMaterialProps[],
  name: string | number
) {
  let flattenedRawMaterials: any[] = [];
  rawMaterials.forEach((rawMaterial) => {
    const flattenedMaterial = {
      name: `${name} (${rawMaterial.lv}${rawMaterial.sequence})` || "-",
      assemblyPart: rawMaterial.assemblyPart || "-",
      sequence: rawMaterial.sequence || "-",
      mcPart: rawMaterial.mcPart || "-",
      material: {
        name: rawMaterial.material || "-",
        hover: rawMaterial.hover,
      },
      stockQty: rawMaterial.stock.quantity ?? 0,
      stock: rawMaterial.stock,
      firm: rawMaterial.itemStock.firm,
      mc: rawMaterial.itemStock.mc,
      outsource: rawMaterial.itemStock.outsource,
      sp: rawMaterial.itemStock.sp,
      semiFG: rawMaterial.itemStock.semiFG,
      assy: rawMaterial.itemStock.assy,
      packing: rawMaterial.itemStock.packing,
      fg: rawMaterial.itemStock.fg,
      itemStock: rawMaterial.itemStock,
      wip: rawMaterial.itemStock,
      hover: rawMaterial.hover,
      rawMaterials: rawMaterial.rawMaterials,
      parent: name,
    };
    flattenedRawMaterials.push(flattenedMaterial);
    if (rawMaterial.rawMaterials && rawMaterial.rawMaterials.length > 0) {
      const nestedMaterials = flattenRawMaterials(
        rawMaterial.rawMaterials,
        `${name} (${rawMaterial.lv}${rawMaterial.sequence})`
      );
      flattenedRawMaterials.push(...nestedMaterials);
    }
  });

  return flattenedRawMaterials;
}

export const createFlatData = (
  productionOverviews: any,
  readyToShip: boolean
) => {
  let flattenedData: any[] = [];
  productionOverviews.forEach((overview: any) => {
    const itemDetails = overview.itemDetails;
    const itemCoverage = overview.itemCoverage[0];
    let dateRangesObj: { [key: string]: any } = {};
    itemCoverage.dateRanges.forEach((item: any) => {
      const week = item?.workweek !== null;
      let key;
      if (week) {
        key =
          item?.workweek.toString().length > 1
            ? "WK" + item?.workweek?.toString()
            : "WK0" + item?.workweek?.toString();
      } else {
        key = item["sequent"];
      }
      dateRangesObj[key] = item;
    });
    const flattenedItem = {
      name: itemDetails.name || "-",
      blockStatus: itemDetails.blockStatus,
      assemblyPart: itemDetails.assemblyPart || "-",
      mcPart: itemDetails.mcPart || "-",
      familyCode: itemDetails.familyCode || "-",
      price: itemDetails.price || "-",
      parent: null,
      material: {
        name: itemDetails.material,
        hover: [],
      },
      stockQty: itemDetails.stock.quantity ?? 0,
      stock: itemDetails.stock,
      firm:
        itemDetails.rawMaterials.length > 0
          ? itemDetails.rawMaterials[0]?.itemStock.firm
          : null,
      mc:
        itemDetails.rawMaterials.length > 0
          ? itemDetails.rawMaterials[0]?.itemStock.mc
          : null,
      outsource:
        itemDetails.rawMaterials.length > 0
          ? itemDetails.rawMaterials[0]?.itemStock.outsource
          : null,
      sp:
        itemDetails.rawMaterials.length > 0
          ? itemDetails.rawMaterials[0]?.itemStock.sp
          : null,
      semiFG: !readyToShip
        ? itemDetails.rawMaterials.length > 0
          ? itemDetails.rawMaterials[0]?.itemStock.semiFG
          : null
        : null,
      assy:
        itemDetails.rawMaterials.length > 0
          ? itemDetails.rawMaterials[0]?.itemStock.assy
          : null,
      packing:
        itemDetails.rawMaterials.length > 0
          ? itemDetails.rawMaterials[0]?.itemStock.packing
          : null,
      fg:
        itemDetails.rawMaterials.length > 0
          ? itemDetails.rawMaterials[0]?.itemStock.fg
          : null,
      wip:
        itemDetails.rawMaterials.length > 0
          ? itemDetails.rawMaterials[0]?.itemStock
          : null,
      overdue: itemCoverage.overdue,
      ...dateRangesObj,
    };

    const rawMaterial = readyToShip
      ? flattenRawMaterials(itemDetails.rawMaterials, itemDetails.name)
      : [];

    flattenedData.push(flattenedItem, ...rawMaterial);
  });
  return flattenedData;
};

export const convertName = (name: string) => {
  return name;
};
