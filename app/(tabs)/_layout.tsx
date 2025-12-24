import { CircleUser, Home, Library, Search } from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
        <Tabs  screenOptions={{
          headerShown: false,
            tabBarActiveTintColor: '$primary',
            tabBarInactiveTintColor: '#888',
            tabBarStyle: {
                 backgroundColor: '#000',
        },
      }}>
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
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: () => <CircleUser color={"$primary"} />,
            }}
          />
        </Tabs>
    
  );
}
