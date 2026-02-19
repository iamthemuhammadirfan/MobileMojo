import Feather from "@expo/vector-icons/Feather";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useTheme } from "@/theme";
import { useThemeTransition } from "@/theme";

export function ThemeToggleButton() {
  const { colors, resolved } = useTheme();
  const { toggle, active } = useThemeTransition();

  const tap = Gesture.Tap()
    .runOnJS(true)
    .onStart((e) => {
      if (!active) {
        toggle(e.absoluteX, e.absoluteY);
      }
    });

  return (
    <GestureDetector gesture={tap}>
      <Feather
        name={resolved === "light" ? "moon" : "sun"}
        color={colors.text.primary}
        size={32}
      />
    </GestureDetector>
  );
}
