import { ActionSliceState } from "./state";
import { commonCreateAsyncThunk } from "./thunk";
import { createSlice } from "@reduxjs/toolkit";
import { errorMessage } from "@/utils/util";
import { AppModel, ProductModel } from "@/model/App.model";
import { AppService } from "@/services/App.service";

interface AppState extends ActionSliceState {
  item: AppModel;
  itemProduct: ProductModel;
  listProduct: ProductModel[];
  loading: boolean;
  refresh: boolean;
  statusVerify: "idle" | "loading" | "completed" | "failed";
  checkCodeSuccessString: string;
  adminVerify: boolean;
}
const initialState: AppState = {
  item: AppModel.initial(),
  itemProduct: ProductModel.initial(),
  listProduct: [],
  status: "idle",
  statusAction: "idle",
  statusVerify: "idle",
  action: "INS",
  loading: true,
  refresh: false,
  checkCodeSuccessString: "",
  adminVerify: false,
};
export const getSetting: any = commonCreateAsyncThunk({
  type: "app/getSetting",
  action: AppService.getSetting,
});
export const applySetting: any = commonCreateAsyncThunk({
  type: "app/applySetting",
  action: AppService.getSetting,
});
export const postInit: any = commonCreateAsyncThunk({
  type: "app/postInit",
  action: AppService.postInit,
});
export const changeSetting: any = commonCreateAsyncThunk({
  type: "app/changeSetting",
  action: AppService.changeSetting,
});
export const initSetting: any = commonCreateAsyncThunk({
  type: "app/initSetting",
  action: AppService.initSetting,
});
export const getCode: any = commonCreateAsyncThunk({
  type: "app/getCode",
  action: AppService.getCode,
});
export const checkCode: any = commonCreateAsyncThunk({
  type: "app/checkCode",
  action: AppService.checkCode,
});
export const uploadLogo: any = commonCreateAsyncThunk({
  type: "app/uploadLogo",
  action: AppService.uploadLogo,
});
export const getProducts: any = commonCreateAsyncThunk({
  type: "app/getProducts",
  action: AppService.getProducts,
});
export const createProduct: any = commonCreateAsyncThunk({
  type: "app/createProduct",
  action: AppService.createProduct,
});
export const updateProduct: any = commonCreateAsyncThunk({
  type: "app/updateProduct",
  action: AppService.updateProduct,
});
export const deleteProduct: any = commonCreateAsyncThunk({
  type: "app/deleteProduct",
  action: AppService.deleteProduct,
});
export const updateStory: any = commonCreateAsyncThunk({
  type: "app/updateStory",
  action: AppService.updateStory,
});
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    selectItem: (state, action) => {
      state.item = action.payload;
    },
    selectItemProduct: (state, action) => {
      state.itemProduct = action.payload;
    },
    resetActionState: (state) => {
      state.statusAction = "idle";
    },
    resetActionStateCodeVerify: (state) => {
      state.statusVerify = "idle";
    },
    resetState: (state) => {
      state.status = "idle";
    },
    changeAction: (state, action) => {
      state.action = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setRefresh: (state, action) => {
      state.refresh = action.payload;
    },
    setAdminVerify: (state, action) => {
      state.adminVerify = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSetting.fulfilled, (state, action) => {
        const item = AppService.itemFromJson(
          action.payload.data !== "" ? action.payload.data.data : {}
        );
        const listProduct = AppService.listProductFromJson(
          action.payload.data !== "" ? action.payload.data.data.products : {}
        );
        state.listProduct = listProduct;
        state.item = item;
        state.status = "completed";
      })
      .addCase(getSetting.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSetting.rejected, (state, action) => {
        const error = Object(action.payload);
        state.status = "failed";
        state.error = errorMessage(error);
      })
      .addCase(postInit.fulfilled, (state, action) => {
        const item = AppService.itemFromJson(
          action.payload.data !== "" ? action.payload.data.data : {}
        );
        state.item = item;
        state.statusAction = "completed";
      })
      .addCase(postInit.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(postInit.rejected, (state, action) => {
        const error = Object(action.payload);
        state.statusAction = "failed";
        state.error = errorMessage(error);
      })
      .addCase(applySetting.fulfilled, (state, action) => {
        const item = AppService.itemFromJson(
          action.payload.data !== "" ? action.payload.data.data : {}
        );
        state.item = item;
        state.statusAction = "completed";
      })
      .addCase(applySetting.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(applySetting.rejected, (state, action) => {
        const error = Object(action.payload);
        state.statusAction = "failed";
        state.error = errorMessage(error);
      })
      .addCase(getCode.fulfilled, (state, action) => {
        const item = AppService.itemFromJson(
          action.payload.data !== "" ? action.payload.data.data : {}
        );
        state.item = item;
        state.status = "completed";
      })
      .addCase(getCode.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCode.rejected, (state, action) => {
        const error = Object(action.payload);
        state.status = "failed";
        state.error = errorMessage(error);
      })
      .addCase(changeSetting.fulfilled, (state) => {
        // state.action = "VIE";
        state.statusAction = "completed";
      })
      .addCase(changeSetting.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(changeSetting.rejected, (state, action) => {
        const error = Object(action.payload);
        state.statusAction = "failed";
        state.error = errorMessage(error);
      })
      .addCase(uploadLogo.fulfilled, (state) => {
        // state.action = "VIE";
        state.statusAction = "completed";
      })
      .addCase(uploadLogo.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(uploadLogo.rejected, (state, action) => {
        const error = Object(action.payload);
        state.statusAction = "failed";
        state.error = errorMessage(error);
      })
      .addCase(checkCode.fulfilled, (state, action) => {
        // state.action = "VIE";
        state.checkCodeSuccessString = action.payload.data
          ? action.payload.data.message
          : "";
        state.statusVerify = "completed";
      })
      .addCase(checkCode.pending, (state) => {
        state.statusVerify = "loading";
      })
      .addCase(checkCode.rejected, (state, action) => {
        const error = Object(action.payload);
        state.statusVerify = "failed";
        state.error = errorMessage(error);
      })
      .addCase(initSetting.fulfilled, (state, action) => {
        state.item = action.payload.data !== "" ? action.payload.data.data : [];
        // state.action = "VIE";
        state.statusAction = "completed";
      })
      .addCase(initSetting.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(initSetting.rejected, (state, action) => {
        const error = Object(action.payload);
        state.statusAction = "failed";
        state.error = errorMessage(error);
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        const list = AppService.listProductFromJson(
          action.payload.data !== "" ? action.payload.data.data : {}
        );
        state.listProduct = list;
        state.status = "completed";
      })
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.rejected, (state, action) => {
        const error = Object(action.payload);
        state.status = "failed";
        state.error = errorMessage(error);
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.statusAction = "completed";
      })
      .addCase(createProduct.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(createProduct.rejected, (state, action) => {
        const error = Object(action.payload);
        state.statusAction = "failed";
        state.error = errorMessage(error);
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.statusAction = "completed";
      })
      .addCase(updateProduct.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        const error = Object(action.payload);
        state.statusAction = "failed";
        state.error = errorMessage(error);
      })
      .addCase(updateStory.fulfilled, (state) => {
        state.statusAction = "completed";
      })
      .addCase(updateStory.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(updateStory.rejected, (state, action) => {
        const error = Object(action.payload);
        state.statusAction = "failed";
        state.error = errorMessage(error);
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.statusAction = "completed";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        const error = Object(action.payload);
        state.statusAction = "failed";
        state.error = errorMessage(error);
      });
  },
});
export const {
  selectItem,
  selectItemProduct,
  resetActionState,
  changeAction,
  resetState,
  setLoading,
  setRefresh,
  setAdminVerify,
  resetActionStateCodeVerify,
} = appSlice.actions;
export default appSlice.reducer;
