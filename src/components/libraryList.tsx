import { MCDMedia } from "@/types/myCineDiaryMedia";
import { useRouter } from "expo-router";
import { FlatList, Platform } from "react-native";
import { LibraryShowCard } from "./libraryShowCard";
import { SkeletonCard } from "./skeletonCard";

type Props = {
  data: MCDMedia[];
  loading: boolean;
  loadMore: () => void;
  layout?: "vertical" | "horizontal";
};

export function LibraryList({
  data,
  loading,
  loadMore,
  layout = "vertical",
}: Props) {
  const router = useRouter();
  const isWeb = Platform.OS === "web";

  const isHorizontal = layout === "horizontal";
  const numColumns = !isHorizontal && isWeb ? 5 : !isHorizontal ? 2 : 1;
  const contentGap = 16;

  return (
    <FlatList
      data={data}
      key={layout + (isWeb ? "-web" : "-native")}
      keyExtractor={(item, index) =>
        `${item.tmdb_id}-${item.media_type}-${index}`
      }
      horizontal={isHorizontal}
      numColumns={numColumns}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={!isHorizontal}
      contentContainerStyle={{
        gap: contentGap,
        padding: 16,
        flexDirection: isHorizontal ? "row" : "column",
      }}
      columnWrapperStyle={!isHorizontal ? { gap: contentGap } : undefined}
      onEndReached={!isHorizontal ? loadMore : undefined}
      onEndReachedThreshold={0.2}
      ListFooterComponent={loading ? <SkeletonCard /> : null}
      renderItem={({ item }: { item: MCDMedia }) => (
        <LibraryShowCard
          item={item}
          onPress={() => {
            router.push({
              pathname: "/details/[id]",
              params: {
                id: String(item.tmdb_id),
                type: item.media_type,
              },
            });
          }}
        />
      )}
    />
  );
}
