import { Stack, useLoader, type LoaderProps } from "one";
import { useCallback } from "react";
import { RefreshControl } from "react-native";
import { Button, ScrollView, View } from "tamagui";
import { useSession } from "~/code/auth/session";
import { PageContainer } from "~/code/ui/PageContainer";

export async function loader({ path }: LoaderProps) {
  // TODO: Fetch user profile
  return {};
}

export function ProfilePage() {
  const {} = useLoader(loader);
  const { signOut } = useSession();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => <View />,
        }}
      />

      <PageContainer>
        <Button onPress={signOut}>Logout</Button>
      </PageContainer>
    </>
  );
}
