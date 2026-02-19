import Feather from "@expo/vector-icons/Feather";
import { Pressable } from "react-native";
import { useTheme, useThemeTransition } from "@/theme";

export function ThemeToggleButton() {
  const { colors, resolved } = useTheme();
  const { toggle, active } = useThemeTransition();

  return (
    <Pressable
      onPress={(e) => {
        if (!active) {
          toggle(e.nativeEvent.pageX, e.nativeEvent.pageY);
        }
      }}
      hitSlop={16}
    >
      <Feather
        name={resolved === "light" ? "moon" : "sun"}
        color={colors.text.primary}
        size={32}
      />
    </Pressable>
  );
}
