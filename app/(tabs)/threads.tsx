import { ProtectedRoute } from "@/src/components/auth/protectedRoute";
import { Text, YStack } from "tamagui";

export default function Threads() {
  return (
    <ProtectedRoute>
      <YStack f={1} jc="center" ai="center">
        <Text fontSize="$8" fontWeight="700" color="$color">
          TODO : THREADS
        </Text>
      </YStack>
    </ProtectedRoute>
  );
}
