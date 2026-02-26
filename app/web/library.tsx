import { getUserMedia } from "@/src/api/userMedia";
import { ProtectedRoute } from "@/src/components/auth/protectedRoute";
import { LibraryList } from "@/src/components/libraryList";
import { MCDMedia } from "@/types/myCineDiaryMedia";
import { useEffect, useState } from "react";
import { Button, Paragraph, XStack, YStack } from "tamagui";

export default function Library() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [data, setData] = useState<MCDMedia[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const filters = ["all", "movies", "series", "favorites", "completed"];

  useEffect(() => {
    fetchLibrary(1, true);
  }, [activeFilter]);

  const fetchLibrary = async (pageToFetch: number, reset = false) => {
    if (reset) {
      setData([]);
      setHasMore(true);
    }

    try {
      setLoading(true);

      const json = await getUserMedia({
        mediaType:
          activeFilter === "all"
            ? undefined
            : activeFilter === "series"
              ? "tv"
              : "movie",
        page: pageToFetch,
        limit: 20,
      });

      const items: MCDMedia[] = json.items ?? [];

      if (items.length === 0) {
        setHasMore(false);
        return;
      }

      setData((prev) => (reset ? items : [...prev, ...items]));
      setPage(pageToFetch);

      if (json.current_page >= json.total_pages) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Fetch library error:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (loading || !hasMore) return;
    fetchLibrary(page + 1);
  };

  return (
    <ProtectedRoute>
      <XStack flex={1} backgroundColor="#111">
        <YStack width={250} backgroundColor="#181818" padding="$5" gap="$3">
          <Paragraph color="#fff" fontWeight="700" fontSize="$6" mb="$3">
            Filters
          </Paragraph>

          {filters.map((filter) => (
            <Button
              key={filter}
              onPress={() => setActiveFilter(filter)}
              backgroundColor={
                activeFilter === filter ? "$primary" : "transparent"
              }
              color="#fff"
              justifyContent="flex-start"
            >
              {filter.toUpperCase()}
            </Button>
          ))}
        </YStack>

        <YStack flex={1}>
          <Paragraph fontSize="$8" fontWeight="700" color="#fff" padding="$6">
            Your Watchlist
          </Paragraph>

          <YStack flex={1}>
            <LibraryList
              data={data}
              loading={loading}
              loadMore={loadMore}
              layout="vertical"
            />
          </YStack>
        </YStack>
      </XStack>
    </ProtectedRoute>
  );
}
