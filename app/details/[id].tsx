import { WebHeader } from "@/src/components/webHeader";
import { ArrowBigLeft } from "@tamagui/lucide-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Stack, Text, XStack, YStack } from "tamagui";

export default function Details() {
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const { id, type } = useLocalSearchParams<{
    id: string;
    type: "movie" | "tv";
  }>();

  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then(setItem);
  }, [id, type]);

  if (!item) return null;
  console.log(item);
  if (isWeb) {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: "$background" }}
      >
        <WebHeader />
        <XStack
          px="$6"
          py="$20"
          pt={insets.top}
          bg="$background"
          f={1}
          minHeight="100vh"
          $sm={{ flexDirection: "column" }}
        >
          <Text fontSize="$8" fontWeight="700">
            {item.title ?? item.name}
          </Text>
          <XStack
            ai="center"
            gap="$6"
            flexDirection="row"
            $sm={{ flexDirection: "column" }}
          >
            <YStack f={1} gap="$4" p="$4">
              <Text fontSize="$8" fontWeight="700">
                {item.genres?.length
                  ? `Genres: ${item.genres
                      .map((g: { name: any }) => g.name)
                      .join(", ")}`
                  : ""}
              </Text>
            </YStack>
            <YStack f={1} gap="$4" p="$4">
              <Image
                source={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                style={{
                  width: "100%",
                  maxWidth: 300,
                  height: 400,
                  borderRadius: 16,
                }}
              />
              <Text>{item.overview}</Text>
            </YStack>
          </XStack>
        </XStack>
      </ScrollView>
    );
  }
  return (
    <ScrollView>
      <YStack f={1} gap="$4" p="$4" bg="$background">
        <XStack
          px="$4"
          py="$3"
          pt={insets.top + 12}
          w="100%"
          ai="center"
          jc="space-between"
          bc="$surface"
        >
          <XStack ai="center">
            <Stack width={40} height={40}></Stack>
            <YStack position="absolute" left={0}>
              <Button
                circular
                backgroundColor="$surface"
                icon={<ArrowBigLeft size={24} color={"#aaa"} />}
              />
            </YStack>
          </XStack>
        </XStack>
        <Image
          source={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          style={{ width: "100%", height: 400, borderRadius: 16 }}
        />
        <Text fontSize="$8" fontWeight="700">
          {item.title ?? item.name}
        </Text>
        <Text>{item.overview}</Text>
      </YStack>
    </ScrollView>
  );
}
