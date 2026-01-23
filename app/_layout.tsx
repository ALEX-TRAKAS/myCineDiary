import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { TamaguiProvider, Theme } from "tamagui";

import { AuthProvider } from "@/src/auth/AuthContext";
import config from "../tamagui.config";

export default function RootLayout() {
  const scheme = useColorScheme();

  return (
    <TamaguiProvider config={config}>
      <Theme name={scheme === "dark" ? "dark" : "light"}>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </AuthProvider>
      </Theme>
    </TamaguiProvider>
  );
}
