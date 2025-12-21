import { FlatList, Platform } from 'react-native';
import { MovieShowItem } from '../types/movieShowItem';
import { MovieShowCard } from './movieShowCard';
import { SkeletonCard } from './skeletonCard';

type Props = {
  data: MovieShowItem[];
  loading: boolean;
  loadMore: () => void;
};

export function MovieShowsList({ data, loading, loadMore }: Props) {
//   const router = useRouter();
  const isWeb = Platform.OS === 'web';

  return (
    <FlatList
      data={data}
      key={isWeb ? 'grid' : 'vertical'}
      keyExtractor={(item) => item.id.toString()}
      horizontal={!isWeb}
      numColumns={isWeb ? 5 : 1}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{ gap: 16, padding: 16 }}
      columnWrapperStyle={isWeb ? { gap: 16 } : undefined}
      onEndReached={loadMore}
      onEndReachedThreshold={0.6}
      ListFooterComponent={
        loading ? <SkeletonCard /> : null
      }
      renderItem={({ item }) => (
        <MovieShowCard
          item={item}
        //   onPress={() =>
        //     // router.push(`/details/${item.id}?type=${item.media_type}`)
        //   }
        />
      )}
    />
  );
}
