"use client";

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface BaseItemStockHoverProps {
  job: string;
  suffix: number;
  problem: string;
  stopQty: number;
  passQty: number;
}

export interface BaseItemStockProps {
  quantity: number;
  stopQty: number;
  hover: BaseItemStockHoverProps[];
}

export interface OutsourceHoverProps {
  po: string;
  line: number;
  supplier: string;
  orderDate: string; // date string
  dueDate: string; // date string
  qty: number;
}

export interface OutsourceProps {
  quantity: number;
  stopQty: number;
  hover: OutsourceHoverProps[];
}

export interface ItemStockProps {
  firm: BaseItemStockProps;
  mc: BaseItemStockProps;
  outsource: OutsourceProps;
  sp: BaseItemStockProps;
  semiFG: {
    quantity: number;
  };
  assy: BaseItemStockProps;
  packing: BaseItemStockProps;
  fg: {
    quantity: number;
    safetyStock: number;
  };
}

export interface RawMaterialStockHoverProps {
  po: string;
  line: number;
  supplier: string;
  orderDate: string; // date string
  dueDate: string; // date string
  qty: number;
}

export interface RawMaterialHoverProps {
  rawMaterial: string;
  qty: number;
}

export interface RawMaterialProps {
  lv: number;
  sequence: number;
  mcPart: string;
  assemblyPart: string;
  material: string;
  stock: {
    quantity: number;
    openOrderQty: number;
    hover: RawMaterialStockHoverProps[];
  };
  itemStock: ItemStockProps;
  rawMaterials: RawMaterialProps[];
  hover: RawMaterialHoverProps[];
}

export interface ItemDetailProps {
  name: string;
  assemblyPart: string;
  familyCode: string;
  price: string;
  rawMaterials: RawMaterialProps[];
  mcPart: string;
  blockStatus: string;
}

export interface DateRangeHoverProps {
  assemblyPart: string;
  co: string;
  custCo: string;
  coLine: number;
  dueDate: string; // date string
  requestedDate: string; // date string
  recoveryDate: string;
  ordered: number;
  reserved: number;
  picked: number;
  packed: number;
  shipped: number;
  fg: number;
  quantity: number;
  status: string;
}
export interface ReadyToShipProps {
  coNum: string;
  coLine: number;
  coDate: string;
  ordered: number;
  fg: number;
  shipped: number;
  requestedDate: string;
  recoveryDate: string;
  reserved: number;
  picked: number;
  packed: number;
  projectedDate: string;
  dueDate: string;
  custCo: string;
  message: string;
  type: string;
  item: string;
  qty: string;
  updateAt: string;
  color: "red" | "green" | "yellow";
}
export interface OverdueProps {
  quantity: number;
  coQty: number;
  wipQty: number;
  fgQty: number;
  shippedQty: number;
  status: string;
  rmQty: number; // not from backend;
  color: "red" | "green" | "orange";
  alertSymbol: number;
  hover: DateRangeHoverProps[];
  readyToShip?: ReadyToShipProps[];
}

export interface OverdueReadyToShipProps {
  coNum: string;
  coLine: string;
  coDate: string;
  ordered: number;
  fg: number;
  shipped: number;
  projectedDate: string;
  message: string;
  type: string;
  color: "red" | "green" | "yellow";
}
export interface DateRangeProps {
  sequent: number;
  workweek: number;
  month: string;
  year: string;
  quantity: number;
  coQty: number;
  forecastQty: number;
  shippedQty: number;
  wipQty: number;
  fgQty: number;
  rmQty: number; // not from backend;
  color: "red" | "green" | "orange";
  alertSymbol: number;
  hover: DateRangeHoverProps[];
  readyToShip?: ReadyToShipProps[];
}

export interface ItemCoverageProps {
  overdue: OverdueProps;
  dateRanges: DateRangeProps[];
}

export interface ProductionOverviewProps {
  itemDetails: ItemDetailProps;
  itemCoverage: ItemCoverageProps[];
}

export interface ProductionOverviewParams {
  projectId: number;
  filterType: string; // mm = month, ww = workweek
  filterRange: string; // 6, 12 (month), 5, 10 (workweek)
  isForecast?: number;
}

export const fetchProductionOverviews = createAsyncThunk(
  "production_overviews",
  async (params: ProductionOverviewParams, { rejectWithValue, getState }) => {
    const { auth } = getState() as any;

    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(
        `${url}/productionOverview/productionOverview`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          params: params,
        }
      );
      return res.data;
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
      return rejectWithValue(e.response.data);
    }
  }
);

export interface ProductionOverviewsInitialStageProps {
  productionOverviews: ProductionOverviewProps[];
  loading: boolean;
  error: any;
}

export const ProductionOverviewsInitialStage: ProductionOverviewsInitialStageProps =
  {
    productionOverviews: [],
    loading: false,
    error: null,
  };

export interface UpsertCommentProps {
  comment: string;
  index: number;
  rowIndex: number;
  itemIndex: number;
}

const ProductionOverviewsSlice = createSlice({
  name: "production_overview",
  initialState: ProductionOverviewsInitialStage,
  reducers: {
    upsertComment: (state, action: PayloadAction<UpsertCommentProps>) => {
      const productionOverviews = state.productionOverviews;
      if (action.payload.itemIndex === 0) {
        if (
          productionOverviews[action.payload.rowIndex].itemCoverage[0].overdue
        ) {
          productionOverviews[
            action.payload.rowIndex
          ].itemCoverage[0].overdue.readyToShip![action.payload.index].message =
            action.payload.comment;
        }
      } else {
        if (
          productionOverviews[action.payload.rowIndex].itemCoverage[0]
            .dateRanges
        ) {
          productionOverviews[
            action.payload.rowIndex
          ].itemCoverage[0].dateRanges[
            action.payload.itemIndex - 1
          ].readyToShip![action.payload.index].message = action.payload.comment;
        }
      }
      state.productionOverviews = productionOverviews;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductionOverviews.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchProductionOverviews.fulfilled,
      (state, { payload }) => {
        state.productionOverviews = payload.data;
        state.loading = false;
      }
    );
    builder.addCase(fetchProductionOverviews.rejected, (state) => {
      state.loading = false;
      return ProductionOverviewsInitialStage;
    });
  },
});

export default ProductionOverviewsSlice.reducer;
export const ProductionOverviewsActions = ProductionOverviewsSlice.actions;
