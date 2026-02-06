import { authFetch } from "@/src/lib/authFetch";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8080/api";

export async function addUserMedia(type: "movie" | "tv", tmdbId: number) {
  const endpoint = type === "movie" ? "movies" : "series";

  const res = await authFetch(`${API_URL}/user/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tmdb_movie_id: tmdbId,
    }),
  });

  if (!res.ok) throw await res.json();
  return res.json();
}

export async function removeUserMedia(type: "movie" | "tv", tmdbId: number) {
  const endpoint = type === "movie" ? "movies" : "series";

  const res = await authFetch(`${API_URL}/user/${endpoint}/${tmdbId}`, {
    method: "DELETE",
  });

  if (!res.ok) throw await res.json();
}
