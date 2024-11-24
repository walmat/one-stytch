import "@tamagui/core/reset.css";
import "~/code/styles/base.css";
import "~/code/styles/tamagui.css";
import "./_layout.css";

import { SchemeProvider, useColorScheme } from "@vxrn/color-scheme";
import { LoadProgressBar, Slot, Stack } from "one";
import { isWeb, TamaguiProvider, View } from "tamagui";
import config from "~/config/tamagui.config";
import { SessionProvider } from "~/code/store/session";
import { StytchProvider, StytchClient } from "@stytch/react-native";

const stytch = new StytchClient(process.env.VITE_STYTCH_PUBLIC_TOKEN ?? "");

export default function Layout() {
  return (
    <>
      {isWeb && (
        <>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=5"
          />
          <link rel="icon" href="/favicon.svg" />
        </>
      )}

      <LoadProgressBar />

      <StytchProvider stytch={stytch}>
        <SessionProvider>
          <SchemeProvider>
            <TamaguiRootProvider>
              <View f={1}>
                <Stack
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen
                    name="wallets"
                    options={{
                      title: "Accounts",
                      presentation: "modal",
                      animation: "slide_from_bottom",
                    }}
                  />
                  <Stack.Screen
                    name="notifications"
                    options={{
                      title: "Notifications",
                      presentation: "modal",
                      animation: "slide_from_bottom",
                    }}
                  />
                  <Stack.Screen
                    name="onboarding"
                    options={{
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name="settings"
                    options={{
                      headerShown: true,
                    }}
                  />
                </Stack>
              </View>
            </TamaguiRootProvider>
          </SchemeProvider>
        </SessionProvider>
      </StytchProvider>
    </>
  );
}

const TamaguiRootProvider = ({ children }: { children: React.ReactNode }) => {
  const [scheme] = useColorScheme();

  return (
    <TamaguiProvider
      disableInjectCSS
      config={config}
      defaultTheme={scheme}
      disableRootThemeClass
    >
      {children}
    </TamaguiProvider>
  );
};
