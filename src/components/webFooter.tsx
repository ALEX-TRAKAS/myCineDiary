import { Anchor, Text, XStack, YStack } from "tamagui";

export function WebFooter() {
  return (
    <YStack
      background="$primary"
      padding="$4"
      borderTopWidth={1}
      borderColor="$borderColor"
      >
      <XStack justifyContent="space-between" flexWrap="wrap" mb="$3">
        <YStack>
          <Text fontWeight="700" color="$color">MyCineDiary</Text>
          <Text fontSize="$2" color="$color" opacity={0.7}>
            Track your favorite movies & TV shows
          </Text>
        </YStack>

        <YStack>
          <Text fontWeight="700" color="$color">Company</Text>
          <Anchor href="/about" color="$color">About Us</Anchor>
          <Anchor href="/contact" color="$color">Contact</Anchor>
          <Anchor href="/privacy" color="$color">Privacy Policy</Anchor>
        </YStack>

        <YStack>
          <Text fontWeight="700" color="$color">Follow Us</Text>
          <Anchor href="https://twitter.com" color="$color">Twitter</Anchor>
          <Anchor href="https://facebook.com" color="$color">Facebook</Anchor>
          <Anchor href="https://instagram.com" color="$color">Instagram</Anchor>
        </YStack>
      </XStack>
      <XStack justifyContent="center">
        <Text fontSize="$2" opacity={0.6} color="$color">
          © {new Date().getFullYear()} MyCineDiary. All rights reserved.
        </Text>
      </XStack>
    </YStack>
  );
}
