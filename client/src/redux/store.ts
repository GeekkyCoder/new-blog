import { configureStore,combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/auth/authReducer";

const rootReducer = combineReducers({
   userReducer
})

export const store = configureStore({
  reducer:rootReducer
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
