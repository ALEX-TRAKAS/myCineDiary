import { authFetch } from "@/src/lib/authFetch";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8080/api";

export async function addUserMedia(
  media: {
    tmdbId: number;
    mediaType: "movie" | "tv";
    title: string;
    posterPath: string;
    backdropPath?: string;
    overview?: string;
    releaseDate?: string;
    genres?: { id: number; name: string }[];
  },
  options?: {
    status?: "watchlist" | "in_progress" | "completed";
    isFavorite?: boolean;
    notes?: string;
  },
) {
  const res = await authFetch(`${API_URL}/user/media`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tmdb_id: media.tmdbId,
      media_type: media.mediaType,
      title: media.title,
      poster_path: media.posterPath,
      backdrop_path: media.backdropPath ?? "",
      overview: media.overview ?? "",
      release_date: media.releaseDate
        ? new Date(media.releaseDate).toISOString()
        : null,
      genres: media.genres ?? [],
      status: options?.status ?? "watchlist",
      is_favorite: options?.isFavorite ?? false,
      notes: options?.notes ?? "",
    }),
  });

  if (!res.ok) throw await res.json();
  return res.json();
}

export async function removeUserMedia(
  tmdbId: number,
  mediaType: "movie" | "tv",
) {
  const res = await authFetch(
    `${API_URL}/user/media/${tmdbId}?media_type=${mediaType}`,
    {
      method: "DELETE",
    },
  );

  if (!res.ok) throw await res.json();
}

export async function getUserMedia(options?: {
  mediaType?: "movie" | "tv";
  page?: number;
  limit?: number;
}) {
  const page = options?.page ?? 1;
  const limit = options?.limit ?? 20;

  let url = `${API_URL}/user/media?page=${page}&limit=${limit}`;

  if (options?.mediaType) {
    url += `&media_type=${options.mediaType}`;
  }

  const res = await authFetch(url, {
    method: "GET",
  });

  if (!res.ok) throw await res.json();
  return res.json();
}

export async function getUserMediaByTMDBID(
  tmdbId: any,
  mediaType?: "movie" | "tv",
) {
  let url = `${API_URL}/user/media/${tmdbId}?media_type=${mediaType ?? ""}`;

  const res = await authFetch(url, {
    method: "GET",
  });

  if (!res.ok) throw await res.json();
  return res.json();
}
