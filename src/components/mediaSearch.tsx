import { searchMediaAll } from "@/src/api/tmbdApi";
import { MovieShowsList } from "@/src/components/movieShowsList";
import { TMDBMedia } from "@/types/tmdb";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Input, YStack } from "tamagui";

interface MediaSearchProps {
  placeholder?: string;
  autoFocus?: boolean;
  inputWidth?: number | string;
}

export function MediaSearch({
  placeholder = "Search movies & series",
  autoFocus = false,
  inputWidth = "800px",
}: MediaSearchProps) {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<TMDBMedia[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchSearch = useCallback(async () => {
    if (loading || !query.trim() || !hasMore) return;

    setLoading(true);

    try {
      const res = await searchMediaAll(query, page);

      if (!res?.results || !Array.isArray(res.results)) {
        throw new Error("Invalid response from server");
      }

      setData((prev) => (page === 1 ? res.results : [...prev, ...res.results]));

      setHasMore(page < res.total_pages);
      setPage((prev) => prev + 1);
    } catch (e) {
      console.error("Search error:", e);
    } finally {
      setLoading(false);
    }
  }, [query, page, loading, hasMore]);

  useEffect(() => {
    if (!query.trim()) return;

    const timeout = setTimeout(() => {
      setPage(1);
      setData([]);
      setHasMore(true);
      fetchSearch();
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <YStack f={1} ai="center">
      <View>
        <Input
          autoFocus={autoFocus}
          height={40}
          margin={12}
          marginBottom={20}
          width={inputWidth}
          paddingHorizontal={10}
          borderWidth={1}
          borderColor="$primary"
          fontSize={16}
          textAlign="center"
          placeholder={placeholder}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => {
            setPage(1);
            setData([]);
            setHasMore(true);
            fetchSearch();
          }}
        />
      </View>

      <MovieShowsList data={data} loading={loading} loadMore={fetchSearch} />
    </YStack>
  );
}
