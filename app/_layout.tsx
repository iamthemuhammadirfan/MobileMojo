import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ThemeTransitionProvider } from "@/theme";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeTransitionProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeTransitionProvider>
    </Provider>
  );
}
