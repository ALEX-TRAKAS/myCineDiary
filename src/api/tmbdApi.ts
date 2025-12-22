const BASE_URL = "https://api.themoviedb.org/3";

export type MediaType = "movie" | "tv";

export async function fetchTrending(type: MediaType = "movie", page = 1) {
  const res = await fetch(`${BASE_URL}/trending/${type}/week?api_key=${process.env.TMDB_API_KEY}&page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch trending");
  return res.json();
}

export async function fetchDetails(id: string, type: MediaType) {
  const res = await fetch(`${BASE_URL}/${type}/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
  if (!res.ok) throw new Error("Failed to fetch details");
  return res.json();
}

export async function searchMedia(query: string, type: MediaType = "movie") {
  const res = await fetch(`${BASE_URL}/search/${type}?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to search");
  return res.json();
}
