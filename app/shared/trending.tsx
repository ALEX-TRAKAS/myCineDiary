import { AuthProvider } from "@/src/auth/AuthContext";
import { MovieShowsList } from "@/src/components/movieShowsList";
import { WebHeader } from "@/src/components/webHeader";
import { TMDBMedia } from "@/types/tmdb";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Separator, Text, YStack } from "tamagui";

export default function TrendingScreen() {
  const { type } = useLocalSearchParams();
  const [data, setData] = useState<TMDBMedia[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/${type}/week?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}&page=${page}`,
      );
      const json = await res.json();
      if (!Array.isArray(json?.results)) {
        throw new Error("Invalid response");
      }
      setData((prev) => [...prev, ...json.results]);
      setHasMore(json.results.length > 0);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);
  useEffect(() => {
    fetchData();
  }, []);

  if (isWeb) {
    return (
      <AuthProvider>
        <WebHeader />

        <YStack
          f={1}
          bg="$background"
          pt={insets.top}
          minHeight="100vh"
          alignItems="center"
        >
          <YStack width="100%" maxWidth={900} px="$6" py="$6" f={1} ai="center">
            <Text fontSize="$8" fontWeight="700">
              Trending
            </Text>
            <Separator alignSelf="stretch" mx={16} borderColor="$gray8" />
            <MovieShowsList
              data={data}
              loading={loading}
              loadMore={fetchData}
            />
          </YStack>
        </YStack>
      </AuthProvider>
    );
  }
}
