# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install          # Install dependencies
bun start            # Start Expo dev server
bun run ios          # Run on iOS simulator
bun run android      # Run on Android emulator
bun run web          # Run on web
bun run lint         # Run ESLint via expo lint
npx tsc --noEmit    # Type-check without emitting
```

There is no test runner configured yet.

## Architecture

Expo SDK 54 / React Native app using **Expo Router** (file-based routing) with the React Compiler experiment active and New Architecture enabled by default.

### Routing vs. source separation

`app/` contains only Expo Router route files. They are thin shells that import screen components from `src/screens/`. All real UI and logic lives under `src/`.

```
app/
  _layout.tsx        # Root layout: GestureHandlerRootView → Redux Provider → ThemeTransitionProvider → Stack
  index.tsx          # Re-exports src/screens/home/home.screen.tsx

src/
  components/
    layouts/         # Box, Row, Column — primitive layout components
    shared/          # Reusable UI components (ThemeToggleButton, Button, …)
  screens/
    home/            # home.screen.tsx
    login/
      components/    # Components used only by the login screen
  store/
    app-settings/    # appSettings slice (theme + future settings)
    store.ts         # configureStore, RootState, AppDispatch
    hooks.ts         # useAppDispatch, useAppSelector (typed)
  theme/
    colors/
      light.colors.ts   # lightColors token object
      dark.colors.ts    # darkColors token object
      colors.types.ts   # ThemeColors interface, ThemeColor union, resolveThemeColor()
    theme-transition/   # ThemeTransitionProvider + useThemeTransition()
    theme.types.ts      # ThemeMode ("light" | "dark" | "system"), ResolvedTheme ("light" | "dark")
    use-theme.hook.ts   # useTheme() → { colors, mode, resolved }
  services/          # API / external service calls (*.service.ts)
  types/             # Shared TypeScript types (*.types.ts)
  utils/             # Pure helper functions
```

### Import alias

`@/` maps to `src/` (configured in `tsconfig.json`).

```ts
import { Box, Row, Column } from "@/components";
import { useTheme } from "@/theme";
import { useAppDispatch, setThemeMode, toggleTheme } from "@/store";
```

### Layout primitives

`Box`, `Row`, and `Column` replace bare `View` usage. Style properties are passed as direct props instead of a `style` object. Color props accept `ThemeColor` keys rather than raw strings.

```tsx
<Column flex={1} backgroundColor="background" padding={16} gap={12}>
  <Row alignItems="center" justifyContent="space-between">
    <Box borderColor="border" borderWidth={1} borderRadius={8} />
  </Row>
</Column>
```

- `Box` — base primitive, all ViewStyle props + ViewProps
- `Row` — `Box` with `flexDirection="row"` fixed (HStack equivalent)
- `Column` — `Box` with `flexDirection="column"` fixed (VStack equivalent)
- `style` prop is still accepted as an escape hatch

### Theme-aware color props

Color props on `Box`/`Row`/`Column` (`backgroundColor`, `borderColor`, `borderTopColor`, `borderBottomColor`, `borderLeftColor`, `borderRightColor`, `shadowColor`) accept a `ThemeColor` dot-notation key. Passing an unknown string is a TypeScript error.

```tsx
<Box backgroundColor="primary" />          // ✅
<Box backgroundColor="text.secondary" />   // ✅
<Box backgroundColor="cyan" />             // ❌ TypeScript error
```

All valid keys are listed in `ThemeColor` in `src/theme/colors/colors.types.ts`. **When adding a new color to `ThemeColors`, add the corresponding key to `ThemeColor` in the same file.**

`resolveThemeColor(key, colors)` resolves a dot-notation key to a string at runtime.

### Theme system

`useTheme()` returns `{ colors, mode, resolved }`.

- `mode` — the Redux value (`"light" | "dark" | "system"`)
- `resolved` — always `"light" | "dark"` (system preference resolved via `useColorScheme`)
- `colors` — typed as `ThemeColors` interface (not `typeof lightColors`)

### Theme transition animation

`ThemeTransitionProvider` (wraps the root Stack in `app/_layout.tsx`) provides a Telegram-style circular reveal animation when the theme changes. It uses `@shopify/react-native-skia` + React Native Reanimated.

- `toggle(x, y)` is exposed via `useThemeTransition()` — call it with the press coordinates
- The Skia `Canvas` is only mounted while the animation is active to avoid blocking touches on Android

> **SDK 55 note:** Do NOT add `@react-navigation/*` packages as direct dependencies in `package.json`. `expo-router` provides them at the correct versions transitively. Duplicate copies of `@react-navigation/native` will cause a "Couldn't find the prevent remove context" crash at startup.

### Redux store

Single `appSettings` slice. Add new app-wide settings there alongside `theme`.

```ts
dispatch(setThemeMode("dark"));   // force dark
dispatch(setThemeMode("system")); // follow OS
dispatch(toggleTheme());          // flip light ↔ dark
```

When adding new slices, register the reducer in `src/store/store.ts` and export from `src/store/index.ts`.

### File naming conventions

| Kind | Pattern | Example |
|---|---|---|
| Screen | `*.screen.tsx` | `home.screen.tsx` |
| Component | `*.component.tsx` | `button.component.tsx` |
| Hook | `use-*.hook.ts` | `use-theme.hook.ts` |
| Slice | `*.slice.ts` | `app-settings.slice.ts` |
| Service | `*.service.ts` | `auth.service.ts` |
| Types | `*.types.ts` | `auth.types.ts` |

Every directory exposes its public surface through a barrel `index.ts`.

### Component placement

- Used by one screen only → `src/screens/{screen}/components/`
- Shared across screens → `src/components/shared/`

### Key dependencies

- `expo-router` ~6 — file-based navigation
- `@reduxjs/toolkit` + `react-redux` — state management
- `@shopify/react-native-skia` — Skia canvas for theme transition animation
- `react-native-reanimated` ~4 + `react-native-worklets` — UI-thread animations
- `react-native-gesture-handler` ~2.28 — gesture support; `GestureHandlerRootView` is the outermost wrapper in `app/_layout.tsx`
- `@react-navigation/bottom-tabs` — tab navigation (available, not wired yet)
