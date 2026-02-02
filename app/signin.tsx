import { SignUpSignInForm } from "@/src/components/auth/SignUpSignInForm";
import { WebHeader } from "@/src/components/webHeader";
import { router } from "expo-router";
import { Platform } from "react-native";
import { YStack } from "tamagui";

export default function SignIn() {
  return (
    <YStack f={1} bg="$background">
      <WebHeader />
      <YStack px="$4" pt="$4" pb="$3" ai="center">
        <SignUpSignInForm
          type="sign-in"
          isAuth={false}
          onSuccess={() =>
            router.replace(Platform.OS === "web" ? "/web/home" : "/(tabs)/home")
          }
          onSwitchMode={() => router.push("/signup")}
        />
      </YStack>
    </YStack>
  );
}
