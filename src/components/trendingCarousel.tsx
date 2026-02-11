import { TMDBMedia } from "@/types/tmdb";
import { useRouter } from "expo-router";
import { FlatList, Image } from "react-native";
import { Button, Text, YStack } from "tamagui";

type Props = {
  data: TMDBMedia[];
};

export function TrendingCarousel({ data }: Props) {
  const router = useRouter();

  return (
    <YStack>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <YStack mr="$3" width={140}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={{ width: 140, height: 210, borderRadius: 12 }}
            />
            <Text numberOfLines={1} mt="$2">
              {item.title}
            </Text>
          </YStack>
        )}
      />

      <Button
        mt="$3"
        alignSelf="flex-end"
        onPress={() => router.push("/shared/trending")}
      >
        Show More
      </Button>
    </YStack>
  );
}
