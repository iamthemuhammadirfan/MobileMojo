import type { ThemeColor, ThemeColors, SpacingKey } from "@/theme";
import { resolveThemeColor, resolveSpacing, useTheme } from "@/theme";
import { StyleProp, View, ViewProps, ViewStyle } from "react-native";

function resolveColor(
  value: ThemeColor | undefined,
  colors: ThemeColors,
): string | undefined {
  if (value === undefined) return undefined;
  return resolveThemeColor(value, colors);
}

function rs(key: SpacingKey | undefined): number | undefined {
  if (key === undefined) return undefined;
  return resolveSpacing(key);
}

type ColorKeys =
  | "backgroundColor"
  | "borderColor"
  | "borderTopColor"
  | "borderBottomColor"
  | "borderLeftColor"
  | "borderRightColor"
  | "shadowColor";

type SpacingStyleKeys =
  | "gap"
  | "rowGap"
  | "columnGap"
  | "padding"
  | "paddingTop"
  | "paddingBottom"
  | "paddingLeft"
  | "paddingRight"
  | "paddingHorizontal"
  | "paddingVertical"
  | "margin"
  | "marginTop"
  | "marginBottom"
  | "marginLeft"
  | "marginRight"
  | "marginHorizontal"
  | "marginVertical";

type BoxStyleProps = Omit<
  Pick<
    ViewStyle,
    // Flexbox
    | "flex"
    | "flexDirection"
    | "flexWrap"
    | "flexGrow"
    | "flexShrink"
    | "flexBasis"
    | "alignItems"
    | "alignSelf"
    | "alignContent"
    | "justifyContent"
    | "gap"
    | "rowGap"
    | "columnGap"
    // Spacing
    | "padding"
    | "paddingTop"
    | "paddingBottom"
    | "paddingLeft"
    | "paddingRight"
    | "paddingHorizontal"
    | "paddingVertical"
    | "margin"
    | "marginTop"
    | "marginBottom"
    | "marginLeft"
    | "marginRight"
    | "marginHorizontal"
    | "marginVertical"
    // Dimensions
    | "width"
    | "height"
    | "minWidth"
    | "minHeight"
    | "maxWidth"
    | "maxHeight"
    // Background & borders
    | "backgroundColor"
    | "borderRadius"
    | "borderTopLeftRadius"
    | "borderTopRightRadius"
    | "borderBottomLeftRadius"
    | "borderBottomRightRadius"
    | "borderWidth"
    | "borderTopWidth"
    | "borderBottomWidth"
    | "borderLeftWidth"
    | "borderRightWidth"
    | "borderColor"
    | "borderTopColor"
    | "borderBottomColor"
    | "borderLeftColor"
    | "borderRightColor"
    | "borderStyle"
    // Positioning
    | "position"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "zIndex"
    // Visual
    | "opacity"
    | "overflow"
    | "transform"
    // Shadow (iOS)
    | "shadowColor"
    | "shadowOffset"
    | "shadowOpacity"
    | "shadowRadius"
    // Shadow (Android)
    | "elevation"
  >,
  ColorKeys | SpacingStyleKeys
> & {
  // Color props — ThemeColor keys only (e.g. "background", "text.primary")
  backgroundColor?: ThemeColor;
  borderColor?: ThemeColor;
  borderTopColor?: ThemeColor;
  borderBottomColor?: ThemeColor;
  borderLeftColor?: ThemeColor;
  borderRightColor?: ThemeColor;
  shadowColor?: ThemeColor;
  // Spacing props — SpacingKey tokens only (e.g. "lg", "xl")
  gap?: SpacingKey;
  rowGap?: SpacingKey;
  columnGap?: SpacingKey;
  padding?: SpacingKey;
  paddingTop?: SpacingKey;
  paddingBottom?: SpacingKey;
  paddingLeft?: SpacingKey;
  paddingRight?: SpacingKey;
  paddingHorizontal?: SpacingKey;
  paddingVertical?: SpacingKey;
  margin?: SpacingKey;
  marginTop?: SpacingKey;
  marginBottom?: SpacingKey;
  marginLeft?: SpacingKey;
  marginRight?: SpacingKey;
  marginHorizontal?: SpacingKey;
  marginVertical?: SpacingKey;
};

export type BoxProps = BoxStyleProps &
  Omit<ViewProps, "style"> & { style?: StyleProp<ViewStyle> };

export function Box({
  // Flexbox
  flex,
  flexDirection,
  flexWrap,
  flexGrow,
  flexShrink,
  flexBasis,
  alignItems,
  alignSelf,
  alignContent,
  justifyContent,
  gap,
  rowGap,
  columnGap,
  // Spacing
  padding,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingHorizontal,
  paddingVertical,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginHorizontal,
  marginVertical,
  // Dimensions
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  // Background & borders
  backgroundColor,
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  borderWidth,
  borderTopWidth,
  borderBottomWidth,
  borderLeftWidth,
  borderRightWidth,
  borderColor,
  borderTopColor,
  borderBottomColor,
  borderLeftColor,
  borderRightColor,
  borderStyle,
  // Positioning
  position,
  top,
  bottom,
  left,
  right,
  zIndex,
  // Visual
  opacity,
  overflow,
  transform,
  // Shadow
  shadowColor,
  shadowOffset,
  shadowOpacity,
  shadowRadius,
  elevation,
  // Rest
  style,
  ...viewProps
}: BoxProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          flex,
          flexDirection,
          flexWrap,
          flexGrow,
          flexShrink,
          flexBasis,
          alignItems,
          alignSelf,
          alignContent,
          justifyContent,
          gap:            rs(gap),
          rowGap:         rs(rowGap),
          columnGap:      rs(columnGap),
          padding:        rs(padding),
          paddingTop:     rs(paddingTop),
          paddingBottom:  rs(paddingBottom),
          paddingLeft:    rs(paddingLeft),
          paddingRight:   rs(paddingRight),
          paddingHorizontal: rs(paddingHorizontal),
          paddingVertical:   rs(paddingVertical),
          margin:         rs(margin),
          marginTop:      rs(marginTop),
          marginBottom:   rs(marginBottom),
          marginLeft:     rs(marginLeft),
          marginRight:    rs(marginRight),
          marginHorizontal: rs(marginHorizontal),
          marginVertical:   rs(marginVertical),
          width,
          height,
          minWidth,
          minHeight,
          maxWidth,
          maxHeight,
          backgroundColor: resolveColor(backgroundColor, colors),
          borderRadius,
          borderTopLeftRadius,
          borderTopRightRadius,
          borderBottomLeftRadius,
          borderBottomRightRadius,
          borderWidth,
          borderTopWidth,
          borderBottomWidth,
          borderLeftWidth,
          borderRightWidth,
          borderColor:       resolveColor(borderColor, colors),
          borderTopColor:    resolveColor(borderTopColor, colors),
          borderBottomColor: resolveColor(borderBottomColor, colors),
          borderLeftColor:   resolveColor(borderLeftColor, colors),
          borderRightColor:  resolveColor(borderRightColor, colors),
          borderStyle,
          position,
          top,
          bottom,
          left,
          right,
          zIndex,
          opacity,
          overflow,
          transform,
          shadowColor:   resolveColor(shadowColor, colors),
          shadowOffset,
          shadowOpacity,
          shadowRadius,
          elevation,
        },
        style,
      ]}
      {...viewProps}
    />
  );
}
