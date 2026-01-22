import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { Theme } from "tamagui";

import { AuthProvider } from "@/src/auth/AuthContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Theme name={colorScheme === "dark" ? "dark" : "light"}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </Theme>
  );
}
