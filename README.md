# MobileMojo 👋

This is an [Expo](https://expo.dev) project built with React Native and managed with [Bun](https://bun.sh).

## Get started

1. Install dependencies

   ```bash
   bun install
   ```

2. Start the app

   ```bash
   bun start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Project Structure

This project follows **SOLID principles** and **Separation of Concerns (SoC)**:

```
app/
  _layout.tsx           # Root layout (Expo Router - must stay at root)
  index.tsx             # Route file (imports from src/screens)

src/
  screens/              # All screen components
    home/
      home.screen.tsx   # Home screen component
      index.ts          # Barrel export
    login/
      login.screen.tsx  # Login screen component
      components/       # Components SPECIFIC to login screen only
        login-button.component.tsx
        index.ts
      index.ts
    index.ts            # Exports all screens

  components/           # Reusable/shared components
    shared/             # Components used across multiple screens
      button.component.tsx
      index.ts
    index.ts

  services/             # API calls and external services
    auth.service.ts     # Authentication API calls
    index.ts

  utils/                # Helper functions and utilities
    helpers.ts
    index.ts

  types/                # TypeScript type definitions
    auth.types.ts
    index.ts

  assets/               # Images, fonts, and static files
    images/
```

## Architecture Principles

### Separation of Concerns (SoC)

- **Screen-specific components**: Located in `src/screens/{screen-name}/components/`
  - Example: `LoginButton` is only used in login screen → `src/screens/login/components/`
- **Shared components**: Located in `src/components/shared/`
  - Example: Generic `Button` used across app → `src/components/shared/`
- **Services**: All API calls centralized in `src/services/`
- **Utils**: Pure utility functions in `src/utils/`
- **Types**: All TypeScript definitions in `src/types/`

### SOLID Principles

- **Single Responsibility**: Each component/service has one clear purpose
- **Open/Closed**: Easy to extend without modifying existing code
- **Liskov Substitution**: Components are interchangeable where types match
- **Interface Segregation**: Small, focused interfaces
- **Dependency Inversion**: Depend on abstractions, not concretions

### File Naming Conventions

- Screens: `*.screen.tsx` (e.g., `login.screen.tsx`)
- Components: `*.component.tsx` (e.g., `button.component.tsx`)
- Services: `*.service.ts` (e.g., `auth.service.ts`)
- Types: `*.types.ts` (e.g., `auth.types.ts`)
- Utils: `*.ts` (e.g., `helpers.ts`)

### Import Aliases

The `@/` alias points to the `src/` directory:

```typescript
import { HomeScreen, LoginScreen } from "@/screens";
import { Button } from "@/components";
import { authService } from "@/services";
import { validateEmail } from "@/utils";
import type { User } from "@/types";
```

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
