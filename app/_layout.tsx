import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { TamaguiProvider, Theme } from "tamagui";
import { tamaguiConfig } from "../tamagui.config";

export default function RootLayout() {
   const colorScheme = useColorScheme(); 

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Theme name={colorScheme === "dark" ? "dark" : "light"}>
        <Stack screenOptions={{ headerShown: false }} />
      </Theme>
    </TamaguiProvider>
  );
}
