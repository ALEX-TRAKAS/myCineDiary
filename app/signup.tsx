import { SignUpSignInForm } from "@/src/components/auth/SignUpSignInForm";
import { router } from "expo-router";
import { YStack } from "tamagui";

export default function SignUp() {
  return (
    <YStack f={1} jc="center" ai="center">
      <SignUpSignInForm
        type="sign-up"
        isAuth={false}
        onSuccess={() => router.replace("/(tabs)/home")}
        onSwitchMode={() => router.push("/signin")}
      />
    </YStack>
  );
}
