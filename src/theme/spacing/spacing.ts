/**
 * 4pt spacing scale — the same system used by Meta, Shopify, and Microsoft
 * Fluent UI. All spacing in the app should come from these tokens.
 *
 * When adding a new token:
 *   1. Add the value here
 *   2. Add the key to SpacingKey below
 */
export const spacing = {
  none:  0,
  xs:    4,
  sm:    8,
  md:    12,
  lg:    16,
  xl:    24,
  xxl:   32,
  xxxl:  48,
  xxxxl: 64,
} as const;

/**
 * All valid spacing token keys.
 * Explicit union — avoids "excessively deep" TS errors from mapped types
 * and gives reliable autocomplete in the Language Server.
 */
export type SpacingKey =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "xxxl"
  | "xxxxl";

/** Resolves a SpacingKey to its numeric dp value at runtime. O(1) lookup. */
export function resolveSpacing(key: SpacingKey): number {
  return spacing[key];
}
