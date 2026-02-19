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

This is an **Expo SDK 54 / React Native** app using **Expo Router** (file-based routing) with the **New Architecture** enabled and the **React Compiler** experiment active.

### Routing vs. Source separation

`app/` contains only Expo Router route files. Route files are thin — they import and re-export screen components from `src/screens/`. All real UI and logic lives under `src/`.

```
app/
  _layout.tsx          # Root Stack layout
  index.tsx            # → re-exports src/screens/home/home.screen.tsx

src/
  screens/             # Screen components (*.screen.tsx)
    home/
    login/
      components/      # Components used only by this screen (*.component.tsx)
  components/
    shared/            # Reusable components across screens (*.component.tsx)
  services/            # API / external service calls (*.service.ts)
  types/               # TypeScript interfaces and types (*.types.ts)
  utils/               # Pure helper functions
```

### Import alias

`@/` maps to `src/` (configured in `tsconfig.json` and resolved by Expo).

```ts
import { HomeScreen } from "@/screens";
import { Button } from "@/components";
import { authService } from "@/services";
import type { User } from "@/types";
```

### File naming conventions

| Kind | Pattern | Example |
|---|---|---|
| Screen | `*.screen.tsx` | `home.screen.tsx` |
| Component | `*.component.tsx` | `button.component.tsx` |
| Service | `*.service.ts` | `auth.service.ts` |
| Types | `*.types.ts` | `auth.types.ts` |

Every directory exports its public surface through a barrel `index.ts`.

### Component placement rule

- If a component is **only** used by one screen → place it in `src/screens/{screen}/components/`
- If a component is **shared** across screens → place it in `src/components/shared/`

### Key dependencies

- `expo-router` ~6 — file-based navigation
- `react-native-reanimated` ~4 + `react-native-worklets` — animations
- `react-native-gesture-handler` ~2.28 — gestures
- `@react-navigation/bottom-tabs` — tab navigation (available but not wired in root layout yet)
