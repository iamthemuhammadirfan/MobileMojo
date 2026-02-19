import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ThemeMode } from "@/theme";

interface AppSettingsState {
  theme: ThemeMode;
}

const initialState: AppSettingsState = {
  theme: "system",
};

export const appSettingsSlice = createSlice({
  name: "appSettings",
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<ThemeMode>) {
      state.theme = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export const { setThemeMode, toggleTheme } = appSettingsSlice.actions;
export default appSettingsSlice.reducer;
