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

export async function searchMediaAll(query: string, page = 1) {
  const [moviesRes, tvRes] = await Promise.all([
    fetch(
      `${BASE_URL}/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(
        query
      )}&page=${page}`
    ),
    fetch(
      `${BASE_URL}/search/tv?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(
        query
      )}&page=${page}`
    ),
  ]);

  if (!moviesRes.ok || !tvRes.ok) {
    throw new Error("Failed to search movies or TV shows");
  }

  const [movies, tv] = await Promise.all([moviesRes.json(), tvRes.json()]);

  const combined = [...movies.results, ...tv.results];

  const total_pages = Math.max(movies.total_pages, tv.total_pages);

  return {
    results: combined,
    total_results: combined.length,
    total_pages,
  };
}


