import { WebHeader } from '@/components/webHeader';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, ScrollView } from 'react-native';
import { Text, YStack } from 'tamagui';

export default function Details() {
  const isWeb = Platform.OS === 'web';
  const { id, type } = useLocalSearchParams<{
    id: string;
    type: 'movie' | 'tv';
  }>();

  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    )
      .then(res => res.json())
      .then(setItem);
  }, [id, type]);

  if (!item) return null;
 if(isWeb) {   
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 , backgroundColor: "$background" }}>
        <WebHeader />
        <YStack f={1} gap="$4" p="$4" bg="$background">
        <Image
          source={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          style={{ width: '100%', height: 400, borderRadius: 16 }}
        />
        <Text fontSize="$8" fontWeight="700">
          {item.title ?? item.name}
        </Text>
        <Text>{item.overview}</Text>
      </YStack>
    </ScrollView>
    );
    }
  return (
   
    <ScrollView>
      <YStack f={1} gap="$4" p="$4" bg="$background">
        <Image
          source={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          style={{ width: '100%', height: 400, borderRadius: 16 }}
        />
        <Text fontSize="$8" fontWeight="700">
          {item.title ?? item.name}
        </Text>
        <Text>{item.overview}</Text>
      </YStack>
    </ScrollView>
  );
}
