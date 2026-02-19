# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install          # Install dependencies
bun start            # Start Expo dev server (opens iOS/Android/web options)
bun run ios          # Start on iOS simulator
bun run android      # Start on Android emulator
bun run web          # Start on web
bun run lint         # Run ESLint via expo lint
```

There is no test runner configured yet.

## Architecture

This is an **Expo SDK 54 / React Native** app using **Expo Router** (file-based routing) with the React Compiler experiment active.

### Routing vs. Source separation

`app/` contains only Expo Router route files. Route files are thin — they import and re-export screen components from `src/screens/`. All real UI and logic lives under `src/`.

```
app/
  _layout.tsx          # Root Stack layout + Redux Provider
  index.tsx            # → re-exports src/screens/home/home.screen.tsx

src/
  screens/             # Screen components (*.screen.tsx)
    home/
    login/
      components/      # Components used only by this screen (*.component.tsx)
  components/
    layouts/           # Primitive layout components (Box, Row, Column)
    shared/            # Reusable components across screens (*.component.tsx)
  store/               # Redux Toolkit store
    app-settings/      # appSettings slice (theme mode + future settings)
    store.ts           # configureStore, RootState, AppDispatch
    hooks.ts           # useAppDispatch, useAppSelector (typed)
  theme/               # Theme system
    colors/
      light.colors.ts  # lightColors token object
      dark.colors.ts   # darkColors token object
      colors.types.ts  # ThemeColors type
    theme.types.ts     # ThemeMode, ResolvedTheme
    use-theme.hook.ts  # useTheme()
  services/            # API / external service calls (*.service.ts)
  types/               # TypeScript interfaces and types (*.types.ts)
  utils/               # Pure helper functions
```

### Import alias

`@/` maps to `src/` (configured in `tsconfig.json` and resolved by Expo).

```ts
import { Box, Row, Column } from "@/components";
import { useTheme } from "@/theme";
import { useAppDispatch, setThemeMode, toggleTheme } from "@/store";
```

### Layout primitives

`Box`, `Row`, and `Column` replace bare `View` usage. All style properties are passed as direct props rather than a `style` object.

```tsx
<Column flex={1} backgroundColor={colors.background} padding={16} gap={12}>
  <Row alignItems="center" justifyContent="space-between">
    ...
  </Row>
</Column>
```

- `Box` — base primitive, accepts all ViewStyle props + all ViewProps
- `Row` — `Box` with `flexDirection="row"` locked in (HStack equivalent)
- `Column` — `Box` with `flexDirection="column"` locked in (VStack equivalent)
- The `style` prop is still accepted on all three as an escape hatch

### Theme system

`useTheme()` returns `{ colors, mode, resolved }`. `mode` is the Redux value (`light | dark | system`); `resolved` is always `light | dark` (system preference resolved via `useColorScheme`).

```tsx
const { colors, mode, resolved } = useTheme();
```

### Redux store

The store uses a single `appSettings` slice. Add new app-wide settings there as additional keys alongside `theme`.

```ts
// Dispatch theme changes from anywhere
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
| Service | `*.service.ts` | `auth.service.ts` |
| Types | `*.types.ts` | `auth.types.ts` |
| Hook | `use-*.hook.ts` | `use-theme.hook.ts` |
| Slice | `*.slice.ts` | `app-settings.slice.ts` |

Every directory exports its public surface through a barrel `index.ts`.

### Component placement rule

- If a component is **only** used by one screen → `src/screens/{screen}/components/`
- If a component is **shared** across screens → `src/components/shared/`

### Key dependencies

- `expo-router` ~6 — file-based navigation
- `@reduxjs/toolkit` + `react-redux` — state management
- `react-native-reanimated` ~4 + `react-native-worklets` — animations
- `react-native-gesture-handler` ~2.28 — gestures
- `@react-navigation/bottom-tabs` — tab navigation (available, not wired yet)
