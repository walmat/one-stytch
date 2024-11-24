import type { OneRouter } from 'one'

declare module 'one' {
  export namespace OneRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/sign-in` | `/(tabs)` | `/(tabs)/` | `/(tabs)/activity` | `/(tabs)/discover` | `/(tabs)/profile` | `/(tabs)/trade` | `/_sitemap` | `/activity` | `/discover` | `/notifications` | `/onboarding` | `/profile` | `/settings` | `/sign-in` | `/trade` | `/wallets`
      DynamicRoutes: never
      DynamicRouteTemplate: never
      IsTyped: true
    }
  }
}