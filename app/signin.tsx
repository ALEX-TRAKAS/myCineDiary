import { SignUpSignInForm } from "@/src/components/auth/SignUpSignInForm";
import { router } from "expo-router";
import { YStack } from "tamagui";

export default function SignIn() {
  return (
    <YStack f={1} jc="center" ai="center">
      <SignUpSignInForm
        type="sign-in"
        isAuth={false}
        onSuccess={() => router.replace("/(tabs)/home")}
        onSwitchMode={() => router.push("/signup")}
      />
    </YStack>
  );
}
