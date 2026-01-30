import { ProtectedRoute } from "@/src/components/auth/protectedRoute";
import { Text, YStack } from "tamagui";

export default function Profile() {
  return (
    <ProtectedRoute>
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        background="$background"
      >
        <Text fontSize="$8" fontWeight="700" color="$color">
          Profile Page (Tabs)
        </Text>
      </YStack>
    </ProtectedRoute>
  );
}
