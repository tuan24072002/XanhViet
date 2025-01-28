import { ActionSliceState } from "./state";
import { commonCreateAsyncThunk } from "./thunk";
import { createSlice } from "@reduxjs/toolkit";
import { errorMessage } from "@/utils/util";
import { AppModel } from "@/model/App.model";
import { AppService } from "@/services/App.service";

interface AppState extends ActionSliceState {
  item: AppModel;
  loading: boolean;
  refresh: boolean;
  statusVerify: "idle" | "loading" | "completed" | "failed";
  checkCodeSuccessString: string;
  adminVerify: boolean;
}
const initialState: AppState = {
  item: AppModel.initial(),
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

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    selectItem: (state, action) => {
      state.item = action.payload;
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
      });
  },
});
export const {
  selectItem,
  resetActionState,
  changeAction,
  resetState,
  setLoading,
  setRefresh,
  setAdminVerify,
  resetActionStateCodeVerify,
} = appSlice.actions;
export default appSlice.reducer;
