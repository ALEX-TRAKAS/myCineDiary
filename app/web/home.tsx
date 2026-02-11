import { MediaSearch } from "@/src/components/mediaSearch";
import { TrendingCarousel } from "@/src/components/trendingCarousel";
import { TMDBMedia } from "@/types/tmdb";
import { useEffect, useState } from "react";
import { Separator, Text, YStack } from "tamagui";
import { fetchTrending } from "../../src/api/tmbdApi";

export default function Home() {
  const [data, setData] = useState<TMDBMedia[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTrending = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetchTrending("movie", 1);

        if (!Array.isArray(res?.results)) {
          throw new Error("Invalid response");
        }
        setData(res.results.slice(0, 10));
      } catch (err) {
        console.error(err);
        setError("Failed to load trending.");
      } finally {
        setLoading(false);
      }
    };

    loadTrending();
  }, []);

  return (
    <YStack f={1} bg="$background" ai="center">
      <YStack px="$4" pt="$4" pb="$3" ai="center">
        <MediaSearch placeholder="Search movies, shows" inputWidth={600} />
        <Text fontSize="$8" fontWeight="700">
          Trending
        </Text>
        <Separator alignSelf="stretch" mx={16} borderColor="$gray8" />
      </YStack>

      <YStack px="$3" w="100%" alignSelf="center" maxWidth={900}>
        {error && <Text color="red">{error}</Text>}
        <TrendingCarousel data={data} />
      </YStack>
    </YStack>
  );
}
