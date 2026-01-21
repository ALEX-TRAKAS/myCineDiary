import { authFetch } from "@/src/lib/authFetch";
const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8080/api";

export async function getUserMovies() {
  const res = await authFetch(`${API_URL}/user/movies`);
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function addUserMovie(tmdbId: number) {
  const res = await authFetch(`${API_URL}/user/movies`, {
    method: "POST",
    body: JSON.stringify({ tmdb_id: tmdbId }),
  });

  if (!res.ok) throw await res.json();
}
