import { Stack } from "one";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
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
  );
}
