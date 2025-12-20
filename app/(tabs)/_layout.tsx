import { Home, Library, Search } from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from 'react-native';
import { TamaguiProvider, Theme } from 'tamagui';


export default function TabsLayout() {
  const colorScheme = useColorScheme();
    
  return (
    <TamaguiProvider>
    <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
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
    </Theme>
    </TamaguiProvider>
  );
}
