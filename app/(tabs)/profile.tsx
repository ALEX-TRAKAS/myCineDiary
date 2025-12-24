import { Text, YStack } from "tamagui";

export default function Profile() {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center" background="$background">
      <Text fontSize="$8" fontWeight="700" color="$color">
        Profile Page (Tabs)
      </Text>
    </YStack>
  );
}
