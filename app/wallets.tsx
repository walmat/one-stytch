import { Stack, useLoader, type LoaderProps } from "one";
import { RefreshControl } from "react-native";
import { ScrollView } from "tamagui";
import { PageContainer } from "~/code/ui/PageContainer";

export async function loader({ path }: LoaderProps) {
  // TODO: Fetch user wallets
  return {};
}

export function WalletsPage() {
  const {} = useLoader(loader);

  return (
    <>
      <Stack.Screen />

      <PageContainer>
        <ScrollView maxHeight="100%">
          <RefreshControl refreshing={false} />
        </ScrollView>
      </PageContainer>
    </>
  );
}
