import { useAuth } from "@/src/auth/AuthContext";
import {
  CircleUser,
  Home,
  Library,
  MessageSquare,
  Search,
} from "@tamagui/lucide-icons";
import { Redirect, Tabs } from "expo-router";

export default function TabsLayout() {
  const { user, loading } = useAuth();
  if (loading) return null;

  if (!user) {
    return <Redirect href="/signin" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "$primary",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: "#000",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: () => <Home color={"$primary"} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: () => <Search color={"$primary"} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: () => <Library color={"$primary"} />,
        }}
      />
      <Tabs.Screen
        name="threads"
        options={{
          title: "Threads",
          tabBarIcon: () => <MessageSquare color={"$primary"} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: () => <CircleUser color={"$primary"} />,
        }}
      />
    </Tabs>
  );
}
