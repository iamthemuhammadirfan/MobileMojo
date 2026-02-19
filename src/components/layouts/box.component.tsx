import type { ThemeColor, ThemeColors } from "@/theme";
import { resolveThemeColor, useTheme } from "@/theme";
import { StyleProp, View, ViewProps, ViewStyle } from "react-native";

function resolveColor(
  value: ThemeColor | undefined,
  colors: ThemeColors,
): string | undefined {
  if (value === undefined) return undefined;
  return resolveThemeColor(value, colors);
}

type ColorKeys =
  | "backgroundColor"
  | "borderColor"
  | "borderTopColor"
  | "borderBottomColor"
  | "borderLeftColor"
  | "borderRightColor"
  | "shadowColor";

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
  ColorKeys
> & {
  backgroundColor?: ThemeColor;
  borderColor?: ThemeColor;
  borderTopColor?: ThemeColor;
  borderBottomColor?: ThemeColor;
  borderLeftColor?: ThemeColor;
  borderRightColor?: ThemeColor;
  shadowColor?: ThemeColor;
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
          gap,
          rowGap,
          columnGap,
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
          borderColor: resolveColor(borderColor, colors),
          borderTopColor: resolveColor(borderTopColor, colors),
          borderBottomColor: resolveColor(borderBottomColor, colors),
          borderLeftColor: resolveColor(borderLeftColor, colors),
          borderRightColor: resolveColor(borderRightColor, colors),
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
          shadowColor: resolveColor(shadowColor, colors),
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
