import { View, ViewProps, ViewStyle, StyleProp } from "react-native";

type BoxStyleProps = Pick<
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
>;

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
          position,
          top,
          bottom,
          left,
          right,
          zIndex,
          opacity,
          overflow,
          transform,
          shadowColor,
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
