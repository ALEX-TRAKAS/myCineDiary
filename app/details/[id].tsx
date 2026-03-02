import { createReview, getPublicReviews } from "@/src/api/reviews";
import {
  addUserMedia,
  getUserMediaByTMDBID,
  removeUserMedia,
} from "@/src/api/userMedia";
import { AuthProvider } from "@/src/auth/AuthContext";
import SpoilerText from "@/src/components/spoilerText";
import StarRating from "@/src/components/starRating";
import { WebHeader } from "@/src/components/webHeader";
import { ArrowBigLeft, Bookmark, Pen } from "@tamagui/lucide-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Dialog, Stack, Text, TextArea, XStack, YStack } from "tamagui";

export default function Details() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [item, setItem] = useState<any>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const { id, type } = useLocalSearchParams<{
    id: string;
    type: "movie" | "tv";
  }>();

  const isbookmarked = async () => {
    try {
      const data = await getUserMediaByTMDBID(Number(id), type);
      if (data) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error("Bookmark check error:", err);
      return false;
    }
  };

  isbookmarked().then((isBookmarked) => {
    setBookmarked(isBookmarked);
  });

  const toggleBookmark = async () => {
    try {
      if (!bookmarked) {
        await addUserMedia({
          tmdbId: item.id,
          mediaType: type,
          title: item.title ?? item.name,
          posterPath: item.poster_path,
          backdropPath: item.backdrop_path,
          overview: item.overview,
          releaseDate:
            type === "movie" ? item.release_date : item.first_air_date,
        });
      } else {
        await removeUserMedia(item.id as number, type);
      }

      setBookmarked((prev) => !prev);
    } catch (err) {
      console.error("Bookmark error:", err);
    }
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}&language=en-US`,
    )
      .then((res) => res.json())
      .then(setItem);
  }, [id, type]);

  useEffect(() => {
    loadReviews(1);
  }, [id, type]);

  const loadReviews = async (pageNumber: number) => {
    try {
      setLoadingReviews(true);

      const data = await getPublicReviews(Number(id), type, pageNumber, 12);

      if (pageNumber === 1) {
        setReviews(data.reviews);
      } else {
        setReviews((prev) => [...prev, ...data.reviews]);
      }

      setTotalPages(data.total_pages);
      setPage(pageNumber);
    } catch (err) {
      console.error("Review fetch error:", err);
    } finally {
      setLoadingReviews(false);
    }
  };
  const handleSubmitReview = async () => {
    try {
      await createReview({
        tmdbId: Number(id),
        mediaType: type,
        rating,
        reviewText,
        isSpoiler,
      });

      setReviewModalOpen(false);
      setReviewText("");
      setRating(0);
      setIsSpoiler(false);

      loadReviews(1);
    } catch (err) {
      console.error("Submit review error:", err);
    }
  };
  if (!item) return null;
  if (isWeb) {
    return (
      <AuthProvider>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: "$background",
          }}
        >
          <WebHeader />
          <XStack py="$5" bg="$background" />
          <XStack
            px="$5"
            py="$10"
            pt={insets.top}
            bg="$background"
            f={1}
            minHeight="100vh"
            jc="center"
          >
            <XStack
              width="100%"
              maxWidth={1100}
              gap="$10"
              $sm={{ flexDirection: "column", gap: "$6" }}
            >
              <YStack ai="center" gap="$5" width={350} $sm={{ width: "100%" }}>
                <Image
                  source={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  style={{
                    width: "100%",
                    height: 500,
                    borderRadius: 20,
                    objectFit: "cover",
                  }}
                />
              </YStack>

              <YStack f={1} gap="$6" jc="flex-start">
                <Text fontSize="$10" fontWeight="800" lineHeight="$10">
                  {item.title ?? item.name}
                </Text>
                <XStack gap="$3" ai="center">
                  {item.genres?.length > 0 && (
                    <Text fontSize="$4" color="$gray10" fontWeight="600">
                      {item.genres
                        .map((g: { name: string }) => g.name)
                        .join(" • ")}
                    </Text>
                  )}
                  <Text fontSize="$5" opacity={0.8}>
                    ⭐ {item.average_rating?.toFixed(1) ?? 0}(
                    {item.reviews_count ?? 0} reviews)
                  </Text>
                  <Button
                    size="$4"
                    theme={bookmarked ? "active" : undefined}
                    onPress={toggleBookmark}
                    icon={
                      <Bookmark
                        fill={bookmarked ? "currentColor" : "transparent"}
                      />
                    }
                  >
                    {bookmarked ? "Bookmarked" : "Add to Bookmark"}
                  </Button>

                  <Button
                    icon={<Pen onPress={() => setReviewModalOpen(true)} />}
                  >
                    Write Review
                  </Button>
                </XStack>
                <YStack p="$6" bg="$color2" borderRadius="$6" gap="$3">
                  <Text fontSize="$6" fontWeight="700">
                    Overview
                  </Text>

                  <Text fontSize="$4" lineHeight="$6" color="$gray11">
                    {item.overview}
                  </Text>
                </YStack>
                <YStack mt="$6" gap="$4">
                  <Text fontSize="$7" fontWeight="700">
                    Reviews
                  </Text>
                </YStack>
                {reviews.map((review) => (
                  <YStack
                    key={review.id}
                    p="$4"
                    borderRadius="$4"
                    backgroundColor="$surface"
                    gap="$2"
                  >
                    <XStack jc="space-between">
                      <Text fontWeight="600">{review.user_name}</Text>
                      <Text>⭐ {review.rating}/10</Text>
                    </XStack>

                    {review.is_spoiler ? (
                      <SpoilerText text={review.review_text} />
                    ) : (
                      <Text>{review.review_text}</Text>
                    )}
                  </YStack>
                ))}
                {page < totalPages && (
                  <Button
                    onPress={() => loadReviews(page + 1)}
                    disabled={loadingReviews}
                  >
                    {loadingReviews ? "Loading..." : "Load More"}
                  </Button>
                )}
              </YStack>
            </XStack>
          </XStack>
        </ScrollView>
        <Dialog open={reviewModalOpen} onOpenChange={setReviewModalOpen}>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content p="$6" gap="$4">
              <Text fontSize="$7" fontWeight="700">
                Write a Review
              </Text>

              <StarRating rating={rating} setRating={setRating} />

              <TextArea
                placeholder="Share your thoughts..."
                value={reviewText}
                onChangeText={setReviewText}
              />

              <XStack ai="center" gap="$3">
                <Text>Contains spoilers</Text>
              </XStack>

              <Button onPress={handleSubmitReview}>Submit</Button>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      </AuthProvider>
    );
  }
  return (
    <AuthProvider>
      <ScrollView>
        <YStack f={1} gap="$4" p="$4" bg="$background">
          <XStack
            px="$4"
            py="$3"
            pt={insets.top + 12}
            w="100%"
            ai="center"
            jc="space-between"
            bc="$surface"
          >
            <XStack ai="center">
              <Stack width={40} height={40}></Stack>
              <YStack position="absolute" left={0}>
                <Button
                  circular
                  backgroundColor="$surface"
                  icon={<ArrowBigLeft size={24} color={"#aaa"} />}
                />
              </YStack>
            </XStack>
          </XStack>
          <Image
            source={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            style={{ width: "100%", height: 400, borderRadius: 16 }}
          />
          <Text fontSize="$8" fontWeight="700">
            {item.title ?? item.name}
          </Text>
          <Text>{item.overview}</Text>
        </YStack>
      </ScrollView>
    </AuthProvider>
  );
}
