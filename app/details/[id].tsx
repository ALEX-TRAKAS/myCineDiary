import { getMediaDataByID } from "@/src/api/media";
import { createReview, getPublicReviews } from "@/src/api/reviews";
import { fetchMediaByID } from "@/src/api/tmbdApi";
import {
  addUserMedia,
  getUserMediaByTMDBID,
  removeUserMedia,
} from "@/src/api/userMedia";
import { AuthProvider } from "@/src/auth/AuthContext";
import ReviewModal from "@/src/components/reviewModal";
import SpoilerText from "@/src/components/spoilerText";
import { WebHeader } from "@/src/components/webHeader";
import { isLoggedIn } from "@/src/lib/tokenStorage";
import { ArrowBigLeft, Bookmark, Pen } from "@tamagui/lucide-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Spinner, Stack, Text, XStack, YStack } from "tamagui";

export default function Details() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [item, setItem] = useState<any>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const { id, type } = useLocalSearchParams<{
    id: string;
    type: "movie" | "tv";
  }>();

  const checkBookmark = async () => {
    try {
      const data = await getUserMediaByTMDBID(Number(id), type);
      setBookmarked(!!data);
    } catch (err) {
      console.error("Bookmark check error:", err);
      setBookmarked(false);
    }
  };

  const toggleBookmark = async () => {
    try {
      if (bookmarked) {
        await removeUserMedia(item.id, type);
      } else {
        await addUserMedia(
          {
            tmdbId: item.id,
            mediaType: type,
            title: item.title ?? item.name ?? "Unknown Title",
            posterPath: item.poster_path ?? "",
            backdropPath: item.backdrop_path ?? "",
            overview: item.overview ?? "",
            releaseDate: item.release_date ?? item.first_air_date,
            genres: item.genres ?? [],
          },
          {
            status: "watchlist",
            isFavorite: true,
          },
        );
      }

      setBookmarked((prev) => !prev);
    } catch (err) {
      console.error("Bookmark error:", err);
    }
  };

  const loadMedia = async () => {
    try {
      const data = await getMediaDataByID(id, type);

      if (data) {
        setItem(data);
        return;
      }

      const tmdb = await fetchMediaByID(id, type);
      setItem(tmdb);
    } catch (err) {
      console.error("Media load error:", err);
    }
  };

  const loadReviews = async (pageNumber: number) => {
    try {
      setLoadingReviews(true);

      const data = await getPublicReviews(Number(id), type, pageNumber, 12);

      if (!data?.reviews) {
        console.error("Invalid reviews response:", data);
        return;
      }

      setReviews((prev) =>
        pageNumber === 1 ? data.reviews : [...prev, ...data.reviews],
      );

      setTotalPages(data.total_pages ?? 1);
      setPage(pageNumber);
    } catch (err) {
      console.error("Review fetch error:", err);
      setReviews([]);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      loadMedia();
      loadReviews(1);

      if (await isLoggedIn()) {
        checkBookmark();
      }
    };

    init();
  }, [id, type]);
  if (!item) {
    return (
      <YStack f={1} ai="center" jc="center" bg="$background">
        <Spinner size="large" color="$primary" />
      </YStack>
    );
  }
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
                  {Array.isArray(reviews) &&
                    reviews.map((review) => (
                      <>
                        <Text fontSize="$5" opacity={0.8}>
                          ⭐ {item.average_rating?.toFixed(1) ?? 0}(
                          {item.reviews_count ?? 0} reviews)
                        </Text>
                      </>
                    ))}

                  <Button
                    size="$4"
                    backgroundColor={bookmarked ? "$primary" : undefined}
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
                    onPress={() => setReviewModalOpen(true)}
                    icon={<Pen />}
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
                {Array.isArray(reviews) &&
                  reviews.length === 0 &&
                  !loadingReviews && (
                    <Text color="$gray10">No reviews yet.</Text>
                  )}

                {Array.isArray(reviews) &&
                  reviews.map((review) => (
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
                        <Text color="$white">{review.review_text}</Text>
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
        <ReviewModal
          open={reviewModalOpen}
          onOpenChange={setReviewModalOpen}
          onSubmit={async ({ rating, reviewText, isSpoiler }) => {
            try {
              await createReview({
                tmdbId: Number(id),
                mediaType: type,
                rating,
                reviewText,
                isSpoiler,
              });

              loadReviews(1);
            } catch (err) {
              console.error("Submit review error:", err);
            }
          }}
        />
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
