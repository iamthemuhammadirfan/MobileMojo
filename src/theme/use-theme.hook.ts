import { useColorScheme } from "react-native";
import { useAppSelector } from "@/store";
import { lightColors, darkColors } from "./colors";
import type { ResolvedTheme } from "./theme.types";

export function useTheme() {
  const systemScheme = useColorScheme();
  const mode = useAppSelector((state) => state.appSettings.theme);

  const resolved: ResolvedTheme =
    mode === "system" ? (systemScheme ?? "light") : mode;

  const colors = resolved === "dark" ? darkColors : lightColors;

  return { colors, mode, resolved } as const;
}
