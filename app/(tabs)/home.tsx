
import { TMDBMedia } from '@/types/tmdb';
import { Bell } from '@tamagui/lucide-icons';
import { useCallback, useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, ScrollView, Stack, Text, XStack, YStack } from 'tamagui';
import { fetchTrending } from '../../src/api/tmbdApi';
import { MovieShowsList } from '../../src/components/movieShowsList';

export default function Home() {
  const insets = useSafeAreaInsets(); 
  const [data, setData] = useState<TMDBMedia[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  
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
    <YStack f={1} bg="$background" ai="center">
      <XStack px="$4" py="$3" pt={insets.top + 12} w="100%" ai="center" jc="space-between" bc="$surface">
        <XStack ai="center">
          <Stack width={40} height={40}>
          </Stack>
          <YStack>
            <Text fontSize={12} color="$color">
              Welcome back,
            </Text>
            <Text fontSize={17} fontWeight="700" color="$color">
              Alex
            </Text>
          </YStack>
        </XStack>
        <Button circular bc="$surface">
          <Bell size={24} color={notificationsLoading ? '#aaa' : '#000'} />
        </Button>
      </XStack>
      <YStack px="$4" pt="$4" pb="$3" w="100%">
        <Text fontSize="$8" fontWeight="700" color="$color">
          Trending
        </Text>
      </YStack>
      <YStack f={1} px="$3" w="100%" alignSelf="center" maxWidth={900}>
        <MovieShowsList data={data} loading={loading} loadMore={fetchData} layout="horizontal" />
      </YStack>
      <YStack px="$4" pt="$4" w="100%">
        <Text fontSize="$6" fontWeight="700" color="$color">
          Continue Watching
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <YStack width={160} mr="$3">
            <YStack mt="$2">
              <Text fontWeight="700" fontSize={14} color="$color" numberOfLines={1}>
                test show/movie
              </Text>
              <Text fontSize={12} color="$color">
                season? episode? movie title?
              </Text>
            </YStack>
          </YStack>
        </ScrollView>
      </YStack>
    </YStack>
  );
}
