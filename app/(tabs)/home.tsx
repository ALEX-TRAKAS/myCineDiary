
import { TMDBMedia } from '@/types/tmdb';
import { useCallback, useEffect, useState } from 'react';
import { Text, YStack } from 'tamagui';
import { fetchTrending } from '../../src/api/tmbdApi';
import { MovieShowsList } from '../../src/components/movieShowsList';

export default function Home() {
  const [data, setData] = useState<TMDBMedia[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  
  const fetchData = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetchTrending("movie", page);
  
      setData(prev => [...prev, ...res.results]);
      setPage(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  }, [page, loading]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
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
      >
        <MovieShowsList
          data={data}
          loading={loading}
          loadMore={fetchData}
        />
      </YStack>
    </YStack>
  );
}
