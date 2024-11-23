import { Link, Tabs } from "one";
import { View } from "tamagui";
import { Logo } from "~/code/brand/Logo";
import { NotificationsButton } from "~/code/notifications/NotificationsButton";
import { HomeIcons } from "~/code/home/HomeIcons";
import { useTheme } from "tamagui";

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerRight: () => (
          <View px="$4">
            <NotificationsButton />
          </View>
        ),
        headerTitle: () => null,
        tabBarLabel: () => null,
        headerLeft: () => (
          <Link href="/wallets">
            <View px="$4">
              {/* TODO: Replace this with wallet selector */}
              <Logo />
            </View>
          </Link>
        ),
        tabBarActiveTintColor: theme.color.val,
        tabBarInactiveTintColor: theme.gray9.val,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcons.Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcons.Discover size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="trade"
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcons.Trade size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcons.Activity size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcons.User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
