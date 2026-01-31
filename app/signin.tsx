import { SignUpSignInForm } from "@/src/components/auth/SignUpSignInForm";
import { router } from "expo-router";
import { Platform } from "react-native";
import { YStack } from "tamagui";

export default function SignIn() {
  return (
    <YStack f={1} jc="center" ai="center">
      <SignUpSignInForm
        type="sign-in"
        isAuth={false}
        onSuccess={() =>
          router.replace(Platform.OS === "web" ? "/web/home" : "/(tabs)/home")
        }
        onSwitchMode={() => router.push("/signup")}
      />
    </YStack>
  );
}
