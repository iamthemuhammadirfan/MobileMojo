import { configureStore } from "@reduxjs/toolkit";
import appSettingsReducer from "./app-settings/app-settings.slice";

export const store = configureStore({
  reducer: {
    appSettings: appSettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
