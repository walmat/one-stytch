import { SignInScreen } from "~/code/auth/sign-in-screen";
import { Stack } from "one";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={["top", "bottom", "left", "right"]}
    >
      <Stack.Screen />
      <SignInScreen />
    </SafeAreaView>
  );
}
