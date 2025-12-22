
import { TMDBMedia } from '@/types/tmdb';
import { useEffect, useState } from 'react';
import { Text, YStack } from 'tamagui';
import { MovieShowsList } from '../../components/movieShowsList';

export default function Home() {
  const [data, setData] = useState<TMDBMedia[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);

    const res = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.TMDB_API_KEY}&page=${page}`
    );
    const json = await res.json();

    setData(prev => [...prev, ...json.results]);
    setPage(prev => prev + 1);
    setLoading(false);
  };

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
