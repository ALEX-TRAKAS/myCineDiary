import { searchMulti } from "@/src/api/tmbdApi";
import { MovieShowsList } from "@/src/components/movieShowsList";
import { TMDBMedia } from "@/types/tmdb";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { Input, Paragraph, Portal, YStack } from "tamagui";

interface MediaSearchProps {
  placeholder?: string;
  autoFocus?: boolean;
  inputWidth?: number | string;
}

function filterMedia(results: any[]): TMDBMedia[] {
  return results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv",
  );
}

export function MediaSearch({
  placeholder = "Search movies, series, actors...",
  autoFocus = false,
  inputWidth = 600,
}: MediaSearchProps) {
  const router = useRouter();
  const inputRef = useRef<View>(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TMDBMedia[]>([]);
  const [suggestions, setSuggestions] = useState<TMDBMedia[]>([]);
  const [open, setOpen] = useState(false);

  const [layout, setLayout] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const measureInput = () => {
    requestAnimationFrame(() => {
      inputRef.current?.measureInWindow((x, y, width, height) => {
        setLayout({
          left: x,
          top: y + height,
          width,
        });
      });
    });
  };

  const fetchAutocomplete = useCallback(async (text: string) => {
    if (!text.trim()) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    try {
      const res = await searchMulti(text, 1);
      const filtered = filterMedia(res.results);
      setSuggestions(filtered.slice(0, 6));
      setOpen(true);
    } catch (e) {
      console.error("Autocomplete error:", e);
    }
  }, []);

  const fetchSearch = useCallback(async () => {
    if (!query.trim()) return;

    try {
      const res = await searchMulti(query, 1);
      setResults(filterMedia(res.results));
      setOpen(false);
    } catch (e) {
      console.error("Search error:", e);
    }
  }, [query]);

  useEffect(() => {
    const t = setTimeout(() => {
      fetchAutocomplete(query);
    }, 300);

    return () => clearTimeout(t);
  }, [query]);

  return (
    <>
      <View ref={inputRef} onLayout={measureInput}>
        <Input
          autoFocus={autoFocus}
          width={inputWidth}
          height={40}
          textAlign="center"
          placeholder={placeholder}
          value={query}
          onFocus={() => {
            measureInput();
            if (suggestions.length > 0) setOpen(true);
          }}
          onChangeText={setQuery}
          onSubmitEditing={fetchSearch}
        />
      </View>

      {open && layout && (
        <Portal>
          <Pressable
            onPress={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 998,
            }}
          />

          <YStack
            position="absolute"
            top={layout.top}
            left={layout.left}
            width={layout.width}
            zIndex={999}
            bg="$background"
            borderRadius="$4"
            borderWidth={1}
            borderColor="$gray8"
            shadowColor="#000"
            shadowOpacity={0.15}
            shadowRadius={10}
            maxHeight={320}
            overflow="scroll"
            pointerEvents="auto"
          >
            {suggestions.map((item) => (
              <Pressable
                key={`${item.media_type}-${item.id}`}
                onPress={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                  router.push({
                    pathname: "/details/[id]",
                    params: {
                      id: String(item.id),
                      type: item.media_type,
                    },
                  });
                }}
              >
                <Paragraph
                  px="$3"
                  py="$2"
                  cursor="pointer"
                  hoverStyle={{ backgroundColor: "$gray4" }}
                >
                  {item.title || item.name}
                </Paragraph>
              </Pressable>
            ))}
          </YStack>
        </Portal>
      )}

      {results.length > 0 && (
        <MovieShowsList data={results} loading={false} loadMore={() => {}} />
      )}
    </>
  );
}
