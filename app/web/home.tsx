import { TMDBMedia } from '@/types/tmdb';
import { useCallback, useEffect, useState } from 'react';
import { Text, YStack } from 'tamagui';
import { fetchTrending } from '../../src/api/tmbdApi';
import { MovieShowsList } from '../../src/components/movieShowsList';

export default function Home() {
const [data, setData] = useState<TMDBMedia[]>([]);
const [loading, setLoading] = useState(false);
const [page, setPage] = useState(1);
const [error, setError] = useState<string | null>(null);
const [hasMore, setHasMore] = useState(true);


const fetchData = useCallback(async () => {
  if (loading || !hasMore) return;

  setLoading(true);
  setError(null);

  try {
    const res = await fetchTrending("movie", page);

    if (!Array.isArray(res?.results)) {
      throw new Error("Invalid response");
    }

    setData(prev => [...prev, ...res.results]);
    setHasMore(res.results.length > 0);
    setPage(prev => prev + 1);
  } catch (err) {
    console.error(err);
    setError("Failed to load data. Pull to retry.");
  } finally {
    setLoading(false);
  }
}, [page, loading, hasMore]);



useEffect(() => {
  fetchData();
}, []);


  return (
    <YStack f={1} bg="$background">
      <YStack
        px="$4"
        pt="$4"
        pb="$3"
        ai="center"
      >
        <Text
          fontSize="$8"
          fontWeight="700"
        >
          Trending
        </Text>
      </YStack>
      <YStack
        f={1}
        px="$3"
        w="100%"
        alignSelf="center"
        maxWidth={900}
      >
        <MovieShowsList
          data={data}
          loading={loading}
          loadMore={fetchData }
        />
      </YStack>
    </YStack>
  );
}
