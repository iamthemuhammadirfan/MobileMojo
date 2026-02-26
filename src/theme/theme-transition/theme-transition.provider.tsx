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
import {
  Dimensions,
  Platform,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { store, useAppDispatch, setThemeMode } from "@/store";
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

const ANIMATION_DURATION = 650;
const ANIMATION_EASING = Easing.out(Easing.cubic);
const FRAME_WAIT = Platform.OS === "android" ? 32 : 16;

export function ThemeTransitionProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const ref = useRef<View>(null);

  // Read via ref so changes don't re-render this provider
  const systemScheme = useColorScheme();
  const systemSchemeRef = useRef(systemScheme);
  systemSchemeRef.current = systemScheme;

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
      // Read from store — no useAppSelector means dispatching setThemeMode
      // will NOT re-render this provider mid-animation
      const mode = store.getState().appSettings.theme;
      const resolved = mode === "system" ? (systemSchemeRef.current === "dark" ? "dark" : "light") : mode;
      const nextMode: ThemeMode = resolved === "light" ? "dark" : "light";

      cx.value = tapX;
      cy.value = tapY;
      maxRadius.value = maxCornerDistance(tapX, tapY);

      try {
        // Capture overlay1 BEFORE mounting Canvas — saves one empty-Canvas render
        const overlay1 = await makeImageFromView(ref);
        if (!overlay1) throw new Error("makeImageFromView returned null (overlay1)");

        // Canvas mounts already showing overlay1 — 1 render, not 2
        setState({ active: true, overlay1, overlay2: null });

        await wait(FRAME_WAIT);
        dispatch(setThemeMode(nextMode));
        await wait(FRAME_WAIT);

        const overlay2 = await makeImageFromView(ref);
        if (!overlay2) throw new Error("makeImageFromView returned null (overlay2)");

        // Both images ready — start animation
        setState({ active: true, overlay1, overlay2 });

        transition.value = 0;
        transition.value = withTiming(1, {
          duration: ANIMATION_DURATION,
          easing: ANIMATION_EASING,
        });
        await wait(ANIMATION_DURATION);
      } catch {
        dispatch(setThemeMode(nextMode));
      } finally {
        setState({ active: false, overlay1: null, overlay2: null });
      }
    },
    [cx, cy, dispatch, maxRadius, transition]
  );

  return (
    <ThemeTransitionContext.Provider value={{ toggle, active: state.active }}>
      <View style={styles.container}>
        <View ref={ref} style={styles.container} collapsable={false}>
          {children}
        </View>
        {state.active && (
          <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
            {state.overlay1 && (
              <SkiaImage
                image={state.overlay1}
                x={0}
                y={0}
                width={width}
                height={height}
                fit="fill"
              />
            )}
            {state.overlay2 && (
              <Circle cx={cx} cy={cy} r={r}>
                <ImageShader
                  image={state.overlay2}
                  x={0}
                  y={0}
                  width={width}
                  height={height}
                  fit="fill"
                />
              </Circle>
            )}
          </Canvas>
        )}
      </View>
    </ThemeTransitionContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
