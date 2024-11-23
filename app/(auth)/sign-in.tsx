import { SignInScreen } from "~/code/auth/sign-in-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export function SignInPage() {
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={["bottom", "left", "right", "top"]}
    >
      <SignInScreen />
    </SafeAreaView>
  );
}
