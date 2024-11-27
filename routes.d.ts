import type { OneRouter } from 'one'

declare module 'one' {
  export namespace OneRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/sign-in` | `/(root)` | `/(root)/` | `/(root)/(tabs)` | `/(root)/(tabs)/` | `/(root)/(tabs)/activity` | `/(root)/(tabs)/discover` | `/(root)/(tabs)/profile` | `/(root)/(tabs)/trade` | `/(root)/activity` | `/(root)/discover` | `/(root)/notifications` | `/(root)/onboarding` | `/(root)/profile` | `/(root)/settings` | `/(root)/trade` | `/(root)/wallets` | `/(tabs)` | `/(tabs)/` | `/(tabs)/activity` | `/(tabs)/discover` | `/(tabs)/profile` | `/(tabs)/trade` | `/_sitemap` | `/activity` | `/discover` | `/notifications` | `/onboarding` | `/profile` | `/settings` | `/sign-in` | `/trade` | `/wallets`
      DynamicRoutes: never
      DynamicRouteTemplate: never
      IsTyped: true
    }
  }
}