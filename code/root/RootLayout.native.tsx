import { useSession } from "~/code/store/session";
import { SignInPage } from "~/app/(auth)/sign-in";
import { HomeLayout } from "~/code/home/HomeLayout";

export function RootLayout() {
  const { user } = useSession();
  if (!user) {
    return <SignInPage />;
  }

  return <HomeLayout />;
}
