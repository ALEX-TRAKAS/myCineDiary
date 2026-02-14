import { MediaSearch } from "@/src/components/mediaSearch";
import { TrendingCarousel } from "@/src/components/trendingCarousel";
import { TMDBMedia } from "@/types/tmdb";
import { useEffect, useState } from "react";
import { Separator, Text, YStack } from "tamagui";
import { fetchTrendingMovies, fetchTrendingTv } from "../../src/api/tmbdApi";

export default function Home() {
  const [moviesData, setData] = useState<TMDBMedia[]>([]);
  const [tvData, setTvData] = useState<TMDBMedia[]>([]);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [loadingTv, setLoadingTv] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTrendingMovies = async () => {
      setLoadingMovies(true);
      setError(null);

      try {
        const res = await fetchTrendingMovies("movie", 1);

        if (!Array.isArray(res?.results)) {
          throw new Error("Invalid response");
        }
        setData(res.results.slice(0, 10));
      } catch (err) {
        console.error(err);
        setError("Failed to load trending.");
      } finally {
        setLoadingMovies(false);
      }
    };

    const loadTrendingTv = async () => {
      setLoadingTv(true);
      setError(null);

      try {
        const res = await fetchTrendingTv("tv", 1);

        if (!Array.isArray(res?.results)) {
          throw new Error("Invalid response");
        }
        setTvData(res.results.slice(0, 10));
      } catch (err) {
        console.error(err);
        setError("Failed to load trending TV shows.");
      } finally {
        setLoadingTv(false);
      }
    };

    loadTrendingMovies();
    loadTrendingTv();
  }, []);

  return (
    <YStack f={1} bg="$background" ai="center">
      <YStack px="$4" pt="$4" pb="$3" ai="center">
        <MediaSearch placeholder="Search movies, shows" inputWidth={600} />
        <Text fontSize="$8" fontWeight="700">
          Trending Movies
        </Text>
        <Separator alignSelf="stretch" mx={16} borderColor="$gray8" />
      </YStack>
      <YStack px="$3" w="100%" alignSelf="center" maxWidth={900}>
        {error && <Text color="red">{error}</Text>}
        <TrendingCarousel data={moviesData} />
      </YStack>
      <Separator alignSelf="stretch" mx={16} borderColor="$gray8" />
      <YStack px="$4" pt="$4" pb="$3" ai="center">
        <Text fontSize="$8" fontWeight="700">
          Trending TV Shows
        </Text>
        <Separator alignSelf="stretch" mx={16} borderColor="$gray8" />
      </YStack>
      <YStack px="$3" w="100%" alignSelf="center" maxWidth={900}>
        {error && <Text color="red">{error}</Text>}
        <TrendingCarousel data={tvData} />
      </YStack>
    </YStack>
  );
}
