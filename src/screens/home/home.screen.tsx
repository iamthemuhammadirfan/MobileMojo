import { Text } from "react-native";
import { Column, ThemeToggleButton } from "@/components";
import { useTheme } from "@/theme";

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <Column
      flex={1}
      backgroundColor={colors.background}
      alignItems="center"
      justifyContent="center"
      gap={24}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", color: colors.text.primary }}>
        Welcome to MobileMojo
      </Text>
      <Text style={{ fontSize: 16, color: colors.text.secondary }}>
        Start building your app here!
      </Text>
      <ThemeToggleButton />
    </Column>
  );
}
