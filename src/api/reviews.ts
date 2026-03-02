import { authFetch } from "../lib/authFetch";

export interface CreateReviewPayload {
  tmdbId: number;
  mediaType: "movie" | "tv";
  rating: number;
  reviewText: string;
  isSpoiler: boolean;
}

export async function createReview(data: CreateReviewPayload) {
  const response = await authFetch(
    `${process.env.EXPO_PUBLIC_API_URL}/reviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tmdb_id: data.tmdbId,
        media_type: data.mediaType,
        rating: data.rating,
        review_text: data.reviewText,
        is_spoiler: data.isSpoiler,
      }),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create review");
  }

  return response.json();
}

export async function getPublicReviews(
  tmdbId: number,
  mediaType: "movie" | "tv",
  page = 1,
  limit = 12,
) {
  const response = await authFetch(
    `${process.env.EXPO_PUBLIC_API_URL}/reviews?tmdb_id=${tmdbId}&media_type=${mediaType}&page=${page}&limit=${limit}`,
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch reviews");
  }

  return response.json();
}
