import appSlice from "@/slice/app.slice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  app: appSlice,
});
export default rootReducer;
