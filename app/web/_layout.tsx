import { AuthProvider } from "@/src/auth/AuthContext";
import { WebFooter } from "@/src/components/webFooter";
import { WebHeader } from "@/src/components/webHeader";
import { Slot } from "expo-router";
import { ScrollView, useColorScheme } from "react-native";
import { Theme, YStack } from "tamagui";

export default function WebLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <Theme name={colorScheme === "dark" ? "dark" : "light"}>
        <YStack f={1} bg="$background">
          <WebHeader />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <YStack f={1} px="$4">
              <Slot />
            </YStack>
            <WebFooter />
          </ScrollView>
        </YStack>
      </Theme>
    </AuthProvider>
  );
}
