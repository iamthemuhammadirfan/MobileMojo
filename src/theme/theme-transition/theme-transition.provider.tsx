import {
  Canvas,
  Circle,
  Image as SkiaImage,
  ImageShader,
  makeImageFromView,
} from "@shopify/react-native-skia";
import type { SkImage } from "@shopify/react-native-skia";
import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useRef,
} from "react";
import { Dimensions, StyleSheet, View, useColorScheme } from "react-native";
import { useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { useAppDispatch, useAppSelector, setThemeMode } from "@/store";
import type { ThemeMode } from "@/theme";

const { width, height } = Dimensions.get("screen");

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function maxCornerDistance(x: number, y: number): number {
  return Math.max(
    Math.sqrt(x ** 2 + y ** 2),
    Math.sqrt((width - x) ** 2 + y ** 2),
    Math.sqrt((width - x) ** 2 + (height - y) ** 2),
    Math.sqrt(x ** 2 + (height - y) ** 2)
  );
}

interface AnimationState {
  active: boolean;
  overlay1: SkImage | null;
  overlay2: SkImage | null;
}

const initialState: AnimationState = {
  active: false,
  overlay1: null,
  overlay2: null,
};

interface ThemeTransitionContextValue {
  toggle: (x: number, y: number) => Promise<void>;
  active: boolean;
}

const ThemeTransitionContext = createContext<ThemeTransitionContextValue | null>(null);

export function useThemeTransition() {
  const ctx = useContext(ThemeTransitionContext);
  if (!ctx) {
    throw new Error("useThemeTransition must be used within ThemeTransitionProvider");
  }
  return ctx;
}

export function ThemeTransitionProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.appSettings.theme);
  const systemScheme = useColorScheme();
  const ref = useRef<View>(null);

  const [state, setState] = useReducer(
    (_: AnimationState, next: AnimationState) => next,
    initialState
  );

  const cx = useSharedValue(0);
  const cy = useSharedValue(0);
  const maxRadius = useSharedValue(0);
  const transition = useSharedValue(0);
  const r = useDerivedValue(() => transition.value * maxRadius.value);

  const toggle = useCallback(
    async (tapX: number, tapY: number) => {
      const resolved = mode === "system" ? (systemScheme ?? "light") : mode;
      const nextMode: ThemeMode = resolved === "light" ? "dark" : "light";

      cx.value = tapX;
      cy.value = tapY;
      maxRadius.value = maxCornerDistance(tapX, tapY);

      // 1. Activate overlay (nothing shown yet)
      setState({ active: true, overlay1: null, overlay2: null });

      // 2. Capture current theme screenshot
      const overlay1 = await makeImageFromView(ref);
      setState({ active: true, overlay1, overlay2: null });

      // 3. Switch theme in Redux — renders new theme under the overlay
      await wait(16);
      dispatch(setThemeMode(nextMode));
      await wait(16);

      // 4. Capture new theme screenshot
      const overlay2 = await makeImageFromView(ref);
      setState({ active: true, overlay1, overlay2 });

      // 5. Animate circular reveal
      transition.value = 0;
      transition.value = withTiming(1, { duration: 650 });
      await wait(650);

      // 6. Clean up
      setState({ active: false, overlay1: null, overlay2: null });
    },
    [cx, cy, dispatch, maxRadius, mode, systemScheme, transition]
  );

  return (
    <ThemeTransitionContext.Provider value={{ toggle, active: state.active }}>
      <View style={styles.container}>
        <View ref={ref} style={styles.container} collapsable={false}>
          {children}
        </View>
        <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
          <SkiaImage
            image={state.overlay1}
            x={0}
            y={0}
            width={width}
            height={height}
            fit="cover"
          />
          {state.overlay2 && (
            <Circle cx={cx} cy={cy} r={r}>
              <ImageShader
                image={state.overlay2}
                x={0}
                y={0}
                width={width}
                height={height}
                fit="cover"
              />
            </Circle>
          )}
        </Canvas>
      </View>
    </ThemeTransitionContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
