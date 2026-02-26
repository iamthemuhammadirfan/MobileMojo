import { Box, Column, ThemeToggleButton } from "@/components";
import { useTheme } from "@/theme";
import { Text } from "react-native";

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <Column
      flex={1}
      backgroundColor="background"
      alignItems="center"
      justifyContent="center"
      gap="xl"
    >
      <Text
        style={{ fontSize: 24, fontWeight: "bold", color: colors.text.primary }}
      >
        Welcome to MobileMojo
      </Text>
      <Text style={{ fontSize: 16, color: colors.text.secondary }}>
        Start building your app here!
      </Text>
      <Box backgroundColor="text.disabled" width={100} height={100} />
      <ThemeToggleButton />
    </Column>
  );
}
