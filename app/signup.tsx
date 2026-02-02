import { SignUpSignInForm } from "@/src/components/auth/SignUpSignInForm";
import { WebHeader } from "@/src/components/webHeader";
import { router } from "expo-router";
import { YStack } from "tamagui";

export default function SignUp() {
  return (
    <YStack f={1} bg="$background">
      <WebHeader />
      <YStack px="$4" pt="$4" pb="$3" ai="center">
        <SignUpSignInForm
          type="sign-up"
          isAuth={false}
          onSuccess={() => router.replace("/(tabs)/home")}
          onSwitchMode={() => router.push("/signin")}
        />
      </YStack>
    </YStack>
  );
}
