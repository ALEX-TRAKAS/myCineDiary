import { TMDBMedia } from '@/types/tmdb';
import { useRouter } from 'expo-router';
import { FlatList, Platform } from 'react-native';
import { MovieShowCard } from './movieShowCard';
import { SkeletonCard } from './skeletonCard';

type Props = {
  data: TMDBMedia[];
  loading: boolean;
  loadMore: () => void;
  layout?: 'vertical' | 'horizontal'; 
};

export function MovieShowsList({ data, loading, loadMore, layout = 'vertical' }: Props) {
  const router = useRouter();
  const isWeb = Platform.OS === 'web';

  
  const isHorizontal = layout === 'horizontal';
  const numColumns = !isHorizontal && isWeb ? 5 : !isHorizontal ? 2 : 1;
  const contentGap = 16;

  return (
    <FlatList
      data={data}
      key={layout + (isWeb ? '-web' : '-native')} 
      keyExtractor={(item, index) => `${item.id}-${item.media_type}-${index}`}
      horizontal={isHorizontal}
      numColumns={numColumns}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={!isHorizontal}
      contentContainerStyle={{
        gap: contentGap,
        padding: 16,
        flexDirection: isHorizontal ? 'row' : 'column',
      }}
      columnWrapperStyle={!isHorizontal ? { gap: contentGap } : undefined}
      onEndReached={!isHorizontal ? loadMore : undefined} 
      onEndReachedThreshold={0.6}
      ListFooterComponent={loading ? <SkeletonCard /> : null}
      renderItem={({ item }: { item: TMDBMedia }) => (
        <MovieShowCard
          item={item}
          onPress={() => {
            router.push({
              pathname: '/details/[id]',
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
