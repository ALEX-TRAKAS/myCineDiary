import { YStack } from 'tamagui';

export function SkeletonCard() {
  return (
    <YStack
      width={140}
      height={210}
      borderRadius="$4"
      backgroundColor="$gray5"
      opacity={0.5}
    />
  );
}
