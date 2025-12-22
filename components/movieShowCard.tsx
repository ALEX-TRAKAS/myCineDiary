import { TMDBMedia } from '@/types/tmdb';
import { Image } from 'expo-image';
import { Pressable } from 'react-native';
import { Text, YStack } from 'tamagui';

type Props = {
  item: TMDBMedia;
  onPress?: () => void;
};

export function MovieShowCard({ item, onPress }: Props) {
  const title = item.title ?? item.name ?? 'Untitled';

  return (
    <Pressable onPress={onPress}>
      <YStack width={140} gap="$2">
        <Image
          source={
            item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : undefined
          }
          style={{
            width: 140,
            height: 210,
            borderRadius: 12,
            backgroundColor: '#222',
          }}
          contentFit="cover"
        />
        <Text
          numberOfLines={2}
          fontSize="$3"
          fontWeight="600"
          color="$color"
        >
          {title}
        </Text>
      </YStack>
    </Pressable>
  );
}
