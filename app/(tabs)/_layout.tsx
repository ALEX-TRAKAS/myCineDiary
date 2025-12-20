import { Home, Library, Search } from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

export default function TabsLayout() {
  const colorScheme = useColorScheme();

  return (
  
        <Tabs screenOptions={{ headerShown: false }}>
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => <Home color={color} />,
            }}
          />
          <Tabs.Screen
            name="search"
            options={{
              title: "Search",
              tabBarIcon: ({ color }) => <Search color={color} />,
            }}
          />
          <Tabs.Screen
            name="library"
            options={{
              title: "Library",
              tabBarIcon: ({ color }) => <Library color={color} />,
            }}
          />
        </Tabs>
    
  );
}
