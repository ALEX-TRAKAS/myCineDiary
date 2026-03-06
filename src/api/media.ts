import { authFetch } from "@/src/lib/authFetch";

export async function getMediaDataByID(
  tmdbId: string,
  mediaType: "movie" | "tv",
) {
  const response = await authFetch(
    `${process.env.EXPO_PUBLIC_API_URL}/media/${tmdbId}?media_type=${mediaType}`,
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch media");
  }

  return response.json();
}
