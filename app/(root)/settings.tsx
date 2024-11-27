import { Link, Stack, useLoader, type LoaderProps } from "one";
import { RefreshControl } from "react-native";
import { ScrollView, View } from "tamagui";
import { PageContainer } from "~/code/ui/PageContainer";
import { Settings } from "@tamagui/lucide-icons";

export async function loader({ path }: LoaderProps) {
  // TODO: Fetch user activity
  return {};
}

export function WalletsPage() {
  const {} = useLoader(loader);

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link href="/settings">
              <View px="$4">
                <Settings />
              </View>
            </Link>
          ),
        }}
      />

      <PageContainer>
        <ScrollView maxHeight="100%">
          <RefreshControl refreshing={false} />
        </ScrollView>
      </PageContainer>
    </>
  );
}
