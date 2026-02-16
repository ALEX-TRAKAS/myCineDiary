import { TMDBMedia } from "@/types/tmdb";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { Animated, FlatList, Platform } from "react-native";
import { Button, YStack } from "tamagui";
import { MovieShowCard } from "./movieShowCard";

type Props = {
  data: TMDBMedia[];
  mediaType: "movie" | "tv";
};

export function TrendingCarousel({ data, mediaType }: Props) {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);

  const ITEM_WIDTH = 140;
  const SPACING = 12;

  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <YStack>
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        snapToInterval={ITEM_WIDTH + SPACING}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 16 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          const inputRange = [
            (ITEM_WIDTH + SPACING) * (index - 1),
            (ITEM_WIDTH + SPACING) * index,
            (ITEM_WIDTH + SPACING) * (index + 1),
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={{ transform: [{ scale }], marginRight: SPACING }}
            >
              <MovieShowCard
                item={item}
                onPress={() =>
                  router.push({
                    pathname: "/details/[id]",
                    params: {
                      id: item.id,
                      type: item.media_type ?? (item.title ? "movie" : "tv"),
                    },
                  })
                }
              />
            </Animated.View>
          );
        }}
      />
      {Platform.OS === "web" && (
        <>
          <Button
            position="absolute"
            left={0}
            top="40%"
            zIndex={10}
            opacity={0.7}
            onPress={() =>
              flatListRef.current?.scrollToOffset({
                offset: -(ITEM_WIDTH + SPACING) * 2,
                animated: true,
              })
            }
          >
            ◀
          </Button>

          <Button
            position="absolute"
            right={0}
            top="40%"
            zIndex={10}
            opacity={0.7}
            onPress={() =>
              flatListRef.current?.scrollToOffset({
                offset: (ITEM_WIDTH + SPACING) * 2,
                animated: true,
              })
            }
          >
            ▶
          </Button>
        </>
      )}
      <Button
        mt="$3"
        alignSelf="flex-end"
        onPress={() =>
          router.push({
            pathname: "/shared/trending",
            params: { type: mediaType },
          })
        }
      >
        Show More
      </Button>
    </YStack>
  );
}
