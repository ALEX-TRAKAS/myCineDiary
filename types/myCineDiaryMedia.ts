export interface MCDMedia {
  tmdb_id: number;
  media_type: "movie" | "tv";
  title: string;
  poster_path: string;
  backdrop_path?: string;
  overview?: string;
  release_date?: string;
  rating: number | null;
  progress: number | null;
  notes?: string;
  status: "watchlist" | "in_progress" | "completed";
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}
