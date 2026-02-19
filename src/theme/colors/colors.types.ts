export interface ThemeColors {
  background: string;
  surface: string;
  surfaceElevated: string;
  primary: string;
  primaryMuted: string;
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    disabled: string;
    inverse: string;
  };
  border: string;
  borderMuted: string;
  error: string;
  success: string;
  warning: string;
}

/**
 * All valid dot-notation color keys from the theme palette.
 * Add a new entry here whenever you add a color to ThemeColors.
 */
export type ThemeColor =
  | "background"
  | "surface"
  | "surfaceElevated"
  | "primary"
  | "primaryMuted"
  | "text.primary"
  | "text.secondary"
  | "text.tertiary"
  | "text.disabled"
  | "text.inverse"
  | "border"
  | "borderMuted"
  | "error"
  | "success"
  | "warning";

/**
 * Resolves a dot-notation ThemeColor key to its string value at runtime.
 */
export function resolveThemeColor(path: ThemeColor, colors: ThemeColors): string {
  const parts = (path as string).split(".");
  let value: unknown = colors;
  for (const part of parts) {
    value = (value as Record<string, unknown>)[part];
  }
  return value as string;
}
