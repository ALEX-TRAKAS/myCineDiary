import { searchMediaAll } from "@/src/api/tmbdApi";
import { TMDBMedia } from "@/types/tmdb";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Input, YStack } from "tamagui";
import { MovieShowsList } from '../../src/components/movieShowsList';




export default function Search() {
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

      setData(prev => page === 1 ? res.results : [...prev, ...res.results]);


      setHasMore(page < res.total_pages);
      setPage(prev => prev + 1);
    } catch (e) {
      console.error(e);
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
    <YStack f={1} jc="center"  ai="center">
      <YStack f={1} jc="center" >
        <View>
            <Input
              height={40}
              margin={12}
              marginBottom={20}
              width="800px"
              paddingHorizontal={10}
              paddingLeft={10}
              paddingRight={10}
              borderWidth={1}
              borderColor="$primary"
              fontSize={16}
              textAlign="center"
              color="white"
              placeholder="Search movies & series"
              placeholderTextColor="$primary"
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={() => {
                setPage(1);
                setData([]);
                fetchSearch();
              }}
            />
          </View>
          <MovieShowsList
            data={data}
            loading={loading}
            loadMore={fetchSearch}
          />
      </YStack>
    </YStack>
  );
}
