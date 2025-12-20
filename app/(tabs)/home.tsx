import { Text, YStack } from "tamagui";

export default function Home() {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center" background="$background">
      <Text fontSize="$8" fontWeight="700" color="$color">
        TODO : HOME : MyCineDiary 
      </Text>
    </YStack>
  );
}
