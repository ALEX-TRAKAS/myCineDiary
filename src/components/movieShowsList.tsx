import { TMDBMedia } from '@/types/tmdb';
import { useRouter } from 'expo-router';
import { FlatList, Platform } from 'react-native';
import { MovieShowCard } from './movieShowCard';
import { SkeletonCard } from './skeletonCard';

type Props = {
  data: TMDBMedia[];
  loading: boolean;
  loadMore: () => void;
};

export function MovieShowsList({ data, loading, loadMore }: Props) {
  const router = useRouter();
  const isWeb = Platform.OS === 'web';

  return (
    <FlatList
      data={data}
      key={isWeb ? 'grid' : 'vertical'}
      keyExtractor={(item) => item.id.toString()}
    
      numColumns={isWeb ? 5 : 2}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{ gap: 16, padding: 16 }}
      columnWrapperStyle={isWeb ? { gap: 16 } : { gap: 20 }}
      onEndReached={loadMore}
      onEndReachedThreshold={0.6}
      ListFooterComponent={
        loading ? <SkeletonCard /> : null
      }
     renderItem={({ item }: { item: TMDBMedia }) => (
        <MovieShowCard
          item={item}
          onPress={() => {
            router.push({
              pathname: "/details/[id]",
              params: {
                id: String(item.id),
                type: item.media_type,
              },
            });
          }}
        />
      )}
    />
  );
}
